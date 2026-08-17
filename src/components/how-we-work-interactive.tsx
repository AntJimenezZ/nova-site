"use client";

import { useState } from "react";
import {
  MessageSquare,
  Smartphone,
  Layers,
  Rocket,
  CheckCircle2,
  Calendar,
} from "lucide-react";

type Step = {
  number: string;
  title: string;
  shortDesc: string;
  detailedText: string;
  icon: React.ElementType;
  whatYouReceive: string;
  clientTimeRequired: string;
  mockBadge: string;
  mockTitle: string;
  mockSubtitle: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Conversación inicial",
    shortDesc: "Aterrizamos la idea y definimos qué necesita tu negocio.",
    detailedText:
      "Nos reunimos en una llamada breve o por chat para entender qué vendes, a quién le vendes y qué problema resolvemos. Salimos con un presupuesto claro, alcance definido y fecha de entrega sin sorpresas.",
    icon: MessageSquare,
    whatYouReceive: "Propuesta con precio cerrado, funciones incluidas y fecha de entrega",
    clientTimeRequired: "30 a 45 minutos",
    mockBadge: "Paso 1: Claridad total",
    mockTitle: "Plan de trabajo aprobado",
    mockSubtitle: "Alcance definido · Presupuesto fijo · Cronograma claro",
  },
  {
    number: "02",
    title: "Prueba de diseño en tu celular",
    shortDesc: "Ves y pruebas cómo se verá todo antes de construirlo.",
    detailedText:
      "Te enviamos un prototipo navegable para que lo abras en tu propio teléfono o computadora. Puedes hacer clic, ver los colores, textos y flujo de compra. Si quieres cambiar algo, lo ajustamos de inmediato.",
    icon: Smartphone,
    whatYouReceive: "Enlace privado para navegar el diseño interactivo en tu celular",
    clientTimeRequired: "1 a 2 sesiones de revisión",
    mockBadge: "Paso 2: Prototipo navegable",
    mockTitle: "Diseño listo para probar",
    mockSubtitle: "Navegación real en celular · Textos aprobados · Cero sorpresas",
  },
  {
    number: "03",
    title: "Entregas reales cada 15 días",
    shortDesc: "Pruebas las funciones en un enlace real conforme avanzamos.",
    detailedText:
      "No te dejamos esperando meses a ciegas. Cada dos semanas tienes acceso a una versión funcional en internet donde ves los formularios funcionando, las pasarelas de pago y los paneles de control.",
    icon: Layers,
    whatYouReceive: "Acceso a la plataforma de pruebas con avances funcionales",
    clientTimeRequired: "15 min cada dos semanas",
    mockBadge: "Paso 3: Avance continuo",
    mockTitle: "Plataforma activa en pruebas",
    mockSubtitle: "Pagos funcionando · Base de datos conectada · Pruebas en vivo",
  },
  {
    number: "04",
    title: "Lanzamiento y capacitación",
    shortDesc: "Publicamos tu plataforma y te enseñamos a usarla.",
    detailedText:
      "Ponemos tu sitio o sistema en producción bajo tu propio dominio. Te enseñamos a administrarlo mediante una sesión guiada o video paso a paso, y seguimos disponibles cuando necesites soporte.",
    icon: Rocket,
    whatYouReceive: "Tu plataforma en línea, credenciales, guía de uso y soporte continuo",
    clientTimeRequired: "Capacitación guiada de 1 hora",
    mockBadge: "Paso 4: En producción",
    mockTitle: "100% Listo para tus clientes",
    mockSubtitle: "Dominio configurado · Pagos activos · Acompañamiento directo",
  },
];

export function HowWeWorkInteractive() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <div className="w-full">
      {/* Interactive Step Navigator */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => {
          const isActive = index === activeStepIndex;
          const Icon = step.icon;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStepIndex(index)}
              className={`group flex cursor-pointer flex-col items-start rounded-2xl p-5 text-left transition-all duration-300 ${
                isActive
                  ? "glass-card shadow-lg ring-2 ring-brand"
                  : "glass-card-interactive"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`font-display text-sm font-bold ${
                    isActive ? "text-brand" : "text-muted-foreground"
                  }`}
                >
                  {step.number}
                </span>
                <div
                  className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-brand-soft text-brand"
                      : "bg-surface text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                </div>
              </div>

              <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Details & Deliverable Visual */}
      <div className="glass-card mt-8 rounded-3xl p-6 shadow-2xl md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
          {/* Details */}
          <div>
            <span className="label tnum text-brand">
              Etapa {activeStep.number}
            </span>

            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {activeStep.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {activeStep.detailedText}
            </p>

            <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-surface-2/70 p-4 text-xs backdrop-blur-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <div>
                  <span className="font-semibold text-foreground">Lo que recibes en esta etapa: </span>
                  <span className="text-muted-foreground">{activeStep.whatYouReceive}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Calendar className="size-4 shrink-0 text-brand" />
                <span>
                  <strong className="text-foreground">Tiempo requerido de tu lado:</strong>{" "}
                  {activeStep.clientTimeRequired}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive visual card */}
          <div className="glass-card flex flex-col gap-3 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-line/60 pb-3">
              <span className="text-xs font-semibold text-foreground">
                {activeStep.mockBadge}
              </span>
              <span className="text-xs text-muted-foreground">Paso {activeStep.number}</span>
            </div>

            <div className="mt-2">
              <h4 className="font-display text-lg font-bold text-foreground">
                {activeStep.mockTitle}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeStep.mockSubtitle}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-2/70 p-3.5 text-xs backdrop-blur-sm">
              <span className="text-muted-foreground">Transparencia:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                100% comunicación directa
              </span>
            </div>

            <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
              <span>Siguiente paso:</span>
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) => (prev + 1) % STEPS.length)
                }
                className="cursor-pointer font-medium text-brand hover:underline"
              >
                {activeStepIndex === STEPS.length - 1
                  ? "Volver al inicio"
                  : `Ver paso 0${activeStepIndex + 2} →`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
