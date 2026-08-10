/**
 * Comprobaciones de interfaz del rediseño.
 *
 *   pnpm build && pnpm start &        # o pnpm dev
 *   pnpm test:ui                      # usa http://localhost:3000
 *   BASE_URL=http://localhost:3111 pnpm test:ui
 *
 * Necesita un Chrome. Si no está en la ruta habitual, indícalo:
 *   CHROME_PATH=/ruta/a/chrome pnpm test:ui
 *
 * Cubre lo que se rompe en silencio: tema sin parpadeo, foco del menú móvil,
 * áreas táctiles, reduced-motion y jerarquía de encabezados.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const executablePath = process.env.CHROME_PATH;

const browser = await chromium.launch(
  executablePath ? { executablePath } : { channel: "chrome" }
);

let pass = 0;
let fail = 0;
const check = (name, ok, extra = "") => {
  console.log(`${ok ? "  ok  " : "FALLA "} ${name}${extra ? "  — " + extra : ""}`);
  ok ? pass++ : fail++;
};

const ROUTES = [
  "/",
  "/proyectos",
  "/proyectos/restaurant-app",
  "/servicios",
  "/sobre-nosotros",
  "/contacto",
  "/guia-proyecto",
];

// 0. Todas las rutas responden 200. Un .next con restos de turbopack ya provocó
//    un 500 en /proyectos que solo se veía al navegar, no al construir.
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const path of ROUTES) {
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    check(`${path} responde 200`, res?.status() === 200, `status=${res?.status()}`);
  }
  await ctx.close();
}

// 1. Tema: alterna, persiste, sobrevive a recarga y navegación, sin parpadeo.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  const isDark = () =>
    page.evaluate(() => document.documentElement.classList.contains("dark"));

  const before = await isDark();
  await page.locator('button[aria-label*="modo"]').click();
  await page.waitForTimeout(400);
  const after = await isDark();
  check("el toggle cambia el tema", before !== after);

  const stored = await page.evaluate(() => localStorage.getItem("theme"));
  check("el tema persiste", stored === (after ? "dark" : "light"), `theme=${stored}`);

  // waitUntil "commit" comprueba que la clase la pone el script bloqueante
  // del <head>, no React tras hidratar: si no, hay flash de tema equivocado.
  await page.reload({ waitUntil: "commit" });
  check("sin parpadeo: la clase está en el primer paint", (await isDark()) === after);

  await page.goto(`${BASE}/proyectos`, { waitUntil: "domcontentloaded" });
  check("el tema sobrevive a la navegación", (await isDark()) === after);
  await ctx.close();
}

// 2. Menú móvil: Sheet de shadcn (Radix Dialog) con foco atrapado y Escape.
//    Ya no es un <dialog> nativo: Radix monta un div con role=dialog en un
//    portal, así que el selector es el data-slot, no `dialog[open]`.
const PANEL = '[data-slot="sheet-content"]';
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 780 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.locator('button[aria-label="Abrir menú"]').click();
  await page.waitForTimeout(600);
  check("el menú móvil abre", (await page.locator(PANEL).count()) === 1);

  // Radix no pone aria-modal: marca aria-hidden sobre el resto del documento y
  // bloquea el scroll del body. Es su mecanismo, más robusto que el atributo.
  //
  // Se comprueba <header> y no <main>: main queda sin ocultar a propósito de la
  // librería aria-hidden, porque el formulario lleva dentro un [aria-live] y
  // conserva toda la cadena de ancestros de una región viva para que siga
  // siendo anunciable. Es la única parte del fondo que un lector de pantalla
  // alcanza con el menú abierto; el <dialog> nativo sí lo inertizaba.
  check(
    "el panel es un diálogo y el fondo queda oculto al lector",
    (await page.locator(`${PANEL}[role=dialog]`).count()) === 1 &&
      (await page.evaluate(
        () =>
          document.querySelector("header")?.getAttribute("aria-hidden") === "true" &&
          getComputedStyle(document.body).overflow === "hidden"
      ))
  );

  check(
    "el foco queda dentro del diálogo",
    await page.evaluate(
      (sel) => document.querySelector(sel)?.contains(document.activeElement) ?? false,
      PANEL
    )
  );

  // El panel deja ver una franja de la página detrás: es lo que hace que se
  // lea como un cajón lateral y no como un cambio de pantalla entero.
  const ancho = await page.evaluate((sel) => {
    const r = document.querySelector(sel).getBoundingClientRect();
    return Math.round((r.width / innerWidth) * 100);
  }, PANEL);
  check("el panel no tapa toda la pantalla", ancho < 90, `ocupa el ${ancho}% del ancho`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  check("Escape cierra el menú", (await page.locator(PANEL).count()) === 0);
  await ctx.close();
}

// 3. Áreas táctiles: 44px en al menos un eje (WCAG 2.5.8 / iOS HIG).
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 780 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const small = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("button, a[href]")) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.top > innerHeight * 2) continue;
      if (el.classList.contains("sr-only")) continue; // 1x1 hasta recibir foco
      if (r.height < 44 && r.width < 44) {
        const label = (el.getAttribute("aria-label") || el.textContent || "").trim();
        out.push(`${el.tagName}"${label.slice(0, 28)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }
    return out;
  });
  check("controles ≥44px en al menos un eje", small.length === 0, small.join(" | "));
  await ctx.close();
}

// 4. prefers-reduced-motion detiene la autorrotación del showreel.
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Los tres slides están siempre en el DOM apilados en la misma celda de grid
  // —así el hero no cambia de alto al rotar y el CLS se queda en cero—, así que
  // hay tres h2. El visible es el único que lleva .hero-text-in.
  const sel = "section[aria-roledescription=carrusel] .hero-text-in h2";
  const first = await page.locator(sel).innerText();
  await page.waitForTimeout(7500); // supera el intervalo de 6 s
  const later = await page.locator(sel).innerText();
  check("con reduced-motion no autorota", first === later, `${first} -> ${later}`);
  await ctx.close();
}

// 5. Un solo h1 por página.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const path of ROUTES) {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const n = await page.locator("h1").count();
    check(`${path} tiene exactamente un h1`, n === 1, `encontrados: ${n}`);
  }
  await ctx.close();
}

// 6. Cada caso tiene su propia URL indexable. Antes los tres vivían como
//    anclas dentro de /proyectos, que Google no indexa como páginas.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto(`${BASE}/proyectos`, { waitUntil: "networkidle" });
  await page.locator('a[href="/proyectos/restaurant-app"]').first().click();
  await page.waitForURL("**/proyectos/restaurant-app");

  check(
    "el índice lleva al caso y el título es el h1",
    (await page.locator("h1").innerText()).includes("Restaurant App"),
  );

  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  check(
    "el caso declara su propio canonical",
    canonical?.endsWith("/proyectos/restaurant-app"),
    `canonical=${canonical}`,
  );
  await ctx.close();
}

