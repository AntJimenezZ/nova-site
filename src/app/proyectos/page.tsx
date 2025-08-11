"use client"

import Link from "next/link"
import Image from "next/image"
import { projects } from "@/lib/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ProyectosPage() {
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
                  className="group relative overflow-hidden rounded-full w-full focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                >
                  Ver detalles
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
