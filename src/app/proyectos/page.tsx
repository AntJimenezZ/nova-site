import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { CaseStudy } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Trabajo",
  description:
    "Casos de NovaSite: qué construimos, con qué stack y qué resultado dejó en producción.",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      {/* Cabecera compacta: el índice es contenido, no relleno */}
      <header className="py-14 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-brand">Trabajo</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
              Casos, no capturas
              <br />
              sueltas.
            </h1>
            <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Cada proyecto con su alcance real, su stack y el número que movió.
              Lo que no llegó a producción no está aquí.
            </p>
          </div>

          <nav aria-label="Índice de casos" className="shrink-0">
            <ol className="flex flex-col gap-px overflow-hidden rounded-xl border border-line">
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    className="group flex items-center gap-6 bg-surface px-5 py-3.5 transition-colors hover:bg-surface-2"
                  >
                    <span className="label tnum text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mr-auto text-sm font-medium">{p.title}</span>
                    <span className="label text-muted-foreground">{p.year}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      {projects.map((project, i) => (
        <CaseStudy
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}

      <section className="border-t border-line py-20 text-center md:py-28">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter">
          ¿Tu proyecto es el siguiente?
        </h2>
        <p className="measure mx-auto mt-4 text-muted-foreground">
          Cuéntanos qué necesitas y te devolvemos alcance, plazo y precio.
        </p>
        <Link
          href="/contacto"
          className="mt-8 inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          Iniciar proyecto
          <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
