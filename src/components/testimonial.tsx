import type { Testimonial as TestimonialType } from "@/lib/testimonials";

/**
 * Se usa en /sobre-nosotros, /servicios y la home. Antes vivía solo en
 * /sobre-nosotros, que es la página que menos gente visita antes de decidir.
 */
export function Testimonial({ testimonial: t }: { testimonial: TestimonialType }) {
  return (
    <li className="reveal glass-card-interactive flex flex-col rounded-2xl p-7 md:p-8">
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

      <footer className="mt-6 pt-2">
        <p className="text-sm font-medium">{t.name}</p>
        <p className="text-xs text-muted-foreground">
          {t.role} · {t.company}
        </p>
      </footer>
    </li>
  );
}
