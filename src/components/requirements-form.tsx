"use client";

import { useId, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Loader2,
  XCircle,
} from "lucide-react";

/**
 * Formulario de requerimientos. Compartido por /contacto y /guia-proyecto,
 * que antes tenían dos copias del mismo formulario y de la misma lógica de envío.
 */

const PROJECT_TYPES = [
  { value: "landing-page", label: "Landing page" },
  { value: "sitio-web", label: "Sitio web corporativo" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "aplicacion-web", label: "Aplicación web" },
  { value: "marketplace", label: "Marketplace" },
  { value: "otro", label: "Otro" },
];

const BUDGETS = [
  { value: "500-1500", label: "$500 – $1 500" },
  { value: "1500-3000", label: "$1 500 – $3 000" },
  { value: "3000-5000", label: "$3 000 – $5 000" },
  { value: "5000+", label: "Más de $5 000" },
  { value: "por-definir", label: "Por definir" },
];

const TIMELINES = [
  { value: "urgente", label: "Urgente (menos de 1 mes)" },
  { value: "normal", label: "Normal (1 – 3 meses)" },
  { value: "flexible", label: "Flexible (3 – 6 meses)" },
  { value: "sin-prisa", label: "Sin prisa" },
];

const field =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-brand-vivid";

const selectField = `${field} cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`;

const caret = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23888' stroke-width='1.6'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "ok"; message: string }
  | { state: "error"; message: string };

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="label text-muted-foreground">
      {children}
    </label>
  );
}

const labelOf = (list: { value: string; label: string }[], v: string) =>
  list.find((o) => o.value === v)?.label ?? v;

