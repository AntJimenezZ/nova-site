import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { CaseStudy } from "@/components/case-study";
import { JsonLd } from "@/components/json-ld";
import { ScrollToTop } from "@/components/scroll-to-top";
import { breadcrumbSchema, openGraphFor, site } from "@/lib/site";

/**
 * Un caso por URL. Antes los tres vivían como anclas dentro de /proyectos, y
 * Google no indexa anclas como páginas: había una URL donde debía haber cuatro,
 * con el stack, las métricas y los resultados de cada caso sin poder posicionar.
 *
 * Con generateStaticParams siguen siendo estáticas, igual que antes.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Sin esto, una URL inventada se renderizaría bajo demanda en vez de dar 404. */
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      ...openGraphFor(
        `/proyectos/${project.slug}`,
        `${project.title} · NovaSite`,
        project.description,
      ),
      // La captura del caso dice más que la tarjeta genérica del estudio.
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProyectoPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <ScrollToTop />
      <nav aria-label="Miga de pan" className="pt-10 md:pt-14">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" />
          Todos los casos
        </Link>
      </nav>

      <CaseStudy
        project={project}
        index={index}
        total={projects.length}
        heading="h1"
      />

      <section className="py-16 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>

            <p className="mt-3 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-tighter">
              {next.title}
            </p>
          </div>
          <Link
            href={`/proyectos/${next.slug}`}
            className="inline-flex h-13 w-fit cursor-pointer items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            Ver el caso
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 text-center md:py-28">
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

      <JsonLd
        data={breadcrumbSchema([
          { name: "Trabajo", path: "/proyectos" },
          { name: project.title, path: `/proyectos/${project.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: project.title,
          description: project.description,
          image: [site.url + project.image],
          author: {
            "@type": "Organization",
            name: "NovaSite",
            url: site.url,
          },
        }}
      />
    </div>
  );
}
