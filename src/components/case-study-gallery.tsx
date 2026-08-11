"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "@/components/project-media";

type ImageItem = {
  src: string;
  alt: string;
  caption: string;
};

export function CaseStudyGallery({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const images: ImageItem[] = [
    {
      src: project.image,
      alt: `Captura 1 de ${project.title}`,
      caption: `${project.title} — Vista Principal`,
    },
    ...(project.gallery?.map((src, idx) => ({
      src,
      alt: `Captura ${idx + 2} de ${project.title}`,
      caption: `${project.title} — Vista ${idx + 2}`,
    })) || []),
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  return (
    <>
      <div className="flex flex-col gap-6">
        {images.map((img, idx) => (
          <figure
            key={img.src}
            onClick={() => setSelectedIndex(idx)}
            className="reveal group relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-stage/80 transition-all duration-300 hover:border-brand/60 hover:shadow-2xl"
          >
            {idx === 0 ? (
              <ProjectMedia
                project={project}
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 60vw"
                fit="contain"
              />
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center p-1 transition-transform duration-300 group-hover:scale-[1.01]"
              />
            )}

            {/* Indicator badge on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md">
                <ZoomIn className="size-4 text-brand" />
                <span>Ampliar imagen</span>
              </div>
            </div>
          </figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de imagen"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[94vh] max-w-[96vw] flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top header bar */}
            <div className="mb-3 flex w-full items-center justify-between px-2 text-white">
              <span className="text-xs font-medium text-white/80">
                {images[selectedIndex].caption} ({selectedIndex + 1}/{images.length})
              </span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar imagen ampliada"
                className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 active:scale-95"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Full Uncropped Image View */}
            <div className="relative flex h-[78vh] w-[90vw] max-w-[1200px] items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black/60 p-2 shadow-2xl">
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                sizes="90vw"
                priority
                className="object-contain select-none p-2"
              />
            </div>

            {/* Prev / Next controls */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Imagen anterior"
                  className="absolute -left-12 top-1/2 -translate-y-1/2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/30 active:scale-95 max-md:left-2 z-10"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Siguiente imagen"
                  className="absolute -right-12 top-1/2 -translate-y-1/2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/30 active:scale-95 max-md:right-2 z-10"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            {/* Thumbnail navigation bar */}
            {images.length > 1 && (
              <div className="mt-4 flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    className={`relative h-12 w-20 overflow-hidden rounded-lg border transition-all ${
                      idx === selectedIndex
                        ? "border-brand ring-2 ring-brand/50 scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
