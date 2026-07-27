import Link from "next/link";
import { Phone, Ruler } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { getLocation } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function LocationPage({ slug }: { slug: string }) {
  const location = getLocation(slug);

  const breadcrumbListJsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
    { name: location.city, path: `/locations/${location.slug}` },
  ]);

  const genericFaq = {
    question: `Do you serve ${location.city}?`,
    answer: `Yes — ${location.city} is part of our regular service area. ${location.distanceNote}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [genericFaq, location.uniqueFaq].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(faqJsonLd)} />

      <Header />

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Custom Closets in {location.city}, {location.state}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/80">{location.intro}</p>

        <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
          Why {location.city} Homeowners Choose Signature Closets
        </h2>
        <p className="mt-4 leading-relaxed text-charcoal/80">{location.whyParagraph}</p>

        <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Services Available</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="font-medium text-brand-red hover:text-brand-red-dark"
              >
                {service.title} →
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
          Serving {location.city}
        </h2>
        <p className="mt-4 leading-relaxed text-charcoal/80">{location.distanceNote}</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
          >
            Book a Free Consultation
          </Link>
          <Link
            href="/instant-quote"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-7 font-medium text-charcoal transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <Ruler size={18} />
            Get an Instant Quote
          </Link>
        </div>

        <h2 className="mt-12 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 divide-y divide-charcoal/10">
          {[genericFaq, location.uniqueFaq].map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-charcoal">
                {faq.question}
                <span className="ml-4 text-brand-red transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{faq.answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-sm text-charcoal/70">
          <Link href="/locations" className="font-medium text-brand-red hover:text-brand-red-dark">
            ← See all service areas
          </Link>
        </p>
      </section>

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Ready to Design Your Custom Closet in {location.city}?
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
            >
              Get a Free Design Consultation
            </Link>
            <a
              href={SITE.phoneTel}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-7 font-medium text-white transition-colors hover:bg-white/10"
            >
              <Phone size={16} />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
