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

// 2. Menú móvil: <dialog> nativo con foco atrapado y cierre por Escape.
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 780 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  await page.locator('button[aria-label="Abrir menú"]').click();
  await page.waitForTimeout(350);
  check("el menú móvil abre", (await page.locator("dialog[open]").count()) === 1);

  check(
    "el foco queda dentro del diálogo",
    await page.evaluate(
      () => document.querySelector("dialog[open]")?.contains(document.activeElement) ?? false
    )
  );

  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  check("Escape cierra el menú", (await page.locator("dialog[open]").count()) === 0);
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
  const sel = "section[aria-roledescription=carrusel] h2";
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

await browser.close();
console.log(`\n${pass} pruebas ok, ${fail} fallidas`);
process.exit(fail ? 1 : 0);
