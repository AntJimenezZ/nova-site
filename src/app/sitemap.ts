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
  ];
  const casos = projects.map((p) => `/proyectos/${p.slug}`);
  const lastModified = new Date();

  return [...paginas, ...casos].map((ruta) => ({
    url: `${site.url}${ruta}`,
    lastModified,
    changeFrequency: ruta === "" ? "weekly" : "monthly",
    priority: ruta === "" ? 1 : ruta === "/contacto" ? 0.9 : 0.8,
  }));
}