// 7. La metadata apunta al dominio real y no al de la plantilla anterior.
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const path of ROUTES) {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const [canonical, ogUrl, ogImage] = await Promise.all([
      page.locator('link[rel="canonical"]').getAttribute("href"),
      page.locator('meta[property="og:url"]').getAttribute("content"),
      page.locator('meta[property="og:image"]').getAttribute("content"),
    ]);
    const ok =
      canonical?.startsWith("https://www.novacr.site") &&
      !ogUrl?.includes("novasite.com") &&
      !ogImage?.includes("novasite.com");
    check(`${path} apunta a www.novacr.site`, ok, `canonical=${canonical}`);
  }
  await ctx.close();
}

// 8. Presupuesto y plazo son opcionales: se puede enviar sin tocarlos.
//    Era el filtro que funcionaba al revés, espantando a quien no sabe cuánto
//    cuesta el software — que es justamente el público objetivo.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/contacto`, { waitUntil: "networkidle" });

  const requeridos = await page.evaluate(() =>
    [...document.querySelectorAll("form [required]")].map(
      (el) => el.getAttribute("name"),
    ),
  );
  check(
    "solo nombre, correo, tipo y descripción son obligatorios",
    !requeridos.includes("presupuesto") && !requeridos.includes("timeline"),
    `requeridos: ${requeridos.join(", ")}`,
  );

  // textContent y no innerText: el bloque opcional arranca plegado dentro de
  // un <details>, así que innerText de algo oculto devuelve cadena vacía.
  const primera = await page.evaluate(
    () =>
      document.querySelector('select[name="presupuesto"] option')?.textContent ??
      "",
  );
  check(
    '"Aún no lo sé" es la primera opción de presupuesto',
    primera.trim() === "Aún no lo sé",
    `primera: ${primera}`,
  );

  // Enviar abre WhatsApp con el mensaje ya redactado. Se comprueba la URL
  // entera porque los tres fallos posibles son mudos: el número equivocado, el
  // texto sin codificar (se corta en el primer &) y los opcionales vacíos
  // colándose como líneas sueltas.
  await page.evaluate(() => {
    window.__waUrl = null;
    // Devuelve un objeto: el handler comprueba que window.open no dio null
    // antes de darlo por bueno, y le asigna .opener.
    window.open = (url) => ((window.__waUrl = url), {});
  });
  await page.fill('input[name="nombre"]', "Ana Solís");
  await page.fill('input[name="email"]', "ana@ejemplo.cr");
  await page.selectOption('select[name="tipo-proyecto"]', "landing-page");
  await page.fill('textarea[name="descripcion"]', "Quiero una página & rápida");
  await page.click('form button[type="submit"]');

  const waUrl = await page.evaluate(() => window.__waUrl);
  const texto = decodeURIComponent(new URL(waUrl ?? "https://x/").search.slice(6));
  check(
    "enviar abre WhatsApp sobre el número del sitio",
    (waUrl ?? "").startsWith("https://wa.me/50683047436?text="),
    `url: ${String(waUrl).slice(0, 45)}…`,
  );
  check(
    "el mensaje lleva los datos y respeta el & de la descripción",
    texto.includes("Nombre: Ana Solís") &&
      texto.includes("Tipo de proyecto: Landing page") &&
      texto.includes("Quiero una página & rápida"),
    `texto: ${JSON.stringify(texto.slice(0, 60))}…`,
  );
  check(
    "los opcionales vacíos no viajan en el mensaje",
    !texto.includes("Empresa:") && !texto.includes("Integrantes:"),
  );
  await ctx.close();
}

