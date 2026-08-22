"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "novasite_cookie_consent";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Retraso sutil para que la entrada se sienta natural y no interrumpa el primer render
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Entorno con almacenamiento bloqueado / privado
    }
  }, []);

  const handleChoice = (choice: "all" | "necessary") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Modo incógnito estricto
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      aria-label="Aviso de privacidad y cookies"
      role="region"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 right-4 z-40 max-w-lg rounded-2xl border border-line bg-surface/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:left-6 sm:right-auto md:p-6"
    >
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground font-display">
            Preferencias de privacidad y cookies
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Utilizamos cookies técnicas para el funcionamiento del sitio y analíticas
            anónimas para comprender el uso y mejorar la experiencia. Puedes aceptar
            todas o limitarlas a las esenciales. Consulta nuestra{" "}
            <Link
              href="/privacidad"
              className="text-foreground underline underline-offset-2 hover:text-brand transition-colors"
            >
              política de privacidad
            </Link>
            .
          </p>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={() => handleChoice("necessary")}
            className="inline-flex h-8 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent px-4 text-xs font-medium text-foreground transition-all duration-200 hover:border-line-strong hover:bg-surface-2 active:scale-[0.98]"
          >
            Solo necesarias
          </button>
        </div>
      </div>
    </aside>
  );
}
