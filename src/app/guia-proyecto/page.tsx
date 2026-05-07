"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Download, Mail, Phone, XCircle } from "lucide-react"

export default function GuiaProyectoPage() {
  const pasos = [
    {
      titulo: "1. Define tus objetivos",
      desc: "Cuéntanos qué necesitas: tipo de proyecto, público objetivo, funcionalidades clave y plazos.",
      chips: ["Web/App", "Objetivos", "Alcance"],
    },
    {
      titulo: "2. Reúne referencias",
      desc: "Comparte ejemplos, marcas, paletas de color e inspiración visual para alinear expectativas.",
      chips: ["Referencias", "Branding", "UI/UX"],
    },
    {
      titulo: "3. Presupuesto y tiempos",
      desc: "Ajustamos el alcance a tu presupuesto y proponemos un cronograma realista por etapas.",
      chips: ["Estimación", "Fases", "Entregables"],
    },
    {
      titulo: "4. Propuesta y contrato",
      desc: "Te enviamos una propuesta técnica y económica. Al aprobar, formalizamos el acuerdo.",
      chips: ["Propuesta", "Alcance", "Contrato"],
    },
    {
      titulo: "5. Diseño y desarrollo",
      desc: "Iteramos con feedback: wireframes, diseño visual, implementación y pruebas.",
      chips: ["Wireframes", "Diseño", "Desarrollo", "QA"],
    },
    {
      titulo: "6. Lanzamiento y soporte",
      desc: "Publicamos tu proyecto y damos soporte post-lanzamiento con mejoras continuas.",
      chips: ["Deploy", "Monitoreo", "Soporte"],
    },
  ]

  const formRef = useRef<HTMLFormElement>(null)
  // Toast de feedback (éxito/error/info)
  const [toast, setToast] = useState<null | { type: 'success' | 'error' | 'info', message: string }>(null)
  const pushToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-14 relative overflow-hidden">
      {/* Toast flotante */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] animate-slide-fade-in">
          <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur bg-slate-900/85 ${toast.type === 'success' ? 'border-emerald-500/40' : toast.type === 'error' ? 'border-rose-500/40' : 'border-slate-500/40'}`}>
            <div className={`mt-0.5 ${toast.type === 'success' ? 'text-emerald-400' : toast.type === 'error' ? 'text-rose-400' : 'text-slate-300'}`}>
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : toast.type === 'error' ? <XCircle className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
            </div>
            <div className="text-sm text-slate-100 pr-1">{toast.message}</div>
            <button onClick={() => setToast(null)} className="ml-1 text-slate-400 hover:text-slate-200 transition" aria-label="Cerrar notificación">×</button>
          </div>
        </div>
      )}
      {/* Decoración de fondo: gradientes y blur */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>
      <div className="container mx-auto max-w-6xl">
        {/* Hero superior */}
        <section className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Guía práctica NovaSite
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight text-balance max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-slate-200 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              Comienza tu Proyecto
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              con Confianza
            </span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto">
            Un flujo claro, profesional y ágil para ayudarte a pasar de idea a producto con la mejor experiencia.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="xl" variant="gradient" className="group relative overflow-hidden rounded-full px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
              <Link href="/contacto" aria-label="Contáctanos para iniciar tu proyecto">
                Iniciar ahora
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outlineGlow" className="group relative overflow-hidden rounded-full px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
              <Link href="#faqs">Ver preguntas frecuentes</Link>
            </Button>
          </div>
        </section>

        {/* Timeline de pasos */}
        <div className="relative md:before:hidden before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-slate-700/60 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {pasos.map((p, idx) => (
              <Card
                key={idx}
                className="group relative border-0 bg-slate-700/90 hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl overflow-hidden"
              >
                {/* Punto del timeline (solo móvil) */}
                <span className="md:hidden absolute left-4 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-blue-400 ring-4 ring-blue-500/20" />
                <CardHeader className="pb-2 pl-10 md:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-400/30">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-slate-100 text-lg sm:text-xl flex-1">
                      {p.titulo}
                    </CardTitle>
                    <span className="text-slate-400 text-sm hidden md:block">Paso {idx + 1}</span>
                  </div>
                  <CardDescription className="text-slate-300 mt-2">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pl-10 md:pl-6">
                  <div className="flex flex-wrap gap-2">
                    {p.chips.map((c) => (
                      <Badge key={c} variant="outline" className="border-slate-500 text-blue-400 bg-slate-600/80">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Metodología */}
        <section className="mt-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            ¿Cómo trabajamos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              t: 'Comunicación clara', d: 'Puntos de control, reportes breves y feedback continuo para alinear expectativas.'
            }, {
              t: 'Iteración ágil', d: 'Entregas frecuentes y validaciones tempranas para reducir riesgos.'
            }, {
              t: 'Calidad y soporte', d: 'Pruebas, documentación y acompañamiento post-lanzamiento.'
            }].map((i) => (
              <Card key={i.t} className="border-0 bg-slate-700/90 hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-100">{i.t}</CardTitle>
                  <CardDescription className="text-slate-300">{i.d}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 bg-slate-700/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-slate-100">Qué información nos ayuda</CardTitle>
              <CardDescription className="text-slate-300">
                Estos puntos aceleran la propuesta y mejoran la precisión del plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <ul className="list-disc pl-6 space-y-2">
                <li>Objetivos del proyecto y problema a resolver</li>
                <li>Público objetivo y principales usuarios</li>
                <li>Listado de funcionalidades deseadas</li>
                <li>Referencias visuales o proyectos similares</li>
                <li>Plazos tentativos y presupuesto</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-700/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-slate-100">Contacto</CardTitle>
              <CardDescription className="text-slate-300">Estamos listos para ayudarte</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contacto@novacr.site</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>83047436</span>
              </div>
              <div className="pt-2 flex">
                <Button asChild variant="outlineGlow" className="group relative overflow-hidden rounded-full px-6 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
                  <Link href="#requerimientos">Descargar formulario de requerimientos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <section id="faqs" className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {[
              {
                q: '¿Cuánto tarda un proyecto?',
                a: 'Depende del alcance. Un landing puede tomar 1-3 semanas; productos más complejos, varias etapas con entregas parciales.',
                related: [
                  '¿Qué factores afectan el tiempo de entrega?',
                  '¿Se pueden hacer entregas parciales por sprints?',
                ],
              },
              {
                q: '¿Necesito tener todo definido?',
                a: 'No. Te ayudamos a aterrizar objetivos y priorizar funcionalidades para iniciar con el mayor impacto.',
                related: [
                  '¿Cómo definimos el MVP?',
                  '¿Qué pasa si cambian los requerimientos?',
                ],
              },
              {
                q: '¿Cómo se realizan los pagos?',
                a: 'Generalmente por hitos o fases acordadas (inicio, diseño, desarrollo, lanzamiento). Podemos adaptarnos.',
                related: [
                  '¿Ofrecen planes de pago?',
                  '¿Qué métodos de pago aceptan?',
                ],
              },
              {
                q: '¿Incluyen mantenimiento y soporte?',
                a: 'Sí. Ofrecemos planes de soporte y mantenimiento opcionales (correcciones, actualizaciones y mejoras).',
                related: [
                  '¿Qué cubre el soporte?',
                  '¿Se puede contratar por horas?',
                ],
              },
              {
                q: '¿Quién es dueño del código y diseños?',
                a: 'El cliente. Transferimos el código y assets entregables al finalizar y contra el pago correspondiente.',
                related: [
                  '¿Cómo manejan licencias de terceros?',
                  '¿Puedo acceder al repositorio durante el desarrollo?',
                ],
              },
              {
                q: '¿Cómo será la comunicación durante el proyecto?',
                a: 'Definimos un canal principal (ej. email o chat) y ceremonias breves (touchpoints semanales) para seguimiento.',
                related: [
                  '¿Usan tableros de tareas (Kanban/Scrum)?',
                  '¿Quién será mi punto de contacto?',
                ],
              },
              {
                q: '¿Incluyen SEO y rendimiento?',
                a: 'Aplicamos buenas prácticas de SEO técnico y optimizamos Core Web Vitals (LCP, CLS, INP) desde el inicio.',
                related: [
                  '¿Realizan auditorías de rendimiento?',
                  '¿Incluyen analítica (GA4)?',
                ],
              },
              {
                q: '¿Ofrecen hosting y dominios?',
                a: 'Podemos asesorarte y configurar el hosting y el dominio con tu proveedor preferido.',
                related: [
                  '¿Pueden migrar mi sitio actual?',
                  '¿Hacen copias de seguridad automatizadas?',
                ],
              },
            ].map((f) => (
              <details key={f.q} className="group rounded-lg border border-slate-600/60 bg-slate-800/60 p-4 open:bg-slate-800/70 transition-all">
                <summary className="cursor-pointer list-none font-medium text-slate-100 flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 text-slate-400 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-2 text-slate-300">{f.a}</p>
                {f.related && f.related.length > 0 && (
                  <div className="mt-3 hidden group-open:block">
                    <div className="text-slate-400 text-sm mb-1">Otras relacionadas</div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
                      {f.related.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </details>
            ))}
          </div>
        </section>

        {/* Formulario de Requerimientos */}
        <section id="requerimientos" className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
            Formulario de Requerimientos
          </h2>
          <Card className="border-0 bg-slate-700/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-slate-100">Descarga tu formulario de requerimientos</CardTitle>
              <CardDescription className="text-slate-300">
                Completa este formulario para ayudarnos a entender mejor tu proyecto y brindarte una propuesta más precisa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form
                ref={formRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const data = new FormData(form);
                  const nombre = String(data.get('nombre') || '');
                  const email = String(data.get('email') || '');
                  const empresa = String(data.get('empresa') || '');
                  const tipo = String(data.get('tipo-proyecto') || '');
                  const descripcion = String(data.get('descripcion') || '');
                  const presupuesto = String(data.get('presupuesto') || '');
                  const timeline = String(data.get('timeline') || '');
                  const integrantes = String(data.get('integrantes') || '');

                  const subject = `Requerimientos: ${tipo || 'Proyecto'}`;
                  const message = `Nombre: ${nombre}\nEmail: ${email}\nEmpresa: ${empresa}\nIntegrantes: ${integrantes}\nTipo de proyecto: ${tipo}\nPresupuesto: ${presupuesto}\nTimeline: ${timeline}\n\nDescripción:\n${descripcion}`;

                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ name: nombre, email, subject, message }),
                    });

                    if (!res.ok) {
                      let msg = 'No se pudo enviar. Intenta de nuevo.';
                      try {
                        const err = await res.json();
                        if (err?.error) msg = err.error;
                      } catch { }
                      pushToast('error', msg);
                      return;
                    }

                    pushToast('success', '¡Enviado! Te responderemos pronto.');
                    form.reset();
                  } catch (err) {
                    console.error('Error al enviar el formulario:', err);
                    pushToast('error', 'Error de red. Intenta nuevamente.');
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-slate-300 mb-2">
                    Empresa/Organización
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label htmlFor="tipo-proyecto" className="block text-sm font-medium text-slate-300 mb-2">
                    Tipo de proyecto *
                  </label>
                  <select
                    id="tipo-proyecto"
                    name="tipo-proyecto"
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona el tipo de proyecto</option>
                    <option value="landing-page">Landing Page</option>
                    <option value="sitio-web">Sitio Web Corporativo</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="aplicacion-web">Aplicación Web</option>
                    <option value="marketplace">Marketplace</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-slate-300 mb-2">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                    placeholder="Describe tu proyecto, objetivos y funcionalidades que necesitas..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="integrantes" className="block text-sm font-medium text-slate-300 mb-2">
                    Integrantes/Stakeholders
                  </label>
                  <textarea
                    id="integrantes"
                    name="integrantes"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                    placeholder="Nombres y roles de las personas involucradas (separados por coma)"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="presupuesto" className="block text-sm font-medium text-slate-300 mb-2">
                      Presupuesto estimado
                    </label>
                    <select
                      id="presupuesto"
                      name="presupuesto"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="500-1500">$500 - $1,500</option>
                      <option value="1500-3000">$1,500 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                      <option value="por-definir">Por definir</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-2">
                      Timeline deseado
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="">Selecciona un timeline</option>
                      <option value="urgente">Urgente (1-2 semanas)</option>
                      <option value="normal">Normal (3-4 semanas)</option>
                      <option value="flexible">Flexible (1-2 meses)</option>
                      <option value="sin-prisa">Sin prisa (2+ meses)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="gradient"
                    className="group relative overflow-hidden rounded-full px-6 flex-1 sm:flex-none focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]"
                    onClick={async () => {
                      const form = formRef.current;
                      if (!form) return;
                      const data = new FormData(form);
                      const nombre = String(data.get('nombre') || '');
                      const email = String(data.get('email') || '');
                      const empresa = String(data.get('empresa') || '');
                      const tipo = String(data.get('tipo-proyecto') || '');
                      const descripcion = String(data.get('descripcion') || '');
                      const integrantes = String(data.get('integrantes') || '');
                      const presupuesto = String(data.get('presupuesto') || '');
                      const timeline = String(data.get('timeline') || '');

                      // Fecha de generación
                      const fecha = new Date();
                      const fechaStr = fecha.toLocaleString();

                      try {
                        const { jsPDF } = await import('jspdf');
                        const doc = new jsPDF();

                        // Colores
                        const primary = [37, 99, 235]; // #2563eb
                        const slate = [51, 65, 85]; // slate-700 aprox

                        // Encabezado con logo/branding
                        doc.setFillColor(primary[0], primary[1], primary[2]);
                        doc.rect(0, 0, 210, 30, 'F');

                        // Logo placeholder: círculo blanco con "NS"
                        doc.setFillColor(255, 255, 255);
                        doc.circle(15, 15, 7, 'F');
                        doc.setTextColor(primary[0], primary[1], primary[2]);
                        doc.setFontSize(10);
                        doc.text('NS', 12.5, 18, { baseline: 'bottom' });

                        // Título y subtítulo
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(16);
                        doc.text('NovaSite — Formulario de Requerimientos', 30, 14);
                        doc.setFontSize(10);
                        doc.text(`Generado: ${fechaStr}`, 30, 22);

                        // Contenido
                        let y = 40;
                        const left = 15;
                        const right = 195;
                        const lineGap = 7;

                        const section = (title: string) => {
                          doc.setTextColor(slate[0], slate[1], slate[2]);
                          doc.setFontSize(12);
                          doc.text(title, left, y);
                          y += 3;
                          doc.setDrawColor(primary[0], primary[1], primary[2]);
                          doc.setLineWidth(0.6);
                          doc.line(left, y, right, y);
                          y += 6;
                        };

                        const addField = (label: string, value: string) => {
                          doc.setTextColor(0, 0, 0);
                          doc.setFontSize(11);
                          const field = `${label}: ${value || '-'}`;
                          const wrapped = doc.splitTextToSize(field, right - left);
                          doc.text(wrapped, left, y);
                          y += lineGap + (wrapped.length - 1) * 5;
                        };

                        section('Información General');
                        addField('Nombre', nombre);
                        addField('Email', email);
                        addField('Empresa', empresa);
                        addField('Integrantes/Stakeholders', integrantes);

                        section('Proyecto');
                        addField('Tipo de proyecto', tipo);
                        addField('Presupuesto estimado', presupuesto);
                        addField('Timeline', timeline);

                        section('Descripción');
                        const descLines = doc.splitTextToSize(descripcion || '-', right - left);
                        doc.text(descLines, left, y);
                        y += lineGap + (descLines.length - 1) * 5;

                        // Pie
                        doc.setFontSize(9);
                        doc.setTextColor(slate[0], slate[1], slate[2]);
                        doc.text('© NovaSite — Este documento fue generado automáticamente desde guia-proyecto', left, 285);

                        const filename = `requerimientos_${(nombre || 'proyecto').replace(/\s+/g, '_')}.pdf`;
                        doc.save(filename.toLowerCase());
                      } catch (err) {
                        console.error('Error al generar el PDF:', err);
                        pushToast('error', 'No se pudo generar el PDF. Intenta nuevamente.');
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar formulario PDF
                  </Button>
                  <Button type="submit" variant="outlineGlow" className="group relative overflow-hidden rounded-full px-6 flex-1 sm:flex-none focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
                    Enviar por email
                  </Button>
                </div>

                <p className="text-xs text-slate-400 mt-4">
                  * Campos obligatorios. La información proporcionada será utilizada únicamente para elaborar tu propuesta.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* CTA final */}
        <div className="mt-14 flex justify-center gap-3">
          <Button asChild size="xl" variant="gradient" className="rounded-full px-8 group relative overflow-hidden before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
            <Link href="#requerimientos" aria-label="Completar formulario de requerimientos">
              Iniciar ahora
              <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outlineGlow" className="group relative overflow-hidden rounded-full px-8 focus-visible:ring-[3px] focus-visible:ring-blue-400/50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:bg-white/10 before:skew-x-[-20deg] before:transition-transform before:duration-500 hover:before:translate-x-[300%]">
            <Link href="/" aria-label="Volver al inicio">Volver al inicio</Link>
          </Button>
        </div>
      </div>
      {/* Estilos globales necesarios para la animación del toast */}
      <style jsx global>{`
        @keyframes slideFadeIn {
          0% { transform: translateY(-8px); opacity: 0; filter: blur(6px); }
          60% { transform: translateY(2px); opacity: 1; filter: blur(1px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .animate-slide-fade-in {
          animation: slideFadeIn 0.42s cubic-bezier(.34,1.56,.64,1) both;
        }
      `}</style>
    </main>
  )
}
