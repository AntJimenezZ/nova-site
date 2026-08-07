import { ImageResponse } from "next/og";
import { OG_IMAGE, site } from "@/lib/site";

/**
 * La vista previa que ven WhatsApp, Facebook y LinkedIn.
 *
 * Se genera aquí en vez de exportar un PNG a mano porque el archivo anterior
 * declaraba 1200×630 y medía 357×315. Renderizándolo en el build, las medidas
 * no pueden volver a desincronizarse.
 *
 * Satori no entiende oklch, así que los colores van en hex: son los mismos
 * --stage, --brand-vivid y --stage-foreground de globals.css.
 */
export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C0F12",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Misma marca "N" que chrome.tsx: dos pilares y una diagonal. */}
          <svg width="52" height="52" viewBox="0 0 24 24" fill="#4C9AFF">
            <rect x="2" y="3" width="4.2" height="18" rx="1" />
            <rect x="17.8" y="3" width="4.2" height="18" rx="1" />
            <rect
              x="9.9"
              y="1.4"
              width="4.2"
              height="21.2"
              rx="1"
              transform="rotate(20 12 12)"
            />
          </svg>
          <span
            style={{
              color: "#F5F7F8",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            NOVASITE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#F5F7F8",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Estudio de software
          </span>
          <span
            style={{
              color: "#4C9AFF",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            en Costa Rica.
          </span>
          <span
            style={{
              color: "#A8B0B8",
              fontSize: 32,
              marginTop: 28,
              lineHeight: 1.4,
            }}
          >
            Páginas web, tiendas en línea y aplicaciones a medida.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2A3038",
            paddingTop: 28,
            color: "#A8B0B8",
            fontSize: 26,
          }}
        >
          <span>www.novacr.site</span>
          <span>{site.phoneDisplay}</span>
        </div>
      </div>
    ),
    size,
  );
}
