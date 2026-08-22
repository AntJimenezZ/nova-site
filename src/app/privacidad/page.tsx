import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, openGraphFor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Transparencia sobre cómo recopilamos, utilizamos y protegemos tus datos en NovaSite, conforme a la legislación de Costa Rica.",
  alternates: { canonical: "/privacidad" },
  openGraph: openGraphFor(
    "/privacidad",
    "Política de Privacidad · NovaSite",
    "Transparencia sobre cómo recopilamos, utilizamos y protegemos tus datos en NovaSite, conforme a la legislación de Costa Rica.",
  ),
};

export default function PrivacidadPage() {
  const lastUpdated = "Febrero de 2026";

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <header className="py-14 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          Volver al inicio
        </Link>

        <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-bold leading-[0.95] tracking-tighter">
          Política de
          <br />
          Privacidad
        </h1>
        <p className="measure mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          En NovaSite nos tomamos la privacidad en serio. Esta política explica de forma clara y directa qué datos recopilamos, por qué los necesitamos y cómo los protegemos.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Última actualización: {lastUpdated} · San Carlos, Costa Rica
        </p>
      </header>

      <div className="grid gap-12 pb-20 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-brand">
              <ShieldCheck className="size-5" />
              <span className="text-sm font-semibold text-foreground">Compromiso NovaSite</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              No vendemos, alquilamos ni comercializamos tus datos con terceros bajo ninguna circunstancia. Solo solicitamos la información estrictamente necesaria para cotizar o construir tu proyecto.
            </p>

            <div className="mt-6 border-t border-line pt-4">
              <span className="text-xs font-medium text-foreground">¿Dudas sobre tus datos?</span>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 flex items-center gap-2 text-xs text-brand hover:underline"
              >
                <Mail className="size-3.5" />
                {site.email}
              </a>
            </div>
          </div>
        </aside>

        <article className="space-y-12 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              1. Responsable del tratamiento
            </h2>
            <p className="mt-3">
              El responsable del tratamiento de los datos recabados en este sitio web es <strong>{site.name}</strong>, con domicilio de operaciones en {site.address.locality}, {site.address.region}, Costa Rica, correo de contacto{" "}
              <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-2 hover:text-brand">
                {site.email}
              </a>{" "}
              y teléfono de atención {site.phoneDisplay}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              2. Datos que recopilamos
            </h2>
            <p className="mt-3">
              Recopilamos únicamente aquellos datos que decides proporcionarnos de manera voluntaria al interactuar con nuestros servicios:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Formulario de contacto y estimación de proyecto:</strong> Nombre, correo electrónico, nombre de la empresa u organización, detalles técnicos del proyecto, presupuesto tentativo y requerimientos específicos.
              </li>
              <li>
                <strong>Comunicaciones directas (WhatsApp / Correo):</strong> Mensajes, archivos o información técnica que nos compartas para la formulación de propuestas o ejecución de servicios.
              </li>
              <li>
                <strong>Datos técnicos de navegación:</strong> Métricas agregadas y no identificables directamente (tipo de navegador, resolución de pantalla, páginas visitadas y tiempos de permanencia) para monitorear la salud del sitio web.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              3. Finalidad del tratamiento
            </h2>
            <p className="mt-3">
              La información recolectada se utiliza exclusivamente para los siguientes fines legítimos:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Responder a solicitudes de información, cotizaciones y propuestas en un plazo inferior a 24 horas hábiles.</li>
              <li>Formalizar, desarrollar y ejecutar los contratos de diseño y desarrollo de software acordados.</li>
              <li>Emitir facturación y comprobantes legales correspondientes a los servicios prestados.</li>
              <li>Optimizar el rendimiento técnico, accesibilidad y compatibilidad del sitio web.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              4. Base legal (Ley N° 8968 de Costa Rica)
            </h2>
            <p className="mt-3">
              El tratamiento de tus datos personales se rige por la <strong>Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N° 8968)</strong> de la República de Costa Rica y su reglamento. El tratamiento se fundamenta en tu consentimiento libre, expreso e informado al enviarnos tus solicitudes, así como en la relación precontractual o contractual derivada del encargo de servicios de desarrollo de software.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              5. Cookies y tecnologías de medición
            </h2>
            <p className="mt-3">
              Este sitio web utiliza cookies y almacenamiento local estrictamente necesarios para recordar tus preferencias de visualización (como el modo claro u oscuro) y el estado de consentimiento de cookies.
            </p>
            <p className="mt-2">
              Asimismo, empleamos Google Tag Manager con anonimización de direcciones IP activada para recopilar estadísticas de rendimiento anónimas. Puedes rechazar o configurar estas cookies en cualquier momento a través del aviso de cookies de nuestro sitio o desde la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              6. Confidencialidad y transferencia a terceros
            </h2>
            <p className="mt-3">
              NovaSite mantiene estricta confidencialidad sobre las ideas, proyectos y datos de contacto de nuestros clientes. No compartimos tu información personal con terceros para fines comerciales o publicitarios. Únicamente utilizamos proveedores tecnológicos de confianza necesarios para el alojamiento y operación de la plataforma (por ejemplo, infraestructura en la nube de Vercel y servicios de correo electrónico), todos ellos con altos estándares de seguridad y protección de datos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              7. Tus derechos (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <p className="mt-3">
              Como titular de los datos personales, tienes el derecho de solicitar el acceso a la información que conservamos sobre ti, su rectificación en caso de ser inexacta o su eliminación definitiva cuando ya no sea necesaria para los fines contratados. Para ejercer cualquiera de estos derechos, escribe un correo a{" "}
              <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-2 hover:text-brand">
                {site.email}
              </a>{" "}
              con el asunto &quot;Derechos de Datos Personales&quot;.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              8. Modificaciones a esta política
            </h2>
            <p className="mt-3">
              Podemos actualizar periódicamente esta política de privacidad para reflejar cambios en nuestras prácticas o en la normativa legal vigente. Cualquier cambio sustancial será publicado directamente en esta página con su respectiva fecha de actualización.
            </p>
          </section>
        </article>
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Política de Privacidad", path: "/privacidad" },
        ])}
      />
    </div>
  );
}
