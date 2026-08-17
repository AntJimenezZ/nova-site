
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { HeroShowreel } from "@/components/showreel";
import { Gallery6 } from "@/components/blocks/gallery6";
import { RequirementsForm } from "@/components/requirements-form";
import { Testimonial } from "@/components/testimonial";
import { WhatsAppIcon } from "@/components/brand-icons";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";


const process = [
  {
    title: "Entender",
    body: "Programamos una reunión para conversar sobre tu idea y el estado actual de tu negocio. En esta primera conversación definimos el alcance, el cronograma y el presupuesto estimado del proyecto.",
  },
  {
    title: "Diseñar",
    body: "Diseñamos un prototipo navegable del sitio web o software para que puedas visualizar cómo quedará antes de comenzar a programarlo. En esta fase podemos hacer los cambios necesarios.",
  },
  {
    title: "Construir",
    body: "Entregas cada dos semanas en un entorno real. Ves el avance, no un informe del avance.",
  },
  {
    title: "Sostener",
    body: "Monitoreo, parches y mejoras después del lanzamiento.",
  },
];

const galleryItems = projects.map((p) => ({
  id: p.slug,
  title: p.title,
  summary: p.summary,
  url: `/proyectos/${p.slug}`,
  image: p.image,
}));

export default function HomePage() {
  return (
    <>
      <HeroShowreel projects={projects} />


      {/* Servicios */}
      <section
        id="servicios"
        className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 overflow-hidden"
      >
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
              ¿Qué Ofrecemos?
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand"
          >
            Ver todos los servicios
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="relative z-10 mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="reveal">
              <Link
                href={`/servicios#${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface/50 backdrop-blur-md p-7 transition-all duration-300 hover:border-line-strong hover:bg-surface md:p-9"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-surface-2 text-brand transition-colors group-hover:bg-brand-soft">
                    <s.icon
                      className="size-6 text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Ver detalle
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="measure mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Trabajo seleccionado: índice tipo tabla, la ficha completa vive en /proyectos */}
      <div id="trabajo">
        <Gallery6 heading="Casos recientes" demoUrl="/proyectos" items={galleryItems} />
      </div>

      {/* Proceso */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">

            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
              Cómo trabajamos
            </h2>
            <p className="measure mt-5 text-sm leading-relaxed text-muted-foreground">
              Cuatro etapas principales. Siempre con comunicación abierta y entregas claras
            </p>
          </div>

          <ol className="">
            {process.map((step, i) => (
              <li
                key={step.title}
                className="reveal grid grid-cols-[auto_1fr] gap-x-6 py-8 md:gap-x-10 md:py-10"
              >
                <span className="label tnum pt-1.5 text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="measure mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* Testimonios justo antes del formulario: la prueba social vale donde
          la persona decide, no en /sobre-nosotros, que es la que menos visita. */}
      <section
        aria-label="Testimonios de clientes"
        className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28"
      >

        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
          Qué dicen de nosotros
        </h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Testimonial key={t.id} testimonial={t} />
          ))}
        </ul>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">

            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
              Cuéntanos
              <br />
              qué necesitas
            </h2>
            <p className="measure mt-5 leading-relaxed text-muted-foreground">
              Te respondemos en menos de 24 horas con alcance, plazo y precio.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-foreground transition-colors hover:text-brand"
              >
                <WhatsAppIcon className="size-4 text-brand" />
                WhatsApp {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex w-fit items-center gap-2 text-sm text-foreground transition-colors hover:text-brand"
              >
                <Mail className="size-4 text-brand" />
                {site.email}
              </a>
              <Link
                href="/guia-proyecto"
                className="inline-flex w-fit items-center gap-2 text-sm text-foreground transition-colors hover:text-brand"
              >
                <ArrowUpRight className="size-4 text-brand" />
                ¿Cómo trabajamos? Lee la guía antes de escribir
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-9 shadow-xl">
            <RequirementsForm />
          </div>
        </div>
      </section>
    </>
  );
}
