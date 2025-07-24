"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
  Linkedin,
  Twitter,
  ArrowRight,
} from "lucide-react"

const techIcons = [
  { name: "HTML", color: "text-orange-500" },
  { name: "CSS", color: "text-blue-500" },
  { name: "JavaScript", color: "text-yellow-500" },
  { name: "React", color: "text-cyan-500" },
  { name: "Python", color: "text-green-500" },
]

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y responsivas con las últimas tecnologías",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Tiendas online completas con sistemas de pago y gestión de inventario",
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
]

const team = [
  {
    name: "Gabriel",
    role: "Software Developer",
    description: "Experiencia en desarrolo de software y desarrollo de aplicaciones",
    avatar: "/logos/FotoGabriel.jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Software",
    technologies: ["React", "Node.js", "Python", "MongoDB", "AWS"],
    education: "Ingeniería en Sistemas",
    achievements: ["20+ proyectos completados", "Especialista en Web Development", "Desarrollador Full Stack"],
    email: "gabriel@novasite.dev",
    linkedin: "linkedin.com/in/gabriel-novasite"
  },
  {
    name: "Anthony (Noni)",
    role: "Full Stack Developer",
    description: "Desarrollador full stack con experiencia en desarrollo de aplicaciones web y móviles",
    avatar: "/logos/FotoAnthony .jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Softwarea",
    technologies: ["React", "Vue.js", "React Native", "Firebase", "TypeScript"],
    education: "Ingeniería Computación",
    achievements: ["20+ aplicaciones móviles y web", "Especialista en Backend Development", "Líder técnico"],
    email: "anthony@novasite.dev",
    linkedin: "linkedin.com/in/anthony-novasite"
  },
  {
    name: "Alejandro (Pecho)",
    role: "Backend Engineer",
    description: "Ingeniero backend enfocado en arquitecturas escalables y seguras",
    avatar: "/logos/FotoAlejandro.jpg",
    // Información profesional para la parte trasera
    experience: "Experiencia en Desarrollo de Software",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
    education: "Ingeniería en Computación",
    achievements: ["Arquitecto de sistemas", "Web Developer", "Backend Developer"],
    email: "alejandro@novasite.dev",
    linkedin: "linkedin.com/in/alejandro-novasite"
  },
]

const projects = [
  {
    title: "Market-Place",
    description: "Tienda online completa con carrito de compras y pasarela de pagos",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Software de Asistencia",
    description: "Panel de control empresarial para el registro de asistencia de los empleados y pagos",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["Vue.js", "Python", "PostgreSQL"],
  },
  {
    title: "Restaurant App",
    description: "Aplicación de reservas y pedidos para restaurantes",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["React Native", "Firebase", "Stripe"],
  },
]

const testimonials = [
  {
    name: "María González",
    company: "TechStart Solutions",
    content:
      "NovaSite transformó completamente nuestra presencia digital. El equipo es profesional y entrega resultados excepcionales.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    company: "E-Shop Plus",
    content:
      "Nuestra tienda online ha aumentado las ventas un 300% desde que trabajamos con NovaSite. Altamente recomendados.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    company: "Creative Agency",
    content:
      "El diseño y la funcionalidad de nuestro sitio web superaron todas nuestras expectativas. Excelente trabajo.",
    rating: 5,
  },
]

// Hook para animar aparición al hacer scroll y resetear cuando sale del viewport
function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return [ref, visible] as const
}

