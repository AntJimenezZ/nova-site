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
    title: "Mea Culpa",
    description: "RPG narrativo inspirado en Dungeons & Dragons con creación de personajes y sistema de roles",
    image: "/MEACULPA.RPG.png",
    tech: ["React", "Node.js", "PostgreSQL"],
    longDescription:
      "Desarrollamos Mea Culpa, un RPG online basado en la experiencia de Dungeons & Dragons, centrado en interpretación de personajes y desempeño de roles dentro de campañas narrativas. Implementamos creación de personajes, fichas dinámicas, gestión de habilidades, inventario y progresión por sesiones, junto con herramientas para directores de juego.",
    features: [
      "Creación y personalización de personajes",
      "Sistema de fichas con atributos, clases y habilidades",
      "Gestión de inventario y progresión por campaña",
      "Panel del director para narrar y moderar sesiones",
      "Historial de decisiones y eventos por partida",
    ],
    outcomes: [
      "Mayor inmersión y continuidad en campañas multisesión",
      "Mejora en la organización de partidas y desempeño de roles",
    ],
    metrics: [
      { label: "Campañas Activas", value: "120+" },
      { label: "Jugadores Registrados", value: "2.5K+" },
      { label: "Sesiones/semana", value: "900+" },
    ],
    role: "Full‑stack (arquitectura, gameplay web, backend)",
    duration: "14 semanas",
    client: "Comunidad RPG",
    links: { demo: "https://meaculpadnd.com/", repo: "#" },
  },
  {
    title: "Software de Asistencia",
    description: "Panel de control empresarial para el registro de asistencia de los empleados y pagos",
    image: "/ToastCafe.png",
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
      { label: "Usuarios", value: "100+" },
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
