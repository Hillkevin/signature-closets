"use client";

import { useCallback, useEffect, useRef } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxPhoto = { src: string; alt: string };

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const total = photos.length;
      onNavigate(((next % total) + total) % total);
    },
    [photos.length, onNavigate],
  );

  useEffect(() => {
    if (index === null) return;
    const currentIndex = index;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      if (e.key === "ArrowRight") goTo(currentIndex + 1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, onClose, goTo]);

  if (index === null) return null;
  const photo = photos[index];

  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(delta > 0 ? index - 1 : index + 1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
      >
        <X size={26} />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1);
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}

      <div className="relative h-[78vh] w-full max-w-5xl sm:h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="92vw" className="object-contain" priority />
      </div>

      <p className="absolute bottom-4 left-1/2 max-w-[90vw] -translate-x-1/2 text-center text-sm text-white/70">
        {photo.alt}
        {photos.length > 1 && (
          <span className="ml-2 text-white/40">
            ({index + 1} / {photos.length})
          </span>
        )}
      </p>
    </div>
  );
}
