/**
 * Fuente única de nombre, dirección, teléfono y correo (NAP).
 *
 * Google cruza estos datos entre el sitio, el perfil de empresa y cualquier
 * directorio: si no coinciden carácter por carácter, la señal local se diluye.
 * Footer, /contacto, el JSON-LD y el sitemap consumen de aquí. Un dato, un sitio.
 */
export const site = {
  name: "NovaSite",
  /** Host canónico. El dominio raíz responde 307 hacia www, así que www manda. */
  url: "https://www.novacr.site",
  description:
    "Estudio de software en Costa Rica. Diseñamos y construimos productos digitales a medida: web, e-commerce, aplicaciones y sistemas internos.",
  email: "contacto@novacr.site",
  /** E.164 para tel:, wa.me y JSON-LD. */
  phone: "+50683047436",
  /** El mismo número como lo lee una persona. Debe coincidir con el perfil de Google. */
  phoneDisplay: "+506 8304 7436",
  whatsapp: "https://wa.me/50683047436",
  address: {
    locality: "San Carlos",
    region: "Alajuela",
    country: "CR",
  },
  coverage: "San Carlos · Alajuela · San José · todo Costa Rica",
} as const;

/**
 * La imagen de compartir. Las medidas las lee también src/app/opengraph-image.tsx
 * para renderizarla: declaradas en un solo sitio no pueden volver a
 * desincronizarse, que es lo que pasó con el PNG de 357×315 que decía ser 1200×630.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — Estudio de software en Costa Rica`,
};

/**
 * Next hace merge superficial de la metadata: si una página define `openGraph`,
 * el del layout se descarta ENTERO —url, locale, siteName e imagen incluidas—.
 * Por eso cada página compone el suyo desde aquí en vez de definirlo suelto.
 */
export const openGraphFor = (
  path: string,
  title: string,
  description: string,
) => ({
  type: "website" as const,
  locale: "es_CR",
  siteName: site.name,
  url: `${site.url}${path}`,
  title,
  description,
  images: [OG_IMAGE],
});

/** Ficha de negocio local: teléfono, zona y correo en el resultado de Google. */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "Costa Rica" },
  priceRange: "$$",
};

/** Migas en el resultado de búsqueda en vez de la URL cruda. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Inicio", path: "/" }, ...trail].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});
