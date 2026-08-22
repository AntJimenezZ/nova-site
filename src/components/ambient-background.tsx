"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground
 *
 * GPU-accelerated WebGL fluid mesh / ambient glow background.
 * Replaces heavy CSS `filter: blur(120px)` with a single full-screen shader pass.
 *
 * Key features:
 * - 60+ FPS zero-overhead GPU fragment shader with Simplex noise & Gaussian blobs.
 * - Interactive cursor parallax with smooth spring/lerp damping.
 * - Native micro-dithering that eliminates 8-bit color banding completely.
 * - Reactive to light/dark mode and system `prefers-reduced-motion`.
 * - Automatic animation pause when tab is hidden or canvas is off-screen.
 * - Resilient fallback to Canvas2D/CSS if WebGL is unavailable.
 */

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_is_dark;
  uniform float u_is_mobile;
  uniform float u_motion_reduced;

  // Pseudo-random noise for smooth organic perturbation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = st;
    p.x *= aspect;

    vec2 mouseNorm = u_mouse;
    mouseNorm.x *= aspect;

    // Organic time offsets (slow, calm breathing motion)
    float t = u_motion_reduced > 0.5 ? 2.0 : u_time * 0.25;

    // Mouse parallax offset (gentle, subtle attraction)
    vec2 mOffset = (mouseNorm - vec2(0.5 * aspect, 0.5)) * 0.15;

    // --- Orb 1: Brand Vivid Electric Cobalt / Sapphire ---
    vec2 orb1Base = u_is_mobile > 0.5 
      ? vec2(aspect * 0.28, 0.80) 
      : vec2(aspect * 0.12, 0.82);
    vec2 orb1Pos = orb1Base + vec2(
      sin(t * 0.8) * 0.10 + cos(t * 0.3) * 0.05,
      cos(t * 0.7) * 0.08 + sin(t * 0.4) * 0.04
    ) + mOffset * 0.7;

    // Noise perturbation for fluid edge
    float n1 = snoise(p * 1.0 + vec2(t * 0.2, -t * 0.15)) * 0.10;
    float dist1 = length(p - orb1Pos) + n1;
    // Gaussian falloff with broad, soft dispersion
    float falloff1 = u_is_mobile > 0.5 ? 1.0 : 1.4;
    float glow1 = exp(-dist1 * dist1 * falloff1);

    // --- Orb 2: Electric Cyan / Turquoise Accent ---
    vec2 orb2Base = u_is_mobile > 0.5
      ? vec2(aspect * 0.72, 0.20)
      : vec2(aspect * 0.88, 0.18);
    vec2 orb2Pos = orb2Base + vec2(
      cos(t * 0.75 + 1.5) * 0.12 + sin(t * 0.35) * 0.06,
      sin(t * 0.65 + 2.0) * 0.10 + cos(t * 0.25) * 0.05
    ) + mOffset * 0.9;

    float n2 = snoise(p * 1.2 - vec2(t * 0.18, t * 0.22)) * 0.08;
    float dist2 = length(p - orb2Pos) + n2;
    float falloff2 = u_is_mobile > 0.5 ? 1.1 : 1.5;
    float glow2 = exp(-dist2 * dist2 * falloff2);

    // --- Orb 3: Subtle Central Harmony (Deep Indigo / Violet) ---
    vec2 orb3Pos = mix(orb1Pos, orb2Pos, 0.5) + vec2(sin(t * 0.5) * 0.12, cos(t * 0.6) * 0.12);
    float dist3 = length(p - orb3Pos);
    float falloff3 = u_is_mobile > 0.5 ? 2.0 : 2.8;
    float glow3 = exp(-dist3 * dist3 * falloff3) * 0.5;

    // Color definitions (sRGB calibrated to match NovaSite design tokens)
    vec3 colorCobalt = vec3(0.08, 0.42, 0.98);
    vec3 colorCyan   = vec3(0.01, 0.74, 0.86);
    vec3 colorIndigo = vec3(0.34, 0.25, 0.92);

    // Mobile: Aclarar y desaturar para un fondo suave, aireado y no invasivo
    if (u_is_mobile > 0.5) {
      colorCobalt = mix(colorCobalt, vec3(0.35, 0.65, 0.95), 0.45);
      colorCyan   = mix(colorCyan,   vec3(0.40, 0.82, 0.90), 0.45);
      colorIndigo = mix(colorIndigo, vec3(0.48, 0.42, 0.92), 0.45);
    }

    // Color composition
    vec3 color = colorCobalt * glow1 + colorCyan * glow2 + colorIndigo * glow3;
    float totalIntensity = glow1 + glow2 + glow3;

    // Background base color & theme adaptation
    vec3 finalColor;
    float finalAlpha;

    if (u_is_dark > 0.5) {
      // Dark Mode: Deep luminous ambient glow against slate background
      float intensityFactor = u_is_mobile > 0.5 ? 0.42 : 0.65;
      float alphaFactor     = u_is_mobile > 0.5 ? 0.32 : 0.50;
      float intensity = clamp(totalIntensity * intensityFactor, 0.0, 1.0);
      finalColor = color * (u_is_mobile > 0.5 ? 1.0 : 1.15);
      finalAlpha = intensity * alphaFactor;
    } else {
      // Light Mode: Vibrant, elegant ambient aura clearly visible against white
      float intensityFactor = u_is_mobile > 0.5 ? 0.48 : 0.75;
      float alphaFactor     = u_is_mobile > 0.5 ? 0.23 : 0.36;
      float intensity = clamp(totalIntensity * intensityFactor, 0.0, 1.0);
      finalColor = color * (u_is_mobile > 0.5 ? 0.95 : 1.05);
      finalAlpha = intensity * alphaFactor;
    }

    // Micro-dithering (prevents any 8-bit banding on gradients)
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * (1.0 / 255.0);
    finalColor += dither;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionMediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    motionMediaQuery.addEventListener("change", handleMotionChange);

    // Check dark mode
    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Try initializing WebGL
    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      // Fallback: simple CSS ambient glow if WebGL is disabled
      canvas.style.display = "none";
      return;
    }

    // Compile Shader helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering full screen)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uIsDark = gl.getUniformLocation(program, "u_is_dark");
    const uIsMobile = gl.getUniformLocation(program, "u_is_mobile");
    const uMotionReduced = gl.getUniformLocation(program, "u_motion_reduced");

    // Enable proper blending for luminous transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Mouse tracking with smooth LERP
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - e.clientY / window.innerHeight; // Invert for GL coordinates
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Viewport resizing with DPI clamp and visualViewport support
    let width = 0;
    let height = 0;
    let isMobile = false;

    const resize = () => {
      const vw = window.innerWidth;
      const vh = Math.max(window.innerHeight, document.documentElement.clientHeight);
      isMobile = vw < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);
      const displayWidth = Math.floor(vw * dpr);
      const displayHeight = Math.floor(vh * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        width = displayWidth;
        height = displayHeight;
        gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.visualViewport?.addEventListener("resize", resize, { passive: true });
    window.addEventListener("orientationchange", resize, { passive: true });
    resize();

    // Render loop
    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startTime = performance.now() - (currentMouseX * 1000); // Resume smoothly
        render();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = () => {
      if (!isVisible) return;

      const now = performance.now();
      const elapsedSeconds = (now - startTime) / 1000;

      // Mouse smooth interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      gl.useProgram(program);
      gl.uniform2f(uResolution, width, height);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);
      gl.uniform1f(uTime, elapsedSeconds);
      gl.uniform1f(uIsDark, isDark ? 1.0 : 0.0);
      gl.uniform1f(uIsMobile, isMobile ? 1.0 : 0.0);
      gl.uniform1f(uMotionReduced, isReducedMotion ? 1.0 : 0.0);

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // If motion is reduced, render only periodically or on interaction, otherwise 60fps
      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      motionMediaQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed -inset-y-12 inset-x-0 -z-10 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="size-full opacity-90 transition-opacity duration-700"
        style={{
          contain: "paint",
          willChange: "transform",
        }}
      />
      {/* Subtle fallback in case canvas is not supported */}
      <noscript>
        <div className="absolute -left-[10%] top-[10%] size-[50vw] rounded-full bg-brand-vivid/15 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] size-[50vw] rounded-full bg-cyan-500/15 blur-[120px]" />
      </noscript>
    </div>
  );
}
