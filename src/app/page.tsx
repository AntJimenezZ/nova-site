"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Code, ShoppingCart, Wrench, Database, Star,
  Crosshair, ArrowRight,
  CheckCircle, XCircle, X, InstagramLogo, CaretRight, XLogo, WhatsappLogo
} from "@phosphor-icons/react";

import Link from "next/link";
import { projects, Project } from "@/lib/projects";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Howl } from "howler";
import { Turnstile } from '@marsidev/react-turnstile';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y responsivas con las últimas tecnologías",
    longDescription: "Construimos interfaces de alto rendimiento corporativo utilizando frameworks de vanguardia. La experiencia de usuario es tratada como una ciencia de conversión exacta, integrando WebGL y micro-interacciones fluidas.",
    features: ["Single Page Applications (SPA)", "Server Side Rendering (SSR)", "Despliegue de Animaciones Avanzadas (WebGL / GSAP)", "Optimización SEO Extrema"],
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Tiendas online completas con sistemas de pago y gestión de inventario",
    longDescription: "Desarrollamos motores de ventas digitales escalables. Listos para altos volúmenes de transacciones, enfocándonos radicalmente en minimizar la fricción cognitiva en el proceso de pago.",
    features: ["Pasarelas de Pago Globaladas e Inteligentes", "Dashboards y Analíticas Integradas", "Inventario Automatizado Multinivel", "Protección Activa contra Fraude"],
    tech: ["Shopify Plus", "Stripe API", "PostgreSQL", "Next.js Commerce"]
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Soporte técnico continuo y actualizaciones para tu sitio web",
    longDescription: "Nuestro equipo de respuesta asegura que tu infraestructura tecnológica esté siempre en un 99.9% de uptime, aplicando parches de seguridad y balanceo de carga en la nube sin ralentizar operaciones.",
    features: ["Monitoreo Constante 24/7", "Auditoría de Seguridad Periódica", "Escalabilidad Dinámica en Nubes", "Refactorización de Código Base Obsoleto"],
    tech: ["AWS / GCP", "Docker", "Sentry", "Vercel Analytics"]
  },
  {
    icon: Database,
    title: "Backend Personalizado",
    description: "APIs robustas y bases de datos optimizadas para tu negocio",
    longDescription: "Diseñamos la lógica de negocio detrás de escena. Arquitecturas de microservicios, bases de datos relacionales o NoSQL con la más alta disponibilidad y baja latencia.",
    features: ["Estructuras de APIs RESTful y GraphQL", "Arquitectura de Microservicios", "Sistemas de Caché de Alto Rendimiento", "Integraciones Corporativas a medida"],
    tech: ["Node.js", "Python FastApi", "Redis", "MongoDB", "PostgreSQL"]
  },
];

const team = [
  {
    name: "Gabriel",
    role: "Software Developer",
    description: "Experiencia en desarrollo de software y desarrollo de aplicaciones",
    avatar: "/logos/FotoGabriel.jpg",
    technologies: ["React", "Node.js", "Python", "MongoDB", "AWS"],
  },
  {
    name: "Steven",
    role: "Software Developer",
    description: "Experiencia en la implementación y desarrollo de software y aplicaciones personalizadas",
    avatar: "/logos/FotoSteven.jpg",
    technologies: ["React", "Node.js", "Python", "Supabase", "C#"],
  },
  {
    name: "Anthony (Noni)",
    role: "Full Stack Developer",
    description: "Desarrollador full stack con experiencia en desarrollo web y móvil",
    avatar: "/logos/FotoAnthony .jpg",
    technologies: ["React", "Vue", "React Native", "Firebase", "TypeScript"],
  },
  {
    name: "Alejandro (Pecho)",
    role: "Backend Engineer",
    description: "Ingeniero backend enfocado en arquitecturas escalables y seguras",
    avatar: "/logos/FotoAlejandro.jpg",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "K8s"],
  },
  {
    name: "Paulo",
    role: "Frontend UI Developer",
    description: "Experiencia en diseño frontend UI y desarrollo de aplicaciones web y móviles.",
    avatar: "/logos/FotoPaulo.jpeg",
    technologies: ["React", "UI/UX", "GSAP", "Three.js", "TailwindCSS"],
  }
];

