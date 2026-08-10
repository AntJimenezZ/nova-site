import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `next dev` usa turbopack y `next build` usa webpack. Si comparten .next,
   * el segundo que arranca encuentra los artefactos del primero y revienta
   * ("Cannot find module '[turbopack]_runtime.js'" o un build-manifest.json
   * que no existe). Separarlos elimina el problema en vez de tener que
   * borrar .next cada vez que se cambia de modo.
   *
   * `next build` y `next start` corren con NODE_ENV=production, así que
   * ambos siguen usando .next: el despliegue no cambia.
   */
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",

  /**
   * El showreel pide quality={68} para la imagen del LCP. Hoy funciona con un
   * warning; a partir de Next.js 16 las calidades que no estén declaradas aquí
   * dejan de servirse. 75 es la que usa el resto del sitio por defecto.
   */
  images: { qualities: [68, 75] },

  /**
   * LocatorJS: React 19 eliminó `fiber._debugSource`, así que el runtime solo
   * no encuentra el origen de los elementos. El plugin de Babel lo resuelve
   * por otra vía: inyecta `data-locatorjs-id` en el JSX al compilar.
   *
   * Babel aquí solo parsea y vuelve a emitir TSX (sin preset-react ni
   * preset-typescript): Turbopack sigue haciendo la compilación real. Solo
   * en dev y solo sobre src/, para no pagarlo en build ni en node_modules.
   */
  turbopack:
    process.env.NODE_ENV === "development"
      ? {
          rules: {
            "./src/**/*.{jsx,tsx}": {
              loaders: [
                {
                  loader: "babel-loader",
                  options: {
                    babelrc: false,
                    configFile: false,
                    parserOpts: { plugins: ["jsx", "typescript"] },
                    plugins: [
                      // "path" mete ruta+línea en el propio atributo. El modo
                      // "id" por defecto usa una tabla en window.__LOCATOR_DATA__
                      // que solo se llena con los módulos que corren en el
                      // navegador, así que los server components se quedaban
                      // sin origen.
                      ["@locator/babel-jsx/dist", { dataAttribute: "path" }],
                    ],
                  },
                },
              ],
            },
          },
        }
      : undefined,
};

export default nextConfig;
