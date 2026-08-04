"use client";

import { useEffect, useState } from "react";
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

  const autoplay = !reduced && !paused;

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % projects.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [autoplay, projects.length]);

  const active = projects[index];

  return (
    <section
      aria-label="Proyectos destacados"
      aria-roledescription="carrusel"
      className="relative isolate h-[calc(100dvh-4rem)] min-h-[34rem] w-full overflow-hidden bg-stage md:h-[calc(100dvh-5rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Las tres capas quedan montadas y solo cambia la opacidad: el crossfade
          es una transición CSS compuesta en GPU, sin librería de animación. */}
      {projects.map((p, i) =>
        i === 0 || warm || i === index ? (
          <div
            key={p.slug}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={i === index ? "slow-zoom h-full w-full" : "h-full w-full"}>
              {/* q=68: la imagen va bajo un velo oscuro, la pérdida no se percibe
                  y recorta un tercio de los bytes del LCP. */}
              <ProjectMedia
                project={p}
                priority={i === 0}
                quality={68}
                sizes="100vw"
              />
            </div>
          </div>
        ) : null
      )}

      {/* Velo en dos capas. Concentrado en la banda inferior donde vive el texto:
          arriba deja ver la captura, que es el objetivo del showreel.
          Los porcentajes están medidos contra el texto real, no estimados. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-stage from-0% via-stage/88 via-58% to-transparent to-90% md:via-stage/80 md:via-30% md:to-72%"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-stage/70 from-0% via-stage/10 via-45% to-transparent"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-8 md:px-10 md:pb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="label tnum text-brand-vivid">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-stage-muted/40" />
              <span className="label text-stage-muted">
                {active.category} · {active.year}
              </span>
            </div>

            {/* key fuerza el remontaje, así la animación de entrada se repite */}
            <div key={active.slug} className="hero-text-in">
              <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.92] tracking-tighter text-stage-foreground">
                {active.title}
              </h2>
              <p className="measure mt-4 text-base leading-relaxed text-stage-muted md:text-lg">
                {active.summary}
              </p>
            </div>

            <Link
              href={`/proyectos#${active.slug}`}
              className="mt-7 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-stage-foreground px-6 text-sm font-medium text-stage transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Ver el caso
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* No es un hueco vacío: es el posicionamiento del estudio
              más el índice navegable del showreel. */}
          <div className="shrink-0 lg:max-w-xs lg:text-right">
            {/* Este es el h1 de la home: es la frase estable que describe el sitio.
                El título del showreel va en h2 porque rota. Visualmente no cambia:
                font-sans y tracking normal anulan el estilo de encabezado. */}
            <h1 className="font-sans text-sm font-normal leading-relaxed tracking-normal text-stage-muted">
              Estudio de software en Costa Rica.
              <br className="hidden lg:block" /> De la idea a producción.
            </h1>

            {/* me-16 en lg deja libre la esquina del botón flotante de WhatsApp */}
            <div className="mt-6 flex items-center gap-2 lg:me-16 lg:justify-end">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver ${p.title}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group grid size-11 cursor-pointer place-items-center"
                >
                  <span
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-brand-vivid"
                        : "w-4 bg-stage-muted/40 group-hover:bg-stage-muted"
                    }`}
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Reanudar rotación" : "Pausar rotación"}
                className="ml-1 grid size-11 cursor-pointer place-items-center rounded-full border border-stage-muted/25 text-stage-muted transition-colors hover:border-stage-muted/60 hover:text-stage-foreground"
              >
                {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