// 9. Lenis: activo, y sin romper lo que depende del scroll real.
//    Lenis desplaza el documento en vez de traducir un wrapper; si algún día
//    eso cambia, sticky y las revelaciones se rompen en silencio. De ahí el test.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  check(
    "Lenis se inicializa",
    await page.evaluate(() => document.documentElement.classList.contains("lenis"))
  );

  // El scroll real tiene que avanzar: si Lenis usara transform, scrollY seguiria en 0.
  await page.mouse.move(700, 500);
  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(1400);
  const y = await page.evaluate(() => window.scrollY);
  check("la rueda mueve el scroll real del documento", y > 400, `scrollY=${Math.round(y)}`);

  // Las revelaciones dependen de animation-timeline: view(), que lee ese scroll.
  await page.locator("#equipo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  const hidden = await page.evaluate(() => {
    return [...document.querySelectorAll("#equipo .reveal")].filter((el) => {
      const r = el.getBoundingClientRect();
      const onScreen = r.top < innerHeight && r.bottom > 0;
      return onScreen && +getComputedStyle(el).opacity < 0.9;
    }).length;
  });
  check("las revelaciones siguen funcionando con Lenis", hidden === 0, `invisibles: ${hidden}`);

  await ctx.close();
}

// 10. Sticky del caso de estudio sigue pegado con Lenis. Vive en su propia
//     URL desde que los casos dejaron de ser anclas dentro de /proyectos.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/proyectos/mea-culpa`, { waitUntil: "networkidle" });
  await page.locator("#mea-culpa").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const col = page.locator("#mea-culpa > div > div").first();
  const a = (await col.boundingBox())?.y ?? 0;
  await page.mouse.move(1000, 500);
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(1400);
  const b = (await col.boundingBox())?.y ?? 0;
  // Pegada: se mantiene cerca del top del viewport en vez de subir 700px con el scroll.
  check("la columna del caso queda sticky", b > 60 && b < 200, `y: ${Math.round(a)} -> ${Math.round(b)}`);
  await ctx.close();
}

// 11. Con reduced-motion Lenis no se instancia.
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  check(
    "con reduced-motion Lenis no se activa",
    !(await page.evaluate(() => document.documentElement.classList.contains("lenis")))
  );
  await ctx.close();
}

