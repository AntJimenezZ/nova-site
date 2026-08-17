import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, CodeXml } from "lucide-react";
import { services } from "@/lib/services";
import { GoalExplorer } from "@/components/goal-explorer";
import { HowWeWorkInteractive } from "@/components/how-we-work-interactive";
import { WhatsAppIcon } from "@/components/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { formatPrice, pricing } from "@/lib/pricing";
import { breadcrumbSchema, offerCatalogSchema, openGraphFor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Desarrollo de páginas web, tiendas virtuales y sistemas en Costa Rica. Precios claros, tiempos definidos y acompañamiento directo.",
  alternates: { canonical: "/servicios" },
  openGraph: openGraphFor(
    "/servicios",
    "Servicios · NovaSite",
    "Páginas web, tiendas virtuales y sistemas que generan resultados para tu negocio. Precios transparentes y tiempos claros.",
  ),
};

const guidance = [
  {
    q: "Quiero que me encuentren en Google y me escriban directamente al WhatsApp.",
    a: "Página web para negocio",
    targetGoal: "clientes",
  },
  {
    q: "Quiero vender mis productos y cobrar por internet con SINPE y tarjeta.",
    a: "Tienda virtual",
    targetGoal: "tienda",
  },
  {
    q: "Quiero dejar las hojas de Excel y ordenar los datos de mi empresa.",
    a: "Sistema interno",
    targetGoal: "sistema",
  },
];

const priceOf = (title: string) =>
  formatPrice(pricing.find((t) => t.title === title)?.from ?? null);

const priceAnswer = `Una landing page parte ${priceOf("Landing page")}, un sitio web corporativo ${priceOf("Sitio web corporativo")} y una tienda en línea o ERPs (PLanificación de recursos empresariales) ${priceOf("Tienda en línea")}. Una aplicación a medida se cotiza por etapas según el alcance.`;

