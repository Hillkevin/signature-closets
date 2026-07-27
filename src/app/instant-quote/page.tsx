import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstantQuoteWizard from "@/components/InstantQuoteWizard";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { getPricing } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Instant Quote Tool | Signature Closets",
  description:
    "Get an instant custom closet, garage cabinet, or storage price quote in under a minute. Free, no obligation — then book your in-home measurement.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Instant Quote", path: "/instant-quote" },
]);

export default async function InstantQuotePage() {
  const pricing = await getPricing();

  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-2xl px-6 pt-20 lg:px-8 lg:pt-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Get Your Instant Quote
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/80">
          Answer a few quick questions about your project for a real price range in under a minute &mdash; then
          book your free in-home measurement to lock in an exact price.
        </p>
      </section>

      <InstantQuoteWizard pricing={pricing} />

      <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-8">
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">How We Calculate Your Quote</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-charcoal/80">
            <li>
              <strong>Project type &amp; size:</strong> Closets, garage cabinets, and storage systems each start
              from a different base price, scaled by whether your project is small, medium, or large.
            </li>
            <li>
              <strong>Material:</strong> White, colored, and textured melamine each carry a different price
              multiplier on the base.
            </li>
            <li>
              <strong>Accessories:</strong> Features like lighting, soft-close drawers, and a center island add a
              flat amount to your quote.
            </li>
            <li>
              <strong>Range, not exact price:</strong> Because every room has quirks &mdash; outlets, vents,
              uneven walls &mdash; we show a range. Your final number is locked in once we&apos;ve measured your
              actual space, for free.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">Why Start Here Instead of Booking a Call?</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-charcoal/80">
            <li>See if a project fits your budget before scheduling anything</li>
            <li>Compare material tiers and accessories side by side</li>
            <li>Walk into your free consultation already knowing roughly what to expect</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">What Happens Next</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-charcoal/80">
            <li>You get your instant quote range and submit your contact info</li>
            <li>Our team reaches out to confirm a time for your free in-home measurement</li>
            <li>A designer measures your space and finalizes your exact price</li>
            <li>You approve the design, and we schedule installation</li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">Instant Quote Tool FAQs</h2>
          <dl className="mt-3 text-[15px] leading-relaxed text-charcoal/80">
            <dt className="mt-4 font-semibold text-charcoal">Is this quote exact?</dt>
            <dd>
              No &mdash; it&apos;s a real price range based on typical costs for your project type, size, and
              finish. Your final price is confirmed for free once we measure your space.
            </dd>

            <dt className="mt-4 font-semibold text-charcoal">Does submitting my info commit me to buying anything?</dt>
            <dd>No. Requesting a measurement is free and no-obligation.</dd>

            <dt className="mt-4 font-semibold text-charcoal">What if my project doesn&apos;t fit neatly into small, medium, or large?</dt>
            <dd>
              Pick whichever size is the closest match &mdash; irregular shapes, alcoves, and multi-room projects
              are priced exactly during your in-home measurement.
            </dd>

            <dt className="mt-4 font-semibold text-charcoal">How long is the free measurement appointment?</dt>
            <dd>Typically 30-45 minutes.</dd>
          </dl>
        </section>
      </div>

      <Footer />
    </div>
  );
}
