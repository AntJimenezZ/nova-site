export type Project = {
  title: string
  description: string
  image: string
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

export const projects: Project[] = [
  {
    title: "Market-Place",
    description: "Tienda online completa con carrito de compras y pasarela de pagos",
    image: "/logos/digital-marketing_9541515.png",
    tech: ["React", "Node.js", "MongoDB"],
    longDescription:
      "Desarrollamos una plataforma e‑commerce escalable con catálogo administrable, búsqueda avanzada y checkout seguro. Se integró pasarela de pago (Stripe) y panel para gestión de inventario, órdenes y clientes. Diseño responsive y performance optimizado para SEO.",
    features: [
      "Catálogo con categorías, filtros y búsqueda",
      "Carrito persistente y cálculo de envíos",
      "Checkout con Stripe y webhooks",
      "Panel admin: inventario, órdenes, clientes",
      "SEO técnico y carga rápida (LCP < 2.5s)",
    ],
    outcomes: [
      "Aumento de conversión en 32%",
      "Reducción de abandono de carrito en 18%",
    ],
    metrics: [
      { label: "Usuarios/Mes", value: "15K+" },
      { label: "Tasa Conversión", value: "3.4%" },
      { label: "Core Web Vitals", value: "Good" },
    ],
    role: "Full‑stack (arquitectura, frontend, backend, DevOps)",
    duration: "12 semanas",
    client: "Retail LATAM",
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Software de Asistencia",
    description: "Panel de control empresarial para el registro de asistencia de los empleados y pagos",
    image: "/logos/data-complexity_1925161.png",
    tech: ["Vue.js", "Python", "PostgreSQL"],
    longDescription:
      "Sistema interno para RR.HH. con fichaje, control de horas, cálculo de ausencias y exportes para nómina. API segura, roles y permisos, auditoría y reportes personalizados.",
    features: [
      "Fichaje web y móvil con geolocalización",
      "Calendarios, turnos y aprobaciones",
      "Reportes y exportes (CSV/PDF)",
      "Roles, permisos y bitácora de auditoría",
    ],
    outcomes: [
      "Reducción de errores en nómina 40%",
      "Ahorro de 10h/semana en RR.HH.",
    ],
    metrics: [
      { label: "Usuarios", value: "300+" },
      { label: "Disponibilidad", value: ">99.9%" },
    ],
    role: "Backend & Frontend, integración con nómina",
    duration: "10 semanas",
    client: "Servicios B2B",
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Restaurant App",
    description: "Aplicación de reservas y pedidos para restaurantes",
    image: "/logos/restaurant_2075450.png",
    tech: ["React Native", "Firebase", "Stripe"],
    longDescription:
      "App móvil para reservas, pedidos y pagos en mesa y delivery. Notificaciones push, seguimiento de pedido en tiempo real y panel para el staff.",
    features: [
      "Reservas con recordatorios push",
      "Pedidos y pagos en app (Stripe)",
      "Tracking en tiempo real",
      "Panel para cocina y meseros",
    ],
    outcomes: [
      "+22% rotación de mesas",
      "+18% ticket promedio",
    ],
    metrics: [
      { label: "Descargas", value: "5K+" },
      { label: "Retención 30d", value: "46%" },
    ],
    role: "Mobile lead & backend en tiempo real",
    duration: "8 semanas",
    client: "Cadena gastronómica",
    links: { demo: "#", repo: "#" },
  },
]
