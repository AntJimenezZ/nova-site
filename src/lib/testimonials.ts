import data from "../../content/testimonials.json"

export type Testimonial = {
  id: string
  name: string
  company: string
  role: string
  comment: string
  rating: number
  projectTitle: string
}

/**
 * Contenido en content/testimonials.json.
 *
 * ponytail: la reseña de "Carlos Jimenez" (MudHakar) es texto de relleno
 * escrito por nosotros, no una cita de un cliente. Sustituir por la real antes
 * de publicar: una reseña inventada con nombre propio en un sitio comercial
 * también entra en el JSON-LD y en lo que lee Google.
 */
export const testimonials = data.items as Testimonial[]
