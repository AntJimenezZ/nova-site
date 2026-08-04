import {
  Cloud,
  CodeXml,
  Database,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import data from "../../content/services.json"

/**
 * El JSON guarda el icono por nombre; aquí se resuelve al componente. El mapa
 * es explícito a propósito: importar lucide-react entero para buscar por
 * nombre en runtime metería el set completo de iconos en el bundle.
 * Para añadir uno: impórtalo arriba, añádelo aquí y a las opciones del campo
 * `icon` en tina/config.ts.
 */
export const serviceIcons = {
  Cloud,
  CodeXml,
  Database,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Wrench,
} satisfies Record<string, LucideIcon>

export type ServiceIconName = keyof typeof serviceIcons

/** Un nombre inválido en el JSON no debe tumbar el render de la página. */
const iconFor = (name: string): LucideIcon =>
  serviceIcons[name as ServiceIconName] ?? CodeXml

export type Service = {
  slug: string
  icon: LucideIcon
  title: string
  summary: string
  description: string
  features: string[]
  tech: string[]
}

export const services: Service[] = data.services.map((s) => ({
  ...s,
  icon: iconFor(s.icon),
}))

export type Capability = {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
}

/** Complementos que acompañan a un proyecto, no se contratan sueltos. */
export const capabilities: Capability[] = data.capabilities.map((c) => ({
  ...c,
  icon: iconFor(c.icon),
}))
