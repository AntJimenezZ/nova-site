"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  ShoppingCart,
  Wrench,
  Database,
  ChevronLeft,
  ChevronRight,
  Star,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Instagram,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { testimonials } from "@/lib/testimonials";
import Image from "next/image";

const techIcons = [
  { name: "HTML", color: "text-orange-500" },
  { name: "CSS", color: "text-blue-500" },
  { name: "JavaScript", color: "text-yellow-500" },
  { name: "React", color: "text-cyan-500" },
  { name: "Python", color: "text-green-500" },
];

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description:
      "Aplicaciones web modernas y responsivas con las últimas tecnologías",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Tiendas online completas con sistemas de pago y gestión de inventario",
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Soporte técnico continuo y actualizaciones para tu sitio web",
  },
  {
    icon: Database,
    title: "Backend Personalizado",
    description: "APIs robustas y bases de datos optimizadas para tu negocio",
  },
];

const team = [
  {
    name: "Gabriel",
    role: "Software Developer",
    description:
      "Experiencia en desarrollo de software y desarrollo de aplicaciones",
    avatar: "/logos/FotoGabriel.jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Software",
    technologies: ["React", "Node.js", "Python", "MongoDB", "AWS"],
    education: "Ingeniería en Sistemas",
    achievements: [
      "20+ proyectos completados",
      "Especialista en Web Development",
      "Desarrollador Full Stack",
    ],
    email: "gabriel@novasite.dev",
    linkedin: "linkedin.com/in/gabriel-novasite",
  },
    {
    name: "Steven",
    role: "Software Developer",
    description:
      "Experiencia en la implementación y desarrollo de software y aplicaciones personalizadas",
    avatar: "/logos/FotoSteven.jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Software",
    technologies: ["React", "Node.js", "Python", "Supabase", "C#"],
    education: "Ingeniería en Computación",
    achievements: [
      "20+ proyectos completados",
      "Experiencia en desarrollo web",
      "Desarrollador Full Stack",
    ],
    email: "steven@novasite.dev",
    linkedin: "linkedin.com/in/steven-novasite",
  },
  {
    name: "Anthony (Noni)",
    role: "Full Stack Developer",
    description:
      "Desarrollador full stack con experiencia en desarrollo de aplicaciones web y móviles",
    avatar: "/logos/FotoAnthony .jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Software",
    technologies: ["React", "Vue.js", "React Native", "Firebase", "TypeScript"],
    education: "Ingeniería Computación",
    achievements: [
      "20+ aplicaciones móviles y web",
      "Especialista en Backend Development",
      "Líder técnico",
    ],
    email: "anthony@novasite.dev",
    linkedin: "linkedin.com/in/anthony-novasite",
  },
  {
    name: "Alejandro (Pecho)",
    role: "Backend Engineer",
    description:
      "Ingeniero backend enfocado en arquitecturas escalables y seguras",
    avatar: "/logos/FotoAlejandro.jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Software",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
    education: "Ingeniería en Computación",
    achievements: [
      "Arquitecto de sistemas",
      "Web Developer",
      "Backend Developer",
    ],
    email: "alejandro@novasite.dev",
    linkedin: "linkedin.com/in/alejandro-novasite",
  },
  {
    name: "Kevin",
    role: "Software Developer",
    description: "Desarrollador de software entusiasta y dedicado, apasionado por la tecnología.",
    avatar: "/logos/fotoKevin.jpg",
    // Información profesional para la parte trasera
    experience: "Desarrollo de páginas web, aplicaciones, bases de datos.",
    technologies: ["Python", "PostgreSQL", "C++", "Supabase", "JavaScript"],
    education: "Ingeniería en Computación",
    achievements: [
      "10+ proyectos completados",
      "Especialista en UI/UX",
      "Diseñador web",
    ],
    email: "kevin03varela@gmail.com",
    linkedin: "linkedin.com/in/kevin03varela",
  }
];

// projects imported from @/lib/projects

// Hook mejorado para animaciones de scroll más sutiles y profesionales
function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold: number = 0.15,
  rootMargin: string = "0px 0px -10% 0px"
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasAnimated]);

  return [ref, visible] as const;
}

