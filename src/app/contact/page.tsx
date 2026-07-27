import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { SITE } from "@/lib/site";
import { Clock, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Signature Closets | Benton City, WA",
  description:
    "Contact Signature Closets for a free in-home consultation. Phone, address, and hours for our Benton City, WA showroom.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal/80">
          Reach out for a free in-home consultation, or stop by our showroom in Benton City, WA.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-charcoal/10 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-charcoal">Book Your Free Consultation</h2>
            <p className="mt-2 text-sm text-charcoal/60">
              Tell us a bit about your project and we&apos;ll be in touch to schedule your free in-home (or
              virtual) consultation.
            </p>
            <div className="mt-6">
              <ConsultationForm />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 rounded-xl border border-charcoal/10 bg-white p-8">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-charcoal/50">
                  <Phone size={16} className="text-brand-red" />
                  Phone
                </div>
                <a href={SITE.phoneTel} className="mt-2 block text-lg font-medium text-charcoal hover:text-brand-red">
                  {SITE.phoneDisplay}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-charcoal/50">
                  <MapPin size={16} className="text-brand-red" />
                  Address
                </div>
                <p className="mt-2 text-lg text-charcoal">{SITE.address}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-charcoal/50">
                  <Clock size={16} className="text-brand-red" />
                  Hours
                </div>
                <ul className="mt-2 space-y-1 text-lg text-charcoal">
                  {SITE.hours.map((entry) => (
                    <li key={entry.days}>
                      {entry.days}: {entry.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-charcoal/10 bg-cream-dark">
              <iframe
                src={`https://www.google.com/maps?q=${SITE.coordinates.lat},${SITE.coordinates.lng}&z=16&output=embed`}
                title="Map showing the Signature Closets showroom location in Benton City, WA"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