export function RequirementsForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  /** jsPDF se importa bajo demanda: son ~350 kB que no deben entrar al bundle inicial. */
  async function downloadPdf() {
    const form = formRef.current;
    if (!form) return;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "");

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const left = 15;
      const right = 195;
      let y = 40;

      doc.setFillColor(0, 131, 234);
      doc.rect(0, 0, 210, 30, "F");
      doc.setFillColor(255, 255, 255);
      doc.circle(15, 15, 7, "F");
      doc.setTextColor(0, 131, 234);
      doc.setFontSize(10);
      doc.text("NS", 12.5, 18, { baseline: "bottom" });
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text("NovaSite — Formulario de Requerimientos", 30, 14);
      doc.setFontSize(10);
      doc.text(`Generado: ${new Date().toLocaleString("es-CR")}`, 30, 22);

      const section = (title: string) => {
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(12);
        doc.text(title, left, y);
        y += 3;
        doc.setDrawColor(0, 131, 234);
        doc.setLineWidth(0.6);
        doc.line(left, y, right, y);
        y += 6;
      };

      const addField = (label: string, value: string) => {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        const wrapped = doc.splitTextToSize(`${label}: ${value || "-"}`, right - left);
        doc.text(wrapped, left, y);
        y += 7 + (wrapped.length - 1) * 5;
      };

      section("Información general");
      addField("Nombre", get("nombre"));
      addField("Email", get("email"));
      addField("Empresa", get("empresa"));
      addField("Integrantes", get("integrantes"));

      section("Proyecto");
      addField("Tipo de proyecto", labelOf(PROJECT_TYPES, get("tipo-proyecto")));
      addField("Presupuesto estimado", labelOf(BUDGETS, get("presupuesto")));
      addField("Plazo", labelOf(TIMELINES, get("timeline")));

      section("Descripción");
      const desc = doc.splitTextToSize(get("descripcion") || "-", right - left);
      doc.text(desc, left, y);

      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text("© NovaSite — documento generado automáticamente", left, 285);

      const name = (get("nombre") || "proyecto").replace(/\s+/g, "_").toLowerCase();
      doc.save(`requerimientos_${name}.pdf`);
    } catch {
      setStatus({
        state: "error",
        message: "No se pudo generar el PDF. Inténtalo de nuevo.",
      });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (siteKey && !token) {
      setStatus({ state: "error", message: "Completa la verificación anti-spam." });
      return;
    }

    setStatus({ state: "sending" });
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "");

    const tipo = get("tipo-proyecto");

    const message = [
      `Nombre: ${get("nombre")}`,
      `Email: ${get("email")}`,
      `Empresa: ${get("empresa") || "—"}`,
      `Integrantes: ${get("integrantes") || "—"}`,
      `Tipo de proyecto: ${labelOf(PROJECT_TYPES, tipo)}`,
      `Presupuesto: ${labelOf(BUDGETS, get("presupuesto"))}`,
      `Plazo: ${labelOf(TIMELINES, get("timeline"))}`,
      "",
      "Descripción:",
      get("descripcion"),
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("nombre"),
          email: get("email"),
          subject: `Requerimientos: ${labelOf(PROJECT_TYPES, tipo)}`,
          message,
          turnstileToken: token,
        }),
      });

      if (!res.ok) {
        let msg = "No se pudo enviar. Inténtalo de nuevo.";
        try {
          const err = await res.json();
          if (err?.error) msg = err.error;
        } catch {
          /* sin cuerpo JSON: mensaje genérico */
        }
        setStatus({ state: "error", message: msg });
        return;
      }

      form.reset();
      setStatus({
        state: "ok",
        message: "Recibido. Te respondemos en menos de 24 h con una propuesta.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Fallo de conexión. Revisa tu red e inténtalo otra vez.",
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-5 border-0 p-0">
        <legend className="label mb-5 text-brand">Sobre ti</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-nombre`}>Nombre</Label>
            <input
              id={`${id}-nombre`}
              name="nombre"
              required
              autoComplete="name"
              placeholder="Tu nombre"
              className={field}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-email`}>Correo</Label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@empresa.com"
              className={field}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-empresa`}>Empresa (opcional)</Label>
            <input
              id={`${id}-empresa`}
              name="empresa"
              autoComplete="organization"
              placeholder="Nombre de la empresa"
              className={field}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-integrantes`}>Tamaño del equipo (opcional)</Label>
            <input
              id={`${id}-integrantes`}
              name="integrantes"
              inputMode="numeric"
              placeholder="Ej. 12 personas"
              className={field}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5 border-0 p-0">
        <legend className="label mb-5 text-brand">Sobre el proyecto</legend>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-tipo`}>Tipo de proyecto</Label>
          <select
            id={`${id}-tipo`}
            name="tipo-proyecto"
            required
            defaultValue=""
            className={selectField}
            style={caret}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {PROJECT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-presupuesto`}>Presupuesto</Label>
            <select
              id={`${id}-presupuesto`}
              name="presupuesto"
              required
              defaultValue=""
              className={selectField}
              style={caret}
            >
              <option value="" disabled>
                Selecciona un rango
              </option>
              {BUDGETS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-timeline`}>Plazo</Label>
            <select
              id={`${id}-timeline`}
              name="timeline"
              required
              defaultValue=""
              className={selectField}
              style={caret}
            >
              <option value="" disabled>
                Selecciona un plazo
              </option>
              {TIMELINES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-descripcion`}>Descripción</Label>
          <textarea
            id={`${id}-descripcion`}
            name="descripcion"
            required
            rows={6}
            placeholder="Qué problema resuelve, quién lo va a usar y qué funcionalidades no pueden faltar."
            className={`${field} h-auto resize-y py-3.5 leading-relaxed`}
          />
          <p className="text-xs text-muted-foreground">
            Si tienes referencias visuales o de producto, menciónalas aquí.
          </p>
        </div>
      </fieldset>

      {siteKey && (
        <Turnstile
          siteKey={siteKey}
          onSuccess={setToken}
          onExpire={() => setToken(null)}
          options={{ theme: "auto" }}
        />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-13 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviar requerimientos
              <ArrowUpRight className="size-4" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={downloadPdf}
          className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2"
        >
          <Download className="size-4" />
          Descargar PDF
        </button>
      </div>

      <div role="status" aria-live="polite" className="min-h-6">
        {status.state === "ok" && (
          <p className="flex items-center gap-2 text-sm text-brand">
            <CheckCircle2 className="size-4 shrink-0" />
            {status.message}
          </p>
        )}
        {status.state === "error" && (
          <p className="flex items-center gap-2 text-sm text-destructive">
            <XCircle className="size-4 shrink-0" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
