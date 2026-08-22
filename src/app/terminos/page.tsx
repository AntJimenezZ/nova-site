import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, openGraphFor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Condiciones del Servicio",
  description:
    "Términos y condiciones que rigen los servicios de diseño y desarrollo de software prestados por NovaSite en Costa Rica.",
  alternates: { canonical: "/terminos" },
  openGraph: openGraphFor(
    "/terminos",
    "Condiciones del Servicio · NovaSite",
    "Términos y condiciones que rigen los servicios de diseño y desarrollo de software prestados por NovaSite en Costa Rica.",
  ),
};

export default function TerminosPage() {
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
          Condiciones del
          <br />
          Servicio
        </h1>
        <p className="measure mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          Términos claros y transparentes que regulan el uso de este sitio web y los proyectos de software que desarrollamos para nuestros clientes.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Última actualización: {lastUpdated} · San Carlos, Costa Rica
        </p>
      </header>

      <div className="grid gap-12 pb-20 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-brand">
              <FileText className="size-5" />
              <span className="text-sm font-semibold text-foreground">Relación de Confianza</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Cada proyecto de desarrollo se respalda mediante una propuesta formal y contrato donde se detallan alcance, hitos de pago, plazos de entrega y entregables específicos.
            </p>

            <div className="mt-6 border-t border-line pt-4">
              <span className="text-xs font-medium text-foreground">¿Preguntas sobre contratos?</span>
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
              1. Aceptación de los términos
            </h2>
            <p className="mt-3">
              Al acceder, navegar o utilizar este sitio web ({site.url}), así como al contratar los servicios profesionales de <strong>{site.name}</strong>, aceptas quedar vinculado por las presentes Condiciones del Servicio y nuestra Política de Privacidad. Si no estás de acuerdo con alguna disposición, te recomendamos no utilizar este sitio ni contratar los servicios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              2. Servicios ofrecidos
            </h2>
            <p className="mt-3">
              NovaSite es un estudio de desarrollo de software con sede en Costa Rica dedicado a:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Diseño y desarrollo de sitios web corporativos y páginas de aterrizaje optimizadas.</li>
              <li>Construcción de tiendas en línea (e-commerce) y plataformas de venta digital.</li>
              <li>Desarrollo de aplicaciones web a medida, paneles de administración y sistemas internos.</li>
              <li>Integración de APIs, pasarelas de pago y servicios en la nube.</li>
              <li>Mantenimiento técnico evolutivo, optimización de velocidad y soporte continuo.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              3. Propuestas, cotizaciones y acuerdos
            </h2>
            <p className="mt-3">
              Las cotizaciones emitidas a través de nuestro sitio web o canales directos tienen una validez de <strong>30 días naturales</strong> a partir de su envío, salvo que se especifique lo contrario.
            </p>
            <p className="mt-2">
              Todo encargo formal de desarrollo se rige por un documento de propuesta técnica y económica que detalla el alcance exacto, los entregables acordados, el cronograma de trabajo y los hitos de pago (usualmente estructurados en anticipo, revisiones y entrega final).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              4. Propiedad intelectual y derechos sobre el código
            </h2>
            <p className="mt-3">
              Una vez cancelado el <strong>100% de los honorarios pactados</strong> para un proyecto:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Código personalizado y diseño:</strong> Los derechos patrimoniales sobre el código fuente desarrollado a medida, las interfaces visuales y los activos exclusivos del proyecto se transfieren en su totalidad al cliente.
              </li>
              <li>
                <strong>Librerías y herramientas de código abierto:</strong> El software puede incorporar librerías open-source sujetas a sus respectivas licencias públicas (MIT, Apache 2.0, etc.), las cuales no sufren alteración en sus términos originales.
              </li>
              <li>
                <strong>Derecho de exhibición en portafolio:</strong> Salvo que exista un acuerdo de no divulgación (NDA) expreso suscrito entre las partes, NovaSite se reserva el derecho de exhibir el trabajo realizado en su portafolio y redes sociales como caso de estudio demostrativo.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              5. Colaboración y responsabilidades del cliente
            </h2>
            <p className="mt-3">
              Para garantizar el cumplimiento de los tiempos de entrega acordados, el cliente se compromete a:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Proporcionar oportunamente los contenidos (textos, logotipos, imágenes e información técnica requerida).</li>
              <li>Disponer de los accesos a dominios, servicios de hosting o cuentas de terceros necesarias para la integración.</li>
              <li>Revisar y brindar retroalimentación sobre los avances en los plazos definidos en el cronograma.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              6. Garantía y soporte post-lanzamiento
            </h2>
            <p className="mt-3">
              Todos los proyectos entregados por NovaSite incluyen un <strong>período de garantía post-lanzamiento de 30 días naturales</strong> destinado a resolver cualquier error, bug o discrepancia técnica imputable al desarrollo original frente a las especificaciones acordadas, sin costo adicional.
            </p>
            <p className="mt-2">
              Nuevas funcionalidades, modificaciones al alcance original o requerimientos adicionales no contemplados inicialmente serán cotizados de forma independiente o gestionados mediante un plan de mantenimiento mensual.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              7. Limitación de responsabilidad
            </h2>
            <p className="mt-3">
              NovaSite aplica las mejores prácticas de la industria en seguridad, rendimiento y accesibilidad. No obstante, no nos hacemos responsables por:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Interrupciones de servicio atribuibles a proveedores de infraestructura externa (servidores, redes o registradores de dominios).</li>
              <li>Fallas o cambios imprevistos en APIs de terceros (por ejemplo, cambios de política en pasarelas de pago o redes sociales).</li>
              <li>Modificaciones directas realizadas al código fuente o configuraciones del servidor por personas no autorizadas por NovaSite.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              8. Confidencialidad
            </h2>
            <p className="mt-3">
              Ambas partes se comprometen a tratar como estrictamente confidencial toda información comercial, técnica, financiera o estratégica revelada durante la negociación o ejecución del proyecto.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              9. Legislación aplicable y jurisdicción
            </h2>
            <p className="mt-3">
              Estas condiciones se rigen e interpretan de conformidad con las leyes de la <strong>República de Costa Rica</strong>. Cualquier controversia derivada de la validez, ejecución o terminación de los acuerdos será sometida prioritariamente a resolución amistosa o, en su defecto, a los tribunales ordinarios de justicia competentes en Costa Rica.
            </p>
          </section>
        </article>
      </div>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Condiciones del Servicio", path: "/terminos" },
        ])}
      />
    </div>
  );
}
