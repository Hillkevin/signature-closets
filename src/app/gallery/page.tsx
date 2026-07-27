import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryPhotoGrid from "@/components/GalleryPhotoGrid";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { GALLERY_PHOTOS } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Our Work | Signature Closets",
  description:
    "A gallery of custom walk-in closets, reach-in closets, and storage solutions designed and installed by Signature Closets in Benton City, WA and the surrounding area.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
]);

export default function GalleryPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Our Work
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/80">
          A closer look at custom closets and storage systems we&apos;ve designed and installed for homeowners in
          Benton City, WA and the surrounding area.
        </p>

        <GalleryPhotoGrid photos={GALLERY_PHOTOS} />
      </section>

      <Footer />
    </div>
  );
}
