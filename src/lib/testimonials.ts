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

/** Contenido en content/testimonials.json, editable desde /admin (TinaCMS). */
export const testimonials = data.items as Testimonial[]