const faqs = [
  {
    q: "¿Cuánto cuesta una página web?",
    a: `${priceAnswer} El número final depende de cuántas secciones, integraciones y contenido necesites, y lo cerramos antes de empezar: no hay cargos que aparezcan a mitad del proyecto.`,
  },
  {
    q: "¿Y si no sé cuánto me puedo gastar?",
    a: "Es lo normal si nunca has comprado software. Cuéntanos qué necesitas y te proponemos un alcance que quepa en lo que puedas invertir, o te decimos si está fuera de alcance. Ningún campo de presupuesto es obligatorio en nuestro formulario.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del alcance. Una landing puede tomar 1–3 semanas; productos más complejos se dividen en varias etapas con entregas parciales.",
  },
  {
    q: "¿Necesito tener todo definido?",
    a: "No. Te ayudamos a aterrizar objetivos y priorizar funcionalidades para empezar por lo de mayor impacto.",
  },
];

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      {/* Header */}
      <header className="py-14 md:py-20">
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Lo que construimos
          <br />
          para tu negocio.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Sin tecnicismos ni paquetes cerrados. Elige lo que quieres lograr y te mostramos cómo te ayudamos a conseguirlo con entregas claras y precios transparentes.
        </p>
      </header>

      {/* Sección 1: Explorador de Metas Interactivo */}
      <section
        id="metas"
        aria-labelledby="metas-title"
        className="scroll-mt-24 py-10 md:py-16"
      >
        <div className="mb-8">
          <h2
            id="metas-title"
            className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter"
          >
            ¿Qué quieres lograr hoy?
          </h2>
          <p className="measure mt-3 text-muted-foreground">
            Selecciona una meta comercial para ver los entregables que recibe tu negocio, el tiempo estimado y cómo funciona.
          </p>
        </div>

        <GoalExplorer />
      </section>

      {/* Sección 2: Cómo trabajamos contigo (Simulador Interactivo) */}
      <section
        id="proceso-interactivo"
        aria-labelledby="proceso-title"
        className="scroll-mt-24 py-14 md:py-20"
      >
        <div className="mb-8">
          <h2
            id="proceso-title"
            className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter"
          >
            Cómo trabajamos contigo
          </h2>
          <p className="measure mt-3 text-muted-foreground">
            Cuatro etapas claras con avances que puedes ver, probar y aprobar desde tu celular.
          </p>
        </div>

        <HowWeWorkInteractive />
      </section>

      {/* Sección 3: Precios y tiempos transparentes */}
      <section
        id="precios"
        aria-labelledby="precios-title"
        className="scroll-mt-24 py-14 md:py-20"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="precios-title"
              className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter"
            >
              Precios y tiempos de entrega
            </h2>
            <p className="measure mt-3 text-muted-foreground">
              Puntos de partida reales para que tengas un presupuesto claro desde el primer día, sin cobros sorpresa a mitad de camino.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((p) => (
            <li
              key={p.title}
              className="reveal glass-card-interactive flex flex-col justify-between rounded-2xl p-7 shadow-lg"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="tnum mt-4 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-none tracking-tighter text-brand">
                  {formatPrice(p.from)}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{p.time}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.detail}
                </p>
              </div>

              <Link
                href="/contacto"
                className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line/60 bg-surface/50 text-xs font-medium backdrop-blur-sm transition-colors hover:border-brand hover:text-brand hover:bg-surface"
              >
                Cotizar este plan
                <ArrowUpRight className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="measure mt-8 text-sm leading-relaxed text-muted-foreground">
          El monto final se define según las funciones y secciones que requiera tu empresa. Te entregamos un presupuesto cerrado antes de que tomes cualquier decisión.
        </p>
      </section>

      {/* Sección 4: Orientador conversacional */}
      <section className="py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          ¿No tienes claro cuál necesitas?
        </h2>
        <p className="measure mt-3 text-muted-foreground">
          Identifica la situación más parecida a la tuya para empezar:
        </p>

        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {guidance.map((g) => (
            <li key={g.q} className="reveal">
              <Link
                href="/contacto"
                className="glass-card-interactive group flex h-full flex-col justify-between rounded-2xl p-7 shadow-md"
              >
                <p className="text-sm leading-relaxed text-foreground">
                  «{g.q}»
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-brand">
                  Opción sugerida: {g.a}
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Sección FAQ: Orientada para Google Generative AI (AEO/GEO) */}
      <section className="py-14 md:py-20" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter text-center md:text-left">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h3 className="font-medium text-foreground text-lg">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección 5: Stack Técnico Opcional y Relegado para Perfiles Técnicos */}
      <section className="py-10">
        <details className="glass-card group rounded-2xl p-6 shadow-md transition-colors">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <CodeXml className="size-4 text-brand" />
              ¿Tienes un equipo técnico o curiosidad sobre las herramientas que usamos?
            </span>
            <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
          </summary>

          <div className="mt-6 border-t border-line/60 pt-6">
            <p className="measure text-xs leading-relaxed text-muted-foreground">
              Para garantizar velocidad, seguridad y compatibilidad en el largo plazo, trabajamos con tecnologías probadas en producción:
            </p>

            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div key={s.slug} className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold text-foreground">{s.title}</h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {s.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-surface/80 px-2 py-0.5 text-[0.7rem] text-muted-foreground ring-1 ring-line/60 backdrop-blur-xs"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
      </section>

      {/* Sección 6: Llamada a la acción final */}
      <section className="py-20 text-center md:py-28">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter">
          Cuéntanos sobre tu proyecto
        </h2>
        <p className="measure mx-auto mt-4 text-muted-foreground">
          Te contestamos en menos de 24 horas hábiles con alcance, plazo y costo. Sin compromiso.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contacto"
            className="inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Iniciar proyecto
            <ArrowUpRight className="size-4" />
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 cursor-pointer items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            <WhatsAppIcon className="size-4 text-brand" />
            Escribir por WhatsApp
          </a>
        </div>
      </section>

      <JsonLd data={offerCatalogSchema(pricing)} />
      <JsonLd data={breadcrumbSchema([{ name: "Servicios", path: "/servicios" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }}
      />
    </div>
  );
}
