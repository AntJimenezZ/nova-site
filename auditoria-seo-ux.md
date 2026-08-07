# Auditoría SEO + UX/UI — NovaSite

| | |
|---|---|
| **Fecha** | 5 de agosto de 2026 |
| **Código auditado** | rama `cambioInterfaz` — commit `42f51b0` |
| **Método** | `pnpm run dev` (localhost:3000) + `pnpm run build`, con las 6 rutas descargadas y analizadas |
| **Público objetivo definido** | PYMEs de Costa Rica |
| **Dominio de destino** | `https://www.novacr.site` |

> Todo lo que sigue está verificado contra el HTML que **este código genera**, no inferido leyendo los archivos. Las etiquetas meta, los códigos HTTP, los pesos de bundle y las dimensiones de imagen salen de ejecutar el proyecto. La sección 13 tiene los comandos para reproducirlo.

---

## 0. Punto de partida

Levanté el proyecto y descargué las 6 rutas. El estado real:

```
/                  200   219 KB
/servicios         200   240 KB
/proyectos         200   233 KB
/sobre-nosotros    200   201 KB
/contacto          200   114 KB
/guia-proyecto     200   171 KB
/robots.txt        404   ← no existe
/sitemap.xml       404   ← no existe
```

Y el build de producción pasa limpio:

```
✓ Compiled successfully in 2.9s
✓ Generating static pages (10/10)

Route (app)                        Size    First Load JS
┌ ○ /                            4.32 kB      119 kB
├ ○ /contacto                     179 B       113 kB
├ ○ /proyectos                    175 B       111 kB
└ …                                          103 kB compartido
```

**Las 6 páginas son estáticas (`○`) y el JS compartido son 103 kB.** Eso es un sitio rápido y bien construido. El problema de este reporte no es el código: es que **la capa de metadata que Google y WhatsApp leen está apuntando a otro dominio**, y eso lo confirmé en el HTML del build de producción, no solo en dev.

> **Nota aparte, importante:** `www.novacr.site` está sirviendo hoy un deploy anterior — una sola página con otro `<title>` y otra estructura. Este rediseño no está publicado. Los arreglos de este reporte no llegan a nadie hasta que se despliegue.

---

## 1. Resumen ejecutivo — los 8 que mueven la aguja

| # | Hallazgo | Verificado en | Impacto | Esfuerzo |
|---|---|---|---|---|
| 1 | Toda la metadata apunta a `novasite.com` | build de producción | 🔴 Crítico | 5 min |
| 2 | La imagen de vista previa **no va a cargar** (URL a otro dominio) | build de producción | 🔴 Crítico | 30 min |
| 3 | `robots.txt` y `sitemap.xml` → **404** | localhost | 🔴 Crítico | 20 min |
| 4 | **Cero** `canonical` en las 6 páginas | build de producción | 🟠 Alto | 15 min |
| 5 | Las 6 páginas comparten el **mismo** `og:title` y `og:description` | localhost | 🟠 Alto | 20 min |
| 6 | **Cero** datos estructurados (JSON-LD) | build de producción | 🟠 Alto | 1 h |
| 7 | Tres formularios distintos para la misma acción | código | 🟠 Alto | 2 h |
| 8 | "+20 proyectos entregados" con 3 casos publicados | render de la home | 🟡 Medio | 10 min |

Los cuatro primeros se resuelven en una tarde y son los que más rinden.

---

## 2. SEO técnico — verificado en el HTML generado

### 2.1 🔴 Toda la metadata apunta a un dominio que no controlás

Esto es lo más grave y **no es un problema de dev**: lo saqué del HTML estático que produce `pnpm run build`.

```bash
$ grep 'og:' .next/server/app/index.html
<meta property="og:url"    content="https://novasite.com"/>
<meta property="og:image"  content="https://novasite.com/logos/novasite.png"/>
<meta property="og:locale" content="es_ES"/>
```

