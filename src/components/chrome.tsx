"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { lenis } from "@/components/smooth-scroll";
import { socials } from "@/components/brand-icons";

const NAV = [
  { href: "/proyectos", label: "Trabajo" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Estudio" },
  { href: "/contacto", label: "Contacto" },
];

/** Marca "N": dos pilares y una diagonal. Hereda currentColor, así sirve en ambos temas. */
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <rect x="2" y="3" width="4.2" height="18" rx="1" />
      <rect x="17.8" y="3" width="4.2" height="18" rx="1" />
      <rect
        x="9.9"
        y="1.4"
        width="4.2"
        height="21.2"
        rx="1"
        transform="rotate(20 12 12)"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-5 w-5 text-brand-vivid" />
      <span className="font-display text-[0.95rem] font-bold uppercase tracking-[0.2em]">
        Novasite
      </span>
    </span>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Arranca en null: hasta que no monta no sabemos qué puso el script de <head>,
  // y pintar el icono equivocado en SSR provoca un parpadeo peor que no pintar nada.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* modo privado: el tema simplemente no persiste */
    }
    setDark(next);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-muted-foreground transition-colors duration-200 hover:border-line-strong hover:text-foreground ${className}`}
    >
      {dark === null ? (
        <span className="size-[18px]" />
      ) : dark ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // <dialog> nativo: nos da foco atrapado, Escape y fondo inerte sin escribirlo a mano.
  // Lenis se para aparte: mantiene su propio rAF y seguiría moviendo el fondo.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      lenis.current?.stop();
    }
    if (!open && el.open) {
      el.close();
      lenis.current?.start();
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        <Link
          href="/"
          className="shrink-0 text-foreground transition-opacity hover:opacity-70"
        >
          <Wordmark />
          <span className="sr-only">NovaSite, ir al inicio</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-px h-px bg-brand-vivid" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contacto"
            className="hidden h-11 cursor-pointer items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
          >
            Iniciar proyecto
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-foreground lg:hidden"
          >
            <Menu className="size-[18px]" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-foreground/40 backdrop:backdrop-blur-sm open:flex open:justify-end"
      >
        <div className="flex h-full w-full flex-col bg-background p-6 sm:max-w-sm sm:border-l sm:border-line">
          <div className="flex items-center justify-between">
            <Wordmark className="text-foreground" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-foreground"
            >
              <X className="size-[18px]" />
            </button>
          </div>

          <nav aria-label="Móvil" className="mt-12 flex flex-col">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-line py-5 font-display text-2xl text-foreground"
              >
                <span>{item.label}</span>
                <span className="label tnum text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <Link
            href="/contacto"
            className="mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
          >
            Iniciar proyecto
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </dialog>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark className="text-foreground" />
            <p className="measure mt-5 text-sm leading-relaxed text-muted-foreground">
              Estudio de software en Costa Rica. Diseñamos y construimos
              productos digitales que llegan a producción y se quedan ahí.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h2 className="label text-muted-foreground">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-muted-foreground">Contacto</h2>
            {/* Icono + nombre + identificador. El icono nunca va solo: es
                decorativo (aria-hidden) y el texto es quien nombra el enlace. */}
            <ul className="mt-4 space-y-0.5">
              {socials.map(({ name, handle, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-2.5 flex min-h-11 items-center gap-3 rounded-lg px-2.5 text-sm transition-colors hover:bg-surface"
                  >
                    <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-brand" />
                    {/* min-w fija la columna del nombre: sin esto los
                        identificadores quedan dentados, porque "X" ocupa
                        mucho menos que "Instagram". */}
                    <span className="min-w-20 text-foreground">{name}</span>
                    <span className="truncate text-muted-foreground">{handle}</span>
                    <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NovaSite. Todos los derechos reservados.</p>
          <p className="tnum">San Carlos, Costa Rica</p>
        </div>
      </div>
    </footer>
  );
}
