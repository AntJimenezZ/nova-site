"use client";

import { useId, useState } from "react";
import { CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { site } from "@/lib/site";

/**
 * Único formulario de contacto del sitio. Antes había dos componentes distintos
 * —uno corto en la home, uno de 8 campos en /contacto y /guia-proyecto—, así que
 * el sitio pedía cosas diferentes según la puerta por la que entrara la persona.
 *
 * Ahora es uno en dos modos: corto por defecto y el detalle detrás de un
 * <details>. Quien tiene el proyecto definido lo abre; quien no, lo ignora.
 */

const PROJECT_TYPES = [
  { value: "landing-page", label: "Landing page" },
  { value: "sitio-web", label: "Sitio web corporativo" },
  { value: "ecommerce", label: "Tienda en línea" },
  { value: "aplicacion-web", label: "Aplicación web" },
  { value: "marketplace", label: "Marketplace" },
  { value: "otro", label: "Otro / no lo sé" },
];

/**
 * Sin "Por definir" al final de la lista: esa opción ahora es la primera y es
 * el valor por defecto. Cuatro cifras antes de poder decir "no sé" filtran
 * justo al cliente que nunca ha comprado software, que es el público objetivo.
 */
const BUDGETS = [
  { value: "500-1500", label: "$500 – $1 500" },
  { value: "1500-3000", label: "$1 500 – $3 000" },
  { value: "3000-5000", label: "$3 000 – $5 000" },
  { value: "5000+", label: "Más de $5 000" },
];

const TIMELINES = [
  { value: "urgente", label: "Urgente (menos de 1 mes)" },
  { value: "normal", label: "Normal (1 – 3 meses)" },
  { value: "flexible", label: "Flexible (3 – 6 meses)" },
  { value: "sin-prisa", label: "Sin prisa" },
];

const SIN_RESPUESTA = "Aún no lo sé";

const field =
  "h-12 w-full rounded-xl border border-line/80 bg-surface/80 backdrop-blur-md px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-brand-vivid focus:bg-surface focus:shadow-sm";

const selectField = `${field} cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`;

const caret = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23888' stroke-width='1.6'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
};

type Status =
  | { state: "idle" }
  | { state: "ok"; message: string }
  | { state: "error"; message: string };

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="label text-muted-foreground">
      {children}
    </label>
  );
}

/** Vacío = la persona dejó el campo opcional sin tocar, no un dato perdido. */
const labelOf = (list: { value: string; label: string }[], v: string) =>
  list.find((o) => o.value === v)?.label ?? (v || SIN_RESPUESTA);

export function RequirementsForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  /**
   * El envío no pasa por el servidor: compone el mensaje y abre WhatsApp con el
   * texto ya escrito, sobre el número de `site`.
   *
   * Síncrono a propósito. Si hubiera un `await` antes de window.open, el
   * navegador dejaría de ver la llamada como parte del clic y la bloquearía
   * como popup.
   */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();

    const empresa = get("empresa");
    const integrantes = get("integrantes");

    // Los opcionales vacíos se caen en vez de mandar "—": esto lo lee una
    // persona en el móvil, no es un volcado de campos. Se filtra por null y no
    // por valor falsy para no perder las líneas en blanco que separan bloques.
    const message = [
      "Hola NovaSite, quiero cotizar un proyecto.",
      "",
      `Nombre: ${get("nombre")}`,
      `Correo: ${get("email")}`,
      empresa ? `Empresa: ${empresa}` : null,
      integrantes ? `Integrantes: ${integrantes}` : null,
      `Tipo de proyecto: ${labelOf(PROJECT_TYPES, get("tipo-proyecto"))}`,
      `Presupuesto: ${labelOf(BUDGETS, get("presupuesto"))}`,
      `Plazo: ${labelOf(TIMELINES, get("timeline"))}`,
      "",
      "Descripción:",
      get("descripcion"),
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    const win = window.open(
      `${site.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    if (!win) {
      setStatus({
        state: "error",
        message: `No se pudo abrir WhatsApp; puede ser el bloqueador de ventanas. Escríbenos a ${site.phoneDisplay}.`,
      });
      return;
    }

    // `noopener` en las features haría que window.open devolviera null siempre
    // y no habría forma de distinguir el bloqueo. Se corta la referencia aquí.
    win.opener = null;
    setStatus({
      state: "ok",
      message: "Te abrimos WhatsApp con el mensaje redactado. Solo dale enviar.",
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-tipo`}>Qué necesitas</Label>
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

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-descripcion`}>Cuéntanos</Label>
        <textarea
          id={`${id}-descripcion`}
          name="descripcion"
          required
          rows={5}
          placeholder="Qué problema resuelve, quién lo va a usar y qué no puede faltar. Con un par de líneas nos basta para empezar."
          className={`${field} h-auto resize-y py-3.5 leading-relaxed`}
        />
        <p className="text-xs text-muted-foreground">
          Si tienes referencias visuales o de productos parecidos, menciónalas
          aquí.
        </p>
      </div>

      {/* <details> nativo: la persona decide cuánto esfuerzo invierte.
          Antes presupuesto, plazo y tipo eran obligatorios para todo el mundo. */}
      <details className="group rounded-xl border border-line bg-surface-2/50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
          ¿Ya tienes el proyecto definido? Cuéntanos el detalle
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </summary>

        <div className="flex flex-col gap-5 border-t border-line px-5 py-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-empresa`}>Empresa</Label>
              <input
                id={`${id}-empresa`}
                name="empresa"
                autoComplete="organization"
                placeholder="Nombre de la empresa"
                className={field}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-integrantes`}>Tamaño del equipo</Label>
              <input
                id={`${id}-integrantes`}
                name="integrantes"
                inputMode="numeric"
                placeholder="Ej. 12 personas"
                className={field}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-presupuesto`}>Presupuesto</Label>
              <select
                id={`${id}-presupuesto`}
                name="presupuesto"
                defaultValue=""
                className={selectField}
                style={caret}
              >
                <option value="">{SIN_RESPUESTA}</option>
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
                defaultValue=""
                className={selectField}
                style={caret}
              >
                <option value="">{SIN_RESPUESTA}</option>
                {TIMELINES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Si no tienes un número en mente, no pasa nada: te ayudamos a
            estimarlo. Nada de este bloque es obligatorio.
          </p>
        </div>
      </details>

      {/* El icono dice a dónde va: un botón que abre WhatsApp sin avisar
          sorprende a quien esperaba un envío normal. */}
      <button
        type="submit"
        className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        Enviar mensaje
        <WhatsAppIcon className="size-4" />
      </button>

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