// 12. La marca del header: reposa en И, gira a N bajo el cursor y vuelve a И al
//     quitarlo. La letra que se ve sale de dos cosas independientes —cómo está
//     dibujada la diagonal y si el CSS refleja el elemento—, y cada una por
//     separado puede parecer correcta mientras el resultado está del revés. Por
//     eso se miden juntas en vez de mirar sólo el transform.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Devuelve >0 si en pantalla se lee И y <0 si se lee N.
  const letra = () =>
    page.evaluate(() => {
      const svg = document.querySelector("header .logo-mark");
      const diagonal = svg.querySelectorAll("rect")[2];
      // getCTM se detiene en el viewBox: da la diagonal tal como está dibujada,
      // sin contar el giro CSS del elemento. Si la punta de arriba cae a la
      // derecha de la de abajo, lo dibujado es una И.
      const ctm = diagonal.getCTM();
      const arriba = new DOMPoint(12, 1.4).matrixTransform(ctm);
      const abajo = new DOMPoint(12, 22.6).matrixTransform(ctm);
      const dibujada = arriba.x - abajo.x;

      // rotateY(180deg) deja m11 = -1: el elemento está reflejado, así que la
      // letra se ve al revés de como está dibujada.
      const t = getComputedStyle(svg).transform;
      const espejo = t !== "none" && new DOMMatrix(t).m11 < 0;
      return espejo ? -dibujada : dibujada;
    });

  // La animación de carga dura 2s y no deja fill: hay que dejarla acabar.
  await page.waitForTimeout(2400);
  const reposo = await letra();
  check("en reposo la marca es la И", reposo > 0.5, `desvío: ${reposo.toFixed(2)}`);

  await page.locator("header .logo-link").hover();
  await page.waitForTimeout(1000);
  const encima = await letra();
  check("con el cursor encima es una N", encima < -0.5, `desvío: ${encima.toFixed(2)}`);

  // Sacar el cursor del logo: la transición tiene que devolverla sola.
  await page.mouse.move(900, 600);
  await page.waitForTimeout(1000);
  const fuera = await letra();
  check("al quitar el cursor vuelve a la И", fuera > 0.5, `desvío: ${fuera.toFixed(2)}`);

  // La de carga es animación, no estado: tiene que volver a correr al refrescar.
  // A los 700ms (35% de 2s) ya debería estar enseñando la N.
  await page.reload({ waitUntil: "commit" });
  await page.waitForTimeout(700);
  const durante = await letra();
  check(
    "al refrescar la animación se dispara otra vez",
    durante < -0.5,
    `desvío a mitad de animación: ${durante.toFixed(2)}`
  );

  await ctx.close();
}

// 10. El showreel no debe mover nada al rotar.
//
// El hero ancla su texto abajo, así que cuando los slides no compartían caja
// cada rotación empujaba el bloque 37px. Como el carrusel no se detiene nunca,
// el CLS no tenía techo: subía mientras la persona siguiera en la home. Se veía
// solo si medías quieto en el hero —bastaba hacer scroll para que los saltos
// quedaran fuera de pantalla y dejaran de contar—, que es justo por lo que
// pasó desapercibido tanto tiempo.
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(BASE, { waitUntil: "load" });
  // Sin tocar nada y sin scroll: hay que quedarse en el hero para que los
  // saltos cuenten. 20 s son tres rotaciones del intervalo de 6 s.
  await page.waitForTimeout(20000);
  const cls = await page.evaluate(() => window.__cls);
  // 0.1 es el umbral de "bueno" de Core Web Vitals; aquí debería ser 0 clavado.
  check("tres rotaciones del showreel no producen CLS", cls < 0.01, `CLS: ${cls.toFixed(4)}`);
  await ctx.close();
}

// 11. El menú móvil entra y sale deslizando, y con reduced-motion no desliza.
{
  for (const rm of ["no-preference", "reduce"]) {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: rm,
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(1200);

    // El click va por JS a propósito: Lenis mueve el scroll bajo los pies de
    // Playwright y el click nativo se vuelve intermitente.
    //
    // El panel lo monta Radix en un portal, así que no existe hasta que se
    // abre: hay que esperarlo antes de medirlo.
    const posiciones = await page.evaluate(async () => {
      const sel = '[data-slot="sheet-content"]';
      document.querySelector('button[aria-label="Abrir menú"]').click();
      await new Promise((r) =>
        (function esperar() {
          document.querySelector(sel) ? r() : requestAnimationFrame(esperar);
        })()
      );
      const panel = document.querySelector(sel);
      const x = () => new DOMMatrix(getComputedStyle(panel).transform).m41;
      const vistas = new Set();
      const t0 = performance.now();
      await new Promise((done) =>
        (function tick() {
          vistas.add(Math.round(x()));
          performance.now() - t0 < 700 ? requestAnimationFrame(tick) : done();
        })()
      );
      return { pasos: vistas.size, final: x() };
    });

    check(
      `el panel acaba abierto (reduced-motion: ${rm})`,
      posiciones.final === 0,
      `x final: ${posiciones.final}`
    );
    check(
      rm === "reduce"
        ? "con reduced-motion el panel no desliza"
        : "el panel entra deslizando",
      rm === "reduce" ? posiciones.pasos <= 2 : posiciones.pasos > 4,
      `posiciones intermedias: ${posiciones.pasos}`
    );
    await ctx.close();
  }
}

await browser.close();
console.log(`\n${pass} pruebas ok, ${fail} fallidas`);
process.exit(fail ? 1 : 0);
