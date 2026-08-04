import data from "../../content/team.json"

export type Member = {
  name: string
  role: string
  bio: string
  avatar: string
  technologies: string[]
}

/** Contenido en content/team.json, editable desde /admin (TinaCMS). */
export const team = data.members as Member[]
