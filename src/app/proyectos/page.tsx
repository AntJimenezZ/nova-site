"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Star, X } from "@phosphor-icons/react";

import { projects, Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";

export default function ProyectosPage() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [active]);

  return (
    <main className="font-outfit min-h-[100dvh] bg-[#070708] text-slate-100 relative overflow-x-hidden">
      <section className="relative border-b border-[#0B3A5C] bg-[radial-gradient(circle_at_top,rgba(0,131,234,0.12),transparent_45%)]">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-geist-mono text-[#0083EA] border border-[#0B3A5C] px-4 py-2 rounded-full hover:border-[#0083EA] hover:bg-[#0083EA]/15 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Todos los Proyectos Destacados
            </h1>
            <p className="mt-4 text-slate-400 font-geist-sans leading-relaxed">
              Continuidad total con la experiencia principal de NovaSite. Explora casos reales, arquitectura aplicada y resultados medibles.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
              className="group relative h-full rounded-[2rem] border border-[#0B3A5C] bg-[#050F19] overflow-hidden hover:border-[#0083EA] transition-all duration-300 shadow-[0_4px_30px_rgba(0,131,234,0.05)] hover:shadow-[0_8px_45px_rgba(0,131,234,0.18)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#0083EA]/5 via-transparent to-[#0083EA]/10" />

              <div className="relative h-52 border-b border-[#0B3A5C] bg-[#070708]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain p-5"
                  priority={index < 3}
                />
              </div>

              <div className="relative p-6 md:p-7 flex flex-col h-[calc(100%-13rem)]">
                <h2 className="text-2xl font-black tracking-tight mb-3">{project.title}</h2>
                <p className="text-slate-400 text-sm font-geist-sans leading-relaxed line-clamp-3 mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 min-h-14">
                  {project.tech.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-[#0B3A5C] text-[#007CE8] bg-[#070708] font-geist-mono text-[10px] tracking-widest uppercase"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <button
                  onClick={() => setActive(project)}
                  className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#0B3A5C] bg-[#070708] py-3 text-xs font-bold tracking-widest uppercase text-[#0083EA] hover:border-[#0083EA] hover:bg-[#0083EA]/15 hover:text-white transition-colors"
                >
                  Ver caso completo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 md:p-12 overflow-y-auto"
          >
            <div className="absolute inset-0 bg-[#070708]/90 backdrop-blur-md" onClick={() => setActive(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative my-auto w-full max-w-5xl max-h-[calc(100dvh-4rem)] bg-[#050F19] border border-[#0B3A5C] rounded-[2.5rem] shadow-[0_0_80px_rgba(0,131,234,0.2)] overflow-hidden flex flex-col z-10"
            >
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setActive(null)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#070708]/80 border border-[#0083EA]/50 hover:bg-[#0083EA]/20 transition-colors backdrop-blur-md shadow-lg"
                  aria-label="Cerrar detalles del proyecto"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto hidden-scrollbar overscroll-contain">
                <div className="w-full relative min-h-[220px] overflow-hidden border-b border-[#0B3A5C] p-8 md:p-16 flex flex-col justify-end bg-gradient-to-tr from-[#050F19] to-[#0B3A5C]/40">
                  <Badge variant="outline" className="w-fit border-[#0083EA]/30 text-[#0083EA] bg-[#0083EA]/10 font-mono text-[10px] tracking-widest uppercase mb-6">
                    {active.client || "Sector Empresarial"}
                  </Badge>
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                    {active.title}
                  </h3>
                </div>

                <div className="w-full p-8 md:p-16 flex flex-col gap-10">
                  <p className="max-w-4xl text-lg md:text-xl text-slate-300 font-geist-sans leading-relaxed">
                    {active.longDescription || active.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
                    {active.features && (
                      <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#070708]/70 border border-[#0B3A5C]">
                        <h4 className="text-xs tracking-widest font-mono text-[#007CE8] mb-6 uppercase">Características Implementadas</h4>
                        <ul className="space-y-4">
                          {active.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-slate-300 font-geist-sans">
                              <CheckCircle weight="fill" className="w-5 h-5 text-[#0083EA] mr-3 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(active.metrics || active.outcomes) && (
                      <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#070708] border border-[#0B3A5C] flex flex-col justify-center">
                        <h4 className="text-xs tracking-widest font-mono text-[#007CE8] mb-8 uppercase text-center">Impacto Operativo</h4>

                        <div className="grid grid-cols-2 gap-6 text-center mb-8">
                          {active.metrics?.map((metric, i) => (
                            <div key={i}>
                              <p className="text-4xl font-black text-white mb-2">{metric.value}</p>
                              <p className="text-xs text-slate-500 font-geist-mono uppercase tracking-widest">{metric.label}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 border-t border-[#0B3A5C] pt-6">
                          {active.outcomes?.map((outcome, i) => (
                            <div key={i} className="text-sm text-slate-400 font-geist-sans flex items-center justify-center">
                              <Star weight="fill" className="w-4 h-4 text-[#007CE8] mr-2" />
                              {outcome}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-8 border-t border-[#0B3A5C] flex gap-3 flex-wrap">
                    {active.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-5 py-2 bg-[#0B3A5C]/20 text-white hover:bg-[#0083EA]/20 hover:border-[#0083EA] transition-colors font-geist-mono text-xs rounded-xl border border-[#0B3A5C]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {active.links?.demo && active.links.demo !== "#" && (
                    <div className="pt-2">
                      <a
                        href={active.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#0B3A5C] bg-[#070708] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#0083EA] hover:border-[#0083EA] hover:bg-[#0083EA]/15 hover:text-white transition-colors"
                      >
                        Ver proyecto en vivo
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  <div className="pt-2">
                    <p className="text-xs tracking-widest uppercase font-geist-mono text-[#007CE8] mb-3">
                      Vista del proyecto
                    </p>
                    <div className="relative w-full h-64 md:h-[26rem] rounded-[1.5rem] overflow-hidden border border-[#0B3A5C] bg-[#070708]">
                      <Image
                        src={active.image}
                        alt={`Vista del proyecto ${active.title}`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 1200px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
