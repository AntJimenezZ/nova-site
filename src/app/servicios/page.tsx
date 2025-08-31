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
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  ShoppingCart,
  Wrench,
  Database,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Smartphone,
  Shield,
  Zap,
  Users,
  Cloud,
  Palette,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Hook para animaciones de scroll
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

const services = [
  {
    id: "web-development",
    icon: Code2,
    title: "Desarrollo Web",
    subtitle: "Aplicaciones web modernas y responsivas",
    description: "Creamos sitios web profesionales que se adaptan perfectamente a todos los dispositivos y navegadores.",
    features: [
      "Diseño responsivo y adaptativo",
      "Optimización para SEO",
      "Interfaz de usuario intuitiva",
      "Integración con redes sociales",
      "Panel de administración",
      "Análisis de rendimiento"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "/logos/digital-marketing_9541515.png",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce",
    subtitle: "Tiendas online completas",
    description: "Desarrollamos plataformas de comercio electrónico robustas con sistemas de pago seguros y gestión de inventario.",
    features: [
      "Catálogo de productos dinámico",
      "Sistema de pagos seguro",
      "Gestión de inventario",
      "Panel de administración",
      "Sistema de cupones y descuentos",
      "Reportes de ventas"
    ],
    technologies: ["Stripe", "PayPal", "MongoDB", "Express.js", "React"],
    image: "/logos/restaurant_2075450.png",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Mantenimiento Web",
    subtitle: "Soporte técnico continuo",
    description: "Ofrecemos servicios de mantenimiento preventivo y correctivo para mantener tu sitio web funcionando perfectamente.",
    features: [
      "Monitoreo 24/7",
      "Actualizaciones de seguridad",
      "Backups automáticos",
      "Optimización de rendimiento",
      "Soporte técnico prioritario",
      "Reportes mensuales"
    ],
    technologies: ["Docker", "AWS", "Cloudflare", "Git", "CI/CD"],
    image: "/logos/data-complexity_1925161.png",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "backend",
    icon: Database,
    title: "Backend Personalizado",
    subtitle: "APIs y bases de datos robustas",
    description: "Desarrollamos APIs personalizadas y bases de datos optimizadas para satisfacer las necesidades específicas de tu negocio.",
    features: [
      "APIs RESTful y GraphQL",
      "Autenticación y autorización",
      "Bases de datos optimizadas",
      "Integración con servicios externos",
      "Documentación completa",
      "Testing automatizado"
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    image: "/logos/Gemini_Generated_Image_cgyoe6cgyoe6cgyo.png",
    color: "from-purple-500 to-pink-500"
  }
];

const additionalServices = [
  {
    icon: Smartphone,
    title: "Desarrollo Móvil",
    description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android.",
    features: ["React Native", "Flutter", "Swift", "Kotlin"]
  },
  {
    icon: Search,
    title: "SEO y Marketing Digital",
    description: "Optimización para motores de búsqueda y estrategias de marketing digital.",
    features: ["SEO técnico", "Content Marketing", "Google Ads", "Analytics"]
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description: "Implementación de medidas de seguridad para proteger tu aplicación web.",
    features: ["SSL/TLS", "Penetration Testing", "Security Audits", "GDPR Compliance"]
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Migración y gestión de aplicaciones en la nube para mayor escalabilidad.",
    features: ["AWS", "Azure", "Google Cloud", "Serverless"]
  }
];

const processSteps = [
  {
    number: "01",
    title: "Consulta y Análisis",
    description: "Entendemos tus necesidades y objetivos para crear la mejor estrategia.",
    icon: Users
  },
  {
    number: "02",
    title: "Diseño y Planificación",
    description: "Creamos wireframes y prototipos para visualizar el resultado final.",
    icon: Palette
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construimos tu proyecto usando las mejores tecnologías y prácticas.",
    icon: Code2
  },
  {
    number: "04",
    title: "Pruebas y Optimización",
    description: "Realizamos pruebas exhaustivas y optimizamos el rendimiento.",
    icon: Zap
  },
  {
    number: "05",
    title: "Lanzamiento",
    description: "Desplegamos tu proyecto y te proporcionamos soporte continuo.",
    icon: TrendingUp
  }
];

export default function ServiciosPage() {

  
  // Referencias para animaciones

  const [servicesRef, servicesVisible] = useScrollReveal<HTMLElement>();
  const [processRef, processVisible] = useScrollReveal<HTMLElement>();
  const [additionalRef, additionalVisible] = useScrollReveal<HTMLElement>();
  const [ctaRef, ctaVisible] = useScrollReveal<HTMLElement>();



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Decoración de fondo */}
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

      

      {/* Servicios Principales */}
      <section
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
              Servicios Principales
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Nuestros servicios core que han ayudado a cientos de empresas a 
              transformar su presencia digital
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`transition-all duration-1000 ease-out delay-300 ${
                  servicesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${400 + index * 200}ms`
                }}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-100 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-xl text-blue-400 font-semibold">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-slate-100 mb-4">
                        Características principales:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            <span className="text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-slate-100 mb-4">
                        Tecnologías utilizadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="border-blue-500/30 text-blue-400 bg-slate-700/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                                         <Button
                       asChild
                       size="lg"
                       variant="gradient"
                       className="group relative overflow-hidden rounded-full cursor-pointer focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                     >
                       <Link href="/contacto">
                         Solicitar {service.title}
                         <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                       </Link>
                     </Button>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <Card className="relative overflow-hidden border-2 border-blue-500/30 shadow-xl bg-slate-700 hover:border-blue-400/60 transition-all duration-500">
                      <div className="p-8">
                        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-800 mb-6">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain object-center p-4"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-xl font-semibold text-slate-100 mb-2">
                            {service.title}
                          </h4>
                          <p className="text-slate-300">
                            {service.subtitle}
                          </p>
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

      {/* Proceso de Trabajo */}
      <section
        ref={processRef}
        className={`py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 transition-all duration-1000 ease-out ${
          processVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
            processVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Un enfoque sistemático y probado para entregar resultados excepcionales
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-5 gap-8 transition-all duration-1000 ease-out delay-300 ${
            processVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}>
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 border-blue-500/30 shadow-lg bg-slate-700 hover:border-blue-400/60 transition-all duration-500 text-center"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {step.number}
                  </div>
                  <CardTitle className="text-xl text-slate-100">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section
        ref={additionalRef}
        className={`py-16 px-4 bg-slate-800 transition-all duration-1000 ease-out ${
          additionalVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-200 ${
            additionalVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              Servicios Adicionales
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Servicios complementarios para potenciar aún más tu presencia digital
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ease-out delay-300 ${
            additionalVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}>
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 border-blue-500/30 shadow-lg bg-slate-700 hover:border-blue-400/60 transition-all duration-500 hover:-translate-y-2"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-100">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-300 mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.map((feature, featureIndex) => (
                      <Badge
                        key={featureIndex}
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 bg-slate-600/50 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 transition-all duration-1000 ease-out ${
          ctaVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            ctaVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
              ¿Listo para Transformar tu Negocio?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar 
              tus objetivos digitales con nuestros servicios profesionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button
                asChild
                size="xl"
                variant="gradient"
                className="group relative overflow-hidden rounded-full cursor-pointer text-base sm:text-xl px-8 sm:px-12 font-bold focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
              >
                <Link href="/contacto">
                  Solicitar Cotización Gratuita
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outlineGlow"
                className="group relative overflow-hidden rounded-full cursor-pointer text-base sm:text-xl px-8 sm:px-12 font-bold focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
              >
                <Link href="/proyectos">
                  Ver Nuestros Proyectos
                </Link>
              </Button>
            </div>
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
               className="rounded-full cursor-pointer group relative overflow-hidden focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
             >
               Volver al inicio
               <ArrowUp className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:-translate-y-1" />
             </Button>
          </div>
          <div className="text-center text-slate-400">
            <p>&copy; 2025 NovaSite. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
