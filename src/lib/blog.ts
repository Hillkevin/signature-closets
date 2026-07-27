export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  relatedSlugs: string[];
};

// Only posts that actually exist as pages live here. relatedSlugs may reference
// a slug that isn't in this list yet (e.g. a post still being written) —
// getRelatedPosts() silently drops unknown slugs, so nothing links to a 404.
// Add the post's entry here once its page exists and related-reading links
// elsewhere pick it up automatically.
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "custom-vs-prefab-closets",
    title: "Custom vs. Prefab Closet Systems: What's the Difference?",
    excerpt:
      "Shelves, a hanging rod, some drawers — but the price tags couldn't be more different. Here's what actually separates a custom closet from a prefab kit.",
    metaTitle: "Custom vs. Prefab Closets: What's the Difference? | Signature Closets",
    metaDescription:
      "Wondering if a custom closet is worth it over a prefab kit? Here's what actually separates the two — and which one holds up over time.",
    relatedSlugs: ["how-much-do-custom-closets-cost", "closet-materials-guide"],
  },
  {
    slug: "walk-in-closet-ideas-small-spaces",
    title: "Walk-In Closet Ideas for Small Spaces",
    excerpt:
      "A small walk-in doesn't have to feel cramped. Here are real design ideas to maximize every inch of a compact space.",
    metaTitle: "Walk-In Closet Ideas for Small Spaces | Signature Closets",
    metaDescription:
      "A small walk-in closet doesn't mean limited storage. Here are real design ideas to maximize every inch of a compact space.",
    relatedSlugs: ["custom-vs-prefab-closets", "how-much-do-custom-closets-cost"],
  },
  {
    slug: "how-long-does-installation-take",
    title: "How Long Does a Custom Closet Installation Take?",
    excerpt:
      "Wondering how long your project will take, start to finish? Here's a realistic breakdown of every stage, including installation day itself.",
    metaTitle: "How Long Does Custom Closet Installation Take? | Signature Closets",
    metaDescription:
      "From consultation to finished installation — here's a realistic timeline for a custom closet project with Signature Closets.",
    relatedSlugs: ["custom-vs-prefab-closets", "how-much-do-custom-closets-cost"],
  },
  {
    slug: "closet-materials-guide",
    title: "Melamine vs. Laminate vs. Wood Veneer: Choosing the Right Closet Material",
    excerpt:
      "Layout isn't the only big decision in a custom closet — material matters just as much. Here's a real comparison of melamine, laminate, and wood veneer.",
    metaTitle: "Closet Materials Guide: Melamine vs. Laminate vs. Wood | Signature Closets",
    metaDescription:
      "Not sure which closet material is right for you? Here's a real comparison of melamine, laminate, and wood veneer finishes.",
    relatedSlugs: ["custom-vs-prefab-closets", "how-much-do-custom-closets-cost"],
  },
];

export function getBlogPost(slug: string): BlogPostMeta {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Unknown blog post slug: ${slug}`);
  }
  return post;
}

export function getRelatedPosts(slugs: string[]): BlogPostMeta[] {
  return slugs.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter((p): p is BlogPostMeta => Boolean(p));
}
