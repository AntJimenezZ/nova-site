"use client";

import { useId, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { ArrowUpRight, CheckCircle2, Loader2, XCircle } from "lucide-react";

const SUBJECTS = [
  "Landing page",
  "E-commerce",
  "Sitio web corporativo",
  "Aplicación web",
  "Software interno",
  "Consultoría / mantenimiento",
  "Otro",
];

const field =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-brand-vivid";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "ok"; message: string }
  | { state: "error"; message: string };

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (siteKey && !token) {
      setStatus({ state: "error", message: "Completa la verificación anti-spam." });
      return;
    }

    setStatus({ state: "sending" });
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          turnstileToken: token,
        }),
      });

      if (!res.ok) {
        let message = "No se pudo enviar. Inténtalo de nuevo.";
        try {
          const err = await res.json();
          if (err?.error) message = err.error;
        } catch {
          /* respuesta sin cuerpo JSON: nos quedamos con el mensaje genérico */
        }
        setStatus({ state: "error", message });
        return;
      }

      form.reset();
      setStatus({
        state: "ok",
        message: "Mensaje enviado. Te respondemos en menos de 24 h.",
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
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className="label text-muted-foreground">
            Nombre
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Tu nombre o empresa"
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="label text-muted-foreground">
            Correo
          </label>
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
        <label htmlFor={`${id}-subject`} className="label text-muted-foreground">
          Qué necesitas
        </label>
        <select
          id={`${id}-subject`}
          name="subject"
          required
          defaultValue=""
          className={`${field} cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23888' stroke-width='1.6'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-message`} className="label text-muted-foreground">
          Cuéntanos
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          placeholder="Objetivo del proyecto, plazo aproximado y presupuesto si ya lo tienes."
          className={`${field} h-auto resize-y py-3.5 leading-relaxed`}
        />
        <p className="text-xs text-muted-foreground">
          Cuanto más concreto, más precisa la propuesta que te devolvemos.
        </p>
      </div>

      {siteKey && (
        <Turnstile
          siteKey={siteKey}
          onSuccess={setToken}
          onExpire={() => setToken(null)}
          options={{ theme: "auto" }}
        />
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {sending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            Enviar mensaje
            <ArrowUpRight className="size-4" />
          </>
        )}
      </button>

      {/* Region viva: los lectores de pantalla anuncian el resultado sin mover el foco */}
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
