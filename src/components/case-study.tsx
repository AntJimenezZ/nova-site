import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/lib/projects";
import { CaseStudyGallery } from "@/components/case-study-gallery";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
      <dt className="label text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm text-foreground">{value}</dd>
    </div>
  );
}

/**
 * Caso de estudio: la identidad del proyecto queda fija a la izquierda mientras
 * la evidencia pasa a la derecha. Sin JS de cliente: la revelación al scroll la
 * hace la utilidad .reveal con animation-timeline nativo.
 */
export function CaseStudy({
  project,
  index,
  total,
  // En /proyectos/[slug] el título del caso es el encabezado de la página; en
  // cualquier índice que liste varios casos tiene que seguir siendo h2.
  heading: Heading = "h2",
}: {
  project: Project;
  index: number;
  total: number;
  heading?: "h1" | "h2";
}) {
  return (
    <section
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="scroll-mt-24 border-t border-line py-16 first:border-t-0 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="label tnum text-brand">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <Heading
            id={`${project.slug}-title`}
            className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[0.95] tracking-tighter"
          >
            {project.title}
          </Heading>

          <p className="measure mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            {project.longDescription ?? project.description}
          </p>

          <dl className="mt-8">
            {project.client && <Meta label="Cliente" value={project.client} />}
            {project.role && <Meta label="Rol" value={project.role} />}
            {project.duration && <Meta label="Duración" value={project.duration} />}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="glass-pill rounded-full px-3 py-1.5 font-display text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>

          {project.links?.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Ver en vivo
              <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <CaseStudyGallery project={project} priority={index === 0} />

          {project.features && (
            <div className="reveal glass-card rounded-2xl p-7 md:p-9">
              <h3 className="label text-muted-foreground">Qué construimos</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.metrics || project.outcomes) && (
            <div className="reveal glass-card rounded-2xl p-7 md:p-9">
              <h3 className="label text-muted-foreground">Resultado</h3>

              {project.metrics && (
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="tnum font-display text-3xl font-bold leading-none md:text-4xl">
                        {m.value}
                      </p>
                      <p className="mt-2 text-xs leading-snug text-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {project.outcomes && (
                <ul className="mt-8 space-y-3 border-t border-line/60 pt-6">
                  {project.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-vivid" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