export default function LandingPage() {
  const [currentProject, setCurrentProject] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  // Estado para animar la aparición del hero al cargar la página
  const [heroVisible, setHeroVisible] = useState(false)
  // Nuevo: Estado para animación de transición de proyectos
  const [projectTransition, setProjectTransition] = useState(false)

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 200)
  }, [])

  // Elimina el useEffect de avance automático
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProjectTransition(true)
  //     setTimeout(() => {
  //       setCurrentProject((prev) => (prev + 1) % projects.length)
  //       setProjectTransition(false)
  //     }, 400) // Duración de la animación
  //   }, 3000)
  //   return () => clearInterval(interval)
  // }, [])

  const nextProject = () => {
    setProjectTransition(true)
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
      setProjectTransition(false)
    }, 400)
  }

  const prevProject = () => {
    setProjectTransition(true)
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
      setProjectTransition(false)
    }, 400)
  }

  // En cada sección principal:
  // Servicios
  const [servicesRef, servicesVisible] = useScrollReveal<HTMLElement>()
  // Equipo
  const [teamRef, teamVisible] = useScrollReveal<HTMLElement>()
  // Portafolio
  const [portfolioRef, portfolioVisible] = useScrollReveal<HTMLElement>()
  // Testimonios
  const [testimonialsRef, testimonialsVisible] = useScrollReveal<HTMLElement>()
  // Contacto
  const [contactRef, contactVisible] = useScrollReveal<HTMLElement>()

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
    "Crecimiento Digital"
  ]
  // Estado para los nombres actuales de los cuadros
  const [techLabels, setTechLabels] = useState(Array(techIcons.length).fill(randomIdeas[0]))
  // Estado para animación de los cuadros
  const [techFade, setTechFade] = useState(Array(techIcons.length).fill(true))
  useEffect(() => {
    const interval = setInterval(() => {
      setTechFade(Array(techIcons.length).fill(false))
      setTimeout(() => {
        setTechLabels(labels => labels.map(() => randomIdeas[Math.floor(Math.random() * randomIdeas.length)]))
        setTechFade(Array(techIcons.length).fill(true))
      }, 350)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Botón flotante de menú en la parte superior derecha */}
      <button
        className={`fixed top-8 right-8 z-50 shadow-lg focus:outline-none transition-all duration-200 cursor-pointer bg-transparent p-0 border-0 ${menuOpen ? 'scale-110 ring-4 ring-blue-400/40 shadow-2xl' : ''}`}
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menú"
        style={{ outline: 'none' }}
      >
        <span className={`block w-7 h-7 relative`}>
          <span className={`absolute left-0 top-2 w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 top-3' : ''}`}></span>
          <span className={`absolute left-0 top-5 w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
          <span className={`absolute left-0 top-8 w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 top-3' : ''}`}></span>
        </span>
      </button>
      {/* Menú desplegable tipo cascada desde la derecha */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-black/40 w-full h-full absolute inset-0" onClick={() => setMenuOpen(false)} />
          <div className="w-72 h-full bg-slate-900 shadow-2xl flex flex-col p-8 space-y-6 relative animate-slide-in-right rounded-l-2xl">
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a href="#services" className="block text-lg text-slate-300 hover:text-blue-400 transition-colors mt-12" onClick={() => setMenuOpen(false)}>
              Servicios
            </a>
            <a href="#about" className="block text-lg text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>
              Equipo
            </a>
            <a href="#portafolio" className="block text-lg text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>
              Portafolio
            </a>
            <a href="#contact" className="block text-lg text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>
              Contacto
            </a>
            <Button className="mt-4 w-full bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-600 hover:to-blue-500">
              Comenzar
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full h-screen min-h-[600px] px-4 bg-slate-900 relative overflow-hidden flex items-center justify-center">
        <img
          src="/logos/edificios-ciudad-de-noche_1280x720_xtrafondos.com.jpg"
          alt="Edificios ciudad de noche"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
        />
        <div className="container mx-auto text-center relative z-10 flex flex-col items-center justify-center h-full">
          <div
            className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
          >
            <div className="mb-10">
              <div className="w-32 h-32 bg-gradient-to-r from-slate-700 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Code2 className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold mb-8 drop-shadow-lg">
                <span className="bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
                  NovaSite
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-100 mb-4 font-semibold drop-shadow">
                Desarrollo de Software
              </p>
              <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 drop-shadow">
                Transformamos tus ideas en soluciones digitales innovadoras. Desarrollo web profesional, e-commerce y aplicaciones personalizadas.
              </p>
            </div>
            <div className={`flex flex-wrap justify-center gap-6 mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {techIcons.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-6 py-3 text-lg border-2 border-slate-400/60 bg-slate-800/60 transition-all duration-500 shadow-md rounded-xl overflow-hidden relative group`}
                  style={{ minWidth: 120, minHeight: 48 }}
                >
                  <span
                    className={
                      `block transition-all duration-500 ease-in-out text-center text-lg font-semibold text-blue-400 ` +
                      (techFade[index] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90')
                    }
                    style={{ letterSpacing: 1 }}
                  >
                    {techLabels[index]}
                  </span>
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="hero-btn text-2xl px-12 py-5 font-bold bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-600 hover:to-blue-500 shadow-xl"
              >
                Comenzar Proyecto
                <ArrowRight className="ml-3 w-7 h-7" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-btn hero-btn-outline text-2xl px-12 py-5 border-slate-400/60 hover:bg-slate-800 bg-transparent text-slate-100 font-bold shadow-xl"
              >
                Ver Portafolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              Nuestros Servicios
                </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ofrecemos soluciones completas de desarrollo web adaptadas a las necesidades de tu negocio
                </p>
              </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-slate-700 hover:bg-slate-600"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-slate-500 group-hover:to-blue-400 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-slate-100">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-slate-300">{service.description}</CardDescription>
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
        className={`py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden transition-all duration-1000 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <img
          src="/logos/ciudad-ciencia-ficcion-arte-digital_1280x720_xtrafondos.com.jpg"
          alt="Ciudad ciencia ficción"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
          style={{ objectPosition: 'center' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Profesionales apasionados por la tecnología y comprometidos con la excelencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="group perspective-1000">
                <div className="relative w-full h-[500px] transition-all duration-700 transform-style-preserve-3d group-hover:rotate-x-180">
                  {/* Frente de la tarjeta */}
                  <div className="absolute inset-0 backface-hidden">
                    <Card className="text-center h-full border-0 shadow-xl bg-slate-700 p-8 flex flex-col justify-center">
                      <div className="w-44 h-44 mx-auto mb-6 overflow-hidden border-2 border-gradient-to-r from-blue-600 to-violet-600 shadow-lg flex items-center justify-center square-avatar">
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-xl"
                          loading="lazy"
                          decoding="async"
                          style={{ imageRendering: 'auto' }}
                        />
                      </div>
                      <CardTitle className="text-2xl text-slate-100 mb-2">{member.name}</CardTitle>
                      <Badge className="bg-gradient-to-r from-slate-600 to-blue-500 text-white text-base py-2 px-4 mb-4">{member.role}</Badge>
                      <CardDescription className="text-slate-300 text-lg">{member.description}</CardDescription>
                      <div className="mt-6 text-slate-400 text-sm">
                        <p>Pasa el mouse para ver más información</p>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Parte trasera de la tarjeta */}
                  <div className="absolute inset-0 backface-hidden rotate-x-180">
                    <Card className="text-center h-full border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-800 p-8 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-100 mb-4">{member.name}</h3>
                        <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-base py-2 px-4 mb-4">{member.role}</Badge>
                      </div>
                      
                      <div className="space-y-4 text-left">
                        <div>
                          <h4 className="text-blue-400 font-semibold mb-2">Experiencia</h4>
                          <p className="text-slate-300">{member.experience}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-blue-400 font-semibold mb-2">Educación</h4>
                          <p className="text-slate-300">{member.education}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-blue-400 font-semibold mb-2">Tecnologías</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="border-blue-500 text-blue-400 bg-slate-600 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-blue-400 font-semibold mb-2">Logros</h4>
                          <ul className="text-slate-300 text-sm space-y-1">
                            {member.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-600">
                          <div className="flex justify-center space-x-4">
                            <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
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
        className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              Proyectos Destacados
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Algunos de nuestros trabajos más recientes que demuestran nuestra experiencia
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className={`overflow-hidden shadow-xl border-0 bg-slate-700 transition-all duration-500 ${projectTransition ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={projects[currentProject].image || "/placeholder.svg"}
                    alt={projects[currentProject].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-slate-100">{projects[currentProject].title}</h3>
                  <p className="text-slate-300 mb-6">{projects[currentProject].description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[currentProject].tech.map((tech, index) => (
                      <Badge key={index} variant="outline" className="border-slate-500 text-blue-400 bg-slate-600">
                        {tech}
                      </Badge>
                    ))}
              </div>
                  <Button className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-600 hover:to-blue-500">
                    Ver Proyecto
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-600 shadow-lg hover:bg-slate-500 text-white border-slate-500"
              onClick={prevProject}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-600 shadow-lg hover:bg-slate-500 text-white border-slate-500"
              onClick={nextProject}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            </div>

          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "bg-gradient-to-r from-slate-600 to-blue-500"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
                onClick={() => setCurrentProject(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className={`py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 transition-all duration-1000 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <img
          src="/logos/chica-sola-en-la-ciudad-ilustracion_1280x720_xtrafondos.com.jpg"
          alt="Chica sola en la ciudad"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
          style={{ objectPosition: 'center' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-slate-700"
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    {testimonial.content}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-slate-100">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.company}</p>
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
        className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              ¿Listo para Comenzar?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Contáctanos hoy y convirtamos tu idea en realidad digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-100">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Email</p>
                    <p className="text-slate-300">contacto@novasite.dev</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Teléfono</p>
                    <p className="text-slate-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Ubicación</p>
                    <p className="text-slate-300">Ciudad de México, México</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-slate-100">Síguenos</h4>
                <div className="flex space-x-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-slate-700 hover:border-slate-500 bg-slate-600 text-white border-slate-500"
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-slate-700 hover:border-slate-500 bg-slate-600 text-white border-slate-500"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-slate-700 hover:border-slate-500 bg-slate-600 text-white border-slate-500"
                  >
                    <Twitter className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0 bg-slate-700">
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
                <CardDescription>Cuéntanos sobre tu proyecto y te contactaremos pronto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-200">Nombre</label>
                    <Input placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-200">Email</label>
                    <Input type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-200">Asunto</label>
                  <Input placeholder="¿En qué podemos ayudarte?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-200">Mensaje</label>
                  <Textarea placeholder="Cuéntanos sobre tu proyecto..." className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-600 hover:to-blue-500">
                  Enviar Mensaje
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NovaSite</span>
              </div>
              <p className="text-slate-400 mb-4">Transformando ideas en soluciones digitales innovadoras.</p>
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Github className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Desarrollo Web
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    E-commerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mantenimiento
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Backend
                  </a>
                </li>
              </ul>
              </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portafolio
                  </a>
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
                <li>contacto@novasite.dev</li>
                <li>+1 (555) 123-4567</li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 NovaSite. Todos los derechos reservados.</p>
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
          animation: slideInRight 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .hamburger span { position: absolute; left: 0; width: 100%; height: 4px; background: white; border-radius: 2px; transition: all 0.3s cubic-bezier(.4,2,.6,1); }
      `}</style>
      {/* Estilos globales para los botones del hero */}
      <style jsx global>{`
        .hero-btn {
          cursor: pointer !important;
          transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1), background 0.25s cubic-bezier(.4,2,.6,1), color 0.18s, border-color 0.18s;
          will-change: transform, box-shadow, background, color, border-color;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,123,255,0.10);
        }
        .hero-btn:hover {
          transform: scale(1.07) translateY(-2px);
          box-shadow: 0 8px 32px 0 rgba(0,123,255,0.18), 0 2px 8px 0 rgba(0,0,0,0.12);
          background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%) !important;
          color: #fff !important;
          border-color: #2563eb !important;
        }
        .hero-btn:active {
          animation: hero-btn-bounce 0.32s cubic-bezier(.34,1.56,.64,1) both;
          box-shadow: 0 16px 48px 0 rgba(0,123,255,0.32), 0 6px 20px 0 rgba(0,0,0,0.14);
          background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%) !important;
          color: #fff !important;
          border-color: #2563eb !important;
        }
        .hero-btn-outline:hover {
          background: rgba(30,64,175,0.16) !important;
          color: #fff !important;
          border-color: #2563eb !important;
        }
        .hero-btn-outline:active {
          animation: hero-btn-bounce 0.32s cubic-bezier(.34,1.56,.64,1) both;
          background: rgba(30,64,175,0.22) !important;
          color: #fff !important;
          border-color: #2563eb !important;
          box-shadow: 0 16px 48px 0 rgba(0,123,255,0.22), 0 6px 20px 0 rgba(0,0,0,0.12);
        }
        @keyframes hero-btn-bounce {
          0% { transform: scale(1) translateY(0); }
          40% { transform: scale(1.18, 0.92) translateY(-6px); }
          60% { transform: scale(0.96, 1.08) translateY(2px); }
          80% { transform: scale(1.04, 0.98) translateY(-2px); }
          100% { transform: scale(1.10) translateY(-4px); }
        }
        
        /* Estilos para el efecto 3D de las tarjetas del equipo */
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
  )
}
