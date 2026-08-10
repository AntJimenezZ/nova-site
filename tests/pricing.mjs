/**
 * Comprobaciones de los precios de partida.
 *
 *   node tests/pricing.mjs
 *
 * Node 24 importa el .ts directamente (type-stripping nativo), así que no hace
 * falta compilar nada. Cubre los dos fallos que no dan la cara hasta producción:
 * el formato que cambia según la máquina de build, y la frase del FAQ que se
 * queda muda si alguien renombra un plan.
 */
import assert from "node:assert/strict";
import { formatPrice, pricing } from "../src/lib/pricing.ts";

// 1. El importe, solo dígitos y comas. es-CR agrupaba los miles con un espacio
//    duro (U+00A0) y encima dependía de los datos ICU disponibles: "$1 200" en
//    una máquina, "$1200" en otra. El precio tiene que salir igual en todas.
//    ("Cotización" queda fuera: su tilde es legítima, no es un importe.)
for (const { title, from } of pricing.filter((t) => t.from !== null)) {
  const shown = formatPrice(from);
  assert.match(
    shown,
    /^desde \$\d{1,3}(,\d{3})*$/,
    `"${title}" no se formatea como importe ASCII: ${JSON.stringify(shown)}`,
  );
}
assert.equal(formatPrice(1200), "desde $1,200");
assert.equal(formatPrice(500), "desde $500");
assert.equal(formatPrice(null), "Cotización");

// 2. Un plan publicado con precio 0 o negativo entraría igual en el minPrice
//    del JSON-LD, y un precio falso en datos estructurados es peor que ninguno.
for (const { title, from } of pricing) {
  assert.ok(
    from === null || (Number.isFinite(from) && from > 0),
    `"${title}" tiene un precio de partida inválido: ${from}`,
  );
}

// 3. Los títulos que /guia-proyecto interpola en la respuesta de "¿cuánto
//    cuesta una página web?". Si se renombra uno, priceOf() no lanza: devuelve
//    "Cotización" y el FAQ —que va dentro del JSON-LD— pasa a decir que una
//    landing page "parte Cotización". Falla aquí en vez de en el buscador.
for (const title of ["Landing page", "Sitio web corporativo", "Tienda en línea"]) {
  const tier = pricing.find((t) => t.title === title);
  assert.ok(tier, `/guia-proyecto interpola "${title}" y ya no existe en pricing`);
  assert.notEqual(
    tier.from,
    null,
    `"${title}" se quedó sin precio; la respuesta del FAQ diría "parte Cotización"`,
  );
}

console.log(`ok — ${pricing.length} planes, formato y contrato del FAQ correctos`);
