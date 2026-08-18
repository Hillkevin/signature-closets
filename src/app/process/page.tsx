import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Process | Custom Closet Design & Installation | Signature Closets",
  description:
    "From your first consultation to final walkthrough — see exactly what to expect when you work with Signature Closets on your custom closet project.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Our Process", path: "/process" },
]);

const STEPS = [
  {
    number: 1,
    title: "Initial Consultation",
    photoLabel: "Photo: designer meeting with a client, either in-home or on a video call",
    image: {
      src: "/images/process/initial-consultation.jpg",
      alt: "Signature Closets designer reviewing material samples and a project layout with clients at the showroom counter",
    },
    intro:
      "We start by getting to know your space and how you actually live in it — whether that's in person at your home or over a video call, whichever works best for your schedule.",
    bullets: [
      "A conversation about your storage needs, style preferences, and budget",
      "If in-home: a walkthrough and initial measurements of the space",
      "If online: you'll share photos, rough dimensions, and we'll talk through the space together",
      "No pressure, no obligation — this is about understanding your project, not selling you anything yet",
    ],
  },
  {
    number: 2,
    title: "Design Phase",
    photoLabel: "Photo: designer sketching a layout, or a 3D design software screen",
    image: {
      src: "/images/process/design-phase-software-screen.jpg",
      alt: "Custom closet layout being designed in CAD software, showing wall elevation and cabinet sections",
    },
    intro: "Once we understand your space and goals, we get to work on the actual design.",
    bullets: [
      "A proposed layout tailored to your space — hanging sections, shelving, drawers, and storage zones mapped out to fit how you actually get dressed and organize",
      "A walkthrough of upgrade options: specialty hardware, lighting, glass-front cabinets, islands, and other premium features",
      "Accessory options: jewelry trays, tie/belt racks, pull-out hampers, shoe fixtures, and other functional add-ons",
      "This is a collaborative step — we'll go back and forth on the layout until it feels right before moving to a formal proposal",
    ],
  },
  {
    number: 3,
    title: "Proposal & Approval",
    photoLabel: "Photo: a 3D rendering/visualization on a screen or printed proposal",
    image: {
      src: "/images/process/proposal-approval.jpg",
      alt: "Printed 3D closet design rendering and proposal sheet showing a master closet layout",
    },
    intro:
      "You'll receive a complete proposal, not just a quote — so you can see exactly what you're getting before committing.",
    bullets: [
      "A visual 3D rendering of your finished space, so there are no surprises about how it will look",
      "A detailed, itemized price covering materials, hardware, and installation",
      "Time to review the design and proposal on your own — ask questions, request adjustments",
      "Once you approve, we collect a deposit to schedule your project and order materials",
      "You'll receive access to your client portal — this is where you can track exactly where your project is at every stage, from here through final installation",
    ],
  },
  {
    number: 4,
    title: "Production & Manufacturing",
    photoLabel: "Photo: workshop/production floor, materials being cut or assembled",
    intro: "With your design approved, your closet moves into production.",
    bullets: [
      "Your specific panels, shelving, and hardware are cut and prepared to your exact measurements",
      "You can check your client portal at any time to see your project's current stage",
      "We'll reach out if anything comes up that needs your input — otherwise, this stage runs in the background while you wait for your installation date",
    ],
  },
  {
    number: 5,
    title: "Installation",
    photoLabel: "Photo: installer(s) actively installing cabinetry/shelving in a client's home",
    intro: "Once your materials are ready, we schedule your installation.",
    bullets: [
      "We'll contact you to schedule a specific installation date that works for you",
      "Before we arrive: clear out the space completely — remove clothing, boxes, and any existing shelving or rods so our team has full access",
      "Installation is handled entirely by our in-house team — no subcontractors",
      "Most walk-in closets are completed in a single 8-hour day; larger or more complex projects may take longer",
      "We'll walk you through the finished space and how everything works before we leave",
    ],
  },
  {
    number: 6,
    title: "Final Quality Inspection",
    photoLabel: "Photo: finished, styled closet — the \"after\" shot",
    intro: "Every project ends with a final check to make sure everything is right.",
    bullets: [
      "A thorough walkthrough of the completed installation — drawers, doors, hardware, lighting, and fit are all checked",
      "Any adjustments needed are handled on the spot or scheduled for a quick follow-up",
      "Your project is marked complete in your client portal",
      "We'd love a photo of your finished space (with your permission) to feature in our gallery — and if you're happy with the results, a review means a lot to a local business like ours",
    ],
  },
];

export default function ProcessPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          From First Conversation to Finished Closet
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/80">
          Every project follows the same clear path — so you always know what&apos;s happening next.
        </p>
      </section>

      {STEPS.map((step, i) => {
        const imageOnLeftDesktop = i % 2 === 0;
        return (
          <section key={step.number} className={i % 2 === 1 ? "bg-white" : ""}>
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={imageOnLeftDesktop ? "lg:order-first" : "lg:order-last"}>
                  {step.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-cream-dark">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      role="img"
                      aria-label={step.photoLabel}
                      className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-charcoal/10 bg-cream-dark p-6 text-center text-sm text-charcoal/50"
                    >
                      [ {step.photoLabel} ]
                    </div>
                  )}
                </div>
                <div className={imageOnLeftDesktop ? "lg:order-last" : "lg:order-first"}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red font-serif text-lg font-semibold text-white">
                    {step.number}
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">{step.title}</h2>
                  <p className="mt-3 text-charcoal/80">{step.intro}</p>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wide text-charcoal/50">
                    What to expect
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-charcoal/80">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Check size={16} className="mt-1 shrink-0 text-brand-red" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-white/10 bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Ready to Start With Your Free Consultation?
          </h2>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
