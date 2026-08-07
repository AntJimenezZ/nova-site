import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin es el editor de TinaCMS, que se sirve como archivo estático.
      // Esto lo saca del índice; NO lo protege: eso es autenticación aparte.
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
