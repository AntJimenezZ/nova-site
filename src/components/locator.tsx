"use client";

import { useEffect } from "react";

/** LocatorJS: Alt/Option + click en cualquier elemento abre su archivo fuente. Solo en dev. */
export function Locator() {
  useEffect(() => {
    // ponytail: el guard evita que el runtime se cargue en prod, pero webpack
    // igual emite su chunk (~158 KB muertos en el CDN, nunca se descargan).
    // Si molesta: IgnorePlugin de @locator/runtime en el hook webpack de
    // next.config para producción.
    if (process.env.NODE_ENV !== "development") return;
    // Adapter "jsx" (no "react"): lee los atributos que inyecta el plugin de
    // Babel. El de React depende de fiber._debugSource, que React 19 eliminó.
    import("@locator/runtime").then((m) => m.default({ adapter: "jsx" }));
  }, []);

  return null;
}
