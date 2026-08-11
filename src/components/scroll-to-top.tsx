"use client";

import { useEffect } from "react";
import { lenis } from "./smooth-scroll";

/**
 * Fuerza el scroll al inicio de la página cuando el componente se monta.
 * Evita el bug de Next.js App Router donde la página salta al final al
 * navegar desde un layout muy alto hacia uno más corto.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Si Lenis está activo, forzamos el scroll inmediato sin animación
    if (lenis.current) {
      lenis.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  return null;
}
