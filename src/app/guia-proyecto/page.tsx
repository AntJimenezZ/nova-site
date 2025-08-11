"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, FileText, Mail, Phone } from "lucide-react"

export default function GuiaProyectoPage() {
  const pasos = [
    {
      titulo: "1. Define tus objetivos",
      desc: "Cuéntanos qué necesitas: tipo de proyecto, público objetivo, funcionalidades clave y plazos.",
      chips: ["Web/App", "Objetivos", "Alcance"],
    },
    {
      titulo: "2. Reúne referencias",
      desc: "Comparte ejemplos, marcas, paletas de color e inspiración visual para alinear expectativas.",
      chips: ["Referencias", "Branding", "UI/UX"],
    },
    {
      titulo: "3. Presupuesto y tiempos",
      desc: "Ajustamos el alcance a tu presupuesto y proponemos un cronograma realista por etapas.",
      chips: ["Estimación", "Fases", "Entregables"],
    },
    {
      titulo: "4. Propuesta y contrato",
      desc: "Te enviamos una propuesta técnica y económica. Al aprobar, formalizamos el acuerdo.",
      chips: ["Propuesta", "Alcance", "Contrato"],
    },
    {
      titulo: "5. Diseño y desarrollo",
      desc: "Iteramos con feedback: wireframes, diseño visual, implementación y pruebas.",
      chips: ["Wireframes", "Diseño", "Desarrollo", "QA"],
    },
    {
      titulo: "6. Lanzamiento y soporte",
      desc: "Publicamos tu proyecto y damos soporte post-lanzamiento con mejoras continuas.",
      chips: ["Deploy", "Monitoreo", "Soporte"],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-14 relative overflow-hidden">
      {/* Decoración de fondo: gradientes y blur */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
      </div>
      <div className="container mx-auto max-w-6xl">
        {/* Hero superior */}
        <section className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Guía práctica NovaSite
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight text-balance max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-slate-200 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              Comienza tu Proyecto
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              con Confianza
            </span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto">
            Un flujo claro, profesional y ágil para ayudarte a pasar de idea a producto con la mejor experiencia.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="xl" variant="gradient" className="rounded-full px-8 group">
              <Link href="/contacto" aria-label="Contáctanos para iniciar tu proyecto">
                Iniciar ahora
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outlineGlow" className="rounded-full">
              <Link href="#faqs">Ver preguntas frecuentes</Link>
            </Button>
          </div>
        </section>

        {/* Timeline de pasos */}
        <div className="relative md:before:hidden before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-slate-700/60 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {pasos.map((p, idx) => (
              <Card
                key={idx}
                className="group relative border-0 bg-slate-700/90 hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl overflow-hidden"
              >
                {/* Punto del timeline (solo móvil) */}
                <span className="md:hidden absolute left-4 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-blue-400 ring-4 ring-blue-500/20" />
                <CardHeader className="pb-2 pl-10 md:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-400/30">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-slate-100 text-lg sm:text-xl flex-1">
                      {p.titulo}
                    </CardTitle>
                    <span className="text-slate-400 text-sm hidden md:block">Paso {idx + 1}</span>
                  </div>
                  <CardDescription className="text-slate-300 mt-2">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pl-10 md:pl-6">
                  <div className="flex flex-wrap gap-2">
                    {p.chips.map((c) => (
                      <Badge key={c} variant="outline" className="border-slate-500 text-blue-400 bg-slate-600/80">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Metodología */}
        <section className="mt-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            ¿Cómo trabajamos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              t:'Comunicación clara', d:'Puntos de control, reportes breves y feedback continuo para alinear expectativas.'
            },{
              t:'Iteración ágil', d:'Entregas frecuentes y validaciones tempranas para reducir riesgos.'
            },{
              t:'Calidad y soporte', d:'Pruebas, documentación y acompañamiento post-lanzamiento.'
            }].map((i)=> (
              <Card key={i.t} className="border-0 bg-slate-700/90 hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-100">{i.t}</CardTitle>
                  <CardDescription className="text-slate-300">{i.d}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 bg-slate-700/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-slate-100">Qué información nos ayuda</CardTitle>
              <CardDescription className="text-slate-300">
                Estos puntos aceleran la propuesta y mejoran la precisión del plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <ul className="list-disc pl-6 space-y-2">
                <li>Objetivos del proyecto y problema a resolver</li>
                <li>Público objetivo y principales usuarios</li>
                <li>Listado de funcionalidades deseadas</li>
                <li>Referencias visuales o proyectos similares</li>
                <li>Plazos tentativos y presupuesto</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-700/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-slate-100">Contacto</CardTitle>
              <CardDescription className="text-slate-300">Estamos listos para ayudarte</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contacto@novasite.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="pt-2 flex gap-3">
                <Button asChild variant="gradient" className="rounded-full">
                  <Link href="/">Volver al inicio</Link>
                </Button>
                <Button asChild variant="outlineGlow" className="rounded-full">
                  <Link href="#" aria-disabled>Descargar brief (próximamente)</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <section id="faqs" className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {[{
              q:'¿Cuánto tarda un proyecto?', a:'Depende del alcance. Un landing puede tomar 1-3 semanas; productos más complejos, varias etapas con entregas parciales.'
            },{
              q:'¿Necesito tener todo definido?', a:'No. Te ayudamos a aterrizar objetivos y priorizar funcionalidades para iniciar con el mayor impacto.'
            },{
              q:'¿Cómo se realizan los pagos?', a:'Generalmente por hitos o fases acordadas (inicio, diseño, desarrollo, lanzamiento). Podemos adaptarnos.'
            }].map((f)=> (
              <details key={f.q} className="group rounded-lg border border-slate-600/60 bg-slate-800/60 p-4 open:bg-slate-800/70 transition-all">
                <summary className="cursor-pointer list-none font-medium text-slate-100 flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 text-slate-400 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-2 text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <div className="mt-14 flex justify-center">
          <Button asChild size="xl" variant="gradient" className="rounded-full px-8 group relative overflow-hidden before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
            <Link href="/contacto" aria-label="Contáctanos para iniciar tu proyecto">
              Iniciar ahora
              <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
