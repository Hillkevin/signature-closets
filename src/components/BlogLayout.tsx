import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";

export default function BlogLayout({ slug, children }: { slug: string; children: ReactNode }) {
  const post = getBlogPost(slug);
  const related = getRelatedPosts(post.relatedSlugs);

  const breadcrumbListJsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="flex-1 bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbListJsonLd)} />

      <Header />

      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
        <Link href="/blog" className="text-sm font-medium text-brand-red hover:text-brand-red-dark">
          ← Back to Blog
        </Link>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-8">{children}</div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-charcoal/10 pt-8">
            <p className="text-xs font-medium uppercase tracking-wide text-charcoal/50">Related Reading</p>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="font-medium text-brand-red hover:text-brand-red-dark">
                    {r.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
