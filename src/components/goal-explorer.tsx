"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  MessageSquare,
  ShoppingBag,
  Sliders,
  ShieldCheck,
  Smartphone,
  CreditCard,
  TrendingUp,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";

type Goal = {
  id: string;
  tabLabel: string;
  icon: React.ElementType;
  headline: string;
  lead: string;
  deliverables: string[];
  timing: string;
  priceFrom: string;
  ctaText: string;
  ctaHref: string;
  simulatorType: "whatsapp-lead" | "ecommerce-sinpe" | "dashboard-ops" | "maintenance-peace";
};

const GOALS: Goal[] = [
  {
    id: "clientes",
    tabLabel: "Conseguir clientes",
    icon: MessageSquare,
    headline: "Una página web que convierte visitas en mensajes al WhatsApp",
    lead: "Cuando una persona busca lo que ofreces en Google, encuentra tu negocio, tu página abre en 1 segundo en su celular y con un toque ya te está cotizando.",
    deliverables: [
      "Diseño claro y profesional adaptado a la identidad de tu negocio",
      "Carga instantánea en cualquier celular o conexión 4G",
      "Botón directo a tu WhatsApp y llamada telefónica en cada pantalla",
      "Estructura preparada para aparecer cuando la gente busque en Google",
      "Ubicación en Google Maps, horarios y formulario de cotización",
    ],
    timing: "1 a 3 semanas",
    priceFrom: "Desde $500",
    ctaText: "Cotizar página web",
    ctaHref: "/contacto",
    simulatorType: "whatsapp-lead",
  },
  {
    id: "tienda",
    tabLabel: "Vender por internet",
    icon: ShoppingBag,
    headline: "Tu tienda virtual con pagos por SINPE Móvil y tarjeta",
    lead: "Tus clientes eligen productos, pagan en segundos y a ti te llega el pedido ordenado con comprobante listo para despachar.",
    deliverables: [
      "Catálogo de productos organizado por categorías y fotos claras",
      "Cobros automáticos con SINPE Móvil, tarjetas de crédito/débito o Stripe",
      "Control de inventario que descuenta stock automáticamente al vender",
      "Cálculo de costo de envío según la zona del cliente",
      "Aviso inmediato a tu WhatsApp y correo con cada nueva compra",
    ],
    timing: "3 a 5 semanas",
    priceFrom: "Desde $1 200",
    ctaText: "Cotizar tienda virtual",
    ctaHref: "/contacto",
    simulatorType: "ecommerce-sinpe",
  },
  {
    id: "sistema",
    tabLabel: "Automatizar la operación",
    icon: Sliders,
    headline: "Un sistema interno para ordenar tu negocio en un solo lugar",
    lead: "Centraliza facturación, inventario, citas, expedientes o turnos de trabajo. Toda la información respaldada y accesible desde cualquier computadora o celular.",
    deliverables: [
      "Panel de control exclusivo con acceso seguro para ti y tus colaboradores",
      "Automatización de cálculos, reportes diarios y facturación",
      "Historial de clientes, movimientos y registros sin peligro de pérdida",
      "Permisos por usuario: el operador ve lo suyo y la gerencia tiene control total",
      "Exportación de reportes a PDF y Excel con un solo clic",
    ],
    timing: "Cotizado por etapas",
    priceFrom: "Según alcance",
    ctaText: "Consultar sistema a medida",
    ctaHref: "/contacto",
    simulatorType: "dashboard-ops",
  },
  {
    id: "soporte",
    tabLabel: "Mantenimiento y cuidado",
    icon: ShieldCheck,
    headline: "Tu sitio seguro, respaldado y con un equipo listo para ayudarte",
    lead: "Nos encargamos de que tu página esté siempre rápida, protegida contra fallos y actualizada. Cuando necesitas un cambio, nos escribes y lo resolvemos.",
    deliverables: [
      "Copias de seguridad semanales y mensuales de toda tu información",
      "Monitoreo constante para evitar caídas o fallos en momentos clave",
      "Actualizaciones de seguridad para mantener tu sitio protegido",
      "Atención directa por WhatsApp o correo cuando necesites cambios",
      "Optimización continua para que tu sitio nunca se vuelva lento",
    ],
    timing: "Suscripción mensual flexible",
    priceFrom: "Planes accesibles",
    ctaText: "Solicitar mantenimiento",
    ctaHref: "/contacto",
    simulatorType: "maintenance-peace",
  },
];

