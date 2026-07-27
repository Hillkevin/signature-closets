import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Signature Closets",
  description:
    "Tips, guides, and answers to common questions about custom closets, materials, and installation from Signature Closets.",
};

const breadcrumbListJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

export default function BlogIndexPage() {
  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          Blog
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal/80">
          Tips, guides, and real answers to the questions we hear most about custom closets.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm"
            >
              <h2 className="font-serif text-lg font-semibold text-charcoal">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 text-sm font-medium text-brand-red hover:text-brand-red-dark"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
