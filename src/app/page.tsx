import {
  Code,
  Smartphone,
  Globe,
  Database,
  Users,
  Target,
  Award,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-900" />
            <span className="text-xl font-bold text-gray-900">NovaSite</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#inicio"
              className="text-sm font-medium hover:text-blue-900 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="#sobre-nosotros"
              className="text-sm font-medium hover:text-blue-900 transition-colors"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="#servicios"
              className="text-sm font-medium hover:text-blue-900 transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="#portafolio"
              className="text-sm font-medium hover:text-blue-900 transition-colors"
            >
              Portafolio
            </Link>
            <Link
              href="#precios"
              className="text-sm font-medium hover:text-blue-900 transition-colors"
            >
              Precios
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium hover:text-blue-900 transition-colors"
            >
              Contacto
            </Link>
          </nav>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Cotizar Proyecto
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-slate-100"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  Desarrollo de Software Profesional
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transformamos tus ideas en
                  <span className="text-blue-900"> soluciones digitales</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Desarrollamos software personalizado, páginas web,
                  aplicaciones móviles y sistemas empresariales que impulsan el
                  crecimiento de tu negocio.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors">
                  Comenzar Proyecto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="border border-gray-300 hover:border-blue-900 text-gray-900 px-6 py-3 rounded-md font-medium transition-colors">
                  Ver Portafolio
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">
                    Proyectos Completados
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">
                    Satisfacción Cliente
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Soporte Técnico</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Desarrollo de Software"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="sobre-nosotros" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  Sobre Nosotros
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Expertos en desarrollo de software con más de 5 años de
                  experiencia
                </h2>
                <p className="text-lg text-gray-600">
                  Somos un equipo apasionado de desarrolladores, diseñadores y
                  estrategas digitales comprometidos con crear soluciones
                  tecnológicas innovadoras que impulsen el éxito de nuestros
                  clientes.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Equipo Experto
                    </div>
                    <div className="text-sm text-gray-600">
                      Desarrolladores certificados
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Enfoque Personalizado
                    </div>
                    <div className="text-sm text-gray-600">
                      Soluciones a medida
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Calidad Garantizada
                    </div>
                    <div className="text-sm text-gray-600">
                      Estándares internacionales
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Entrega Puntual
                    </div>
                    <div className="text-sm text-gray-600">
                      Cumplimos plazos
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Nuestro Equipo"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Soluciones tecnológicas completas para tu negocio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios de desarrollo de software
              para satisfacer todas tus necesidades digitales.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Globe className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Desarrollo Web
              </h3>
              <p className="text-gray-600">
                Sitios web modernos, responsivos y optimizados para SEO que
                convierten visitantes en clientes.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Smartphone className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Apps Móviles
              </h3>
              <p className="text-gray-600">
                Aplicaciones nativas e híbridas para iOS y Android con
                experiencia de usuario excepcional.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Code className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Software Empresarial
              </h3>
              <p className="text-gray-600">
                Sistemas personalizados para automatizar procesos y mejorar la
                eficiencia operativa.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <Database className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bases de Datos
              </h3>
              <p className="text-gray-600">
                Diseño e implementación de bases de datos robustas y escalables
                para tu información.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section id="portafolio" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Nuestro Portafolio
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Proyectos que nos enorgullecen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre algunos de nuestros proyectos más destacados y cómo hemos
              ayudado a empresas a alcanzar sus objetivos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="E-commerce Platform"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Plataforma E-commerce
                </h3>
                <p className="text-gray-600 mb-4">
                  Sistema completo de comercio electrónico con gestión de
                  inventario y pagos integrados.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    React
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    Node.js
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    MongoDB
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="Mobile Banking App"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  App Bancaria Móvil
                </h3>
                <p className="text-gray-600 mb-4">
                  Aplicación móvil segura para transacciones bancarias con
                  autenticación biométrica.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    React Native
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    Firebase
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    Stripe
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="CRM System"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sistema CRM
                </h3>
                <p className="text-gray-600 mb-4">
                  Plataforma de gestión de relaciones con clientes con análisis
                  avanzado y reportes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    Vue.js
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    Laravel
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    MySQL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Planes y Precios
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Planes flexibles para cada necesidad
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu proyecto y presupuesto.
              Todos incluyen soporte técnico completo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Básico
                </h3>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  $2,500
                </div>
                <p className="text-gray-600">Perfecto para pequeños negocios</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">
                    Sitio web responsivo (hasta 5 páginas)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Diseño personalizado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Optimización SEO básica</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Soporte 3 meses</span>
                </div>
              </div>
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-medium transition-colors">
                Elegir Plan
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Profesional
                </h3>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  $5,500
                </div>
                <p className="text-gray-600">
                  Ideal para empresas en crecimiento
                </p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Aplicación web completa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Base de datos integrada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Panel de administración</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Soporte 6 meses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Capacitación incluida</span>
                </div>
              </div>
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-medium transition-colors">
                Elegir Plan
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Empresarial
                </h3>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  $12,000
                </div>
                <p className="text-gray-600">
                  Solución completa para grandes empresas
                </p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Sistema empresarial completo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Aplicación móvil incluida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Integraciones API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Soporte 12 meses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">Mantenimiento incluido</span>
                </div>
              </div>
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-medium transition-colors">
                Elegir Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Contacto
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contáctanos hoy mismo y recibe una cotización personalizada para
              tu proyecto de desarrollo de software.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">contacto@novasite.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">Teléfono</div>
                    <div className="text-gray-600">+52 (55) 1234-5678</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-blue-900" />
                  <div>
                    <div className="font-semibold text-gray-900">Oficina</div>
                    <div className="text-gray-600">
                      Ciudad de México, México
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Horarios de Atención
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div>Lunes - Viernes: 9:00 AM - 6:00 PM</div>
                  <div>Sábados: 10:00 AM - 2:00 PM</div>
                  <div>Domingos: Cerrado</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Envíanos un mensaje
                </h3>
                <p className="text-gray-600">
                  Completa el formulario y nos pondremos en contacto contigo en
                  menos de 24 horas.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+52 (55) 1234-5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="proyecto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tipo de Proyecto
                  </label>
                  <input
                    id="proyecto"
                    type="text"
                    placeholder="Ej: Desarrollo web, App móvil, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    placeholder="Cuéntanos sobre tu proyecto..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-medium transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Resolvemos tus dudas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros
              servicios de desarrollo de software.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                ¿Cuánto tiempo toma desarrollar un proyecto?
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </summary>
              <div className="mt-4 text-gray-600">
                El tiempo de desarrollo varía según la complejidad del proyecto.
                Un sitio web básico puede tomar 2-4 semanas, mientras que una
                aplicación compleja puede requerir 3-6 meses. Siempre
                proporcionamos un cronograma detallado antes de comenzar.
              </div>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                ¿Ofrecen soporte después de la entrega?
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </summary>
              <div className="mt-4 text-gray-600">
                Sí, todos nuestros proyectos incluyen un período de soporte
                gratuito que varía según el plan elegido. También ofrecemos
                planes de mantenimiento extendido para garantizar el
                funcionamiento óptimo de tu software.
              </div>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                ¿Pueden trabajar con mi presupuesto limitado?
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </summary>
              <div className="mt-4 text-gray-600">
                Absolutamente. Ofrecemos soluciones flexibles y podemos adaptar
                el alcance del proyecto a tu presupuesto. También ofrecemos
                planes de pago fraccionado para hacer más accesible el
                desarrollo de software.
              </div>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                ¿Qué tecnologías utilizan?
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </summary>
              <div className="mt-4 text-gray-600">
                Trabajamos con las tecnologías más modernas y confiables del
                mercado, incluyendo React, Node.js, Python, React Native,
                Flutter, y bases de datos como MongoDB, PostgreSQL y MySQL.
                Elegimos la tecnología más adecuada para cada proyecto.
              </div>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                ¿Proporcionan capacitación para usar el software?
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </summary>
              <div className="mt-4 text-gray-600">
                Sí, incluimos sesiones de capacitación para tu equipo como parte
                de nuestros planes Profesional y Empresarial. También
                proporcionamos documentación detallada y videos tutoriales para
                facilitar el uso del software.
              </div>
            </details>
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                ¿Pueden integrar el software con nuestros sistemas existentes?
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </summary>
              <div className="mt-4 text-gray-600">
                Por supuesto. Tenemos amplia experiencia en integración de
                sistemas y APIs. Podemos conectar tu nuevo software con sistemas
                existentes como CRM, ERP, sistemas de pago, y otras herramientas
                que ya uses en tu negocio.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">NovaSite</span>
              </div>
              <p className="text-gray-400">
                Transformamos ideas en soluciones digitales innovadoras que
                impulsan el crecimiento de tu negocio.
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <span className="text-sm text-gray-400">5.0 (50+ reseñas)</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Servicios</h3>
              <div className="space-y-2 text-gray-400">
                <div>Desarrollo Web</div>
                <div>Aplicaciones Móviles</div>
                <div>Software Empresarial</div>
                <div>Bases de Datos</div>
                <div>Consultoría IT</div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Empresa</h3>
              <div className="space-y-2 text-gray-400">
                <div>Sobre Nosotros</div>
                <div>Nuestro Equipo</div>
                <div>Casos de Éxito</div>
                <div>Blog</div>
                <div>Carreras</div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <div>contacto@novasite.com</div>
                <div>+52 (55) 1234-5678</div>
                <div>Ciudad de México, México</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NovaSite. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
