import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/lib/projects";

export function ProyectosList({ projects }: { projects: Project[] }) {
  return (
    <div className="py-14 md:py-20 border-t border-line">
      <ol className="flex flex-col gap-16 md:gap-32">
        {projects.map((p, i) => {
          const isFeatured = i === 0;
          const isEven = i % 2 === 0;

          return (
            <li key={p.slug} className="reveal group">
              <Link
                href={`/proyectos/${p.slug}`}
                className={`flex flex-col gap-6 md:gap-12 lg:gap-16 ${
                  isFeatured
                    ? "md:flex-col"
                    : isEven
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                } items-center`}
              >
                {/* Imagen del proyecto */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-stage w-full ${
                    isFeatured
                      ? "aspect-[16/9] md:w-full"
                      : "aspect-[4/3] md:w-3/5"
                  }`}
                >
                  <ProjectMedia
                    project={p}
                    priority={isFeatured}
                    sizes={
                      isFeatured
                        ? "100vw"
                        : "(max-width: 768px) 100vw, 60vw"
                    }
                    className="transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                    fit={p.imageKind === "mark" ? "contain" : "cover"}
                  />
                </div>

                {/* Contenido (Textos) */}
                <div
                  className={`flex flex-col ${
                    isFeatured
                      ? "md:w-full md:items-start"
                      : "md:w-2/5 justify-center"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="label tnum text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2
                    className={`mt-5 font-display font-bold leading-tight tracking-tighter ${
                      isFeatured
                        ? "text-[clamp(2rem,4vw,3rem)]"
                        : "text-[clamp(1.5rem,3vw,2rem)]"
                    }`}
                  >
                    {p.title}
                  </h2>

                  <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="glass-pill rounded-full px-3 py-1.5 font-display text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1">
                    Ver el caso
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
