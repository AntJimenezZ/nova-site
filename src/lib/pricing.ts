/**
 * Precios de partida. Fuente única.
 *
 * Los consumen tres sitios que antes se habrían contradicho entre sí: la tabla
 * de /servicios, el `minPrice` del JSON-LD de esa misma página y la respuesta
 * de "¿cuánto cuesta una página web?" en /guia-proyecto —que llevaba meses
 * prometiendo unos precios publicados que en realidad decían "$XXX"—.
 *
 * ponytail: rangos orientativos de mercado CR, no tarifas confirmadas por el
 * estudio. Sustituir por las reales antes de desplegar; cambiar el número aquí
 * lo propaga a la tabla, al schema y al FAQ a la vez.
 */
export type Tier = {
  title: string
  /** null = no tiene precio de partida publicable, se cotiza. */
  from: number | null
  time: string
  detail: string
}

export const pricing: Tier[] = [
  {
    title: "Landing page",
    from: 300,
    time: "1–3 semanas",
    detail: "Una página, un objetivo: que te escriban o te compren.",
  },
  {
    title: "Sitio web corporativo",
    from: 700,
    time: "3–5 semanas",
    detail: "Varias secciones, blog o catálogo y panel para editarlo tú.",
  },
  {
    title: "Tienda en línea",
    from: 1100,
    time: "4–8 semanas",
    detail: "Catálogo, carrito, pagos e inventario conectados.",
  },
  {
    title: "Aplicación a medida",
    from: null,
    time: "Por etapas",
    detail: "Sistemas internos y productos que no salen de una plantilla.",
  },
]

/**
 * en-US y no es-CR a propósito: es-CR agrupa los miles con un espacio duro
 * (U+00A0), así que "1200" salía como "$1 200" y encima dependía de los datos
 * ICU de la máquina que hace el build —Node con small-icu solo garantiza
 * en-US—. Un precio que se formatea distinto según dónde compiles es un fallo
 * que no aparece hasta producción.
 */
export const formatPrice = (from: number | null) =>
  from === null ? "Cotización" : `desde $${from.toLocaleString("en-US")}`
