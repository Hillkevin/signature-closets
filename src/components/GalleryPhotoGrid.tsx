"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import type { GalleryPhoto } from "@/lib/gallery";

export default function GalleryPhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View larger image: ${photo.alt}`}
            className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-charcoal/10 bg-cream-dark p-0 text-left shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