// Reusable 3D Particle Element
function AbstractNLogo() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[2, 0, -4]} scale={0.8}>
        {/* Pilar Izquierdo */}
        <mesh position={[-1.3, 0, 0]}>
          <boxGeometry args={[0.7, 4.5, 0.7]} />
          <meshStandardMaterial color="#0083EA" metalness={0.6} roughness={0.2} transparent opacity={0.85} />
        </mesh>
        {/* Pilar Derecho */}
        <mesh position={[1.3, 0, 0]}>
          <boxGeometry args={[0.7, 4.5, 0.7]} />
          <meshStandardMaterial color="#0083EA" metalness={0.6} roughness={0.2} transparent opacity={0.85} />
        </mesh>
        {/* Diagonal */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.52]}>
          <boxGeometry args={[0.7, 5.2, 0.7]} />
          <meshStandardMaterial color="#007CE8" metalness={0.8} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// Magnetic Button Wrapper
const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const hw = width / 2;
      const hh = height / 2;
      const x = clientX - (left + hw);
      const y = clientY - (top + hh);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
};

// Custom Magnetic Cursor
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#0083EA] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        background: "radial-gradient(circle, rgba(0,131,234,0.3) 0%, transparent 80%)"
      }}
    />
  );
};

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<null | { type: "success" | "error" | "info"; message: string }>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [bootProgress, setBootProgress] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Sound Engine
  const uiClick = useRef<Howl | null>(null);
  const uiHover = useRef<Howl | null>(null);

  useEffect(() => {
    uiClick.current = new Howl({ src: ['/sounds/click.mp3'], volume: 0.2 });
    uiHover.current = new Howl({ src: ['/sounds/whoosh.mp3'], volume: 0.1 });
  }, []);

  const playClick = () => { if (audioEnabled) uiClick.current?.play(); };
  const playHover = () => { if (audioEnabled) uiHover.current?.play(); };

  // Terminal Boot Sequence
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 800);
      }
      setBootProgress(progress);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useGSAP(() => {
    if (isBooting) return;

    // Advanced UI Animation Using GSAP
    gsap.fromTo(".hero-char",
      {
        opacity: 0,
        x: () => gsap.utils.random(-600, 600),
        y: () => gsap.utils.random(-600, 600),
        z: () => gsap.utils.random(-400, 400),
        rotationX: () => gsap.utils.random(-360, 360),
        rotationY: () => gsap.utils.random(-360, 360),
        rotationZ: () => gsap.utils.random(-360, 360),
        scale: () => gsap.utils.random(0.1, 4),
        filter: "blur(20px)"
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: {
          each: 0.08,
          from: "random"
        },
        duration: 2.5,
        ease: "expo.out",
        delay: 0.2,
      }
    );

    gsap.from(".hero-sub", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1.2,
    });

    gsap.to(".hero-bg-layer", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: heroRef, dependencies: [isBooting] });

  const TitleText = "NOVASITE".split("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const pushToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      pushToast("error", "Por favor, completa todos los campos.");
      return;
    }

    // Require token only if the Site Key is configured (avoiding errors when keys are not set in .env)
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (siteKey && !turnstileToken) {
      pushToast("error", "Autenticación humana requerida (Captcha).");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        turnstileToken
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        pushToast("success", "¡Mensaje transferido a los servidores de NovaSite!");
      } else {
        let errorMsg = "Hubo un error de transmisión.";
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch { }
        pushToast("error", errorMsg);
      }
    } catch {
      pushToast("error", "Falla de conectividad local.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-outfit min-h-[100dvh] bg-[#070708] text-slate-100 relative overflow-x-hidden selection:bg-[#0083EA]/30 selection:text-[#007CE8]" onClick={() => { if (!audioEnabled) setAudioEnabled(true); }}>
      <CustomCursor />

      {/* Boot Preloader Sequence */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-[#050F19] text-[#0083EA] flex flex-col items-center justify-center font-geist-mono"
          >
            <div className="w-64">
              <div className="text-xs mb-2 tracking-widest uppercase flex justify-between">
                <span>Init_Sequence</span>
                <span>{bootProgress}%</span>
              </div>
              <div className="w-full h-1 bg-[#0B3A5C]/50 rounded-full overflow-hidden">
                <div className="h-full bg-[#0083EA] transition-all duration-150" style={{ width: `${bootProgress}%` }} />
              </div>
              <div className="mt-8 text-center text-xs text-slate-500 animate-pulse">
                {bootProgress < 100 ? "Compilando shaders..." : "Desplegando Sistema Core"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Fixed Button */}
      <a
        href="https://wa.me/50683047436"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300"
        onMouseEnter={playHover}
        onClick={playClick}
      >
        <WhatsappLogo weight="fill" className="w-8 h-8" />
      </a>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl bg-[#050F19]/90 shadow-2xl ${toast.type === "success" ? "border-[#0083EA]/40" : toast.type === "error" ? "border-rose-500/40" : "border-[#0B3A5C]/40"
              }`}>
              <div className="mt-0.5">
                {toast.type === "success" ? <CheckCircle weight="fill" className="w-5 h-5 text-[#0083EA]" /> : <XCircle weight="fill" className="w-5 h-5 text-rose-400" />}
              </div>
              <div className="text-sm font-geist-sans tracking-tight pr-1">{toast.message}</div>
              <button onClick={() => setToast(null)} className="ml-1 text-[#007CE8] hover:text-white">×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphic Magnetic Menu Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <MagneticButton>
          <button
            className="w-14 h-14 flex flex-col justify-center items-center rounded-full bg-[#050F19]/50 border border-[#0B3A5C] backdrop-blur-md hover:bg-[#0B3A5C]/50 hover:border-[#0083EA] transition-all shadow-[0_0_20px_rgba(0,131,234,0.1)]"
            onClick={() => { playClick(); setMenuOpen(!menuOpen); }}
            onMouseEnter={playHover}
          >
            <span className={`w-6 h-px bg-[#007CE8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-1"}`} />
            <span className={`w-6 h-px bg-[#007CE8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1"}`} />
          </button>
        </MagneticButton>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#050F19]/95 backdrop-blur-3xl border-l border-[#0B3A5C] z-40 p-10 flex flex-col shadow-2xl"
          >
            <nav className="mt-20 flex flex-col gap-6 font-geist-sans text-xl tracking-tight">
              {['Servicios', 'Equipo', 'Portafolio', 'Contacto'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => { playClick(); setMenuOpen(false); }} className="text-slate-400 hover:text-white transition-colors relative group w-fit">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0083EA] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-10 border-t border-[#0B3A5C]">
              <a href="https://www.instagram.com/novasitesc/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="flex items-center text-[#007CE8] hover:text-[#0083EA] transition-colors group">
                <InstagramLogo className="w-6 h-6 mr-2" />
                @novasitesc
                <CaretRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Hero Section (GSAP driven) */}
      <section ref={heroRef} className="relative w-full min-h-[100dvh] flex items-center mb-24 overflow-hidden border-b border-[#0B3A5C]">
        <div className="hero-bg-layer absolute inset-0 z-0 h-[130%]">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#0083EA" />
            <AbstractNLogo />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.3} color="#007CE8" />
          </Canvas>
        </div>

        <div className="container mx-auto px-6 relative z-10 w-full pl-6 md:pl-20 pointer-events-none">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 hero-sub">
              <span className="h-px w-8 bg-[#0083EA]" />
              <span className="text-[#007CE8] font-geist-mono text-sm tracking-widest uppercase">Estudio Digital</span>
            </div>

            <h1 className="text-5xl md:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-white flex pointer-events-auto" style={{ perspective: "1200px" }}>
              {TitleText.map((char, i) => (
                <span key={i} className="hero-char transform-gpu inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-[#0B3A5C]" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              ))}
            </h1>

            <p className="hero-sub mt-8 text-xl text-slate-400 max-w-xl font-geist-sans font-light leading-relaxed pointer-events-auto">
              Ingeniería de software de alta gama. Desafiamos lo convencional con interfaces que respiran y sistemas empresariales que escalan a niveles absolutos.
            </p>

            <div className="mt-12 pointer-events-auto hero-sub">
              <MagneticButton className="w-fit">
                <a href="#contacto" onClick={playClick} className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0083EA] text-white font-bold hover:bg-[#007CE8] transition-colors shadow-[0_0_30px_rgba(0,131,234,0.3)] hover:shadow-[0_0_40px_rgba(0,131,234,0.5)]">
                  Iniciar Convergencia
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="servicios" className="container mx-auto px-4 md:px-8 py-24">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Módulos Logísticos de Software</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              layoutId={`service-card-${service.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => { playClick(); setSelectedService(service); }}
              className="group relative p-8 rounded-[2.5rem] bg-[#050F19] border border-[#0B3A5C] hover:border-[#0083EA] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col shadow-[0_4px_30px_rgba(0,131,234,0.05)] hover:shadow-[0_4px_40px_rgba(0,131,234,0.15)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#0083EA]/10 to-transparent pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0B3A5C]/30 border border-[#0B3A5C] mb-6 group-hover:scale-110 group-hover:bg-[#0083EA]/20 transition-all duration-500">
                <service.icon weight="duotone" className="w-6 h-6 text-[#007CE8] group-hover:text-[#0083EA] transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-geist-sans mb-8">{service.description}</p>

              <div className="mt-auto inline-flex items-center text-xs font-semibold text-[#0083EA] group-hover:text-[#007CE8] transition-colors opacity-70 group-hover:opacity-100">
                Explorar Arquitectura <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Morphing Modal for Services */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[#070708]/90 backdrop-blur-md" onClick={() => setSelectedService(null)} />

            <motion.div
              layoutId={`service-card-${selectedService.title}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#050F19] border border-[#0B3A5C] rounded-[2.5rem] shadow-[0_0_80px_rgba(0,131,234,0.2)] overflow-y-auto hidden-scrollbar flex flex-col z-10"
            >
              <div className="absolute top-6 right-6 z-20">
                <MagneticButton>
                  <button
                    onClick={() => { playClick(); setSelectedService(null); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#070708]/80 border border-[#0083EA]/50 hover:bg-[#0083EA] transition-colors backdrop-blur-md shadow-lg group"
                  >
                    <X weight="bold" className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </MagneticButton>
              </div>

              <div className="w-full relative min-h-[160px] overflow-hidden border-b border-[#0B3A5C] p-8 md:p-12 flex items-center bg-gradient-to-tr from-[#050F19] to-[#0B3A5C]/40">
                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                  <selectedService.icon weight="duotone" className="w-64 h-64 text-[#0083EA]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0083EA]/20 border border-[#0083EA]/50 mb-6 shadow-[0_0_30px_rgba(0,131,234,0.3)]">
                    <selectedService.icon weight="fill" className="w-8 h-8 text-[#0083EA]" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-[#007CE8]">{selectedService.title}</h3>
                </div>
              </div>

              <div className="w-full p-8 md:p-12 flex flex-col gap-8 text-slate-300">
                <p className="text-xl font-geist-sans leading-relaxed text-white">
                  {selectedService.longDescription}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-sm tracking-widest font-mono text-[#007CE8] mb-4 uppercase">Vector de Características</h4>
                    <ul className="space-y-4">
                      {selectedService.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start font-geist-sans">
                          <CheckCircle weight="fill" className="w-5 h-5 text-[#0083EA] mr-3 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm tracking-widest font-mono text-[#0083EA] mb-4 uppercase">Stack Tecnológico</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.tech.map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-[#0B3A5C]/30 text-white font-geist-mono text-sm rounded-lg border border-[#0B3A5C] hover:border-[#0083EA] hover:bg-[#0083EA]/20 transition-colors shadow-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Section */}
      <section id="equipo" className="container mx-auto px-4 md:px-8 py-24 relative border-t border-[#0B3A5C]">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16">El Escuadrón</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className="relative group rounded-[2.5rem] bg-[#050F19] border border-[#0B3A5C] p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start transition-colors hover:border-[#0083EA]/50"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#0083EA]/30 shrink-0 group-hover:border-[#0083EA] transition-colors duration-500">
                <Image src={member.avatar || "/placeholder.svg"} alt={member.name} width={128} height={128} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="flex-1 flex flex-col items-center sm:items-start">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-fit mb-2">
                  <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                  <Badge variant="outline" className="border-[#0B3A5C] text-[#007CE8] font-mono text-[10px] bg-[#070708]">{member.role}</Badge>
                </div>
                <p className="text-slate-400 text-sm font-geist-sans text-center sm:text-left mb-4">{member.description}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-auto">
                  {member.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-[#0B3A5C]/20 text-[#007CE8] rounded border border-[#0B3A5C] font-geist-mono">
                      {tech}
                    </span>
                  ))}
                  {member.technologies.length > 3 && <span className="text-xs px-2 py-1 text-[#007CE8] font-geist-mono">+{member.technologies.length - 3}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Text-Only GSAP List */}
      <section id="portafolio" className="py-32 bg-[#050F19] border-t border-[#0B3A5C] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Proyectos Destacados</h2>
            <p className="text-slate-400 font-geist-sans">La estructura clásica es predecible. Rompemos las convenciones y redefinimos cómo el usuario explora nuestra arquitectura.</p>
          </div>

          <div className="flex flex-col border-t border-[#0B3A5C]">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.title}
                layoutId={`project-card-${proj.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                onClick={() => { playClick(); setSelectedProject(proj); }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  gsap.to(el.querySelector('.proj-title'), { x: 30, color: "#ffffff", duration: 0.4, ease: "power3.out" });
                  gsap.to(el.querySelector('.proj-desc'), { x: -20, opacity: 1, duration: 0.4, ease: "power3.out" });
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  gsap.to(el.querySelector('.proj-title'), { x: 0, color: "rgba(255,255,255,0.4)", duration: 0.4, ease: "power3.out" });
                  gsap.to(el.querySelector('.proj-desc'), { x: 0, opacity: 0, duration: 0.4, ease: "power3.out" });
                }}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-16 border-b border-[#0B3A5C] cursor-pointer"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0083EA]/0 via-[#0083EA]/5 to-[#0083EA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex flex-col z-10 w-full md:w-auto relative">
                  <div className="flex gap-3 mb-6 md:mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest font-mono text-[#007CE8] border border-[#0B3A5C] px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <h3 className="proj-title text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white/40 will-change-transform">
                    {proj.title}
                  </h3>
                </div>

                <div className="proj-desc mt-8 md:mt-0 max-w-sm z-10 opacity-0 hidden md:block text-right will-change-transform">
                  <p className="text-slate-400 font-geist-sans text-sm leading-relaxed mb-4">
                    {proj.description}
                  </p>
                  <div className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-[#0083EA]">
                    Explorar Sistema <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>

                <div className="md:hidden mt-6 flex items-center text-sm font-semibold text-[#0083EA] group-hover:text-[#007CE8]">
                  Explorar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Morphing Modal for Deep Dive Case Studies */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[#070708]/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

            <motion.div
              layoutId={`project-card-${selectedProject.title}`}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#050F19] border border-[#0B3A5C] rounded-[2.5rem] shadow-[0_0_80px_rgba(0,131,234,0.2)] overflow-y-auto hidden-scrollbar flex flex-col z-10"
            >
              <div className="absolute top-6 right-6 z-20">
                <MagneticButton>
                  <button
                    onClick={() => { playClick(); setSelectedProject(null); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#070708]/80 border border-[#0083EA]/50 hover:bg-[#0083EA] transition-colors backdrop-blur-md shadow-lg"
                  >
                    <X weight="bold" className="w-5 h-5 text-white" />
                  </button>
                </MagneticButton>
              </div>

              {/* Informative Header (No Image) */}
              <div className="w-full relative min-h-[220px] overflow-hidden border-b border-[#0B3A5C] p-8 md:p-16 flex flex-col justify-end bg-gradient-to-tr from-[#050F19] to-[#0B3A5C]/40">
                <Badge variant="outline" className="w-fit border-[#0083EA]/30 text-[#0083EA] bg-[#0083EA]/10 font-mono text-[10px] tracking-widest uppercase mb-6">{selectedProject.client || "Sector Empresarial"}</Badge>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-[#007CE8]">{selectedProject.title}</h3>
              </div>

              <div className="w-full p-8 md:p-16 flex flex-col gap-10">
                <p className="text-xl md:text-2xl text-slate-300 font-geist-sans leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
                  {selectedProject.features && (
                    <div>
                      <h4 className="text-xs tracking-widest font-mono text-[#007CE8] mb-6 uppercase">Características Implementadas</h4>
                      <ul className="space-y-4">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-slate-300 font-geist-sans">
                            <CheckCircle weight="fill" className="w-5 h-5 text-[#0083EA] mr-3 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(selectedProject.metrics || selectedProject.outcomes) && (
                    <div className="p-8 rounded-[2rem] bg-[#070708] border border-[#0B3A5C] flex flex-col justify-center">
                      <h4 className="text-xs tracking-widest font-mono text-[#007CE8] mb-8 uppercase text-center">Impacto Operativo</h4>
                      <div className="grid grid-cols-2 gap-6 text-center mb-8">
                        {selectedProject.metrics?.map((m, i) => (
                          <div key={i}>
                            <p className="text-4xl font-black text-white mb-2">{m.value}</p>
                            <p className="text-xs text-slate-500 font-geist-mono uppercase tracking-widest">{m.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 border-t border-[#0B3A5C] pt-6">
                        {selectedProject.outcomes?.map((o, i) => (
                          <div key={i} className="text-sm text-slate-400 font-geist-sans flex items-center justify-center">
                            <Star weight="fill" className="w-4 h-4 text-[#007CE8] mr-2" />
                            {o}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-[#0B3A5C] flex gap-3 flex-wrap">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-5 py-2 bg-[#0B3A5C]/20 text-white hover:bg-[#0083EA]/20 hover:border-[#0083EA] transition-colors font-geist-mono text-xs rounded-xl border border-[#0B3A5C]">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Banner */}
      <section className="bg-[#0083EA] py-16 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at center, #050F19 10%, transparent 80%)" }} />
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">Construimos en público.</h2>
            <p className="text-[#050F19] font-medium text-lg">Sigue nuestro proceso creativo y tecnológico en tiempo real.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton>
              <a href="https://www.instagram.com/novasitesc/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-[#0083EA] font-bold hover:bg-[#070708] hover:text-white transition-colors shadow-lg">
                <InstagramLogo className="w-6 h-6 mr-2" />
                @novasitesc
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://x.com/nova_sitesc" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-black text-white font-bold hover:bg-white hover:text-black border border-white/20 transition-colors shadow-lg">
                <XLogo weight="fill" className="w-6 h-6 mr-2" />
                @nova_sitesc
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-32 relative overflow-hidden bg-[#070708]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, #0B3A5C 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Iniciar Convergencia</h2>
              <p className="text-slate-400 font-geist-sans">Diseñamos el sistema que transformará radicalmente tus operaciones.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-[2.5rem] bg-[#050F19] border border-[#0B3A5C] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-geist-mono tracking-wider text-[#0083EA] uppercase">Nombre</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} className="bg-[#070708] border-[#0B3A5C] rounded-xl h-14 font-geist-sans focus-visible:ring-[#0083EA]/50 text-white" placeholder="Tu nombre completo o empresa" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-geist-mono tracking-wider text-[#0083EA] uppercase">Correo</label>
                  <Input name="email" value={formData.email} onChange={handleInputChange} className="bg-[#070708] border-[#0B3A5C] rounded-xl h-14 font-geist-sans focus-visible:ring-[#0083EA]/50 text-white" placeholder="usuario@dominio.com" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <label className="text-xs font-geist-mono tracking-wider text-[#0083EA] uppercase">Asunto / Idea de negocio</label>
                <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-[#070708] border border-[#0B3A5C] rounded-xl h-14 px-3 font-geist-sans focus-visible:ring-[#0083EA]/50 text-white appearance-none outline-none">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Ecommerce">Ecommerce</option>
                  <option value="Sitio Web Corporativo">Sitio Web Corporativo</option>
                  <option value="Aplicación Web">Aplicación Web</option>
                  <option value="Software de Asistencia">Software de Asistencia</option>
                  <option value="Consultoría/Mantenimiento">Consultoría / Mantenimiento</option>
                  <option value="Otro">Otro proyecto</option>
                </select>
              </div>
              <div className="space-y-2 mb-8">
                <label className="text-xs font-geist-mono tracking-wider text-[#0083EA] uppercase">Mensaje</label>
                <Textarea name="message" value={formData.message} onChange={handleInputChange} className="bg-[#070708] border-[#0B3A5C] rounded-xl min-h-[140px] font-geist-sans focus-visible:ring-[#0083EA]/50 resize-y text-white" placeholder="Describe los detalles de tu proyecto o idea..." />
              </div>

              <div className="mb-8 flex justify-center">
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                  <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onSuccess={(token) => setTurnstileToken(token)} options={{ theme: 'dark' }} />
                )}
              </div>

              <MagneticButton>
                <Button type="submit" disabled={isSubmitting} onClick={playClick} className="w-full h-14 rounded-xl bg-[#0083EA] text-white hover:bg-[#007CE8] font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,131,234,0.2)] hover:shadow-[0_0_30px_rgba(0,131,234,0.4)]">
                  {isSubmitting ? "TRANSMITIENDO DATOS..." : "DESPLEGAR MENSAJE"} <Crosshair weight="bold" className="ml-2 w-5 h-5" />
                </Button>
              </MagneticButton>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0B3A5C] bg-[#070708] py-12 text-center text-[#0B3A5C] font-geist-sans text-sm pb-24">
        <p>&copy; {new Date().getFullYear()} NovaSite Core Systems. Operaciones Activas en la Red.</p>
      </footer>
    </div>
  );
}
