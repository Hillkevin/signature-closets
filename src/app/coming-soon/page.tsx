import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coming Soon | Signature Closets",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="mb-6 border border-charcoal px-4 py-3">
        <span className="text-3xl font-bold tracking-wide text-brand-red">SC</span>
      </div>
      <p className="text-xs tracking-[0.2em] text-charcoal/70 uppercase">Signature Closets</p>
      <h1 className="mt-4 max-w-xl text-3xl font-bold text-charcoal sm:text-4xl">
        Our new site is almost ready.
      </h1>
      <p className="mt-4 max-w-md text-charcoal/80">
        We&apos;re putting the finishing touches on our new website. In the meantime, give us a
        call — we&apos;d love to help with your project.
      </p>
      <a
        href={SITE.phoneTel}
        className="mt-8 inline-block bg-brand-red px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-brand-red-dark"
      >
        Call {SITE.phoneDisplay}
      </a>
    </main>
  );
}