El origen, en [`src/app/layout.tsx`](src/app/layout.tsx#L24):

```ts
metadataBase: new URL("https://novasite.com"),   // línea 24
openGraph: {
  url: "https://novasite.com",                    // línea 54
  locale: "es_ES",                                // línea 52
}
```

**Lo que rompe:**

- `metadataBase` es la base contra la que Next resuelve **toda** URL relativa de tu metadata. Al estar mal, arrastra la imagen, los canonicals futuros y cualquier `alternates` que agregues después. Es un error que se multiplica.
- `og:url` le declara a cada red social que tu contenido pertenece a `novasite.com`. Si ese dominio existe y es de alguien más, le estás cediendo la señal de autoría.
- `es_ES` es España. Tu mercado es Costa Rica.

**Arreglo:**

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://www.novacr.site"),
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://www.novacr.site",
    locale: "es_CR",
    // ...
  },
};
```

> **Usá `www`.** El dominio raíz `novacr.site` responde con un **307 hacia `www.novacr.site`** — ese es tu host canónico y toda la metadata debe coincidir exactamente con él.

---

### 2.2 🔴 La imagen de vista previa no va a cargar

En el reporte anterior esto era "la imagen tiene el tamaño equivocado". Corriendo el build, resulta ser peor.

**Problema A — la URL apunta a otro dominio:**

```html
<meta property="og:image" content="https://novasite.com/logos/novasite.png"/>
```

Ese archivo no existe en ese dominio. WhatsApp, Facebook y LinkedIn van a pedir esa URL y **no van a recibir nada**. No es que la imagen se vea mal: es que no hay imagen.

**Problema B — aunque la URL fuera correcta, el archivo miente:**

```ts
images: [{ url: "/logos/novasite.png", width: 1200, height: 630 }]
```

```bash
$ file public/logos/novasite.png
PNG image data, 357 x 315
```

Declarás 1200×630 y el archivo real es 357×315.

**Por qué esto importa más que cualquier otra cosa del reporte:** tenés botón flotante de WhatsApp, WhatsApp en el footer, WhatsApp en `/contacto` y WhatsApp en la guía. Tu canal de entrada es WhatsApp. **La vista previa del enlace es tu primera impresión** — y hoy sale como una tarjeta gris sin imagen.

**Arreglo:** corregir `metadataBase` (§2.1) resuelve el Problema A automáticamente. Para el B, exportar un PNG/JPG real de **1200×630** con logo, nombre y una línea de posicionamiento.

**Mejor todavía:** Next lo genera solo. Un `src/app/opengraph-image.tsx` con JSX se renderiza a 1200×630 en el build y no se vuelve a desincronizar nunca.

---

### 2.3 🔴 `robots.txt` y `sitemap.xml` devuelven 404

```
$ curl -o /dev/null -w "%{http_code}" localhost:3000/robots.txt   → 404
$ curl -o /dev/null -w "%{http_code}" localhost:3000/sitemap.xml  → 404
```

Con 6 páginas por publicar en un dominio sin autoridad, estás dejando que Google las descubra solo. Puede tardar semanas, o no pasar.

**Y hay algo que encontré corriendo el local que no se ve leyendo el código:**

```
/admin              → 404
/admin/             → 308
/admin/index.html   → 200   ← el editor de TinaCMS es públicamente accesible
```

`public/admin/index.html` se despliega como archivo estático. **En producción, cualquiera puede abrir tu panel de edición**, y Google lo puede indexar. El `disallow` es obligatorio, no opcional.

**Arreglo — dos archivos nuevos:**

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = "https://www.novacr.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/servicios", "/proyectos", "/sobre-nosotros", "/contacto", "/guia-proyecto"];
  return rutas.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/contacto" ? 0.9 : 0.8,
  }));
}
```

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/", "/api/"] },
    sitemap: "https://www.novacr.site/sitemap.xml",
  };
}
```

Verificás que funcionó con `curl localhost:3000/robots.txt` — deben devolver 200.

> El `disallow` saca `/admin` del índice pero **no lo protege**. Si el editor de Tina no requiere login en producción, eso es un tema aparte y más urgente que el SEO. Vale la pena confirmarlo.

---

### 2.4 🟠 Ninguna página tiene `canonical`

Busqué `<link rel="canonical">` en las 6 rutas del build. **Cero resultados.**

Sin canonical, cualquier variante de URL (`?utm_source=…`, `/servicios/` con barra final, la versión con y sin `www`) se puede indexar como página distinta y competir contra sí misma. Con un dominio que además hace 307 de apex a `www`, la ambigüedad es real.

**Arreglo — una línea por página:**

```ts
// src/app/servicios/page.tsx
export const metadata: Metadata = {
  title: "Servicios",
  description: "…",
  alternates: { canonical: "/servicios" },   // ← agregar
};
```

Repetir en `/proyectos`, `/sobre-nosotros`, `/contacto`, `/guia-proyecto`, y `canonical: "/"` en el layout.

---

### 2.5 🟠 Las 6 páginas se comparten idénticas en redes

Esto solo se ve renderizando. Los `<title>` sí varían correctamente gracias al `template`:

```
/                → NovaSite — Estudio de software
/servicios       → Servicios · NovaSite
/proyectos       → Trabajo · NovaSite
/contacto        → Contacto · NovaSite
```

Pero **el `og:title` y el `og:description` son los mismos en las seis**:

```
og:title       : "NovaSite — Estudio de software"        ← idéntico ×6
og:description : "Estudio de software en Costa Rica…"    ← idéntico ×6
```

Causa: cada página define `title` y `description` en su `metadata`, pero **ninguna sobrescribe `openGraph`**, así que heredan el del layout.

**Qué significa en la práctica:** alguien te pasa `/servicios` por WhatsApp y la vista previa dice exactamente lo mismo que si le hubiera pasado la home. Se pierde toda la especificidad justo en el momento en que alguien está recomendándote.

**Arreglo — dos líneas por página:**

```ts
export const metadata: Metadata = {
  title: "Servicios",
  description: "Desarrollo web, e-commerce, backend a medida y mantenimiento…",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios · NovaSite",
    description: "Desarrollo web, e-commerce, backend a medida y mantenimiento…",
  },
};
```

---

### 2.6 🟠 Cero datos estructurados

```bash
$ grep -c 'application/ld+json' .next/server/app/*.html
0   (en las 6)
```

Los datos estructurados le explican a Google *qué sos*, no solo qué decís. Para un negocio local es la diferencia entre un resultado de texto plano y uno con teléfono, zona y estrellas.

Tenés **tres oportunidades con el contenido ya escrito**:

| Schema | Qué te da | El contenido ya está en |
|---|---|---|
| `ProfessionalService` | Ficha local con teléfono, zona, correo | footer + `/contacto` |
| `FAQPage` | Tus 8 preguntas desplegables **dentro del resultado de Google** | [guia-proyecto:62-95](src/app/guia-proyecto/page.tsx#L62) |
| `BreadcrumbList` | Migas en vez de la URL cruda | estructura de rutas |

El `FAQPage` es el más rentable de todo el reporte: **8 preguntas ya redactadas**, que ocupan más espacio en la pantalla de Google y responden exactamente lo que pregunta tu cliente no técnico. Es marcar contenido que ya tenés.

```tsx
// src/app/layout.tsx — negocio local
const negocio = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NovaSite",
  description: "Estudio de software en Costa Rica. Desarrollo web, e-commerce y aplicaciones a medida.",
  url: "https://www.novacr.site",
  telephone: "+50683047436",
  email: "contacto@novacr.site",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Carlos",
    addressRegion: "Alajuela",
    addressCountry: "CR",
  },
  areaServed: { "@type": "Country", name: "Costa Rica" },
  priceRange: "$$",
};

<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(negocio) }} />
```

```tsx
// src/app/guia-proyecto/page.tsx — sale del array `faqs` que ya existe
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
```

Validá con el [Rich Results Test](https://search.google.com/test/rich-results).

---

## 3. SEO local — tu mayor palanca está fuera del sitio

Definiste PYMEs de Costa Rica. Eso cambia dónde conviene invertir.

Cuando una PYME tica busca "hacer página web", lo que domina la pantalla del teléfono **no es un sitio: es el mapa**. El paquete local de Google se lleva la mayoría de los clics antes del primer resultado orgánico.

### 3.1 🟠 No tenés perfil de empresa en Google

**La acción de mayor retorno de todo el reporte, y no toca una línea de código.**

- Categoría: *Servicio de diseño de sitios web* / *Desarrollador de software*
- Zona: Costa Rica (o San Carlos + Alajuela + San José si preferís concentrar)
- Teléfono: el mismo WhatsApp, **con el formato exacto** del sitio
- Fotos reales del equipo (ya están en `public/logos/`)
- Enlace a `https://www.novacr.site`

Y después, lo que casi nadie hace: **pedirle una reseña a cada uno de los 3 clientes reales**. Tres reseñas honestas con nombre valen más para una PYME que tres meses de SEO on-page — y ya tenés testimonios de esos mismos clientes en el sitio, solo falta pedirles que los dejen también en Google.

### 3.2 NAP inconsistente

Google cruza nombre, dirección y teléfono entre tu sitio, tu perfil y cualquier directorio. Si no coinciden carácter por carácter, la señal se diluye.

| Dato | Dónde | Valor |
|---|---|---|
| Teléfono | [page.tsx:262](src/app/page.tsx#L262) | `+506 8304 7436` |
| Ubicación | [chrome.tsx:289](src/components/chrome.tsx#L289) | `San Carlos, Costa Rica` |
| Ubicación | [sobre-nosotros:48](src/app/sobre-nosotros/page.tsx#L48) | `Costa Rica` (sin ciudad) |
| Correo | **solo** en `/guia-proyecto` | `contacto@novacr.site` |

**Arreglo:** un objeto en `src/lib/` con nombre, dirección, teléfono y correo, del que consuman footer, `/contacto`, el JSON-LD y el perfil de Google. Un dato, una fuente.

Y algo simple: **el correo solo aparece en `/guia-proyecto`**, la página que ni está en el menú. Muchas PYMEs prefieren escribir un correo antes que llenar un formulario. Ponelo en el footer.

### 3.3 Hablás como estudio; tu cliente busca como PYME

Conté el texto visible que renderiza cada página:

| Página | Palabras |
|---|---|
| `/guia-proyecto` | 569 |
| `/sobre-nosotros` | 542 |
| `/proyectos` | 465 |
| `/servicios` | 462 |
| `/` | 448 |
| `/contacto` | **266** |

Son cifras justas pero no holgadas. Para competir por "diseño de páginas web Costa Rica" contra agencias establecidas, `/servicios` con 462 palabras se queda corta.

Y hay una brecha de vocabulario:

| Vos escribís | Tu cliente busca |
|---|---|
| "Estudio de software" | "empresa que hace páginas web" |
| "Productos digitales a medida" | "cuánto cuesta una página web" |
| "De la idea a producción" | "diseño de páginas web Costa Rica" |
| "Sistemas internos" | "sistema para mi negocio" |

No te pido que arruines el tono — el copy es bueno y suena a gente seria. Te pido que **en algún lugar aparezca, literalmente, la frase que la persona escribe en Google**. Hoy no aparece en ninguna parte.

Dónde entra sin romper la voz de marca: la descripción del footer, los subtítulos de `/servicios`, y sobre todo las preguntas de la FAQ — ahí el lenguaje coloquial es natural y esperado.

*(Nota: la etiqueta `keywords` en [layout.tsx:31](src/app/layout.tsx#L31) no hace nada. Google la ignora desde 2009. No molesta, pero no cuenta como trabajo de keywords.)*

---

## 4. Arquitectura de URLs — 3 casos atrapados en una página

Los tres proyectos viven como anclas:

```
/proyectos#mea-culpa
/proyectos#software-asistencia
/proyectos#restaurant-app
```

**Google no indexa anclas como páginas separadas.** Tenés una URL donde deberías tener cuatro, y cada caso tiene stack, métricas y resultados propios que no pueden posicionar.

**Arreglo:** `src/app/proyectos/[slug]/page.tsx`. La data ya tiene `slug` en `content/projects.json` y el componente `CaseStudy` ya existe — es reorganizar, no escribir de nuevo:

```tsx
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, images: [{ url: p.image }] },
  };
}
```

Con `generateStaticParams` siguen siendo estáticas, igual que ahora. `/proyectos` queda como índice.

---

## 5. UX — el camino del usuario no técnico

Tu usuario tiene un negocio, no sabe de software, y quiere saber tres cosas: **¿hacen lo que necesito? ¿cuánto cuesta? ¿cómo los contacto?** Recorramos el camino como está.

### 5.1 🟠 Tres formularios distintos para la misma acción

| Dónde | Componente | Campos | Obligatorios |
|---|---|---|---|
| Home `#contacto` | `ContactForm` | 4 | nombre, correo, asunto, mensaje |
| `/contacto` | `RequirementsForm` | 8 | + **presupuesto**, **plazo**, **tipo** |
| `/guia-proyecto` | `RequirementsForm` | 8 | los mismos |

El mismo sitio pide cosas distintas según dónde caiga el usuario. Y el formulario largo aparece **dos veces**, en dos páginas que se enlazan entre sí. Si alguien navega home → contacto → guía, se encuentra el mismo formulario tres veces.

**Arreglo:** un solo formulario en dos modos.

- **Corto por defecto** (nombre, correo, qué necesitás, mensaje).
- Un enlace discreto debajo: *"¿Ya tenés el proyecto definido? Contanos el detalle →"* que expande presupuesto, plazo y tipo.

El usuario decide cuánto esfuerzo invierte. Hoy se lo imponés vos, y distinto según la puerta por la que entró.

### 5.2 🟠 El formulario de `/contacto` bloquea justo a quien más querés

En [`requirements-form.tsx:303`](src/components/requirements-form.tsx#L303), `presupuesto` es **obligatorio**. También `plazo` y `tipo de proyecto`.

Ponete en los zapatos de la dueña de una panadería en Ciudad Quesada que quiere una tienda en línea. Llega a `/contacto` y el formulario le exige:

> **Presupuesto** — Selecciona un rango: `$500–$1 500` / `$1 500–$3 000` / …

**No tiene idea.** Nunca compró software. Y la opción "Por definir" está *al final* de la lista, después de cuatro cifras que la intimidan.

Es un filtro que **funciona al revés**: espanta al cliente que no sabe y deja pasar al que ya compró software antes. Si tu público son PYMEs, el que no sabe *es* tu público.

**Arreglo — tres cambios pequeños:**

1. `presupuesto` y `plazo` → **opcionales**. Solo nombre, correo y descripción obligatorios.
2. **"Aún no lo sé"** como *primera* opción del select, no como última.
3. Una línea debajo que desarme la ansiedad: *"Si no tenés un número en mente, no pasa nada — te ayudamos a estimarlo."*

### 5.3 🟠 No decís cuánto cuesta (y decidiste que sí lo vas a decir)

Es la primera pregunta de todo cliente, y el sitio no la responde en ningún lado. Peor: la FAQ tiene 8 preguntas y **esquiva la de precio** — pregunta "¿Cuánto tarda un proyecto?" pero no "¿Cuánto cuesta?".

El único lugar donde aparece un número es el select del formulario. O sea: **le pedís al cliente que adivine el precio antes de decírselo.**

Como definiste publicar rangos "desde $X", recomiendo una **sección de precios orientativos dentro de `/servicios`** (no una página aparte — de paso resuelve las 462 palabras de §3.3):

```
Landing page            desde $XXX      1–3 semanas
Sitio web corporativo   desde $XXX      3–5 semanas
Tienda en línea         desde $XXX      4–8 semanas
Aplicación a medida     desde $XXX      cotización
```

Con una línea honesta: *"El precio final depende del alcance. Estos rangos son el punto de partida real de proyectos que ya entregamos."*

**Gana en los dos frentes:**
- **UX:** responde la pregunta #1 y elimina el miedo a "¿me van a cobrar una fortuna?".
- **SEO:** *"cuánto cuesta una página web en Costa Rica"* es una búsqueda de altísima intención comercial. Hoy no tenés una palabra que compita por ella.

Y agregá a la FAQ: **"¿Cuánto cuesta un proyecto?"** con enlace a la sección.

### 5.4 🟡 "+20 proyectos entregados" con 3 casos publicados

Confirmé que el `+20` sí se renderiza en la home. En [`page.tsx:12`](src/app/page.tsx#L12):

```ts
const stats = [
  { value: "+20", label: "Proyectos entregados" },
  { value: "+8",  label: "Sectores" },
];
```

Me confirmaste que los 3 casos son los reales. El visitante ve "+20" en la home, baja, cuenta tres, y se pregunta dónde están los otros diecisiete.

Un número que el usuario desmiente en un scroll hace más daño que no poner número. Y es caro para un estudio joven, cuya única ventaja frente a una agencia grande **es que le crean**.

**Arreglo — cifras que sí podés sostener:**

```ts
const stats = [
  { value: "3",     label: "Proyectos en producción" },
  { value: "100%",  label: "Entregados y funcionando" },
  { value: "<24 h", label: "Tiempo de respuesta" },
  { value: "5",     label: "Personas en el equipo" },
];
```

Ser un equipo pequeño y nuevo no es una debilidad que haya que disfrazar: para una PYME es el argumento de venta. Tu propia `/sobre-nosotros` ya lo dice mejor de lo que lo diría yo — *"Trabajás directamente con quien construye tu producto"*. Esa frase vende más que "+20".

> Si "+20" incluye trabajos previos del equipo por separado, la salida honesta es reformular la etiqueta: *"+20 proyectos de experiencia combinada"*.

### 5.5 🟡 `/guia-proyecto` es huérfana y tiene el mejor contenido del sitio

El menú ([chrome.tsx:10](src/components/chrome.tsx#L10)) tiene 4 entradas y `/guia-proyecto` **no está**. El footer usa el mismo array `NAV`, así que tampoco. Se llega solo por dos enlaces de texto.

Y es la página con **más contenido de todo el sitio (569 palabras)** y la que mejor le habla al usuario no técnico: 6 etapas, qué información hace falta, 8 preguntas en lenguaje llano.

Doble pérdida:
- **UX:** el contenido que más tranquiliza al cliente indeciso está escondido.
- **SEO:** una página sin enlaces internos recibe poca autoridad. Google la lee como secundaria porque tu propia navegación la trata así.

**Arreglo:** al menú y al footer. Y le cambiaría el nombre — *"Guía de proyecto"* suena a documento interno; **"Cómo trabajamos"** o **"Preguntas frecuentes"** describe lo que la persona va a encontrar y coincide con lo que busca.

### 5.6 🟡 Datos de plantilla en los testimonios

En `content/testimonials.json`:

```json
{ "name": "Barbara Torres", "company": "Toast Cafe", "avatar": "/avatars/maria.jpg" }
```

Los 6 testimonios apuntan a `/avatars/maria.jpg`, `carlos.jpg`, `ana.jpg`, `roberto.jpg`, `laura.jpg`, `diego.jpg`. **`public/avatars/` no existe**, y los nombres de archivo no coinciden con los de las personas.

Buena noticia: el campo es opcional y `/sobre-nosotros` **no lo renderiza**, así que no hay imágenes rotas en pantalla. Es data muerta de una plantilla.

Dos acciones:
1. Borrar `avatar` del JSON y del tipo en [`lib/testimonials.ts`](src/lib/testimonials.ts) — o poner fotos reales, que suman mucho a la credibilidad.
2. **Verificar que los 6 testimonios sean reales.** Si vinieron de la misma plantilla que los avatares, hay que reemplazarlos. Con 3 clientes reales, 3 testimonios verdaderos valen más que 6 dudosos — y publicar reseñas inventadas es un riesgo legal y reputacional que no compensa.

### 5.7 🟡 El WhatsApp aparece y desaparece

El botón flotante está en la home y en `/guia-proyecto`, pero **no** en `/servicios`, `/proyectos` ni `/sobre-nosotros`.

Justo `/servicios` y `/proyectos` son donde el visitante termina de convencerse. Llega al final de un caso, decide escribir… y el botón no está.

**Arreglo:** subirlo a [`layout.tsx`](src/app/layout.tsx) y borrarlo de las dos páginas. Un componente, todas las páginas, cero duplicación. (En `/contacto` tiene sentido ocultarlo: compite con el formulario.)

---

## 6. Secciones a **agregar**

| Prioridad | Sección | Dónde | Por qué |
|---|---|---|---|
| 🔴 Alta | **Precios orientativos** | `/servicios` | Pregunta #1 sin responder + búsqueda de alta intención. §5.3 |
| 🔴 Alta | **FAQ visible** | menú principal | Ya existe, está escondida. Habilita `FAQPage`. §2.6 |
| 🟠 Media | **Testimonios cerca del cierre** | home + `/servicios` | Hoy solo en `/sobre-nosotros`, la página que menos gente ve antes de decidir |
| 🟠 Media | **Página por caso** | `/proyectos/[slug]` | 3 URLs indexables en vez de 1. §4 |
| 🟠 Media | **"¿Qué necesito?"** | `/servicios` | 3 preguntas que llevan al servicio correcto. Tu cliente no sabe si necesita "landing" o "sitio corporativo" |
| 🟡 Baja | **Zona de cobertura** | footer | Señal local: "San Carlos · Alajuela · San José · todo Costa Rica" |
| 🟡 Baja | **Blog / notas** | `/blog` | Única vía real de cola larga. **Solo si hay compromiso de escribir** |

**Sobre el blog, sin rodeos:** es el consejo de SEO que más se da y menos se cumple. Si no hay alguien que escriba un artículo útil al mes de forma sostenida, saltátelo — un blog con 2 posts de hace un año resta. Poné ese esfuerzo en el perfil de Google y las reseñas (§3.1): más retorno, mucho menos trabajo.

---

## 7. Secciones a **quitar o fusionar**

| Qué | Dónde | Por qué |
|---|---|---|
| **Formulario duplicado** | `/guia-proyecto` §requerimientos | El mismo de `/contacto`, en una página que enlaza a `/contacto`. Dejá la guía + un botón |
| **`ContactForm` completo** | home | Dos componentes que hacen lo mismo. Unificar. §5.1 |
| **"También cubrimos"** | [`/servicios:92`](src/app/servicios/page.tsx#L92) | 4 tarjetas que aclaran que "no se contratan sueltos". Ruido para quien ya elige entre 4 servicios |
| **"Cómo pensamos"** | [`/sobre-nosotros:53`](src/app/sobre-nosotros/page.tsx#L53) | 4 valores genéricos que podría firmar cualquier agencia. No diferencian |
| **"Proceso" de la home** | [`page.tsx:167`](src/app/page.tsx#L167) | Repite en 4 pasos las 6 etapas de `/guia-proyecto`. Dejá 2 líneas + enlace |
| **Meta `keywords`** | [`layout.tsx:31`](src/app/layout.tsx#L31) | Ignorada por Google desde 2009 |
| **43 MB de imágenes sin usar** | `public/` | §8.1 |

**Criterio general:** entre la home, `/servicios` y `/guia-proyecto` contás el proceso de trabajo **tres veces**. Elegí una casa —`/guia-proyecto`, que ya lo hace mejor— y desde las otras dos enlazá. Menos scroll hasta el formulario es más conversión.

---

## 8. Rendimiento

Empiezo por lo bueno, porque el build lo dejó claro:

```
+ First Load JS shared by all             103 kB
Route /                                   119 kB    ○ estático
```

**103 kB compartidos y las 6 páginas prerenderizadas estáticas.** Eso es saludable para Next.js con React 19. El showreel además tiene tres optimizaciones de LCP deliberadas y documentadas: `priority` en la primera diapositiva, `quality={68}`, y montaje diferido de las diapositivas 2 y 3 ([showreel.tsx:29](src/components/showreel.tsx#L29)). Alguien pensó esto en serio.

Lo que sí conviene arreglar:

### 8.1 46 MB en `public/`, de los que usás 2,4 MB

Los mayores, **ninguno referenciado en ninguna parte**:

| Archivo | Peso |
|---|---|
| `u4872171696_Drive_at_Golden_Hour….gif` | **7,5 M** |
| `logos/Gemini_Generated_Image_jcns3g….png` | 5,2 M |
| `logos/Gemini_Generated_Image_87hnw0….png` | 4,8 M |
| `logos/Gemini_Generated_Image_o0m0wu….png` | 4,7 M |
| `logos/Gemini_Generated_Image_atcokk….png` | 4,6 M |
| `logos/Gemini_Generated_Image_cgyoe6….png` (×2, uno con " (1)") | 8,8 M |
| `logos/Gemini_Generated_Image_q3kqac….png` | 3,5 M |

No afectan la velocidad (nadie los descarga), pero engordan cada `git clone` y cada deploy. **Borralos.** El GIF de 7,5 MB sobre todo: si alguna vez se referencia, mata cualquier métrica.

También sin usar: `logos/FotoKevin.jpg` y `logos/FotoAnthony .jpg` — ese espacio antes del `.jpg` es una bomba de tiempo en URLs.

### 8.2 `ToastCafe.png` pesa 1,1 MB

Es 1913×940 en PNG. Para una captura de pantalla, PNG es el formato equivocado: en WebP baja a ~150 KB sin diferencia visible. Va en el showreel del hero, o sea **compite directamente con tu LCP**. Sería una lástima perder las optimizaciones de arriba por un PNG sin convertir.

### 8.3 🟡 Un warning del build que rompe en Next.js 16

Esto solo aparece corriendo el proyecto:

```
Image with src "/mea-culpa.webp" is using quality "68" which is not
configured in images.qualities. This config will be required starting
in Next.js 16.
```

Hoy funciona; en la próxima mayor de Next deja de funcionar. **Arreglo de una línea** en `next.config.ts`:

```ts
images: { qualities: [68, 75] },
```

### 8.4 Google Tag Manager **y** GA4, los dos

En [`layout.tsx:80`](src/app/layout.tsx#L80):

```ts
const GA_MEASUREMENT_ID = "G-QVMKJ66BSM";
const GTM_ID = "GTM-P54PF2ZQ";
```

Cargás el contenedor de GTM (líneas 96-102) **y** gtag.js aparte (líneas 130-141). Si dentro de GTM también hay una etiqueta de GA4 —lo habitual, es la razón principal por la que se instala GTM— estás:

- Contando cada visita **dos veces**: métricas infladas, rebote irreal.
- Cargando dos scripts de terceros donde alcanza uno.

**Arreglo:** elegí uno. Si usás GTM, quitá el bloque gtag y configurá GA4 dentro de GTM. Si solo querés analítica, quitá GTM y quedate con gtag — para 6 páginas, gtag solo sobra.

Comprobalo con la extensión Google Tag Assistant: si ves dos disparos de `page_view`, es esto.

---

## 9. Accesibilidad — está mejor que en la mayoría de sitios

Lo digo sin adornos: esto está por encima del promedio de la industria. Lo dejo escrito para que no se pierda en un refactor:

- ✅ Enlace "Saltar al contenido" ([layout.tsx:117](src/app/layout.tsx#L117))
- ✅ `<dialog>` nativo en el menú móvil — foco atrapado, `Escape` y fondo inerte gratis
- ✅ `role="status"` + `aria-live="polite"` en los dos formularios
- ✅ `<details>` nativo en la FAQ — teclado y sin JavaScript
- ✅ Rating con texto para lector de pantalla, no solo estrellas
- ✅ `prefers-reduced-motion` respetado en el carrusel
- ✅ Áreas táctiles de 44 px (`size-11`)
- ✅ Aviso "(se abre en una pestaña nueva)" en enlaces externos
- ✅ **Exactamente un `<h1>` por página** — verificado en las 6 rutas

Lo que falta, y es poco:

| Qué | Dónde |
|---|---|
| El carrusel rota cada 6 s; llegar al botón de pausa exige tabular hasta el final | [showreel.tsx:40](src/components/showreel.tsx#L40) |
| Contraste de `text-muted-foreground` sobre `bg-surface-2` sin medir | verificar 4.5:1 en ambos temas |
| El `<h1>` de la home es visualmente diminuto | [showreel.tsx:137](src/components/showreel.tsx#L137) |

Sobre el último: la decisión está bien razonada en el comentario del código y el `h1` **sí carga tu keyword principal** ("Estudio de software en Costa Rica"). Solo señalo la tensión: esa frase está en texto de 14 px en una esquina, mientras el usuario percibe como título el nombre del proyecto que rota.

---

## 10. Backend de contacto — tres arreglos de una línea

En [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts):

**1. No podés responder con "Responder"** — el correo llega de vos para vos:

```ts
const mailOptions = {
  from: emailUser,
  to: emailUser,
  replyTo: email,   // ← falta
```

El HTML del correo dice *"Para responder, envía un email directamente a: …"* — o sea, ya notaron el problema y lo resolvieron con una instrucción manual en vez de una línea de código. Con `replyTo` respondés desde el teléfono en 5 segundos. Prometiendo respuesta en menos de 24 h, esa fricción cuesta.

**2. El token de Turnstile va sin codificar** ([línea 38](src/app/api/contact/route.ts#L38)):

```ts
body: `secret=${secretKey}&response=${turnstileToken}`,
// → body: new URLSearchParams({ secret: secretKey, response: turnstileToken }),
```

**3. El mensaje del usuario entra crudo al HTML del correo** ([línea 100](src/app/api/contact/route.ts#L100)):

```ts
${message.replace(/\n/g, '<br>')}
```

Va a tu propia bandeja y los clientes de correo modernos sanean, así que el riesgo real es bajo. Pero escapar `<`, `>` y `&` son tres líneas y cierra el tema.

---

## 11. Plan de acción priorizado

### Semana 1 — bloqueantes (≈ 4 h)

- [ ] `metadataBase` y `openGraph.url` → `https://www.novacr.site`
- [ ] `og:locale` → `es_CR`
- [ ] `alternates.canonical` en las 6 páginas
- [ ] `openGraph.title` y `openGraph.description` propios por página
- [ ] Imagen OpenGraph real de 1200×630 (o `opengraph-image.tsx`)
- [ ] `src/app/sitemap.ts` y `src/app/robots.ts` (con `/admin` en disallow)
- [ ] `images: { qualities: [68, 75] }` en `next.config.ts`
- [ ] **Desplegar la rama `cambioInterfaz`**
- [ ] Alta en Google Search Console + enviar sitemap

**Verificación:** `pnpm run build && grep 'og:' .next/server/app/index.html` — debe decir `www.novacr.site` en las tres etiquetas.

### Semana 2 — confianza y conversión (≈ 6 h)

- [ ] Perfil de empresa en Google + pedir las 3 reseñas
- [ ] JSON-LD: `ProfessionalService` en el layout, `FAQPage` en la guía
- [ ] Corregir las cifras de la home (§5.4)
- [ ] `presupuesto` y `plazo` opcionales; "Aún no lo sé" primero
- [ ] `replyTo` en el correo
- [ ] `/guia-proyecto` al menú y al footer, renombrada
- [ ] Correo `contacto@novacr.site` en el footer
- [ ] Confirmar si `/admin/index.html` requiere login en producción

### Semanas 3-4 — estructura y contenido (≈ 10 h)

- [ ] Precios orientativos en `/servicios`
- [ ] Unificar los tres formularios en uno, modo corto/largo
- [ ] Rutas `/proyectos/[slug]`
- [ ] Testimonios en la home y `/servicios`
- [ ] Verificar que los 6 testimonios sean reales; quitar `avatar`
- [ ] Recortar las secciones de §7
- [ ] Botón de WhatsApp al layout
- [ ] Resolver GTM vs GA4
- [ ] Borrar los 43 MB sin usar; `ToastCafe.png` → WebP

### Continuo

- [ ] Una reseña nueva en Google por proyecto entregado
- [ ] Publicar cada caso el mismo mes en que se entrega
- [ ] Revisar Search Console una vez al mes

---

## 12. Lo que hay que decir del código

Este no es un sitio mal hecho, y correrlo lo confirma más que leerlo.

El build pasa limpio en 2,9 s. Las 6 páginas son estáticas. 103 kB de JS compartido. Un `<h1>` por página. Los comentarios explican *por qué*, no *qué*. `<dialog>` y `<details>` nativos en vez de tres dependencias. Tres optimizaciones de LCP en el showreel, cada una con su razón escrita al lado.

Incluso lo que parecía un riesgo resultó bien resuelto: el plugin de LocatorJS inyecta rutas absolutas de tu disco en el HTML de desarrollo, pero verifiqué el build de producción y **no se filtra ni una** — el guard de `NODE_ENV` en `next.config.ts` funciona, y ningún archivo servido al navegador contiene rutas locales.

Los problemas de este reporte están casi todos en **la capa que rodea al código**: la metadata apunta al dominio equivocado, la imagen de compartir nunca se exportó, el sitemap no se creó, el panel de admin quedó abierto, el perfil de Google no se abrió, el rediseño no se desplegó.

Es el patrón del equipo que construye bien y publica a medias. Se arregla en una semana — y es la capa que tu cliente ve primero.

---

## 13. Cómo reproducir esta auditoría

```bash
# 1. Levantar el sitio
pnpm run dev

# 2. Estado de las rutas (robots y sitemap deben dar 200 tras el arreglo)
for r in "" servicios proyectos sobre-nosotros contacto guia-proyecto \
         robots.txt sitemap.xml admin/index.html; do
  printf "%-20s " "/$r"
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/$r"
done

# 3. Metadata que realmente se sirve (la fuente de verdad, no el código)
curl -s http://localhost:3000 | grep -oE '<meta property="og:[^>]*>|<link rel="canonical"[^>]*>'

# 4. Build de producción: pesos reales y verificación de la metadata final
pnpm run build
grep -oE '<meta property="og:[^>]*>' .next/server/app/index.html

# 5. Datos estructurados (debe ser > 0 tras el arreglo)
grep -c 'application/ld+json' .next/server/app/index.html

# 6. Que no se filtren rutas locales al navegador (debe ser 0)
grep -rl '/home/' .next/static | wc -l
```

---

*Auditoría del 5 de agosto de 2026 sobre el commit `42f51b0` (rama `cambioInterfaz`), ejecutando el proyecto en local con `pnpm run dev` y `pnpm run build`. Códigos HTTP, etiquetas meta, dimensiones de imagen, pesos de bundle y conteos de texto fueron medidos, no inferidos.*
