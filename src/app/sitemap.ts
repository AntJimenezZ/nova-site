import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    "/servicios",
    "/proyectos",
    "/sobre-nosotros",
    "/contacto",
    "/guia-proyecto",
    "/privacidad",
    "/terminos",
  ];
  const casos = projects.map((p) => `/proyectos/${p.slug}`);

  /**
   * Solo URLs, a propósito.
   *
   * `changefreq` y `priority` Google los ignora desde hace años. `lastmod` sí
   * lo usa —pero antes valía `new Date()`, así que cada build declaraba que
   * las once páginas habían cambiado hoy. Google detecta ese patrón y deja de
   * fiarse del lastmod de todo el sitemap, incluido el de la página que sí
   * cambió. Un sitemap que solo enumera URLs es válido y no miente.
   *
   * Si algún día hay blog, ahí sí toca un lastmod real por entrada.
   */
  return [...paginas, ...casos].map((ruta) => ({ url: `${site.url}${ruta}` }));
}
