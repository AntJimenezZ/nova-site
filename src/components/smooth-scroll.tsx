"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Instancia compartida. El menú móvil la para mientras el diálogo está abierto,
 * si no el fondo sigue desplazándose por debajo.
 */
export const lenis: { current: Lenis | null } = { current: null };

/**
 * Scroll suave global.
 *
 * Lenis desplaza el documento de verdad (no traduce un wrapper), así que
 * position: sticky de los casos de estudio y las revelaciones con
 * animation-timeline: view() siguen funcionando. Verificado en tests/ui.mjs.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Con reduced-motion no se instancia: interpolar el scroll es justo el tipo
    // de movimiento que el usuario ha pedido evitar.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Lenis mantiene su propio rAF: no hace falta un bucle a mano.
      autoRaf: true,
      // El offset compensa el header sticky, igual que scroll-mt-24 (96px).
      anchors: { offset: -96 },
    });

    lenis.current = instance;

    return () => {
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  return null;
}
