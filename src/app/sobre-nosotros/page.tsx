import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Rocket, Sparkles, Target } from "lucide-react";
import { team } from "@/lib/team";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Estudio",
  description:
    "Quiénes somos, cómo trabajamos y qué dicen los clientes de NovaSite.",
};

const values = [
  {
    icon: Target,
    title: "Enfoque en resultados",
    body: "Cada decisión se mide contra un objetivo de negocio, no contra una tendencia de diseño.",
  },
  {
    icon: Sparkles,
    title: "Calidad y detalle",
    body: "Código limpio, diseño consistente y experiencias que aguantan el uso diario.",
  },
  {
    icon: HeartHandshake,
    title: "Cercanía y transparencia",
    body: "Un canal directo con quien construye. Sin capas de gestión entre tú y el equipo.",
  },
  {
    icon: Rocket,
    title: "Iteración ágil",
    body: "Entregas cortas y mejora continua. Ves el avance real cada dos semanas.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <header className="py-14 md:py-20">
        <p className="label text-brand">Estudio</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.92] tracking-tighter">
          Un equipo pequeño
          <br />
          que entrega.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Somos cinco personas en Costa Rica que unen estrategia, diseño y
          código. Trabajas directamente con quien construye tu producto.
        </p>
      </header>

      <section
        aria-label="Nuestros valores"
        className="border-t border-line py-14 md:py-20"
      >
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Cómo pensamos
        </h2>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="reveal bg-surface p-7 md:p-8">
              <v.icon className="size-5 text-brand" aria-hidden />
              <h3 className="mt-5 font-display text-base font-semibold">
                {v.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* El equipo se muestra directamente. Antes estaba tras un clic en una
          "carpeta": una interacción que solo añadía un paso para ver contenido. */}
      <section
        aria-label="Nuestro equipo"
        className="border-t border-line py-14 md:py-20"
      >
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Quién lo construye
        </h2>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li
              key={m.name}
              className="reveal group overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">
                    {m.name}
                  </h3>
                  <span className="label text-muted-foreground">{m.role}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {m.technologies.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Testimonios de clientes"
        className="border-t border-line py-14 md:py-20"
      >
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tighter">
          Qué dicen los clientes
        </h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="reveal flex flex-col rounded-2xl border border-line bg-surface p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="label text-brand">{t.projectTitle}</span>
                {/* El número va en texto: el color y las estrellas por sí solos
                    no transmiten la nota a un lector de pantalla. */}
                <span className="tnum text-xs text-muted-foreground">
                  <span aria-hidden>{"★".repeat(t.rating)}</span>
                  <span className="sr-only">{t.rating} de 5</span>
                </span>
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed">
                “{t.comment}”
              </blockquote>

              <footer className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line py-20 text-center md:py-28">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter">
          ¿Construimos algo juntos?
        </h2>
        <p className="measure mx-auto mt-4 text-muted-foreground">
          Cuéntanos la idea y te devolvemos una propuesta sin compromiso.
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
            href="/guia-proyecto"
            className="inline-flex h-13 cursor-pointer items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            Guía de proyecto
          </Link>
        </div>
      </section>
    </div>
  );
}
