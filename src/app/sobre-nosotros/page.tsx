"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Users, Target, Sparkles, Rocket, HeartHandshake, ArrowRight, Folder, FolderOpen, ArrowUp } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

export default function SobreNosotrosPage() {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const valores = [
    { icon: Target, title: "Enfoque en resultados", desc: "Diseñamos y desarrollamos con objetivos claros de negocio." },
    { icon: Sparkles, title: "Calidad y detalle", desc: "Código limpio, diseño consistente y experiencias pulidas." },
    { icon: HeartHandshake, title: "Cercanía y transparencia", desc: "Comunicación abierta y procesos colaborativos." },
    { icon: Rocket, title: "Iteración ágil", desc: "Entregas rápidas con mejora continua en cada etapa." },
  ]

  const stats = [
    { k: "+20", v: "Proyectos" },
    { k: "+8", v: "Sectores" },
    { k: "100%", v: "En producción" },
    { k: "24/7", v: "Soporte" },
  ]

  const equipo = [
    {
      name: "Gabriel",
      role: "Software Developer",
      avatar: "/logos/FotoGabriel.jpg",
      bio: "Experiencia en desarrollo web full stack y soluciones a medida.",
    },
    {
      name: "Anthony",
      role: "Full Stack Developer",
      avatar: "/Noni-NovaSite.jpeg",
      bio: "Desarrollo web y móvil, arquitecturas escalables y seguras.",
    },
    {
      name: "Alejandro (Pecho)",
      role: "Backend Engineer",
      avatar: "/logos/FotoAlejandro.jpg",
      bio: "APIs robustas, bases de datos y despliegues en la nube.",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-14 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Sobre Nosotros
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-balance max-w-5xl mx-auto">
            <span className="text-slate-100">Construimos software</span>
            <br className="hidden sm:block" />
            <span className="text-slate-100">que impulsa tu crecimiento</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto">
            Somos un equipo pequeño y multidisciplinario. Unimos estrategia, diseño y tecnología para convertir ideas en productos digitales reales.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="xl" variant="gradient" className="group relative overflow-hidden rounded-full cursor-pointer px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
              <Link href="#contacto">
                Trabajemos juntos
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outlineGlow" className="group relative overflow-hidden rounded-full cursor-pointer px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
              <Link href="/guia-proyecto">Guía de Proyecto</Link>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(s => (
            <Card key={s.v} className="border-0 bg-slate-800/70">
              <CardContent className="py-5 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-50">{s.k}</div>
                <div className="text-slate-300 text-sm mt-1">{s.v}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Misión / Valores */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Nuestra filosof{"\u00ED"}a</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {valores.map((v) => (
              <Card
                key={v.title}
                className="group relative overflow-hidden border-0 bg-slate-800/70 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:bg-slate-800/90 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.35)] ring-1 ring-white/5 hover:ring-blue-400/40"
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  const r = el.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  el.style.setProperty('--x', `${x}%`);
                  el.style.setProperty('--y', `${y}%`);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.removeProperty('--x');
                  el.style.removeProperty('--y');
                }}
              >
                {/* Glow gradient */}
                <div className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{background:"radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.25), transparent 40%)"}} />
                <CardHeader className="pb-2 relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-blue-300 flex items-center justify-center mb-3 ring-1 ring-blue-400/20">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-slate-100 text-lg tracking-tight">{v.title}</CardTitle>
                  <CardDescription className="text-slate-300 leading-relaxed">{v.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Equipo - Carpeta Interactiva */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Nuestro equipo</h2>
          </div>
          
          {/* Carpeta de Integrantes - Diseño Innovador */}
          {!isFolderOpen && (
            <div className="max-w-2xl mx-auto">
              <Card
                onClick={() => setIsFolderOpen(true)}
                className="group relative overflow-hidden border-2 border-blue-500/30 shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800 cursor-pointer hover:border-blue-400/60 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 to-transparent" />
                
                {/* Diseño de carpeta cerrada */}
                <div className="relative p-12 sm:p-16 text-center">
                  {/* Icono de carpeta grande */}
                  <div className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <Folder className="w-32 h-32 sm:w-40 sm:h-40 text-blue-400 group-hover:text-blue-300 transition-all duration-500 group-hover:scale-110" />
                  </div>
                  
                  {/* Título y descripción */}
                  <CardTitle className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
                    Nuestro Equipo
                  </CardTitle>
                  <CardDescription className="text-lg sm:text-xl text-slate-300 mb-6">
                    Haz clic para conocer a los profesionales detrás de NovaSite
                  </CardDescription>
                  
                  {/* Indicador de click */}
                  <div className="flex items-center justify-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-medium">{equipo.length} integrantes</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Cards de Integrantes - Estado Abierto con animación tipo abanico */}
          {isFolderOpen && (
            <div className="relative">
              {/* Botón para cerrar */}
              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => setIsFolderOpen(false)}
                  variant="outlineGlow"
                  className="group relative overflow-hidden rounded-full border-blue-500/30 text-blue-400 hover:border-blue-400/60 hover:text-blue-300"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Cerrar carpeta
                  <ArrowUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Grid de cards con animación en cascada */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {equipo.map((m, index) => (
                  <Card
                    key={m.name}
                    className="group relative overflow-hidden border-0 bg-slate-800/70 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/90 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.35)] ring-1 ring-white/5 hover:ring-blue-400/40 animate-folder-reveal"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "both",
                    }}
                    onMouseMove={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      const r = el.getBoundingClientRect();
                      const x = ((e.clientX - r.left) / r.width) * 100;
                      const y = ((e.clientY - r.top) / r.height) * 100;
                      el.style.setProperty('--x', `${x}%`);
                      el.style.setProperty('--y', `${y}%`);
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.removeProperty('--x');
                      el.style.removeProperty('--y');
                    }}
                  >
                    {/* Accent gradient */}
                    <div className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{background:"radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(14,165,233,0.25), transparent 40%)"}} />
                    <CardContent className="p-0">
                      <div className="relative h-48 bg-slate-900 overflow-hidden">
                        <Image src={m.avatar} alt={m.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-slate-100 font-semibold tracking-tight">{m.name}</div>
                            <div className="text-slate-400 text-sm">{m.role}</div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-0">Activos</Badge>
                        </div>
                        <p className="text-slate-300 text-sm mt-3">{m.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Testimonios (reutiliza data existente) */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Qu{"\u00E9"} dicen nuestros clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(0, 6).map((t, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border-0 bg-slate-800/70 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/90 hover:shadow-[0_10px_40px_-10px_rgba(147,197,253,0.25)] ring-1 ring-white/5 hover:ring-blue-200/40"
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  const r = el.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  el.style.setProperty('--x', `${x}%`);
                  el.style.setProperty('--y', `${y}%`);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.removeProperty('--x');
                  el.style.removeProperty('--y');
                }}
              >
                <div className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{background:"radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.2), transparent 40%)"}} />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-blue-600/20 text-blue-300 border-0">{t.projectTitle}</Badge>
                    <div className="text-yellow-400">{"★".repeat(t.rating)}<span className="text-slate-500">{"★".repeat(5 - t.rating)}</span></div>
                  </div>
                  <p className="text-slate-200 italic">“{t.comment}”</p>
                  <div className="mt-4 text-sm text-slate-300">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-slate-400">{t.role} · {t.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section id="contacto" className="text-center">
          <Card className="border-0 bg-slate-800/70">
            <CardHeader>
              <CardTitle className="text-slate-100">¿Listo para construir algo increíble?</CardTitle>
              <CardDescription className="text-slate-300">Cuéntanos tu idea y te enviamos una propuesta sin compromiso.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Button asChild size="xl" variant="gradient" className="group relative overflow-hidden rounded-full cursor-pointer px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
                <Link href="/guia-proyecto">
                  Completar requerimientos
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outlineGlow" className="group relative overflow-hidden rounded-full cursor-pointer px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
                <Link href="/">Volver al inicio</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
