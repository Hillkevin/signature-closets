import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BlogLayout from "@/components/BlogLayout";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("closet-materials-guide");

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.metaDescription,
};

function ProsConsList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 leading-relaxed text-charcoal/80">
          <Check size={16} className="mt-1 shrink-0 text-brand-red" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MaterialsGuidePost() {
  return (
    <BlogLayout slug="closet-materials-guide">
      <p className="leading-relaxed text-charcoal/80">
        One of the biggest decisions in designing a custom closet isn&apos;t the layout — it&apos;s the material.
        Here&apos;s what actually separates the main options we work with, using materials from suppliers like
        Egger.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Melamine (TFL)</h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Melamine, also called TFL (thermally fused laminate), is the most common material used in custom closet
        systems — and for good reason.
      </p>
      <p className="mt-4 font-medium text-charcoal">Pros:</p>
      <ProsConsList
        items={[
          "Highly durable and resistant to scratches and moisture",
          <>
            Wide range of finish options, from solid colors like <strong className="font-semibold">Alpine White</strong> to
            woodgrain looks like <strong className="font-semibold">Natural Hamilton Oak</strong>
          </>,
          "More budget-friendly than solid wood",
          "Easy to clean and maintain",
        ]}
      />
      <p className="mt-4 leading-relaxed text-charcoal/80">
        <strong className="font-semibold">Best for:</strong> Most closet projects. It&apos;s the reliable, versatile
        default for a reason.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Laminate</h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Laminate is similar to melamine but often refers to a slightly different manufacturing process and can offer
        additional texture and finish variety, including more detailed woodgrain patterns and specialty finishes.
      </p>
      <p className="mt-4 font-medium text-charcoal">Pros:</p>
      <ProsConsList
        items={[
          "Wide range of decorative options, including realistic woodgrain textures",
          "Durable for daily use",
          "Good middle-ground option between melamine and premium wood veneer",
        ]}
      />
      <p className="mt-4 leading-relaxed text-charcoal/80">
        <strong className="font-semibold">Best for:</strong> Homeowners who want a specific look — like a rich
        walnut tone such as <strong className="font-semibold">Auburn Carini Walnut</strong> — without the cost of
        solid wood.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Wood Veneer</h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Wood veneer uses a thin layer of real wood over a substrate, giving you the authentic look and feel of
        natural wood.
      </p>
      <p className="mt-4 font-medium text-charcoal">Pros:</p>
      <ProsConsList
        items={[
          "Genuine wood grain and texture — no two panels look exactly alike",
          "Premium look and feel",
          "Ages naturally over time, developing character",
        ]}
      />
      <p className="mt-4 font-medium text-charcoal">Cons:</p>
      <ProsConsList
        items={[
          "Higher price point than melamine or laminate",
          "Requires slightly more careful maintenance than synthetic finishes",
        ]}
      />
      <p className="mt-4 leading-relaxed text-charcoal/80">
        <strong className="font-semibold">Best for:</strong> Statement pieces — an island, a feature wall, or a
        closet where you want an elevated, high-end look.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        What About Color and Style?
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Beyond material type, color makes a big difference in how a space feels:
      </p>
      <ProsConsList
        items={[
          <>
            <strong className="font-semibold">Whites and light neutrals</strong> (like Alpine White) make smaller
            spaces feel more open and airy
          </>,
          <>
            <strong className="font-semibold">Warm wood tones</strong> (like Natural Hamilton Oak or Grey Vicenza
            Oak) add warmth without feeling too dark
          </>,
          <>
            <strong className="font-semibold">Deep tones</strong> (like Graphite Grey or Black) create a bold,
            modern look — great as an accent or in larger spaces with good lighting
          </>,
        ]}
      />

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        You Don&apos;t Have to Decide Alone
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Choosing a material is easier when you can see and feel real samples in person. Our design team walks you
        through every option during your free consultation.
      </p>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        <Link href="/contact" className="font-medium text-brand-red hover:text-brand-red-dark">
          Book a free consultation
        </Link>{" "}
        or{" "}
        <Link href="/instant-quote" className="font-medium text-brand-red hover:text-brand-red-dark">
          get an instant quote
        </Link>{" "}
        to get started.
      </p>
    </BlogLayout>
  );
}
