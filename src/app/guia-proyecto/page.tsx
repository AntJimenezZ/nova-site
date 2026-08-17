import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { formatPrice, pricing } from "@/lib/pricing";
import { breadcrumbSchema, openGraphFor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Cómo hacemos una página web paso a paso, cuánto cuesta, cuánto tarda y qué información necesitamos para empezar. Preguntas frecuentes en lenguaje llano.",
  alternates: { canonical: "/guia-proyecto" },
  openGraph: openGraphFor(
    "/guia-proyecto",
    "Cómo trabajamos · NovaSite",
    "Seis etapas, sin sorpresas. Qué pasa desde que nos escribes hasta que tu proyecto está en producción, y las respuestas a las dudas de siempre.",
  ),
};

const steps = [
  {
    title: "Definimos tus objetivos",
    body: "Qué necesitas, para quién, qué funcionalidades no pueden faltar y en qué plazo.",
  },
  {
    title: "Escuchamos tus referencias",
    body: "Ejemplos, marcas, paletas e inspiración visual. Alinear expectativas ahorra semanas después.",
  },
  {
    title: "Presupuesto y tiempos",
    body: "Ajustamos el alcance a tu presupuesto y proponemos un cronograma realista por etapas.",
  },
  {
    title: "Propuesta y contrato",
    body: "Te enviamos una propuesta técnica y económica. Al aprobar, formalizamos el acuerdo.",
  },
  {
    title: "Diseño y desarrollo",
    body: "Iteramos con feedback: wireframes, diseño visual, implementación y pruebas.",
  },
  {
    title: "Lanzamiento y soporte",
    body: "Publicamos el proyecto y damos soporte posterior con mejoras continuas.",
  },
];



const helpful = [
  "Objetivos del proyecto y problema a resolver",
  "Público objetivo y principales usuarios",
  "Listado de funcionalidades deseadas",
  "Referencias visuales o proyectos similares",
  "Plazos tentativos y presupuesto",
];

/**
 * Google premia la respuesta concreta sobre la evasiva: "depende del alcance"
 * no se puede citar en una respuesta generada, "$500" sí. Y esta cadena viaja
 * literalmente dentro del `acceptedAnswer` del FAQPage.
 *
 * La prosa va escrita a mano y solo se interpolan los números. Generar también
 * la frase desde el array salía más corto y producía "un tienda en línea": la
 * concordancia de género del español no se deduce de un title.
 */
const priceOf = (title: string) =>
  formatPrice(pricing.find((t) => t.title === title)?.from ?? null);

const priceAnswer = `Una landing page parte ${priceOf("Landing page")}, un sitio web corporativo ${priceOf("Sitio web corporativo")} y una tienda en línea o ERPs (PLanificación de recursos empresariales) ${priceOf("Tienda en línea")}. Una aplicación a medida se cotiza por etapas según el alcance.`;

const faqs: { q: string; a: string; href?: string }[] = [
  {
    q: "¿Cuánto cuesta una página web?",
    // Se compone desde lib/pricing en vez de escribir los números aquí: esta
    // respuesta va tal cual dentro del FAQPage del JSON-LD, así que un número
    // desactualizado no sería una errata, sería un dato falso publicado en un
    // formato pensado para que las máquinas lo citen literalmente.
    a: `${priceAnswer} El número final depende de cuántas secciones, integraciones y contenido necesites, y lo cerramos antes de empezar: no hay cargos que aparezcan a mitad del proyecto.`,
    href: "/servicios#precios",
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
  {
    q: "¿Cómo se realizan los pagos?",
    a: "Generalmente por hitos o fases acordadas: inicio, diseño, desarrollo y lanzamiento. Podemos adaptarnos.",
  },
  {
    q: "¿Incluyen mantenimiento y soporte?",
    a: "Sí. Ofrecemos planes de soporte opcionales con correcciones, actualizaciones y mejoras.",
  },
  {
    q: "¿Quién es dueño del código y los diseños?",
    a: "El cliente. Transferimos el código y los assets entregables al finalizar y contra el pago correspondiente.",
  },
  {
    q: "¿Cómo será la comunicación durante el proyecto?",
    a: "Definimos un canal principal (email o mensajes de texto) y puntos de contacto semanales breves para seguimiento.",
  },
  {
    q: "¿Incluyen SEO y rendimiento?",
    a: "Aplicamos SEO técnico y optimizamos Core Web Vitals (LCP, CLS, INP) desde el inicio, no al final.",
  },
  {
    q: "¿Ofrecen hosting y dominios?",
    a: "Podemos asesorarte y configurar el hosting y el dominio con tu proveedor preferido.",
  },
];

export default function GuiaProyectoPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <header className="py-14 md:py-20">
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Cómo
          <br />
          Trabajamos
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Nuestro trabajo consiste en estas seis etapas. Esto es lo que pasa desde que
          nos escribes hasta que tu proyecto está en producción.
        </p>
      </header>

      <section
        aria-label="Etapas del proyecto"
        className="py-14 md:py-20"
      >
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal flex flex-col">
              <span className="label tnum text-brand text-sm font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-xl font-bold tracking-tight">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Para preparar tu proyecto
        </h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12 lg:gap-16">
          <div className="flex flex-col">
            <h3 className="label text-muted-foreground">
              Qué información nos ayuda
            </h3>
            <ul className="mt-5 space-y-3">
              {helpful.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-vivid" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="label text-muted-foreground">Contacto directo</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand"
                >
                  <Mail className="size-4 shrink-0 text-brand" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand"
                >
                  <WhatsAppIcon className="size-4 text-brand" />
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Si prefieres escribir un correo antes que llenar un formulario,
              este es el nuestro. Te contestamos igual de rápido.
            </p>
          </div>
        </div>
      </section>

      {/* <details> nativo: accesible por teclado y sin JavaScript */}
      <section id="faqs" className="scroll-mt-24 py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 divide-y divide-line">
          {faqs.map((f) => (
            <details
              key={f.q}
              name="faq"
              className="group py-2"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-sm font-medium transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="pb-4">
                <p className="measure text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
                {f.href && (
                  <Link
                    href={f.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                  >
                    Ver precios orientativos
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* El formulario vivía aquí y en /contacto, dos páginas que se enlazan
          entre sí: la misma persona se lo encontraba tres veces. Aquí queda
          la guía; el formulario, en un sitio solo. */}
      <section className="py-20 text-center md:py-28">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter">
          ¿Listo para empezar?
        </h2>
        <p className="measure mx-auto mt-4 text-muted-foreground">
          Cuéntanos qué necesitas y te devolvemos alcance, plazo y precio en
          menos de 24 horas. No hace falta que lo tengas todo definido.
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
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </div>
      </section>

      {/* Las 8 preguntas ya estaban escritas: marcarlas las mete dentro del
          resultado de Google, donde ocupan más pantalla que un enlace suelto. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Cómo trabajamos", path: "/guia-proyecto" },
        ])}
      />
    </div>
  );
}
