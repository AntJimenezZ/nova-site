import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/services";

import { JsonLd } from "@/components/json-ld";
import { formatPrice, pricing } from "@/lib/pricing";
import { breadcrumbSchema, offerCatalogSchema, openGraphFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño de páginas web en Costa Rica: sitios corporativos, tiendas en línea, aplicaciones a medida y mantenimiento. Qué incluye cada servicio, con qué stack y desde cuánto cuesta.",
  alternates: { canonical: "/servicios" },
  openGraph: openGraphFor(
    "/servicios",
    "Servicios · NovaSite",
    "Cuánto cuesta una página web, qué incluye cada servicio y en cuánto tiempo se entrega. Precios orientativos de partida.",
  ),
};

/** Tu cliente no sabe si necesita "landing" o "sitio corporativo": esto lo traduce. */
const guidance = [
  {
    q: "Solo quiero que me encuentren en Google y me escriban.",
    a: "Desarrollo web",
    href: "#web",
  },
  {
    q: "Quiero vender mis productos por internet.",
    a: "E-commerce",
    href: "#ecommerce",
  },
  {
    q: "Necesito ordenar algo que hoy llevo en papel o en Excel.",
    a: "Backend a medida",
    href: "#backend",
  },
];

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <header className="py-14 md:py-20">
        <p className="label text-brand">Servicios</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Cuatro formas de
          <br />
          trabajar con nosotros.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Sin paquetes cerrados ni letra pequeña. Esto es lo que incluye cada
          servicio y las herramientas con las que lo hacemos.
        </p>
      </header>

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          aria-labelledby={`${service.slug}-title`}
          className="scroll-mt-24 border-t border-line py-14 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="label tnum text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-line-strong" />
              </div>

              <service.icon className="mt-6 size-7 text-brand" aria-hidden />

              <h2
                id={`${service.slug}-title`}
                className="mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[0.95] tracking-tighter"
              >
                {service.title}
              </h2>

              <p className="measure mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-7 md:p-8">
                <h3 className="label text-muted-foreground">Qué incluye</h3>
                <ul className="mt-6 space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-7 md:p-8">
                <h3 className="label text-muted-foreground">Stack habitual</h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-surface-2 px-3 py-1.5 font-display text-xs text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        id="precios"
        aria-labelledby="precios-title"
        className="scroll-mt-24 border-t border-line py-14 md:py-20"
      >
        <h2
          id="precios-title"
          className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter"
        >
          ¿Cuánto cuesta una página web?
        </h2>
        <p className="measure mt-4 text-muted-foreground">
          Es la primera pregunta de todo el mundo, así que va antes del
          formulario y no después. Estos son los puntos de partida reales de
          proyectos que ya entregamos.
        </p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((p) => (
            <li key={p.title} className="reveal flex flex-col bg-surface p-7">
              <h3 className="font-display text-base font-semibold">{p.title}</h3>
              <p className="tnum mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none tracking-tighter text-brand">
                {formatPrice(p.from)}
              </p>
              <p className="label mt-3 text-muted-foreground">{p.time}</p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.detail}
              </p>
            </li>
          ))}
        </ul>

        <p className="measure mt-8 text-sm leading-relaxed text-muted-foreground">
          El precio final depende del alcance. Si no tienes un número en mente,
          no pasa nada: te ayudamos a estimarlo antes de que te comprometas a
          nada.
        </p>
      </section>

      <section className="border-t border-line py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          ¿Qué necesito?
        </h2>
        <p className="measure mt-4 text-muted-foreground">
          Si no sabes cómo se llama lo que buscas, empieza por aquí.
        </p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {guidance.map((g) => (
            <li key={g.href} className="reveal bg-surface">
              <a
                href={g.href}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-surface-2"
              >
                <p className="measure text-base leading-relaxed">
                  «{g.q}»
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand">
                  {g.a}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>



      <section className="border-t border-line py-20 text-center md:py-28">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter">
          ¿Cuál encaja con lo tuyo?
        </h2>
        <p className="measure mx-auto mt-4 text-muted-foreground">
          Si no lo tienes claro, escríbenos y lo definimos juntos en una sesión.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contacto"
            className="inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Iniciar proyecto
            <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href="/proyectos"
            className="inline-flex h-13 cursor-pointer items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            Ver casos
          </Link>
        </div>
      </section>

      <JsonLd data={offerCatalogSchema(pricing)} />
      <JsonLd data={breadcrumbSchema([{ name: "Servicios", path: "/servicios" }])} />
    </div>
  );
}
