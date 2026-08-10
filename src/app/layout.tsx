import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader, SiteFooter, WhatsAppFab } from "@/components/chrome";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Locator } from "@/components/locator";
import { JsonLd } from "@/components/json-ld";
import { businessSchema, openGraphFor, site } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // Base contra la que Next resuelve toda URL relativa de la metadata: si está
  // mal, arrastra la imagen de compartir y todos los canonical con ella.
  metadataBase: new URL(site.url),
  title: {
    default: "NovaSite — Estudio de software",
    template: "%s · NovaSite",
  },
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name }],
  creator: "NovaSite",
  publisher: "NovaSite",
  formatDetection: { email: false, address: false, telephone: false },
  /**
   * Requisito de entrada para AI Overviews y AI Mode: Google solo usa páginas
   * "indexadas y elegibles para mostrarse con un fragmento". Sin declarar nada
   * el límite de fragmento queda al criterio de Google, que lo recorta; y un
   * `max-snippet` corto o un `nosnippet` heredado deja la página fuera de las
   * funciones generativas por completo.
   *
   * -1 = sin límite de longitud. `max-image-preview: large` es además lo que
   * habilita la miniatura grande, que es como se cita un caso de estudio.
   *
   * Vive en el layout y no en cada página: Next hereda `robots` a todas las
   * rutas que no lo sobrescriban, y ninguna lo hace.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: openGraphFor(
    "/",
    "NovaSite — Estudio de software en Costa Rica",
    "Hacemos páginas web, tiendas en línea y aplicaciones a medida para empresas de Costa Rica.",
  ),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFCFD" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0F12" },
  ],
};

/**
 * Solo GTM. Antes cargaba también gtag.js con G-QVMKJ66BSM: si GTM lleva
 * dentro una etiqueta de GA4 —que es la razón habitual para instalar GTM—,
 * cada visita se contaba dos veces. La etiqueta de GA4 se configura dentro
 * del contenedor, no aquí.
 */
const GTM_ID = "GTM-P54PF2ZQ";

/**
 * Se ejecuta antes del primer paint para evitar el flash de tema equivocado.
 * Tiene que ser bloqueante y estar en <head>: si se difiere, el flash vuelve.
 */
const themeInit = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} min-h-[100dvh] overflow-x-hidden`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Saltar al contenido
        </a>

        <Locator />
        <SmoothScroll />
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />

        {/* Vive aquí y no en cada página: antes faltaba justo en /servicios y
            /proyectos, donde el visitante termina de decidirse. */}
        <WhatsAppFab />

        <JsonLd data={businessSchema} />
      </body>
    </html>
  );
}
