import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * Renderiza el visual de un proyecto.
 *
 * Si solo tenemos el icono (imageKind "mark") compone un póster de marca en vez
 * de estirar 512 px a pantalla completa. Sin "use client": así /proyectos
 * renderiza estas imágenes en el servidor y no paga JS por ellas.
 */
export function ProjectMedia({
  project,
  priority = false,
  sizes = "100vw",
  quality,
  className = "",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
}) {
  if (project.imageKind === "mark") {
    return (
      <div
        className={`relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-stage [container-type:inline-size] ${className}`}
      >
        <div className="grid-lines absolute inset-0 opacity-[0.06]" />
        <div
          aria-hidden
          className="absolute -top-1/4 left-1/2 aspect-square w-[70%] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--brand-vivid) 0%, transparent 65%)",
            opacity: 0.28,
          }}
        />
        {/* cqw, no vw: la palabra fantasma se mide contra su contenedor, así no
            se recorta cuando el póster es más estrecho que la ventana. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-4%] select-none truncate text-center font-display text-[13cqw] font-bold leading-none tracking-tighter text-stage-foreground/[0.06]"
        >
          {project.title.split(" ")[0]}
        </span>
        <Image
          src={project.image}
          alt={`Icono de ${project.title}`}
          width={512}
          height={512}
          priority={priority}
          quality={quality}
          sizes="(max-width: 768px) 40vw, 320px"
          className="relative z-10 size-[38%] max-w-[320px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        />
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`Captura de ${project.title}`}
      fill
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={`object-cover object-top ${className}`}
    />
  );
}
