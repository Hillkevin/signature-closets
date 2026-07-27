import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Service Areas | Signature Closets",
  description:
    "Signature Closets serves Benton City, WA and surrounding communities across Washington and Oregon. See all 10 cities we serve.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/locations" },
]);

const WA_LOCATIONS = LOCATIONS.filter((l) => l.state === "WA");
const OR_LOCATIONS = LOCATIONS.filter((l) => l.state === "OR");

function LocationGrid({ locations }: { locations: typeof LOCATIONS }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <Link
          key={location.slug}
          href={`/locations/${location.slug}`}
          className="flex items-center gap-2 rounded-xl border border-charcoal/10 bg-white p-5 font-medium text-charcoal shadow-sm transition-colors hover:border-brand-red hover:text-brand-red"
        >
          <MapPin size={16} className="text-brand-red" />
          {location.city}, {location.state}
        </Link>
      ))}
    </div>
  );
}

export default function LocationsIndexPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Service Areas
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/80">
          We design and install custom closets and storage systems from our Benton City, WA workshop out across the
          Tri-Cities and beyond — including a regular service area across the Oregon border.
        </p>

        <h2 className="mt-14 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Washington</h2>
        <LocationGrid locations={WA_LOCATIONS} />

        <h2 className="mt-14 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Oregon</h2>
        <LocationGrid locations={OR_LOCATIONS} />

        <p className="mt-10 text-charcoal/80">
          Don&apos;t see your city listed?{" "}
          <Link href="/contact" className="font-medium text-brand-red hover:text-brand-red-dark">
            Reach out
          </Link>{" "}
          — we may still be able to help.
        </p>
      </section>

      <Footer />
    </div>
  );
}
