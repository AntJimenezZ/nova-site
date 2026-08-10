import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectMedia } from "@/components/project-media";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, openGraphFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trabajo",
  description:
    "Casos reales de NovaSite: qué construimos para cada cliente, con qué stack y qué resultado dejó en producción.",
  alternates: { canonical: "/proyectos" },
  openGraph: openGraphFor(
    "/proyectos",
    "Trabajo · NovaSite",
    "Cada proyecto con su alcance real, su stack y el número que movió. Lo que no llegó a producción no está aquí.",
  ),
};

/**
 * Índice. La ficha completa de cada caso vive en /proyectos/[slug]: repetirla
 * aquí crearía dos URLs con el mismo contenido compitiendo entre sí.
 */
export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <header className="py-14 md:py-20">
        <p className="label text-brand">Trabajo</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Casos, no capturas
          <br />
          sueltas.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Cada proyecto con su alcance real, su stack y el número que movió. Lo
          que no llegó a producción no está aquí.
        </p>
      </header>

      <ol className="grid gap-6 border-t border-line py-14 md:grid-cols-2 md:py-20">
        {projects.map((p, i) => (
          <li key={p.slug} className="reveal">
            <Link
              href={`/proyectos/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stage">
                <ProjectMedia
                  project={p}
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="label tnum text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-line-strong" />
                  <span className="label text-muted-foreground">
                    {p.category} · {p.year}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tighter">
                  {p.title}
                </h2>

                <p className="measure mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  Ver el caso
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

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

      <JsonLd data={breadcrumbSchema([{ name: "Trabajo", path: "/proyectos" }])} />
    </div>
  );
}
