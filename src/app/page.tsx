import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Work_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccentHeading from "@/components/AccentHeading";
import Reveal from "@/components/Reveal";
import RecentProjectsGrid from "@/components/RecentProjectsGrid";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { getLocation } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import {
  MapPin,
  Palette,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Closets in Benton City, WA | Signature Closets",
  description:
    "Signature Closets designs and installs custom walk-in closets, reach-in closets & storage solutions in Benton City, WA. Free consultation — see our work.",
};

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] });

const PROCESS_STEPS = [
  {
    title: "Get your instant quote",
    description: "Enter your dimensions and finish on our online tool for a real price range in under a minute.",
  },
  {
    title: "Free in-home consultation & measurement",
    description: "A designer visits your space, takes exact measurements, and finalizes your price.",
  },
  {
    title: "3D design & material selection",
    description: "Walk through a 3D rendering of your new space and choose finishes, hardware, and add-ons.",
  },
  {
    title: "Custom build & professional installation",
    description: "Your closet is built to spec and installed by our in-house team — no subcontractors.",
  },
];

const PROJECTS = [
  {
    src: "/images/gallery/walk-in-closet-light-wood-glass-front-cabinets.jpg",
    alt: "Custom walk-in closet with light wood shelving, glass-front cabinets, and integrated LED lighting",
    caption: "Walk-in closet with LED lighting — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-light-wood-shoe-shelving-ottoman.jpg",
    alt: "Custom walk-in closet with light wood shoe shelving, a drawer tower, and a floating display shelf",
    caption: "Walk-in closet with shoe shelving — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-corner-shelving-bench-window.jpg",
    alt: "Custom corner walk-in closet with light wood shelving, a bench, and a window",
    caption: "Corner walk-in closet — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-light-wood-opens-to-laundry.jpg",
    alt: "Custom walk-in closet with light wood cabinetry that opens into a laundry room",
    caption: "Walk-in closet with laundry access — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-wood-open-shelving-corridor.jpg",
    alt: "Long walk-in closet corridor with repeated wood open shelving bays",
    caption: "Walk-in closet corridor — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-dark-wood-chandelier-wide-view.jpg",
    alt: "Walk-in closet with dark wood cabinetry and a beaded chandelier — Benton City, WA home",
    caption: "Dark wood walk-in closet with chandelier — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-white-woven-baskets-wide-view.jpg",
    alt: "Walk-in closet with white cabinetry and woven storage baskets — Benton City, WA home",
    caption: "White walk-in closet with woven baskets — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-white-rose-gold-designer-display.jpg",
    alt: "Walk-in closet with white cabinetry, rose gold hardware, and designer bag display — Benton City, WA home",
    caption: "White walk-in closet with rose gold hardware — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-light-wood-designer-storage-wide.jpg",
    alt: "Walk-in closet with light wood cabinetry and brass hardware — Benton City, WA home",
    caption: "Light wood walk-in closet with brass hardware — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-light-birch-benton-city-corner-shelving.jpg",
    alt: "Walk-in closet with light birch corner shelving and hanging rods — Benton City, WA home",
    caption: "Light birch walk-in closet with corner shelving — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-dark-wood-shoe-boot-display.jpg",
    alt: "Walk-in closet with dark wood glass-front cabinetry displaying a shoe and boot collection — Benton City, WA home",
    caption: "Walk-in closet with shoe and boot display — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-white-sloped-ceiling-shelving.jpg",
    alt: "Walk-in closet with white shelving built into a sloped ceiling — Benton City, WA home",
    caption: "Walk-in closet with sloped ceiling shelving — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-light-birch-styled-hanging-section.jpg",
    alt: "Walk-in closet with light birch cabinetry and hanging clothes storage — Benton City, WA home",
    caption: "Light birch walk-in closet — Benton City, WA home",
  },
  {
    src: "/images/gallery/walk-in-closet-hallway-mirror-to-bathroom.jpg",
    alt: "Walk-in closet hallway with a full-length mirror opening to the bathroom — Benton City, WA home",
    caption: "Walk-in closet hallway to bathroom — Benton City, WA home",
  },
];

const VALUE_PROPS = [
  {
    icon: Sparkles,
    title: "Custom-fit, not one-size-fits-all",
    description: "Every design is built around your exact space, not a pre-set module.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime warranty",
    description: "Our builds are backed by a lifetime warranty on materials and workmanship.",
  },
  {
    icon: Users,
    title: "Local, in-house design & installation team",
    description: "No subcontractors — the people who design your closet are the people who build it.",
  },
  {
    icon: Palette,
    title: "Wide range of finishes & materials",
    description: "From melamine to wood veneer, there's a finish for every style and budget.",
  },
];

const FAQS = [
  {
    question: "How much do custom closets cost?",
    answer:
      "It depends on your dimensions, material, and any add-ons like lighting or soft-close drawers. Use our Instant Quote Tool for a real price range in under a minute, then get an exact quote at your free in-home measurement.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most single-closet installations take one day. Larger projects like garage systems or multiple rooms may take two to three days.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes. Every project starts with a free in-home consultation and measurement — no obligation to book anything after.",
  },
  {
    question: "What areas do you serve?",
    answer: "We serve Benton City, WA and the surrounding areas. See our Service Area section below for the full list.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We offer melamine, laminate, and wood veneer finishes, each available in a range of colors and textures to match your home.",
  },
];

