import { defineConfig, type Collection, type TinaField } from "tinacms"

/**
 * Los campos tienen que reflejar la forma del JSON: Tina reescribe el archivo
 * completo al guardar, así que cualquier clave que no esté declarada aquí se
 * perdería en la primera edición desde /admin.
 */

const iconOptions = [
  "Cloud",
  "CodeXml",
  "Database",
  "Search",
  "Shield",
  "ShoppingCart",
  "Smartphone",
  "Wrench",
]

/** Un JSON suelto, no una carpeta de documentos: nadie crea ni borra archivos. */
const singleton = (
  name: string,
  label: string,
  fields: TinaField[],
): Collection => ({
  name,
  label,
  path: "content",
  format: "json",
  match: { include: name },
  ui: { allowedActions: { create: false, delete: false } },
  fields,
})

const stringList = (name: string, label: string) => ({
  type: "string" as const,
  name,
  label,
  list: true,
})

export default defineConfig({
  branch:
    process.env.TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "master",
  // Vacíos en local: `tinacms dev` levanta un backend en memoria sobre los
  // archivos del repo. Para editar en producción hacen falta los de Tina Cloud.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: {
    tina: { mediaRoot: "", publicFolder: "public" },
  },
  schema: {
    collections: [
      singleton("projects", "Proyectos", [
        {
          type: "object",
          name: "items",
          label: "Proyectos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", name: "slug", label: "Slug", required: true },
            { type: "string", name: "title", label: "Título", required: true },
            {
              type: "string",
              name: "summary",
              label: "Resumen",
              description: "Una línea para el overlay del hero. Máx ~70 caracteres.",
              required: true,
            },
            {
              type: "string",
              name: "description",
              label: "Descripción corta",
              ui: { component: "textarea" },
              required: true,
            },
            { type: "image", name: "image", label: "Imagen", required: true },
            {
              type: "string",
              name: "imageKind",
              label: "Tipo de imagen",
              description:
                "shot = captura real, a sangre. mark = solo icono/logo, se compone un póster.",
              options: ["shot", "mark"],
              required: true,
            },
            { type: "string", name: "year", label: "Año", required: true },
            {
              type: "string",
              name: "category",
              label: "Categoría",
              options: ["Web", "Móvil", "Interno"],
              required: true,
            },
            stringList("tech", "Tecnologías"),
            {
              type: "string",
              name: "longDescription",
              label: "Descripción larga",
              ui: { component: "textarea" },
            },
            stringList("features", "Funcionalidades"),
            stringList("outcomes", "Resultados"),
            {
              type: "object",
              name: "metrics",
              label: "Métricas",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label }) },
              fields: [
                { type: "string", name: "label", label: "Etiqueta" },
                { type: "string", name: "value", label: "Valor" },
              ],
            },
            { type: "string", name: "role", label: "Rol" },
            { type: "string", name: "duration", label: "Duración" },
            { type: "string", name: "client", label: "Cliente" },
            {
              type: "object",
              name: "links",
              label: "Enlaces",
              fields: [
                { type: "string", name: "demo", label: "Demo" },
                { type: "string", name: "repo", label: "Repositorio" },
              ],
            },
          ],
        },
      ]),

      singleton("services", "Servicios", [
        {
          type: "object",
          name: "services",
          label: "Servicios",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", name: "slug", label: "Slug", required: true },
            {
              type: "string",
              name: "icon",
              label: "Icono",
              description:
                "Nombre de lucide-react. Para añadir otro hay que registrarlo en src/lib/services.ts.",
              options: iconOptions,
              required: true,
            },
            { type: "string", name: "title", label: "Título", required: true },
            { type: "string", name: "summary", label: "Resumen", required: true },
            {
              type: "string",
              name: "description",
              label: "Descripción",
              ui: { component: "textarea" },
              required: true,
            },
            stringList("features", "Funcionalidades"),
            stringList("tech", "Tecnologías"),
          ],
        },
        {
          type: "object",
          name: "capabilities",
          label: "Complementos",
          description: "Acompañan a un proyecto, no se contratan sueltos.",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            {
              type: "string",
              name: "icon",
              label: "Icono",
              options: iconOptions,
              required: true,
            },
            { type: "string", name: "title", label: "Título", required: true },
            {
              type: "string",
              name: "description",
              label: "Descripción",
              ui: { component: "textarea" },
              required: true,
            },
            stringList("tags", "Etiquetas"),
          ],
        },
      ]),

      singleton("team", "Equipo", [
        {
          type: "object",
          name: "members",
          label: "Integrantes",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          fields: [
            { type: "string", name: "name", label: "Nombre", required: true },
            { type: "string", name: "role", label: "Puesto", required: true },
            {
              type: "string",
              name: "bio",
              label: "Bio",
              ui: { component: "textarea" },
              required: true,
            },
            { type: "image", name: "avatar", label: "Foto", required: true },
            stringList("technologies", "Tecnologías"),
          ],
        },
      ]),

      singleton("testimonials", "Testimonios", [
        {
          type: "object",
          name: "items",
          label: "Testimonios",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          fields: [
            { type: "string", name: "id", label: "ID", required: true },
            { type: "string", name: "name", label: "Nombre", required: true },
            { type: "string", name: "company", label: "Empresa", required: true },
            { type: "string", name: "role", label: "Puesto", required: true },
            {
              type: "string",
              name: "comment",
              label: "Comentario",
              ui: { component: "textarea" },
              required: true,
            },
            { type: "number", name: "rating", label: "Valoración (1-5)", required: true },
            {
              type: "string",
              name: "projectTitle",
              label: "Proyecto",
              required: true,
            },
            // Sin campo de foto: los avatares eran de plantilla (/avatars/*.jpg,
            // una carpeta que ni existe) y la ficha no los renderiza. Para
            // añadir fotos reales, reponer el campo y usarlo en testimonial.tsx.
          ],
        },
      ]),
    ],
  },
})
