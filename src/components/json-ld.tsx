/**
 * JSON.stringify puede emitir la secuencia "</script>" si el contenido la
 * incluye —el CMS deja escribir cualquier texto— y eso cierra la etiqueta
 * antes de tiempo. Escapar "<" lo evita sin romper el JSON.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
