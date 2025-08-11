export type Project = {
  title: string
  description: string
  image: string
  tech: string[]
}

export const projects: Project[] = [
  {
    title: "Market-Place",
    description: "Tienda online completa con carrito de compras y pasarela de pagos",
    image: "/logos/digital-marketing_9541515.png",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Software de Asistencia",
    description: "Panel de control empresarial para el registro de asistencia de los empleados y pagos",
    image: "/logos/data-complexity_1925161.png",
    tech: ["Vue.js", "Python", "PostgreSQL"],
  },
  {
    title: "Restaurant App",
    description: "Aplicación de reservas y pedidos para restaurantes",
    image: "/logos/restaurant_2075450.png",
    tech: ["React Native", "Firebase", "Stripe"],
  },
]
