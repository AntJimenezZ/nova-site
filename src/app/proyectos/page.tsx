import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, openGraphFor } from "@/lib/site";
import { ProyectosList } from "@/components/proyectos-list";

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
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Nuestros proyectos más
          <br />
          representativos
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Aquí compartimos lo que hemos creado para nuestros clientes, mostrando el stack tecnológico, el problema que resolvimos y los resultados obtenidos.
        </p>
      </header>

      <ProyectosList projects={projects} />

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
