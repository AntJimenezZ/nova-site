import data from "../../content/projects.json"

export type Project = {
  slug: string
  title: string
  /** Una línea para el overlay del hero. Máx ~70 caracteres. */
  summary: string
  description: string
  image: string
  gallery?: string[]
  /**
   * "shot" = captura real del producto, se muestra a sangre.
   * "mark" = solo tenemos el icono/logo, se compone un póster de marca en su lugar.
   * Distinguirlos evita estirar un icono de 512px a pantalla completa.
   */
  imageKind: "shot" | "mark"
  year: string
  category: "Web" | "Móvil" | "Interno"
  tech: string[]
  longDescription?: string
  features?: string[]
  outcomes?: string[]
  metrics?: { label: string; value: string }[]
  role?: string
  duration?: string
  client?: string
  links?: { demo?: string; repo?: string }
}

/**
 * El contenido vive en content/projects.json. El JSON no puede expresar las
 * uniones de `imageKind` ni `category`, así que el cast las reafirma aquí.
 */
export const projects = (data.items as Project[]).filter(Boolean)
