import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Signature Closets",
  description: "How Signature Closets collects, uses, and protects your information.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
]);

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-2xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/80">
          This page is a placeholder. Our full privacy policy, covering what information we collect through this
          site (including our Instant Quote tool and contact forms), how it&apos;s used, and how it&apos;s
          protected, will be published here.
        </p>
        <p className="mt-4 text-charcoal/70">
          In the meantime, if you have questions about your information, contact us at {SITE.phoneDisplay}.
        </p>
      </section>

      <Footer />
    </div>
  );
}
