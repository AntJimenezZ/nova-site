import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { capabilities, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Desarrollo web, e-commerce, backend a medida y mantenimiento. Qué incluye cada servicio y con qué stack lo construimos.",
};

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

      <section className="border-t border-line py-14 md:py-20">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          También cubrimos
        </h2>
        <p className="measure mt-4 text-muted-foreground">
          Complementos que acompañan a un proyecto. No se contratan sueltos.
        </p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li key={c.title} className="reveal bg-surface p-7">
              <c.icon className="size-5 text-brand" aria-hidden />
              <h3 className="mt-5 font-display text-base font-semibold">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
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
    </div>
  );
}
