import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BlogLayout from "@/components/BlogLayout";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("how-long-does-installation-take");

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.metaDescription,
};

export default function InstallationTimelinePost() {
  return (
    <BlogLayout slug="how-long-does-installation-take">
      <p className="leading-relaxed text-charcoal/80">
        If you&apos;re planning a custom closet, one of the most practical questions is simply: how long is this
        going to take, start to finish? Here&apos;s a realistic breakdown of each stage.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        Consultation to Design: Usually 1–2 Weeks
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        After your initial consultation (in-home or online), our design team puts together a layout and 3D
        rendering for your space. Depending on how much back-and-forth is needed on the design, this stage
        typically takes one to two weeks before you&apos;re ready to review a final proposal.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        Proposal to Production: Varies by Material Availability
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Once you approve your design and proposal, your project moves into production. Timing here depends on the
        materials and hardware selected — some finishes are quicker to source than others. Your client portal keeps
        you updated on exactly where your project stands during this stage.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        Installation Day: Most Walk-Ins Done in a Single 8-Hour Day
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        This is the part most people are actually asking about. For a standard walk-in closet, our in-house
        installation team typically completes the entire job in a single 8-hour day. Larger or more complex
        projects — think large walk-ins with islands, multiple rooms, or extensive custom millwork — may take
        longer, sometimes spanning two days.
      </p>
      <p className="mt-4 font-medium text-charcoal">What affects installation time:</p>
      <ul className="mt-3 space-y-2">
        {[
          "Size of the space and number of sections being installed",
          "Complexity of the design (islands, glass cabinetry, integrated lighting)",
          "Whether the space is fully cleared and ready before we arrive (see below)",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 leading-relaxed text-charcoal/80">
            <Check size={16} className="mt-1 shrink-0 text-brand-red" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        How to Help Your Installation Go Quickly
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        The single biggest factor in keeping installation on schedule is having the space fully cleared before our
        team arrives — no clothing, boxes, or existing shelving left behind. A completely empty room means our team
        can move efficiently without stopping to work around your belongings.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">After Installation</h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Once installation is complete, we walk through the finished space with you, checking every drawer, door,
        and fixture before we consider the job done. Any final adjustments are handled on the spot whenever
        possible.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        Curious About Your Specific Timeline?
      </h2>
      <p className="mt-4 leading-relaxed text-charcoal/80">
        Every project is a little different depending on size and design complexity.{" "}
        <Link href="/contact" className="font-medium text-brand-red hover:text-brand-red-dark">
          Book a free consultation
        </Link>{" "}
        and we&apos;ll give you a realistic timeline for your specific space, or{" "}
        <Link href="/process" className="font-medium text-brand-red hover:text-brand-red-dark">
          check out our full process
        </Link>{" "}
        to see exactly what happens at every stage.
      </p>
    </BlogLayout>
  );
}
