"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "@/components/project-media";

const ROTATE_MS = 6000;

/** Solo hace falta para decidir si autorotar. Las animaciones ya las corta el CSS. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function HeroShowreel({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Las diapositivas 2 y 3 se montan tras el primer pintado. Si se montan de
  // entrada, sus descargas compiten con la imagen del LCP y la retrasan.
  // Hay margen de sobra: la primera rotación no ocurre hasta los 6 s.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setWarm(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleNext = useCallback(() => {
    setIndex((i) => (i + 1) % projects.length);
  }, [projects.length]);

  const active = projects[index];

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-12 lg:py-20">

      {/* The Floating Liquid Glass Hero Carousel Card */}
      <section
        aria-label="Proyectos destacados"
        aria-roledescription="carrusel"
        className="liquid-glass-hero relative isolate flex h-[85vh] min-h-[40rem] max-h-[880px] w-full flex-col justify-end overflow-hidden rounded-3xl md:rounded-[2.5rem] shadow-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Specular top sheen line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />

        {/* Background images without slow zoom */}
        <div className="absolute inset-0">
          {projects.map((p, i) =>
            i === 0 || warm || i === index ? (
              <div
                key={p.slug}
                aria-hidden={i !== index}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <ProjectMedia
                  project={p}
                  priority={i === 0}
                  quality={68}
                  sizes="(max-width: 1440px) 100vw, 1400px"
                  fit="cover"
                />
              </div>
            ) : null
          )}
        </div>

        {/* Velo degradado Liquid Glass en capas */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-stage from-0% via-stage/85 via-50% to-transparent to-90% md:via-stage/75 md:via-28% md:to-70%"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-stage/75 from-0% via-stage/15 via-45% to-transparent"
        />

        {/* Floating Content Area */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="min-w-0">
              <div className="mt-4 grid items-end">
                {projects.map((p) => {
                  const on = p.slug === active.slug;
                  return (
                    <div
                      key={p.slug}
                      aria-hidden={!on}
                      inert={!on}
                      className={`col-start-1 row-start-1 ${
                        on ? "hero-text-in" : "invisible"
                      }`}
                    >
                      <h2 className="font-display text-[clamp(2.25rem,6.5vw,5rem)] font-bold leading-[0.92] tracking-tighter text-stage-foreground">
                        {p.title}
                      </h2>
                      <p className="measure mt-4 text-base leading-relaxed text-stage-muted md:text-lg">
                        {p.summary}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                href={`/proyectos/${active.slug}`}
                className="mt-7 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-stage-foreground px-6 text-sm font-medium text-stage shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Ver el caso
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            {/* Posicionamiento del estudio y controles del carrusel */}
            <div className="shrink-0 lg:max-w-xs lg:text-right">
              <h1 className="font-sans text-sm font-normal leading-relaxed tracking-normal text-stage-muted">
                Estudio de software en Costa Rica.
                <br className="hidden lg:block" /> De la idea a producción.
              </h1>

              <div className="mt-6 flex items-center lg:justify-end">
                <div className="glass-dock inline-flex items-center gap-1.5 rounded-full p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? "Reanudar rotación automática" : "Pausar rotación automática"}
                    title={paused ? "Reanudar" : "Pausar"}
                    className="glass-button grid size-9 cursor-pointer place-items-center rounded-full text-stage-muted hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-vivid focus-visible:outline-none"
                  >
                    {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                  </button>
                  {projects.map((p, i) => {
                    const isActive = i === index;
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ver proyecto ${i + 1} de ${projects.length}: ${p.title}`}
                        aria-current={isActive ? "true" : undefined}
                        className="group relative flex h-9 items-center justify-center px-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-vivid focus-visible:rounded-full focus-visible:outline-none"
                      >
                        {/* Pista del indicador */}
                        <span
                          className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-11 sm:w-14 bg-white/20"
                              : "w-3 sm:w-3.5 bg-white/25 group-hover:w-5 group-hover:bg-white/50"
                          }`}
                        >
                          {/* Barra de progreso activa animada */}
                          {isActive && (
                            <span
                              key={index}
                              onAnimationEnd={(e) => {
                                if (e.target === e.currentTarget && !reduced) {
                                  handleNext();
                                }
                              }}
                              style={{
                                animationDuration: `${ROTATE_MS}ms`,
                                animationPlayState: paused ? "paused" : "running",
                              }}
                              className={`absolute inset-0 origin-left rounded-full bg-brand-vivid shadow-[0_0_10px_rgba(96,165,250,0.85)] ${
                                reduced ? "w-full" : "showreel-progress-fill"
                              }`}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