const FEATURED_SERVICE_AREAS = ["kennewick", "richland", "pasco", "west-richland", "prosser", "yakima"].map(
  getLocation,
);

const breadcrumbListJsonLd = breadcrumbJsonLd([{ name: "Home", path: "/" }]);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header showInstantQuoteCta />

      {/* 2. Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/gallery/walk-in-closet-light-wood-luxury-wide-view.jpg"
          alt="Custom walk-in closet with light wood built-in cabinetry, glass-front display cabinets, and integrated LED lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[1.12] contrast-[1.05] saturate-[1.1]"
        />
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-36">
          <div className="max-w-xl">
            <h1
              className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.85)" }}
            >
              Custom Closets Designed for the Way You Live in Benton City, WA
            </h1>
            <p
              className="mt-5 max-w-lg text-lg leading-relaxed text-white"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.85)" }}
            >
              From walk-in closets to pantry systems, Signature Closets builds storage that fits your space and your
              style.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
            >
              Get a Free Design Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Instant Quote Strip */}
      <section className="border-t border-brass/30 bg-gradient-to-br from-charcoal via-charcoal to-[#242425]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-14 text-center lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Curious What Your Closet Would Cost?
          </h2>
          <p className="max-w-md text-cream/80">
            Answer a few quick questions and get a real price range in seconds.
          </p>
          <Link
            href="/instant-quote"
            className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
          >
            <Ruler size={18} />
            Try the Instant Quote Tool
          </Link>
        </div>
      </section>

      {/* 5. Services Overview */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <AccentHeading className="text-3xl">Our Custom Storage Solutions</AccentHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <div className="flex h-full flex-col rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                <service.icon size={22} className="text-brand-red" />
                <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{service.summary}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                >
                  Learn More →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <AccentHeading className="text-3xl">From Idea to Installed — Our Process</AccentHeading>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red font-serif text-lg font-semibold text-white ring-2 ring-brass ring-offset-2 ring-offset-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-medium text-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link
            href="/process"
            className="mt-8 inline-block text-sm font-medium text-brand-red hover:text-brand-red-dark"
          >
            See our full process →
          </Link>
        </div>
      </section>

      {/* Affiliations */}
      <section className="border-t border-charcoal/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-8">
          <p className="text-2xl font-medium uppercase tracking-wide text-charcoal/50">Proud Members Of</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            <Image
              src="/images/affiliations/acsp-logo.png"
              alt="Association of Closet and Storage Professionals member"
              width={532}
              height={231}
              className="h-28 w-auto"
            />
            <Image
              src="/images/affiliations/hba-logo.png"
              alt="Home Builders Association member"
              width={330}
              height={172}
              className="h-28 w-auto"
            />
          </div>
        </div>
      </section>

      {/* 7. Featured Projects / Gallery */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">Recent Projects in Benton City, WA</h2>
          <Link href="/gallery" className="text-sm font-medium text-brand-red hover:text-brand-red-dark">
            View full portfolio →
          </Link>
        </div>
        <RecentProjectsGrid projects={PROJECTS} />
      </section>

      {/* 8. Why Choose Signature Closets */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <AccentHeading className="text-3xl">
            Why Homeowners in Benton City, WA Choose Signature Closets
          </AccentHeading>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop, i) => (
              <Reveal key={prop.title} delay={i * 80}>
                <div>
                  <prop.icon size={22} className="text-brand-red" />
                  <h3 className="mt-4 font-medium text-charcoal">{prop.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{prop.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(faqJsonLd)} />
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-charcoal/10">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-charcoal">
                  {faq.question}
                  <span className="ml-4 text-brand-red transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-charcoal/70">
            Want the numbers first?{" "}
            <Link href="/instant-quote" className="font-medium text-brand-red hover:text-brand-red-dark">
              Try the Instant Quote Tool
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 11. Service Area */}
      <section className="border-t border-brass/30 bg-gradient-to-br from-charcoal via-charcoal to-[#242425]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-white">
            Proudly Serving Benton City, WA and Surrounding Areas
          </h2>
          <p className="mt-4 max-w-2xl text-cream/80">
            Our design and installation team covers Benton City, WA and the neighborhoods and towns around it.
            Don&apos;t see your area listed? Reach out — we may still be able to help.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {FEATURED_SERVICE_AREAS.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-white"
                >
                  <MapPin size={14} className="text-brand-red" />
                  {location.city}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/locations"
            className="mt-8 inline-block text-sm font-medium text-brand-red hover:text-brand-red-dark"
          >
            See all our service areas →
          </Link>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Ready to Design Your Custom Closet?
          </h2>
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
          <Link
            href="/instant-quote"
            className={`${workSans.className} mt-2 inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30`}
          >
            Instant Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
