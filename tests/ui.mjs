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

// 6. Las anclas del showreel llegan a su caso en /proyectos.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/proyectos#restaurant-app`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const visible = await page.locator("#restaurant-app").isVisible();
  const y = await page.evaluate(() => window.scrollY);
  check("el ancla #restaurant-app navega y es visible", visible && y > 100, `scrollY=${Math.round(y)}`);
  await ctx.close();
}

// 7. Lenis: activo, y sin romper lo que depende del scroll real.
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

// 8. Sticky de los casos de estudio sigue pegado con Lenis.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/proyectos`, { waitUntil: "networkidle" });
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

// 9. Con reduced-motion Lenis no se instancia.
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

await browser.close();
console.log(`\n${pass} pruebas ok, ${fail} fallidas`);
process.exit(fail ? 1 : 0);
