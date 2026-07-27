export type LocationFaq = {
  question: string;
  answer: string;
};

export type Location = {
  slug: string;
  city: string;
  state: "WA" | "OR";
  intro: string;
  whyParagraph: string;
  distanceNote: string;
  uniqueFaq: LocationFaq;
};

// Per-city facts sourced from location-pages-content.md. Distances are
// straight-line approximations from our Benton City workshop, not exact
// driving routes — correct these if real drive times differ.
export const LOCATIONS: Location[] = [
  {
    slug: "kennewick",
    city: "Kennewick",
    state: "WA",
    intro:
      "Kennewick is the closest of the Tri-Cities to our Benton City workshop, and it's also one of the most varied — established neighborhoods with decades-old closets sitting a few miles from brand-new master-planned communities still being built out. Whichever kind of home you're in, we design around what's actually there, not a one-size-fits-all layout.",
    whyParagraph:
      "Kennewick homeowners come to us for two very different reasons depending on where they live. In established neighborhoods, it's usually about replacing a builder-grade closet that's been the same since the house was built. In Kennewick's newer developments, it's often about upgrading a base-builder closet before move-in or shortly after, while the rest of the house is still getting personalized. Either way, our in-house team designs and installs the work ourselves, so there's no subcontractor gap between the sales conversation and the actual build.",
    distanceNote:
      "Kennewick is about 15 miles from our Benton City workshop — usually a 20–25 minute drive, one of the shortest in our service area.",
    uniqueFaq: {
      question: "Do you work on new-construction homes in Kennewick's newer developments?",
      answer:
        "Yes — we regularly work with homeowners in Kennewick's newer master-planned communities, either upgrading a builder-grade closet after move-in or coordinating directly during the build process if your timeline allows it.",
    },
  },
  {
    slug: "richland",
    city: "Richland",
    state: "WA",
    intro:
      "Richland's housing stock spans decades — from mid-century homes near the Columbia River to newer construction farther from the water — and that range shows up directly in the closets we're asked to redesign. A lot of Richland's older homes were built with closets sized for a much smaller wardrobe than most families keep today.",
    whyParagraph:
      "The Richland homeowners we hear from most often are dealing with a mid-century closet that was simply never built for modern storage needs — narrow reach-ins with a single rod, or a coat closet doing double duty as the only storage in a room. We measure the space exactly as it exists, including the quirks that come with a 50-plus-year-old house, and design a system that fits the room you actually have, not a generic new-construction template.",
    distanceNote: "Richland is roughly 20 miles from our Benton City workshop, about a 25–30 minute drive.",
    uniqueFaq: {
      question: "Can you retrofit closets in Richland's older, mid-century homes?",
      answer:
        "Yes — retrofitting older homes is a regular part of our work in Richland. We measure around whatever the home's original construction gives us to work with, including narrower openings or non-standard ceiling heights common in mid-century houses.",
    },
  },
  {
    slug: "pasco",
    city: "Pasco",
    state: "WA",
    intro:
      "Pasco is one of the fastest-growing cities in Washington, and that growth means a steady stream of new homes that often come with builder-basic closets — functional, but not designed around how any specific family actually lives. We work with Pasco homeowners to turn that starting point into something built for their actual wardrobe and storage needs.",
    whyParagraph:
      "Because so much of Pasco's housing is newer construction, most of the projects we take on there are upgrades rather than retrofits — homeowners who moved in with a standard wire shelf and single rod and want a system that actually matches how they live. We design around your specific room dimensions from day one, so the result looks intentional rather than added on later.",
    distanceNote: "Pasco is about 20 miles from our Benton City workshop, roughly a 25–30 minute drive.",
    // Bilingual-service FAQ not confirmed accurate — using the generic fallback
    // question from location-pages-content.md until the business owner confirms.
    uniqueFaq: {
      question: "How quickly can you schedule a consultation in Pasco?",
      answer:
        "In most cases, we can schedule your free in-home consultation in Pasco within a week or two, depending on current demand. Reach out or use our Instant Quote Tool to get a rough price range while you wait for your appointment.",
    },
  },
  {
    slug: "west-richland",
    city: "West Richland",
    state: "WA",
    intro:
      "West Richland is smaller than its Tri-Cities neighbors, but it's growing quickly, with new residential development spreading west of the Tri-Cities core. We serve West Richland as part of our standard service area — no special trip fees, no different process.",
    whyParagraph:
      "As West Richland grows, we're seeing more homeowners who want their closets and storage to keep pace with a newly built or newly renovated home. Because the city is still relatively compact, most of our West Richland projects are straightforward to schedule and measure, and we treat them exactly the same as a project inside the Tri-Cities core.",
    distanceNote: "West Richland is about 25 miles from our Benton City workshop, roughly a 30–35 minute drive.",
    uniqueFaq: {
      question: "Is West Richland within your standard service area, or does it cost extra?",
      answer:
        "West Richland is within our standard service area — there's no extra travel fee or special scheduling process. It's treated the same as any other Tri-Cities location.",
    },
  },
  {
    slug: "prosser",
    city: "Prosser",
    state: "WA",
    intro:
      "Prosser is wine-country close to home for us — about as close as Kennewick — with a mix of in-town homes and rural properties spread across the surrounding countryside. We serve both equally, whether your closet project is in a subdivision downtown or a farmhouse a few miles out.",
    whyParagraph:
      "Homeowners in and around Prosser often have larger properties than you'd find in the Tri-Cities core, which sometimes means more storage needs — think mudrooms and garages for rural gear, not just bedroom closets. We design for the realities of a rural property just as readily as a standard in-town lot.",
    distanceNote: "Prosser is about 15 miles from our Benton City workshop, roughly a 20-minute drive.",
    uniqueFaq: {
      question: "Do you service rural properties outside Prosser's town center?",
      answer:
        "Yes — we regularly work on rural properties around Prosser, not just homes within the town center. Distance from town doesn't change our process or pricing.",
    },
  },
  {
    slug: "walla-walla",
    city: "Walla Walla",
    state: "WA",
    intro:
      "Walla Walla's wine country charm comes with a housing stock to match — plenty of farmhouse and craftsman-style homes with real architectural character, and closets that were often an afterthought when those homes were originally built. We design custom systems that add modern storage without fighting the character of an older home.",
    whyParagraph:
      "The Walla Walla homeowners we work with most often want storage that fits both their space and their home's style — a built-in that looks like it belongs in a century-old farmhouse, not a generic white box. Because we design and build in-house, we can match trim details, hardware finishes, and material tones to the rest of a historic home rather than defaulting to a standard look.",
    distanceNote:
      "Walla Walla is about 50 miles from our Benton City workshop, roughly a 55–65 minute drive — one of our longer standard service trips.",
    uniqueFaq: {
      question: "Can custom closets be designed to match a historic Walla Walla home's style?",
      answer:
        "Yes — we regularly design closets and storage that complement an older home's existing trim, hardware, and material style rather than looking like a modern add-on. Bring photos of your home's existing details to your consultation and we'll work from there.",
    },
  },
  {
    slug: "yakima",
    city: "Yakima",
    state: "WA",
    intro:
      "Yakima is the largest city in our service area outside the Tri-Cities, with a housing stock that ranges from century-old homes downtown to new construction on the city's edges. At around 60 miles from our workshop, it's also one of the farther trips we make regularly — which means a little more advance planning on scheduling.",
    whyParagraph:
      "Because Yakima is a larger city with a wide range of home styles, we see everything from historic-home retrofits to brand-new builds needing their first custom closet. What doesn't change is the process: the same free in-home measurement, the same in-house design and installation team, just a longer drive to get there.",
    distanceNote: "Yakima is about 60 miles from our Benton City workshop, roughly a 70–75 minute drive.",
    uniqueFaq: {
      question: "How far in advance should Yakima homeowners schedule a consultation given the distance?",
      answer:
        "We recommend booking your free consultation in Yakima at least a week or two ahead, since it's one of the farther trips in our service area and we plan our schedule around drive time. Installation scheduling works the same way — we'll confirm a specific date once your design is approved.",
    },
  },
  {
    slug: "moses-lake",
    city: "Moses Lake",
    state: "WA",
    intro:
      "Moses Lake is the farthest city in our standard service area, about 90 miles from our Benton City workshop — but it's also home to a mix of year-round residents and vacation homeowners who both need real storage, not just a rental-grade closet. We make the trip because the lake community is worth serving properly.",
    whyParagraph:
      "A lot of what we build in Moses Lake is for second homes and vacation properties, which come with their own storage needs — seasonal gear, lake equipment, and closets that need to work well even when the home sits empty for stretches at a time. We design with that in mind, rather than assuming every home is a full-time residence.",
    distanceNote:
      "Moses Lake is about 90 miles from our Benton City workshop, roughly a 90-minute drive — our longest standard service trip.",
    uniqueFaq: {
      question: "Do you install in vacation/second homes around Moses Lake?",
      answer:
        "Yes — vacation and second homes make up a meaningful share of our Moses Lake projects. We can coordinate installation around your schedule if you're not at the property full-time.",
    },
  },
  {
    slug: "hermiston",
    city: "Hermiston",
    state: "OR",
    intro:
      "Hermiston is just across the Oregon border from our Benton City workshop, and the short answer is yes — the state line doesn't change whether we'll take on a project. Hermiston's agricultural community has the same mix of storage needs we see throughout our Washington service area, from bedroom closets to garage and mudroom storage for working properties.",
    whyParagraph:
      "Being in Oregon rather than Washington doesn't change our process for Hermiston homeowners — the same free in-home consultation, the same in-house design and build team, the same materials and finishes. The only real difference is a slightly longer drive for us, which we've already built into how we schedule cross-border projects.",
    distanceNote:
      "Hermiston is about 45 miles from our Benton City workshop, roughly a 50-minute drive across the Oregon border.",
    uniqueFaq: {
      question: "Do you serve customers across the Oregon border in Hermiston?",
      answer:
        "Yes — Hermiston is a regular part of our service area even though it's across the state line in Oregon. Scheduling and pricing work the same as anywhere else we serve.",
    },
  },
  {
    slug: "pendleton",
    city: "Pendleton",
    state: "OR",
    intro:
      "Pendleton is known for its rodeo heritage and historic downtown, and at about 70 miles from our Benton City workshop, it's on the farther edge of where we regularly work in Oregon. We still treat it as a standard part of our service area rather than a special one-off trip.",
    whyParagraph:
      "Pendleton's historic homes downtown often need the same kind of thoughtful retrofit work we do in older Walla Walla homes — closets that respect the character of the house rather than looking bolted on. Newer homes on the edges of town, meanwhile, are usually more straightforward upgrades from a basic builder closet. Either way, the process and pricing stay the same regardless of the extra distance.",
    distanceNote: "Pendleton is about 70 miles from our Benton City workshop, roughly a 75–80 minute drive.",
    uniqueFaq: {
      question: "Is Pendleton within your standard service radius, or a special-trip area?",
      answer:
        "Pendleton is within our standard service area — there's no special-trip fee or different process. It's simply a longer drive, which we account for when scheduling your consultation and installation.",
    },
  },
];

export function getLocation(slug: string): Location {
  const location = LOCATIONS.find((l) => l.slug === slug);
  if (!location) {
    throw new Error(`Unknown location slug: ${slug}`);
  }
  return location;
}
