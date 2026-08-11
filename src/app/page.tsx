import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { HeroShowreel } from "@/components/showreel";
import { RequirementsForm } from "@/components/requirements-form";
import { Testimonial } from "@/components/testimonial";
import { WhatsAppIcon } from "@/components/brand-icons";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { team } from "@/lib/team";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";

/**
 * Cifras que el visitante puede verificar bajando a la sección de trabajo.
 * Antes decía "+20 proyectos entregados" con tres casos publicados: un número
 * que el usuario desmiente en un scroll cuesta más que no poner número.
 */
const stats = [
  { value: `${projects.length}`, label: "Proyectos en producción" },
  { value: "100%", label: "Entregados y funcionando" },
  { value: "<24 h", label: "Tiempo de respuesta" },
  { value: `${team.length}`, label: "Personas en el equipo" },
];

const process = [
  {
    title: "Entender",
    body: "Una sesión para separar lo que hay que construir de lo que suena bien. Salimos con alcance, plazo y precio.",
  },
  {
    title: "Diseñar",
    body: "Wireframe y prototipo navegable antes de escribir la primera línea. Si algo no funciona, se cambia aquí.",
  },
  {
    title: "Construir",
    body: "Entregas cada dos semanas en un entorno real. Ves el avance, no un informe del avance.",
  },
  {
    title: "Sostener",
    body: "Monitoreo, parches y mejoras después del lanzamiento. Un proyecto en producción no está terminado.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroShowreel projects={projects} />

      {/* Cifras: da contexto inmediato tras el showreel, sin párrafos de relleno */}
      <section
        aria-label="Cifras del estudio"
        className="border-b border-line bg-surface-2"
      >
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px px-5 py-10 md:grid-cols-4 md:px-10 md:py-14">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum block font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-tighter">
                  {s.value}
                </span>
                <span className="mt-2 block text-xs leading-snug text-muted-foreground md:text-sm">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Servicios */}
      <section
        id="servicios"
        className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>

            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
              Nos enfocamos en:
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand"
          >
            Ver el detalle
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="reveal bg-surface">
              <Link
                href={`/servicios#${s.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-200 hover:bg-surface-2 md:p-9"
              >
                <s.icon
                  className="size-6 text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="measure mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Ver detalle
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Trabajo seleccionado: índice tipo tabla, la ficha completa vive en /proyectos */}
      <section
        id="trabajo"
        className="border-y border-line bg-surface-2 py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>

              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
                Casos recientes
              </h2>
            </div>
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand"
            >
              Ver todos los casos
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ol className="mt-12 border-t border-line">
            {projects.map((p, i) => (
              <li key={p.slug} className="reveal">
                <Link
                  href={`/proyectos/${p.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b border-line py-6 transition-colors hover:bg-surface md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto_auto] md:gap-x-8 md:py-8"
                >
                  <span className="label tnum text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-display text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                    {p.title}
                  </h3>

                  <p className="col-start-2 row-start-2 text-sm text-muted-foreground md:col-start-3 md:row-start-1 md:truncate">
                    {p.summary}
                  </p>

                  <span className="label col-start-3 row-start-1 text-muted-foreground md:col-start-4">
                    {p.category} · {p.year}
                  </span>

                  <ArrowUpRight className="col-start-3 row-start-2 size-5 justify-self-end text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand md:col-start-5 md:row-start-1" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">

            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
              Cómo trabajamos
            </h2>
            <p className="measure mt-5 text-sm leading-relaxed text-muted-foreground">
              Cuatro etapas, sin sorpresas en el camino. Cada una termina con
              algo que puedes ver y aprobar.
            </p>
          </div>

          <ol className="border-t border-line">
            {process.map((step, i) => (
              <li
                key={step.title}
                className="reveal grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-8 md:gap-x-10 md:py-10"
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

      {/* Equipo */}
      <section
        id="equipo"
        className="border-y border-line bg-surface-2 py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">

          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tighter">
            Quién lo construye
          </h2>

          <ul className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {team.map((m) => (
              <li key={m.name} className="reveal group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-surface">
                  <Image
                    src={m.avatar}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {m.name}
                </h3>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </li>
            ))}
          </ul>
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
              Sin compromiso y sin llamadas de descubrimiento de una hora.
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

          <div className="rounded-2xl border border-line bg-surface p-6 md:p-9">
            <RequirementsForm />
          </div>
        </div>
      </section>
    </>
  );
}
