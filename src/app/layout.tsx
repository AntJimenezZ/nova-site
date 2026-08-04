import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Locator } from "@/components/locator";

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
  metadataBase: new URL("https://novasite.com"),
  title: {
    default: "NovaSite — Estudio de software",
    template: "%s · NovaSite",
  },
  description:
    "Estudio de software en Costa Rica. Diseñamos y construimos productos digitales a medida: web, e-commerce, aplicaciones y sistemas internos.",
  keywords: [
    "desarrollo web",
    "software a medida",
    "e-commerce",
    "aplicaciones",
    "costa rica",
  ],
  authors: [{ name: "NovaSite" }],
  creator: "NovaSite",
  publisher: "NovaSite",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://novasite.com",
    siteName: "NovaSite",
    title: "NovaSite — Estudio de software",
    description:
      "Estudio de software en Costa Rica. Productos digitales a medida, de la idea a producción.",
    images: [
      {
        url: "/logos/novasite.png",
        width: 1200,
        height: 630,
        alt: "NovaSite — Estudio de software",
      },
    ],
  },
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

const GA_MEASUREMENT_ID = "G-QVMKJ66BSM";
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

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
