import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("custom-vs-prefab-closets");

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.metaDescription,
};

export default function CustomVsPrefabPost() {
  return (
    <BlogLayout slug="custom-vs-prefab-closets">
      <p className="leading-relaxed text-charcoal/80">
        If you&apos;ve shopped for closet storage before, you&apos;ve probably seen two very different price tags
        for what looks like the same basic idea: shelves, a hanging rod, some drawers. So what&apos;s actually
        different between a prefab closet kit and a custom-built system?
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        What &quot;Prefab&quot; Actually Means
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Prefab (or &quot;flat-pack&quot;) closet systems are built to standard, fixed sizes at a factory, then
        shipped to be assembled — either by you or an installer — inside your closet space. Think of the kits sold
        at big-box home stores.
      </p>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Because they&apos;re built to generic dimensions, they work best in rooms that are already standard-sized
        rectangles with no obstructions.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        What &quot;Custom&quot; Actually Means
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        A custom closet system is designed and built specifically for your space — your exact measurements, your
        ceiling height, around your outlets, vents, windows, or sloped ceilings. Nothing is generic; every panel is
        cut to fit your room specifically.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        Where the Real Differences Show Up
      </h2>

      <h3 className="mt-6 font-serif text-xl font-semibold text-charcoal">1. Fit</h3>
      <p className="mt-3 leading-relaxed text-charcoal/80">
        Prefab systems often leave gaps at the ceiling or walls if your room isn&apos;t a perfect standard size —
        which most rooms aren&apos;t. Custom systems are measured and built to fill your space exactly, with no
        wasted gaps or overhangs.
      </p>

      <h3 className="mt-6 font-serif text-xl font-semibold text-charcoal">2. Material Quality</h3>
      <p className="mt-3 leading-relaxed text-charcoal/80">
        Custom builds typically use higher-grade materials designed for daily use — like the TFL (thermally fused
        laminate) panels we use from suppliers such as Egger, which hold up significantly better over time than the
        thinner particleboard often used in prefab kits.
      </p>

      <h3 className="mt-6 font-serif text-xl font-semibold text-charcoal">3. Design Flexibility</h3>
      <p className="mt-3 leading-relaxed text-charcoal/80">
        Want an island in the middle of your walk-in? A mix of open shelving and closed cabinets? Built-in lighting?
        Custom systems can accommodate all of this. Prefab kits are limited to whatever configurations the
        manufacturer offers off the shelf.
      </p>

      <h3 className="mt-6 font-serif text-xl font-semibold text-charcoal">4. Installation</h3>
      <p className="mt-3 leading-relaxed text-charcoal/80">
        Prefab kits are often a DIY project — which means your time, your tools, and living with any assembly
        mistakes. Custom systems are professionally installed, so the fit and finish is handled by people who do
        this every day.
      </p>

      <h3 className="mt-6 font-serif text-xl font-semibold text-charcoal">5. Longevity</h3>
      <p className="mt-3 leading-relaxed text-charcoal/80">
        Because custom systems are built with better materials and installed professionally, they tend to last
        significantly longer than prefab kits, which can sag, warp, or come apart at the seams over a few years of
        regular use.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        So Which One Is Right for You?
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        If you&apos;re working with a small, standard closet and a tight budget, a prefab kit can be a reasonable
        short-term option. But if you&apos;re looking for something that fits your space exactly, holds up for
        years, and actually adds value to your home, custom is almost always the better investment.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        See the Difference for Yourself
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Want to know what a custom system would look like — and cost — for your specific space?{" "}
        <Link href="/instant-quote" className="font-medium text-brand-red hover:text-brand-red-dark">
          Try our instant quote tool
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="font-medium text-brand-red hover:text-brand-red-dark">
          book a free consultation
        </Link>{" "}
        and we&apos;ll walk you through it.
      </p>
    </BlogLayout>
  );
}
