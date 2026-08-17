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
  const [isClosing, setIsClosing] = useState(false);
  const isOpen = selectedIndex !== null;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedIndex(null);
      setIsClosing(false);
    }, 250);
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
            className="reveal group glass-card-interactive relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-2xl"
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
                className="object-contain object-center p-1 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            )}

            {/* Indicator badge on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
              <div className="glass-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white shadow-xl">
                <ZoomIn className="size-4 text-brand-vivid" />
                <span>Ampliar imagen</span>
              </div>
            </div>
          </figure>
        ))}
      </div>

      {/* Liquid Glass Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de imagen"
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 lg:p-12 bg-black/40 backdrop-blur-xl duration-250 ${
            isClosing ? "animate-out fade-out" : "animate-in fade-in"
          }`}
          onClick={handleClose}
        >
          <div
            className={`liquid-glass-modal relative flex h-[95vh] w-[95vw] max-w-[1600px] flex-col overflow-hidden rounded-3xl md:rounded-[2.25rem] p-4 sm:p-6 md:p-7 text-stage-foreground ${
              isClosing ? "animate-out zoom-out-95 fade-out duration-250" : "animate-modal-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top header bar */}
            <div className="mb-4 flex w-full items-center justify-end gap-3 px-1 text-white">

              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar imagen ampliada"
                className="glass-button flex size-9 cursor-pointer items-center justify-center rounded-full text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Stage: Frame for uncropped image with liquid glass inner lighting */}
            <div className="relative flex min-h-[38vh] sm:min-h-[48vh] md:min-h-[54vh] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-inner">
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                sizes="(max-width: 1200px) 90vw, 1100px"
                priority
                className="object-contain select-none p-3 transition-opacity duration-200"
              />

              {/* Prev / Next controls floating on stage */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Imagen anterior"
                    className="glass-button absolute left-3 top-1/2 -translate-y-1/2 z-20 flex size-11 cursor-pointer items-center justify-center rounded-full text-white"
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
                    className="glass-button absolute right-3 top-1/2 -translate-y-1/2 z-20 flex size-11 cursor-pointer items-center justify-center rounded-full text-white"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail navigation dock */}
            {images.length > 1 && (
              <div className="glass-dock mt-4 flex items-center justify-center gap-2.5 overflow-x-auto rounded-2xl p-2 hidden-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    className={`relative h-11 w-18 shrink-0 overflow-hidden rounded-xl border transition-all duration-200 ${
                      idx === selectedIndex
                        ? "border-brand-vivid ring-2 ring-brand-vivid/60 scale-105 shadow-md opacity-100"
                        : "border-white/15 opacity-50 hover:opacity-90 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="72px"
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