function SimulatorMockup({ type }: { type: Goal["simulatorType"] }) {
  if (type === "whatsapp-lead") {
    return (
      <div className="glass-card flex flex-col gap-3 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-line/60 pb-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Smartphone className="size-4 text-brand" />
            Vista del cliente en su celular
          </span>
          <span className="text-[0.75rem] font-medium text-emerald-600 dark:text-emerald-400">
            Carga en 0.7 s
          </span>
        </div>

        {/* Lead bubble demo */}
        <div className="mt-1 flex flex-col gap-2 rounded-xl bg-surface-2/70 p-4 text-xs backdrop-blur-sm">
          <p className="font-semibold text-foreground">Google: «Servicio en Costa Rica»</p>
          <p className="text-muted-foreground">Tu página aparece de primera con enlace directo al WhatsApp.</p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
            <WhatsAppIcon className="size-4" />
            Mensaje pre-redactado al entrar:
          </div>
          <p className="mt-1.5 italic text-foreground/90">
            «Hola, vi su página web y me gustaría cotizar un servicio para esta semana.»
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Tasa de contacto estimada:</span>
          <span className="font-semibold text-foreground">+65% más leads directos</span>
        </div>
      </div>
    );
  }

  if (type === "ecommerce-sinpe") {
    return (
      <div className="glass-card flex flex-col gap-3 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-line/60 pb-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <CreditCard className="size-4 text-brand" />
            Cobro en tiempo real
          </span>
          <span className="text-[0.75rem] font-medium text-brand">
            Sin comisiones ocultas
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-surface-2/70 p-3.5 text-xs backdrop-blur-sm">
          <div>
            <p className="font-semibold text-foreground">Pedido #1042 — Confirmado</p>
            <p className="text-muted-foreground">2 productos · Envío GAM</p>
          </div>
          <span className="font-display font-bold text-foreground">₡24 500</span>
        </div>

        <div className="rounded-xl border border-line bg-surface/50 p-3.5 text-xs backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Método de pago:</span>
            <span className="font-medium text-foreground">SINPE Móvil / Tarjeta</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-muted-foreground">
            <span>Inventario restante:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">Descontado (8 en stock)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="size-3.5 text-brand" />
          <span>Comprobante enviado al correo del cliente y a tu WhatsApp</span>
        </div>
      </div>
    );
  }

  if (type === "dashboard-ops") {
    return (
      <div className="glass-card flex flex-col gap-3 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-line/60 pb-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <TrendingUp className="size-4 text-brand" />
            Panel operativo centralizado
          </span>
          <span className="text-[0.75rem] font-medium text-muted-foreground">
            Acceso seguro por rol
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="rounded-xl bg-surface-2/70 p-3.5 backdrop-blur-sm">
            <p className="text-[0.7rem] text-muted-foreground">Registros del mes</p>
            <p className="mt-1 font-display text-lg font-bold text-foreground">1 420</p>
            <p className="text-[0.65rem] text-emerald-600 dark:text-emerald-400">0 pérdidas de datos</p>
          </div>
          <div className="rounded-xl bg-surface-2/70 p-3.5 backdrop-blur-sm">
            <p className="text-[0.7rem] text-muted-foreground">Tiempo ahorrado</p>
            <p className="mt-1 font-display text-lg font-bold text-brand">~12 h / sem</p>
            <p className="text-[0.65rem] text-muted-foreground">En tareas repetitivas</p>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface/50 p-3.5 text-xs backdrop-blur-sm">
          <p className="font-semibold text-foreground">Facturación y control al día</p>
          <p className="mt-1 text-muted-foreground">Sin depender de hojas de cálculo que se borran o dañan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex flex-col gap-3 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-line/60 pb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <ShieldCheck className="size-4 text-emerald-500" />
          Estado de tu plataforma
        </span>
        <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          100% Operativo
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-surface-2/70 p-3 backdrop-blur-sm">
          <span className="text-muted-foreground">Último respaldo completo:</span>
          <span className="font-medium text-foreground">Hoy, 03:00 AM (Automático)</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-surface-2/70 p-3 backdrop-blur-sm">
          <span className="text-muted-foreground">Protección de seguridad:</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Activa y sin alertas</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-surface-2/70 p-3 backdrop-blur-sm">
          <span className="text-muted-foreground">Canal de atención:</span>
          <span className="font-medium text-brand">Respuesta directa en &lt;24 h</span>
        </div>
      </div>

      <p className="text-center text-[0.75rem] text-muted-foreground">
        Tú te concentras en tu negocio, nosotros cuidamos el software.
      </p>
    </div>
  );
}

export function GoalExplorer() {
  const [selectedGoalId, setSelectedGoalId] = useState<string>("clientes");
  const activeGoal = GOALS.find((g) => g.id === selectedGoalId) || GOALS[0];

  return (
    <div className="w-full">
      {/* Interactive Tabs bar */}
      <div
        role="tablist"
        aria-label="Metas de negocio"
        className="glass-card flex flex-wrap items-center gap-2 rounded-2xl p-2.5 shadow-lg"
      >
        {GOALS.map((goal) => {
          const isSelected = goal.id === selectedGoalId;
          const Icon = goal.icon;

          return (
            <button
              key={goal.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedGoalId(goal.id)}
              className={`group flex cursor-pointer items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isSelected
                  ? "glass-card text-foreground shadow-md ring-1 ring-line-strong"
                  : "text-muted-foreground hover:bg-surface/50 hover:text-foreground"
                }`}
            >
              <Icon
                className={`size-4 transition-transform duration-200 ${isSelected ? "text-brand scale-110" : "text-muted-foreground group-hover:text-foreground"
                  }`}
              />
              <span>{goal.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Goal Stage */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14">
        {/* Left Side: Tangible Details */}
        <div className="flex flex-col">
          <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {activeGoal.headline}
          </h3>

          <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
            {activeGoal.lead}
          </p>

          <div className="mt-6 flex flex-col">
            <h4 className="label text-muted-foreground">Lo que incluye para tu negocio:</h4>
            <ul className="mt-4 space-y-3">
              {activeGoal.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                  <div className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="size-3 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Time & starting cost indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line/60 pt-6">
            <div>
              <p className="label text-muted-foreground">Tiempo de entrega</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Clock className="size-4 text-brand" />
                {activeGoal.timing}
              </p>
            </div>
            <div>
              <p className="label text-muted-foreground">Punto de partida</p>
              <p className="mt-1 text-sm font-semibold text-brand font-display">
                {activeGoal.priceFrom}
              </p>
            </div>
            <Link
              href={activeGoal.ctaHref}
              className="ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              {activeGoal.ctaText}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Live Result Simulator */}
        <div className="relative">
          <SimulatorMockup type={activeGoal.simulatorType} />
        </div>
      </div>
    </div>
  );
}
