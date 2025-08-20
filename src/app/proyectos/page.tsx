"use client"

import Link from "next/link"
import Image from "next/image"
import { projects } from "@/lib/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"
import { useState } from "react"

export default function ProyectosPage() {
  type Project = typeof projects[number]
  const [active, setActive] = useState<Project | null>(null)
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            Proyectos de NovaSite
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Una selección de proyectos que demuestran nuestra experiencia en desarrollo web, móvil y backend.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <Card key={i} className="overflow-hidden border-0 bg-slate-700 hover:bg-slate-600 transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="relative w-full h-48 sm:h-56 bg-slate-900 rounded-md overflow-hidden ring-1 ring-slate-700/40">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain object-center p-2"
                  priority={i < 2}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-slate-100 text-xl">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 text-sm">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t, ti) => (
                    <Badge key={ti} variant="outline" className="border-slate-500 text-blue-400 bg-slate-600">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="gradient"
                  className="group relative overflow-hidden rounded-full w-full cursor-pointer focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                  onClick={() => setActive(p)}
                >
                  Ver detalles
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="xl" variant="outlineGlow" className="group relative overflow-hidden rounded-full px-8 cursor-pointer focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
            <Link href="/" aria-label="Volver al inicio">Volver al inicio</Link>
          </Button>
        </div>

        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActive(null)} />
            {/* Dialog */}
            <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-[95vw] sm:max-w-xl rounded-2xl bg-slate-900 ring-1 ring-slate-700/60 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-800">
                <h3 className="text-lg sm:text-xl font-bold text-slate-100">{active.title}</h3>
                <button aria-label="Cerrar" onClick={() => setActive(null)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-3 sm:px-6 py-3 sm:py-4 grid gap-4 sm:gap-5 max-h-[80vh] overflow-y-auto">
                <div className="relative w-full h-44 sm:h-56 bg-slate-800 rounded-lg overflow-hidden ring-1 ring-slate-700/40">
                  <Image src={active.image} alt={active.title} fill sizes="(max-width: 640px) 90vw, 560px" className="object-contain object-center p-2" />
                </div>
                <p className="text-slate-300 text-sm sm:text-base">
                  {active.longDescription ?? active.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.tech?.map((t, idx) => (
                    <Badge key={idx} variant="outline" className="border-slate-600 text-blue-400 bg-slate-700">{t}</Badge>
                  ))}
                </div>
                {(active.role || active.duration || active.client) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    {active.role && (
                      <div className="rounded-lg bg-slate-800/60 p-3 ring-1 ring-slate-700/50">
                        <div className="text-slate-400">Rol</div>
                        <div className="text-slate-200 font-medium">{active.role}</div>
                      </div>
                    )}
                    {active.duration && (
                      <div className="rounded-lg bg-slate-800/60 p-3 ring-1 ring-slate-700/50">
                        <div className="text-slate-400">Duración</div>
                        <div className="text-slate-200 font-medium">{active.duration}</div>
                      </div>
                    )}
                    {active.client && (
                      <div className="rounded-lg bg-slate-800/60 p-3 ring-1 ring-slate-700/50">
                        <div className="text-slate-400">Cliente</div>
                        <div className="text-slate-200 font-medium">{active.client}</div>
                      </div>
                    )}
                  </div>
                )}
                {active.features && active.features.length > 0 && (
                  <div>
                    <div className="text-slate-200 font-semibold mb-2">Características clave</div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                      {active.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {active.outcomes && active.outcomes.length > 0 && (
                  <div>
                    <div className="text-slate-200 font-semibold mb-2">Resultados</div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                      {active.outcomes.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {active.metrics && active.metrics.length > 0 && (
                  <div>
                    <div className="text-slate-200 font-semibold mb-2">Métricas</div>
                    <div className="flex flex-wrap gap-2">
                      {active.metrics.map((m, i) => (
                        <div key={i} className="px-3 py-1 rounded-full bg-slate-800/70 ring-1 ring-slate-700/60 text-slate-200 text-xs">
                          <span className="text-slate-400 mr-1">{m.label}:</span>
                          <span className="font-semibold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Enlaces de demo/repositorio removidos a solicitud del usuario */}
              </div>
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-slate-800 flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  variant="outlineGlow"
                  className="group relative overflow-hidden rounded-full px-6 w-full sm:w-auto cursor-pointer focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                  onClick={() => setActive(null)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
