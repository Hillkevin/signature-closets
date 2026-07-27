import Image from "next/image";
import Link from "next/link";
import { Check, Phone, Ruler } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { SITE } from "@/lib/site";
import type { Service } from "@/lib/services";

export default function ServicePage({ service }: { service: Service }) {
  const breadcrumbListJsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
            {service.heroHeadline}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal/80">{service.heroDescription}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
          >
            Get a Free Design Consultation
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-cream-dark">
          {service.heroImage ? (
            <Image
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={service.heroImageAlt}
              className="flex h-full w-full items-center justify-center text-sm text-charcoal/50"
            >
              [ Project photo placeholder ]
            </div>
          )}
        </div>
      </section>

      {/* Why this service */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">{service.whyTitle}</h2>
          {service.whyParagraphs.map((paragraph, i) => (
            <p key={i} className="mt-4 text-lg leading-relaxed text-charcoal/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold text-charcoal">What&apos;s Included</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.included.map((item) => (
            <li key={item} className="flex items-start gap-2 text-charcoal/80">
              <Check size={16} className="mt-1 shrink-0 text-brand-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Design Considerations */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">Design Considerations</h2>
          <p className="mt-4 text-charcoal/80">{service.designConsiderationsIntro}</p>
          <ul className="mt-6 space-y-3">
            {service.designConsiderations.map((item) => (
              <li key={item} className="flex items-start gap-2 leading-relaxed text-charcoal/80">
                <Check size={16} className="mt-1 shrink-0 text-brand-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Estimate CTA */}
      <section className="bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-14 text-center lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Curious What This Project Would Cost?
          </h2>
          <p className="max-w-md text-cream/80">
            Get a real price range in under a minute — no calls, no waiting.
          </p>
          <Link
            href="/instant-quote"
            className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
          >
            <Ruler size={18} />
            Get a price estimate for this project
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-charcoal/10">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-charcoal">
                  {faq.question}
                  <span className="ml-4 text-brand-red transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">{service.closingHeadline}</h2>
          <p className="max-w-xl text-cream/80">
            Book your free in-home consultation, or call us directly to speak with a designer today.
          </p>
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
