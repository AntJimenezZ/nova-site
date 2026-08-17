import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { RequirementsForm } from "@/components/requirements-form";
import { socials } from "@/components/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, openGraphFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Necesitas una página web para tu negocio en Costa Rica? Cuéntanos tu proyecto y te respondemos en menos de 24 horas con alcance, plazo y precio.",
  alternates: { canonical: "/contacto" },
  openGraph: openGraphFor(
    "/contacto",
    "Contacto · NovaSite",
    "Escríbenos por WhatsApp, correo o el formulario. Respondemos en menos de 24 horas con alcance, plazo y precio.",
  ),
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <header className="py-14 md:py-20">

        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Hablemos de
          <br />
          tu proyecto.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Rellena el formulario y con gusto te responderemos en menos de 24 horas hábiles.
        </p>
      </header>

      <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20 md:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
            <div>
              <p className="text-sm font-medium">Respuesta en 24 h</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                De lunes a viernes. Si escribes el fin de semana, te contestamos
                el lunes a primera hora.
              </p>
            </div>
          </div>

          <h2 className="label mt-10 text-muted-foreground">Canales directos</h2>
          <ul className="mt-5 flex flex-col gap-2.5">
            {socials.map(({ name, handle, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-card-interactive flex items-center gap-4 rounded-2xl px-5 py-4"
                >
                  <div className="glass-pill flex size-9 items-center justify-center rounded-xl">
                    <Icon className="size-[18px] text-brand" />
                  </div>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{handle}</span>
                    <span className="block text-xs text-muted-foreground">
                      {name}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            ¿Quieres saber cómo trabajamos antes de escribir?{" "}
            <Link href="/guia-proyecto" className="text-brand underline underline-offset-4">
              Lee cómo trabajamos
            </Link>
            .
          </p>
        </aside>

        <div className="glass-card rounded-3xl p-6 md:p-10 shadow-xl">
          <RequirementsForm />
        </div>
      </div>

      <JsonLd data={breadcrumbSchema([{ name: "Contacto", path: "/contacto" }])} />
    </div>
  );
}
