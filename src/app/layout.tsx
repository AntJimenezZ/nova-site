import type { Metadata, Viewport } from "next";
import { Montserrat, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "NovaSite - Desarrollo de Software",
  description:
    "Transformamos tus ideas en soluciones digitales innovadoras. Desarrollo web profesional, e-commerce y aplicaciones personalizadas.",
  keywords: [
    "desarrollo web",
    "software",
    "e-commerce",
    "aplicaciones",
    "costa rica",
  ],
  authors: [{ name: "NovaSite" }],
  creator: "NovaSite",
  publisher: "NovaSite",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://novasite.com",
    siteName: "NovaSite",
    title: "NovaSite - Desarrollo de Software",
    description:
      "Transformamos tus ideas en soluciones digitales innovadoras. Desarrollo web profesional, e-commerce y aplicaciones personalizadas.",
    images: [
      {
        url: "/logos/novasite.png",
        width: 1200,
        height: 630,
        alt: "NovaSite - Desarrollo de Software",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const GA_MEASUREMENT_ID = "G-QVMKJ66BSM";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${outfit.variable} antialiased overflow-x-hidden min-h-screen`}
      >
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
        {children}
      </body>
    </html>
  );
}
