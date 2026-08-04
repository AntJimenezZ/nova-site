import type { Metadata } from "next";
import { ChevronDown, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { RequirementsForm } from "@/components/requirements-form";

export const metadata: Metadata = {
  title: "Guía de proyecto",
  description:
    "Cómo trabajamos paso a paso, qué información necesitamos y respuestas a las dudas más frecuentes antes de empezar.",
};

const steps = [
  {
    title: "Define tus objetivos",
    body: "Qué necesitas, para quién, qué funcionalidades no pueden faltar y en qué plazo.",
  },
  {
    title: "Reúne referencias",
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

const method = [
  {
    title: "Comunicación clara",
    body: "Puntos de control, reportes breves y feedback continuo para alinear expectativas.",
  },
  {
    title: "Iteración ágil",
    body: "Entregas frecuentes y validaciones tempranas para reducir riesgos.",
  },
  {
    title: "Calidad y soporte",
    body: "Pruebas, documentación y acompañamiento después del lanzamiento.",
  },
];

const helpful = [
  "Objetivos del proyecto y problema a resolver",
  "Público objetivo y principales usuarios",
  "Listado de funcionalidades deseadas",
  "Referencias visuales o proyectos similares",
  "Plazos tentativos y presupuesto",
];

const faqs = [
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
    a: "Definimos un canal principal (email o chat) y puntos de contacto semanales breves para seguimiento.",
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
        <p className="label text-brand">Guía de proyecto</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          De la idea al
          <br />
          primer despliegue.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Seis etapas, sin sorpresas. Esto es exactamente lo que pasa desde que
          nos escribes hasta que tu proyecto está en producción.
        </p>
      </header>

      <section
        aria-label="Etapas del proyecto"
        className="border-t border-line py-14 md:py-20"
      >
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal bg-surface p-7 md:p-8">
              <span className="label tnum text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Cómo trabajamos
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {method.map((m) => (
            <div
              key={m.title}
              className="reveal rounded-2xl border border-line bg-surface p-7"
            >
              <h3 className="font-display text-lg font-semibold">{m.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {m.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-7 md:p-8">
            <h3 className="label text-muted-foreground">
              Qué información nos ayuda
            </h3>
            <ul className="mt-6 space-y-3">
              {helpful.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-vivid" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-7 md:p-8">
            <h3 className="label text-muted-foreground">Contacto directo</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="mailto:contacto@novacr.site"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand"
                >
                  <Mail className="size-4 shrink-0 text-brand" aria-hidden />
                  contacto@novacr.site
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/50683047436"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand"
                >
                  <WhatsAppIcon className="size-4 text-brand" />
                  +506 8304 7436
                </a>
              </li>
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted-foreground">
              ¿Prefieres llevarte el formulario? Rellénalo abajo y descárgalo en
              PDF sin enviar nada.
            </p>
          </div>
        </div>
      </section>

      {/* <details> nativo: accesible por teclado y sin JavaScript */}
      <section id="faqs" className="scroll-mt-24 border-t border-line py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line">
          {faqs.map((f) => (
            <details
              key={f.q}
              name="faq"
              className="group border-b border-line bg-surface last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-sm font-medium transition-colors hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="measure px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="requerimientos"
        className="scroll-mt-24 border-t border-line py-14 md:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
              Formulario de requerimientos
            </h2>
            <p className="measure mt-4 text-sm leading-relaxed text-muted-foreground">
              Envíalo por correo o descárgalo en PDF para revisarlo
              internamente antes. Los dos botones usan los mismos datos.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 md:p-10">
            <RequirementsForm />
          </div>
        </div>
      </section>
    </div>
  );
}