export default function LandingPage() {
  const [currentProject, setCurrentProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  // Estado para animar la aparición del hero al cargar la página
  const [heroVisible, setHeroVisible] = useState(false);
  // Nuevo: Estado para animación de transición de proyectos
  const [projectTransition, setProjectTransition] = useState(false);
  // Estado: controla qué miembro está abierto en móvil (detalles)
  const [openMember, setOpenMember] = useState<number | null>(null);
  // Dirección de transición del carrusel
  const [transitionDir, setTransitionDir] = useState<"next" | "prev">("next");
  // Autoplay pausa/activo
  const [isPaused, setIsPaused] = useState(false);
  // Visibilidad del carrusel en viewport
  const portfolioAutoRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);
  // Visibilidad de la pestaña
  const [docVisible, setDocVisible] = useState(true);
  // Soporte de swipe para carrusel en móvil
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Estados para el formulario de contacto
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  // (Botón volver arriba ahora está en el footer)

  // Elimina el useEffect de avance automático
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProjectTransition(true)
  //     setTimeout(() => {
  //       setCurrentProject((prev) => (prev + 1) % projects.length)
  //       setProjectTransition(false)
  //     }, 400) // Duración de la animación
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [])

  const nextProject = () => {
    setTransitionDir("next");
    setProjectTransition(true);
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setProjectTransition(false);
    }, 600);
  };

  const prevProject = () => {
    setTransitionDir("prev");
    setProjectTransition(true);
    setTimeout(() => {
      setCurrentProject(
        (prev) => (prev - 1 + projects.length) % projects.length
      );
      setProjectTransition(false);
    }, 600);
  };

  // Observar si el carrusel está en viewport
  useEffect(() => {
    const el = portfolioAutoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        setInView(entries[0]?.isIntersecting ?? true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Escuchar visibilidad del documento (pestaña activa)
  useEffect(() => {
    const handler = () => setDocVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handler);
    handler();
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Autoavance del carrusel con pausa al hover, fuera de vista o pestaña oculta
  useEffect(() => {
    if (isPaused || !inView || !docVisible) return;
    const id = setInterval(() => {
      nextProject();
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, inView, docVisible, currentProject]);

  // En cada sección principal:
  // Servicios
  const [servicesRef, servicesVisible] = useScrollReveal<HTMLElement>();
  // Equipo
  const [teamRef, teamVisible] = useScrollReveal<HTMLElement>();
  // Portafolio
  const [portfolioRef, portfolioVisible] = useScrollReveal<HTMLElement>();
  // Testimonios
  const [testimonialsRef, testimonialsVisible] = useScrollReveal<HTMLElement>();
  // Contacto
  const [contactRef, contactVisible] = useScrollReveal<HTMLElement>();

  // Función para manejar cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      pushToast("error", "Por favor, completa todos los campos.");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      pushToast("error", "Por favor, ingresa un email válido.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Enviar el formulario a la API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        pushToast("success", "¡Mensaje enviado! Te contactaremos pronto.");
      } else {
        console.error("Error del servidor:", result.error);
        setSubmitStatus("error");
        pushToast("error", "No pudimos enviar tu mensaje. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setSubmitStatus("error");
      pushToast("error", "Ocurrió un error de conexión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lista de ideas de desarrollo de software para los cuadros
  const randomIdeas = [
    "Innovación Digital",
    "Soluciones Escalables",
    "Experiencia de Usuario",
    "Automatización",
    "Transformación Digital",
    "Desarrollo Ágil",
    "Optimización Web",
    "Seguridad Avanzada",
    "Integración de APIs",
    "E-commerce Inteligente",
    "Cloud Computing",
    "Soporte Técnico",
    "Diseño Responsivo",
    "Análisis de Datos",
    "Automatización de Procesos",
    "Consultoría IT",
    "Aplicaciones Personalizadas",
    "Backends Robustas",
    "Interfaz Intuitiva",
    "Crecimiento Digital",
  ];
  // Estado para los nombres actuales de los cuadros
  const [techLabels, setTechLabels] = useState(
    Array(techIcons.length).fill(randomIdeas[0])
  );
  // Estado para animación de los cuadros
  const [techFade, setTechFade] = useState(Array(techIcons.length).fill(true));
  useEffect(() => {
    const interval = setInterval(() => {
      setTechFade(Array(techIcons.length).fill(false));
      setTimeout(() => {
        setTechLabels((labels) =>
          labels.map(
            () => randomIdeas[Math.floor(Math.random() * randomIdeas.length)]
          )
        );
        setTechFade(Array(techIcons.length).fill(true));
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, []);

  // Toast de feedback para el formulario de contacto
  const [toast, setToast] = useState<null | {
    type: "success" | "error" | "info";
    message: string;
  }>(null);
  const pushToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    // Ocultar automáticamente después de 4s
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Toast flotante (feedback de formulario) */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] animate-slide-fade-in">
          <div
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur bg-slate-900/85 ${
              toast.type === "success"
                ? "border-emerald-500/40"
                : toast.type === "error"
                ? "border-rose-500/40"
                : "border-slate-500/40"
            }`}
          >
            <div
              className={`mt-0.5 ${
                toast.type === "success"
                  ? "text-emerald-400"
                  : toast.type === "error"
                  ? "text-rose-400"
                  : "text-slate-300"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : toast.type === "error" ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
            </div>
            <div className="text-sm text-slate-100 pr-1">{toast.message}</div>
            <button
              onClick={() => setToast(null)}
              className="ml-1 text-slate-400 hover:text-slate-200 transition"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Decoración de fondo: gradientes y patrón sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
      {/* Botón flotante de menú en la parte superior derecha */}
      <button
        className={`fixed top-8 right-8 z-50 shadow-lg focus:outline-none transition-all duration-200 cursor-pointer bg-transparent p-0 border-0 ${
          menuOpen ? "scale-110 ring-4 ring-blue-400/40 shadow-2xl" : ""
        }`}
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menú"
        style={{ outline: "none" }}
      >
        <span className={`block w-7 h-7 relative`}>
          <span
            className={`absolute left-0 top-2 w-7 h-1 bg-white rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 top-3" : ""
            }`}
          ></span>
          <span
            className={`absolute left-0 top-5 w-7 h-1 bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          ></span>
          <span
            className={`absolute left-0 top-8 w-7 h-1 bg-white rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 top-3" : ""
            }`}
          ></span>
        </span>
      </button>
      {/* Menú desplegable tipo cascada desde la derecha */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="bg-black/40 w-full h-full absolute inset-0"
            onClick={() => setMenuOpen(false)}
          />
          <div className="w-72 h-full bg-slate-900 shadow-2xl flex flex-col p-8 space-y-6 relative animate-slide-in-right rounded-l-2xl">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
                         <Link
               href="/servicios"
               className="block text-lg text-slate-300 hover:text-blue-400 transition-colors mt-12"
               onClick={() => setMenuOpen(false)}
             >
               Servicios
             </Link>
            <a
              href="#about"
              className="block text-lg text-slate-300 hover:text-blue-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Equipo
            </a>
                         <Link
               href="/proyectos"
               className="block text-lg text-slate-300 hover:text-blue-400 transition-colors"
               onClick={() => setMenuOpen(false)}
             >
               Portafolio
             </Link>
            <a
              href="#contact"
              className="block text-lg text-slate-300 hover:text-blue-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </a>
            <Button asChild variant="gradient" className="mt-4 w-full">
              <Link href="/guia-proyecto" onClick={() => setMenuOpen(false)}>
                Comenzar
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full h-auto md:h-screen min-h-[520px] sm:min-h-[600px] px-4 bg-slate-900 relative overflow-hidden flex items-center justify-center">
        <Image
          src="/logos/edificios-ciudad-de-noche_1280x720_xtrafondos.com.jpg"
          alt="Edificios ciudad de noche"
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
        />
        <div className="container mx-auto text-center relative z-10 flex flex-col items-center justify-center h-full pt-20 pb-16 md:pt-0 md:pb-0">
                      <div
              className={`transition-all duration-1500 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 mb-6">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                Desarrollo a medida
              </div>
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-slate-700 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Code2 className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-6 sm:mb-8 drop-shadow-lg">
                <span className="bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
                  NovaSite
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-100 mb-3 sm:mb-4 font-semibold drop-shadow">
                Desarrollo de Software
              </p>
              <p className="text-base sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-8 sm:mb-10 drop-shadow px-2">
                Transformamos tus ideas en soluciones digitales innovadoras.
                Desarrollo web profesional, e-commerce y aplicaciones
                personalizadas.
              </p>
            </div>
            <div
              className={`flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 transition-all duration-1500 ease-out delay-300 ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {techIcons.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg border-2 border-slate-400/60 bg-slate-800/60 transition-all duration-500 shadow-md rounded-xl overflow-hidden relative group min-w-[96px] sm:min-w-[120px] min-h-12`}
                >
                  <span
                    className={
                      `block transition-all duration-500 ease-in-out text-center text-sm sm:text-base md:text-lg font-semibold text-blue-400 ` +
                      (techFade[index]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-4 scale-90")
                    }
                    style={{ letterSpacing: 1 }}
                  >
                    {techLabels[index]}
                  </span>
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center transition-all duration-1500 ease-out delay-500">
                             <Button
                 asChild
                 size="xl"
                 variant="gradient"
                 className="group relative overflow-hidden rounded-full cursor-pointer text-base sm:text-xl md:text-2xl px-8 sm:px-12 font-bold focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
               >
                 <Link
                   href="/guia-proyecto"
                   aria-label="Guía para comenzar un proyecto en NovaSite"
                 >
                   Comenzar Proyecto
                   <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
                 </Link>
               </Button>
               <Button
                 asChild
                 size="xl"
                 variant="outlineGlow"
                 className="group relative overflow-hidden rounded-full cursor-pointer text-base sm:text-xl md:text-2xl px-8 sm:px-12 font-bold focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
               >
                 <Link
                   href="/proyectos"
                   aria-label="Ver todos los proyectos de NovaSite"
                 >
                   Ver Portafolio
                 </Link>
               </Button>
            </div>
          </div>
        </div>
      </section>

             {/* Services Section */}
       <section
         id="services"
         ref={servicesRef}
         className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ease-out ${
           servicesVisible
             ? "opacity-100 translate-y-0"
             : "opacity-0 translate-y-8"
         }`}
       >
                 <div className="container mx-auto">
           <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
             servicesVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-6"
           }`}>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
               Nuestros Servicios
             </h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               Ofrecemos soluciones completas de desarrollo web adaptadas a las
               necesidades de tu negocio
             </p>
           </div>

                     <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ease-out delay-300 ${
             servicesVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-8"
           }`}>
             {services.map((service, index) => (
                               <Card
                  key={index}
                  tabIndex={0}
                  className={`relative overflow-hidden group cursor-pointer transition-all duration-500 border-2 border-blue-500/30 shadow-lg bg-slate-700 hover:bg-slate-600 hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-400/60 focus-within:border-blue-400/80 rounded-xl ${
                    servicesVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`
                  }}
                >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
                  }}
                />
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-slate-500 group-hover:to-blue-400 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-slate-100">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-slate-300">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

             {/* About Team Section */}
       <section
         id="about"
         ref={teamRef}
         className={`py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden transition-all duration-1000 ease-out ${
           teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
         }`}
       >
        <Image
          src="/logos/ciudad-ciencia-ficcion-arte-digital_1280x720_xtrafondos.com.jpg"
          alt="Ciudad ciencia ficción"
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
          style={{ objectPosition: "center" }}
        />
                 <div className="container mx-auto relative z-10">
           <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
             teamVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-6"
           }`}>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
               Nuestro Equipo
             </h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               Profesionales apasionados por la tecnología y comprometidos con la
               excelencia
             </p>
           </div>

                     <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 px-4 sm:px-6 transition-all duration-1000 ease-out delay-300 ${
             teamVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-8"
           }`}>
             {team.map((member, index) => (
              <div 
                key={index} 
                className="group perspective-1000 w-full h-full"
                onMouseMove={(e) => {
                  // Actualizar la posición del brillo basado en la posición del mouse
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              >
                <div className="relative w-full h-full min-h-[500px] md:min-h-[600px] transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Frente de la tarjeta */}
                  <div className="absolute inset-0 backface-hidden w-full h-full">
                                         <Card
                       tabIndex={0}
                       className="relative overflow-hidden text-center h-full border-2 border-blue-500/30 shadow-xl bg-slate-700 p-6 sm:p-8 flex flex-col justify-center rounded-xl hover:border-blue-400/60 focus-within:border-blue-400/80 transition-all-600 card-glow"
                     >
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
                        }}
                      />
                      <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto mb-6 overflow-hidden border-2 border-gradient-to-r from-blue-600 to-violet-600 shadow-lg flex items-center justify-center rounded-full transform transition-transform-600 group-hover:scale-110">
                        <Image
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                          decoding="async"
                          style={{ imageRendering: "auto" }}
                        />
                      </div>
                      <CardTitle className="text-2xl text-slate-100 mb-2 text-balance break-words leading-tight">
                        {member.name}
                      </CardTitle>
                      <Badge className="bg-gradient-to-r from-slate-600 to-blue-500 text-white text-sm md:text-base py-1.5 md:py-2 px-3 md:px-4 mb-4 whitespace-normal break-words">
                        {member.role}
                      </Badge>
                      <CardDescription className="text-slate-300 text-base sm:text-lg leading-snug">
                        {member.description}
                      </CardDescription>
                      <div className="mt-6 text-slate-400 text-sm hidden md:flex flex-col items-center">
                        <p className="mb-2">Pasa el mouse para ver más información</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div 
                              key={i} 
                              className="w-2 h-2 rounded-full bg-blue-500 opacity-20 group-hover:opacity-100 transition-all duration-300"
                              style={{
                                transitionDelay: `${i * 0.1}s`,
                                transform: 'translateY(0)'
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Detalles en móvil: colapsable */}
                      <div className="md:hidden mt-4">
                        <button
                          className="inline-flex items-center text-sm font-medium text-blue-400 underline underline-offset-4 hover:text-blue-300 active:scale-[0.98] transition"
                          onClick={() =>
                            setOpenMember(openMember === index ? null : index)
                          }
                          aria-expanded={openMember === index}
                          aria-controls={`member-details-${index}`}
                        >
                          {openMember === index
                            ? "Ocultar detalles"
                            : "Ver más"}
                        </button>
                        {openMember === index && (
                                                     <div
                                                     className="mt-4 rounded-lg bg-slate-800/70 border-2 border-blue-500/30 p-4 transition-all duration-300 text-left"
                             id={`member-details-${index}`}
                           >
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-blue-400 font-semibold mb-1 text-sm">
                                  Experiencia
                                </h4>
                                <p className="text-slate-300 text-sm leading-6">
                                  {member.experience}
                                </p>
                              </div>
                              <div className="border-t border-slate-700/60 pt-3">
                                <h4 className="text-blue-400 font-semibold mb-1 text-sm">
                                  Educación
                                </h4>
                                <p className="text-slate-300 text-sm leading-6">
                                  {member.education}
                                </p>
                              </div>
                              <div className="border-t border-slate-700/60 pt-3">
                                <h4 className="text-blue-400 font-semibold mb-2 text-sm">
                                  Tecnologías
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {member.technologies.map(
                                    (tech, techIndex) => (
                                      <Badge
                                        key={techIndex}
                                        variant="outline"
                                        className="border-blue-500 text-blue-400 bg-slate-600/80 text-[11px] px-2 py-1"
                                      >
                                        {tech}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Parte trasera de la tarjeta */}
                                     <div className="absolute inset-0 backface-hidden w-full h-full rotate-y-180">
                     <Card className="relative overflow-hidden text-center h-full border-2 border-blue-500/30 shadow-xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 flex flex-col justify-start rounded-xl hover:border-blue-400/60 focus-within:border-blue-400/80 transition-all-600 card-glow">
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
                        }}
                      />
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 leading-tight">
                          {member.name}
                        </h3>
                        <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm md:text-base py-1.5 md:py-2 px-3 md:px-4 mb-2 whitespace-normal break-words">
                          {member.role}
                        </Badge>
                      </div>

                      <div className="space-y-3 text-left">
                        <div>
                          <h4 className="text-blue-400 font-semibold mb-1 text-base md:text-lg leading-snug">
                            Experiencia
                          </h4>
                          <p className="text-slate-300 text-sm md:text-base leading-6">{member.experience}</p>
                        </div>

                        <div>
                          <h4 className="text-blue-400 font-semibold mb-1 text-base md:text-lg leading-snug">
                            Educación
                          </h4>
                          <p className="text-slate-300 text-sm md:text-base leading-6">{member.education}</p>
                        </div>

                        <div>
                          <h4 className="text-blue-400 font-semibold mb-1 text-base md:text-lg leading-snug">
                            Tecnologías
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="border-blue-500 text-blue-400 bg-slate-600 text-[11px] md:text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-blue-400 font-semibold mb-1 text-base md:text-lg leading-snug">
                            Logros
                          </h4>
                          <ul className="text-slate-300 text-xs md:text-sm space-y-1.5">
                            {member.achievements.map(
                              (achievement, achievementIndex) => (
                                <li
                                  key={achievementIndex}
                                  className="flex items-center"
                                >
                                  <Star className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                                  {achievement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-slate-600/70">
                          <div className="flex justify-center space-x-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                              onClick={() => {
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                  contactSection.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              }}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* Portafolio Section */}
       <section
         id="portafolio"
         ref={portfolioRef}
         className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ease-out ${
           portfolioVisible
             ? "opacity-100 translate-y-0"
             : "opacity-0 translate-y-8"
         }`}
       >
                 <div className="container mx-auto">
           <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
             portfolioVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-6"
           }`}>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
               Proyectos Destacados
             </h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               Algunos de nuestros trabajos más recientes que demuestran nuestra
               experiencia
             </p>
           </div>

          <div
            ref={portfolioAutoRef}
            className="relative max-w-4xl mx-auto focus:outline-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            tabIndex={0}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Proyectos destacados"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevProject();
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                nextProject();
              }
            }}
            onTouchStart={(e) =>
              setTouchStartX(e.changedTouches[0]?.clientX ?? null)
            }
            onTouchEnd={(e) => {
              if (touchStartX == null) return;
              const dx = e.changedTouches[0]?.clientX - touchStartX;
              if (Math.abs(dx) > 40) {
                if (dx > 0) prevProject();
                else nextProject();
              }
              setTouchStartX(null);
            }}
          >
                         <Card
               className={`group relative overflow-hidden shadow-xl border-2 border-blue-500/30 bg-slate-700 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.35)] ${
                 projectTransition
                   ? transitionDir === "next"
                     ? "opacity-0 translate-x-6 scale-95"
                     : "opacity-0 -translate-x-6 scale-95"
                   : "opacity-100 translate-x-0 scale-100"
               } `}
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLElement;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.removeProperty("--x");
                el.style.removeProperty("--y");
              }}
            >
              {/* Glow radial that follows mouse */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.25), transparent 40%)",
                }}
              />
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative w-full h-64 md:h-full min-h-[260px] rounded-xl overflow-hidden ring-1 ring-slate-600/50 shadow-lg bg-slate-900">
                    <Image
                      src={projects[currentProject].image}
                      alt={projects[currentProject].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentProject === 0}
                      className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-slate-100">
                    {projects[currentProject].title}
                  </h3>
                  <p className="text-slate-300 mb-6">
                    {projects[currentProject].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[currentProject].tech.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-slate-500 text-blue-400 bg-slate-600"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                                     <Button
                     asChild
                     variant="gradient"
                     className="group relative overflow-hidden rounded-full px-5 py-3 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                   >
                     <Link
                       href="/proyectos"
                       aria-label={`Ver proyecto ${projects[currentProject].title}`}
                     >
                       Ver Proyecto
                       <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                     </Link>
                   </Button>
                </div>
              </div>
            </Card>

            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-600 shadow-lg hover:bg-slate-500 text-white border-slate-500"
              onClick={prevProject}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-600 shadow-lg hover:bg-slate-500 text-white border-slate-500"
              onClick={nextProject}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div
            className="flex justify-center mt-8 space-x-2"
            role="tablist"
            aria-label="Indicadores de carrusel"
          >
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "bg-gradient-to-r from-slate-600 to-blue-500"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
                onClick={() => setCurrentProject(index)}
                role="tab"
                aria-selected={index === currentProject}
                aria-current={index === currentProject ? "true" : undefined}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>

          {/* Botón para ver todos los proyectos */}
          <div className="flex justify-center mt-10">
            <Button
              asChild
              size="xl"
              variant="gradient"
              className="relative overflow-hidden rounded-full px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
            >
              <Link
                href="/proyectos"
                aria-label="Ver todos los proyectos de NovaSite"
                className="flex items-center"
              >
                Ver todos los proyectos
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

                           {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          className={`py-16 px-4 relative overflow-hidden transition-all duration-1000 ease-out ${
            testimonialsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
         <Image
           src="/logos/chica-sola-en-la-ciudad-ilustracion_1280x720_xtrafondos.com.jpg"
           alt="Chica sola en la ciudad"
           fill
           sizes="100vw"
           className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none z-0"
           style={{ objectPosition: "center" }}
         />
                   <div className="container mx-auto relative z-10">
           <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
             testimonialsVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-6"
           }`}>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
               Qué Dicen Nuestros Clientes
             </h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               Valoraciones reales de clientes satisfechos con nuestros proyectos
             </p>
           </div>

                     <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-300 ${
             testimonialsVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-8"
           }`}>
             {testimonials.map((testimonial, index) => (
                                                                                                                         <Card
                    key={testimonial.id}
                    tabIndex={0}
                    className={`relative overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border-2 border-blue-500/30 shadow-lg bg-slate-800/95 backdrop-blur-md rounded-xl hover:border-blue-400/60 focus-within:border-blue-400/80 ${
                      testimonialsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: `${400 + index * 150}ms`
                    }}
                  >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
                  }}
                />
                <CardHeader className="pb-4">
                  {/* Proyecto relacionado */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs px-3 py-1">
                      {testimonial.projectTitle}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comentario */}
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    <q>{testimonial.comment}</q>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t border-slate-600/50 pt-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-100 text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {testimonial.role} en {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

             {/* Contact Section */}
       <section
         id="contact"
         ref={contactRef}
         className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ease-out ${
           contactVisible
             ? "opacity-100 translate-y-0"
             : "opacity-0 translate-y-8"
         }`}
       >
                 <div className="container mx-auto">
           <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
             contactVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-6"
           }`}>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
               ¿Listo para Comenzar?
             </h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
               Contáctanos hoy y convirtamos tu idea en realidad digital
             </p>
           </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-100">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Email</p>
                    <p className="text-slate-300">novasite@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Teléfono</p>
                    <p className="text-slate-300">+506 8304-7436</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Ubicación</p>
                    <p className="text-slate-300">Costa Rica, Alajuela</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-slate-100">
                  Síguenos
                </h4>
                <div className="flex space-x-4">
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="hover:bg-slate-700 hover:border-slate-500 bg-slate-600 text-white border-slate-500"
                  >
                    <a
                      href="https://github.com/novasitesc"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visitar nuestro GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="hover:bg-slate-700 hover:border-slate-500 bg-slate-600 text-white border-slate-500"
                  >
                    <a
                      href="https://www.instagram.com/novasitesc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visitar nuestro Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="hover:bg-slate-700 hover:border-slate-500 bg-slate-600 text-white border-slate-500"
                  >
                    <a
                      href="https://x.com/nova_sitesc"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visitar nuestro X (Twitter)"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

                         <Card className="shadow-xl border-2 border-blue-500/30 bg-slate-700 hover:border-blue-400/60">
              <CardHeader>
                <CardTitle className="text-white">Envíanos un Mensaje</CardTitle>
                <CardDescription className="text-white"> 
                  Cuéntanos sobre tu proyecto y te contactaremos pronto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-200">
                        Nombre
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-200">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-200">
                      Asunto
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-200">
                      Mensaje
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos sobre tu proyecto..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Mensaje de estado */}
                  {submitStatus === "success" && (
                    <div className="p-3 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                      ¡Mensaje enviado! Se abrirá tu cliente de email para
                      completar el envío.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-3 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      Hubo un error al enviar el mensaje. Por favor, intenta de
                      nuevo.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden rounded-full w-full sm:w-auto px-6 py-3 cursor-pointer bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-600 hover:to-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="xl"
              variant="glow"
              className="rounded-full cursor-pointer"
            >
              Volver al inicio
              <ArrowUp className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NovaSite</span>
              </div>
              <p className="text-slate-400 mb-4">
                Transformando ideas en soluciones digitales innovadoras.
              </p>
                             <div className="flex space-x-4">
                 <Button
                   asChild
                   size="icon"
                   variant="ghost"
                   className="text-slate-400 hover:text-white hover:bg-slate-800"
                 >
                   <a
                     href="https://github.com/novasitesc"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Visitar nuestro GitHub"
                   >
                     <Github className="w-5 h-5" />
                   </a>
                 </Button>
                 <Button
                   asChild
                   size="icon"
                   variant="ghost"
                   className="text-slate-400 hover:text-white hover:bg-slate-800"
                 >
                   <a
                     href="https://x.com/nova_sitesc"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Visitar nuestro X (Twitter)"
                   >
                     <Twitter className="w-5 h-5" />
                   </a>
                 </Button>
               </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
                             <ul className="space-y-2 text-slate-400">
                 <li>
                   <Link href="/servicios" className="hover:text-white transition-colors">
                     Desarrollo Web
                   </Link>
                 </li>
                 <li>
                   <Link href="/servicios" className="hover:text-white transition-colors">
                     E-commerce
                   </Link>
                 </li>
                 <li>
                   <Link href="/servicios" className="hover:text-white transition-colors">
                     Mantenimiento
                   </Link>
                 </li>
                 <li>
                   <Link href="/servicios" className="hover:text-white transition-colors">
                     Backend
                   </Link>
                 </li>
               </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="hover:text-white transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/proyectos"
                    className="hover:text-white transition-colors"
                  >
                    Portafolio
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-400">
                <li>novasitesc@gmail.com</li>
                <li>+(506) 8304-7436</li>
                <li>Costa Rica, Alajuela</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 NovaSite. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Agrega la animación CSS para el menú lateral */}
      <style jsx global>{`
        @keyframes slideInRight {
          0% {
            transform: translateX(100%);
            opacity: 0.5;
            filter: blur(8px);
          }
          80% {
            filter: blur(2px);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hamburger span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 2, 0.6, 1);
        }
        /* Animación para toasts (slide + fade in) */
        @keyframes slideFadeIn {
          0% {
            transform: translateY(-8px);
            opacity: 0;
            filter: blur(6px);
          }
          60% {
            transform: translateY(2px);
            opacity: 1;
            filter: blur(1px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-slide-fade-in {
          animation: slideFadeIn 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
              `}</style>
       {/* Estilos para el efecto 3D de las tarjetas del equipo */}
       <style jsx global>{`
         .perspective-1000 {
           perspective: 1000px;
         }

         .transform-style-preserve-3d {
           transform-style: preserve-3d;
         }

         .backface-hidden {
           backface-visibility: hidden;
         }

         .rotate-x-180 {
           transform: rotateX(180deg);
         }

         /* Animación suave para el hover vertical */
         .group:hover .group-hover\\:rotate-x-180 {
           transform: rotateX(180deg);
         }

         /* Efecto de sombra mejorado para las tarjetas */
         .group:hover .shadow-xl {
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
         }
         /* Avatar cuadrado para el equipo */
         .square-avatar {
           border-radius: 1rem;
           background: linear-gradient(135deg, #1e293b 60%, #2563eb 100%);
         }
       `}</style>
    </div>
  );
}
