import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { SITE } from "@/lib/site";
import { MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "About Signature Closets | Tri-Cities' Custom Closet Experts",
  description:
    "Signature Closets is the Tri-Cities' custom closet and storage design team, serving Benton City, WA and the surrounding area with in-house design and installation.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Tri-Cities&apos; Custom Closet Experts
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
          Signature Closets designs, builds, and installs custom storage systems for homeowners throughout the
          Tri-Cities — Benton City, Kennewick, Pasco, Richland, and the surrounding communities. From walk-in
          closets to garage systems, every project starts with a free in-home consultation and ends with a space
          built specifically around how you actually live.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
          We&apos;re a local, in-house design and installation team — the people who measure your space are the same
          people who build and install it, with no subcontractors in between. We work in a range of finishes and
          materials, from melamine to wood veneer, so every project fits both your home and your budget.
        </p>

        <div className="mt-10 flex flex-col gap-3 rounded-xl border border-charcoal/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 text-charcoal/80">
            <a href={SITE.phoneTel} className="flex items-center gap-2 font-medium text-charcoal hover:text-brand-red">
              <Phone size={18} className="text-brand-red" />
              {SITE.phoneDisplay}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-brand-red" />
              {SITE.address}
            </span>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
          >
            Get a Free Design Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
