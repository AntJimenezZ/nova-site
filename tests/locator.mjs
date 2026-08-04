// Verifica que LocatorJS funcione en dev: runtime montado, atributos de origen
// inyectados por el plugin de Babel, y overlay que resuelve el componente.
// (React 19 quitó fiber._debugSource, por eso el origen viene del atributo.)
// Uso: pnpm dev  →  node tests/locator.mjs [url]
import assert from "node:assert/strict";
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000/proyectos";
const executablePath = process.env.CHROME_PATH;
const browser = await chromium.launch(
  executablePath ? { executablePath } : { channel: "chrome" },
);
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });

const mounted = await page.locator("#locatorjs-wrapper").count();
const tagged = page.locator("[data-locatorjs]");
const total = await tagged.count();

// El primer elemento marcado suele ser el iframe oculto de GTM: hay que buscar
// uno realmente visible para que el overlay tenga algo que dibujar.
let target = null;
for (let i = 0; i < total && !target; i++) {
  const box = await tagged.nth(i).boundingBox();
  if (box && box.width > 60 && box.height > 20 && box.y > 0 && box.y < 800) {
    target = { box, source: await tagged.nth(i).getAttribute("data-locatorjs") };
  }
}

// Alt + hover es lo que dispara el overlay con el origen.
let label = "";
if (target) {
  await page.keyboard.down("Alt");
  await page.mouse.move(
    target.box.x + target.box.width / 2,
    target.box.y + target.box.height / 2,
  );
  await page.waitForTimeout(800);
  label = (await page.locator("#locatorjs-labels-wrapper").textContent()) ?? "";
  await page.keyboard.up("Alt");
}

await browser.close();

assert.equal(mounted, 1, `el runtime de LocatorJS no se montó en ${url}`);
assert.ok(total > 0, "el plugin de Babel no inyectó data-locatorjs");
assert.ok(target, "ningún elemento marcado es visible");
assert.match(
  target.source ?? "",
  /\.(t|j)sx:\d+:\d+$/,
  `atributo sin ruta+línea: ${target.source}`,
);
assert.ok(
  label.trim(),
  "el overlay no mostró el componente al hacer Alt + hover",
);
console.log(
  `ok: LocatorJS activo — ${total} elementos, overlay "${label}" ← ${target.source}`,
);
