"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";

type Project = { src: string; alt: string; caption: string };

export default function RecentProjectsGrid({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project.src} delay={i * 60}>
            <figure className="group">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger image: ${project.alt}`}
                className="relative block aspect-square w-full overflow-hidden rounded-xl border border-charcoal/10 bg-cream-dark p-0 text-left shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </button>
              <figcaption className="mt-2 text-sm text-charcoal/70">{project.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Lightbox photos={projects} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
