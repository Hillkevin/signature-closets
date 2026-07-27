import type { LucideIcon } from "lucide-react";
import { Boxes, DoorOpen, Home as HomeIcon, Warehouse } from "lucide-react";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceHeroImage = {
  src: string;
  alt: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroDescription: string;
  heroImageAlt: string;
  heroImage?: ServiceHeroImage;
  whyTitle: string;
  whyParagraphs: string[];
  included: string[];
  designConsiderationsIntro: string;
  designConsiderations: string[];
  faqs: ServiceFaq[];
  closingHeadline: string;
};

export const SERVICES: Service[] = [
  {
    slug: "walk-in-closets",
    title: "Walk-In Closets",
    summary: "Fully custom layouts that turn wasted floor space into organized storage.",
    icon: DoorOpen,
    metaTitle: "Custom Walk-In Closets in Benton City, WA | Signature Closets",
    metaDescription:
      "Custom walk-in closet design and installation in Benton City, WA. Free in-home consultation and an instant price estimate — hanging systems, drawers, islands, and more.",
    heroHeadline: "Custom Walk-In Closets Built Around the Way You Dress",
    heroDescription:
      "Turn an underused walk-in into a fully organized, personal space — with the exact mix of hanging, drawers, and shelving your wardrobe actually needs.",
    heroImageAlt: "Custom walk-in closet with island storage in Benton City, WA home",
    heroImage: {
      src: "/images/gallery/walk-in-closet-dark-wood-chandelier-quartz-island.jpg",
      alt: "Custom walk-in closet with dark wood cabinetry, glass-front cabinets, a beaded chandelier, and a quartz island",
    },
    whyTitle: "Why Invest in a Custom Walk-In Closet",
    whyParagraphs: [
      "A walk-in closet is one of the few rooms in your home built entirely around you, but most builder-grade walk-ins are just four bare walls and a single wire shelf. That default setup wastes the vertical space above head height, forces you to stack folded clothes in piles that collapse, and gives shoes, bags, and accessories nowhere specific to live — so they end up on the floor or piled on a chair. A custom system replaces that wasted volume with hanging, drawers, and shelving sized to your actual wardrobe, so every item has one specific place instead of migrating between the closet, the dresser, and the laundry basket.",
      "The homeowners who get the most out of a walk-in closet are the ones who plan for how they actually get dressed, not just how much they own. A good layout puts your most-used items — the clothes you wear weekly — at eye level and within easy reach, while off-season items go up top or into less accessible drawers. The most common mistake we see in builder-grade or DIY closets is treating every wall the same: full-height hanging on all three sides, which looks tidy on a floor plan but leaves nowhere for folded items, shoes, or accessories, so those things end up crammed onto the closet floor anyway.",
    ],
    included: [
      "Double and single hanging rods sized to your wardrobe",
      "Drawer banks for folded clothes and accessories",
      "Adjustable shelving for shoes, bags, and bins",
      "Built-in lighting for every corner of the closet",
      "Center island with drawers and display top (space permitting)",
      "Full-length mirror and valet rod options",
    ],
    designConsiderationsIntro:
      "Every walk-in closet we design starts with the same set of questions about your specific room and wardrobe:",
    designConsiderations: [
      "Ceiling height and any sloped or vaulted sections, which affect how tall a hanging or shelving section can be built on each wall",
      "Walkway clearance — we keep at least 30–36 inches of open floor space so an island or center unit doesn't make the room feel tight",
      "Your actual wardrobe mix: how much is long-hang (dresses, coats) versus short-hang (shirts, folded pants) determines how much double-hang space you actually need",
      "Natural light and window placement, since a window wall usually needs a different storage approach than a solid wall",
      "Existing electrical — outlet and switch locations often determine where lighting, a valet rod, or a charging station can go",
    ],
    faqs: [
      {
        question: "How much space do I need for a walk-in closet?",
        answer:
          "Most walk-ins work well starting around 6x8 feet, but we've designed functional systems in smaller footprints too. Bring your rough dimensions to our Instant Quote Tool or your free measurement, and we'll tell you exactly what fits.",
      },
      {
        question: "Can you work with an existing walk-in that has an odd shape?",
        answer:
          "Yes — angled walls, sloped ceilings, and offset doors are common, and our designers plan around them during your free in-home measurement rather than forcing a standard layout.",
      },
      {
        question: "Do you offer islands for smaller walk-ins?",
        answer:
          "We can scale island size (or skip it) based on your walkway clearance. A designer will confirm what fits comfortably during your consultation.",
      },
      {
        question: "How do you decide how much hanging space versus shelving I need?",
        answer:
          "During your free in-home measurement, we'll walk through your current wardrobe with you — how much is long-hang, short-hang, folded, or accessories — and design the ratio of rods, shelves, and drawers around what you actually own, not a generic split.",
      },
      {
        question: "Can you add a place to sit or get dressed inside the closet?",
        answer:
          "Yes — a built-in bench, an island with a padded top, or even just a clear stretch of counter space can be worked into the design if your room allows for it.",
      },
    ],
    closingHeadline: "Ready to Design Your Walk-In Closet?",
  },
  {
    slug: "reach-in-closets",
    title: "Reach-In Closets",
    summary: "Smart shelving and hanging systems that maximize every inch of a compact footprint.",
    icon: Boxes,
    metaTitle: "Custom Reach-In Closets in Benton City, WA | Signature Closets",
    metaDescription:
      "Custom reach-in closet systems in Benton City, WA. Double-hang, shelving, and drawers designed to maximize a compact closet. Free consultation and instant quote.",
    heroHeadline: "Reach-In Closets That Make Every Inch Count",
    heroDescription:
      "Compact doesn't mean cramped. We design reach-in systems that fit more, organize better, and make your daily routine faster.",
    heroImageAlt: "Custom reach-in closet with double-hang and shelving in Benton City, WA home",
    heroImage: {
      src: "/images/gallery/reach-in-closet-white-shelving-hallway.jpg",
      alt: "Custom reach-in closet with white shelving and hanging rods",
    },
    whyTitle: "Why a Custom Reach-In Closet Beats a Single Rod and Shelf",
    whyParagraphs: [
      "The single rod and one fixed shelf that comes standard in most bedroom closets wastes more than half of the usable space in a reach-in closet. Because the rod runs the full width of the closet, nothing else can go underneath it — so shoes, folded clothes, and accessories all end up stacked on the closet floor or spilling into bins outside the closet altogether. A custom reach-in system fixes this by breaking that single rod into zones: double-hang sections for shirts and folded pants, shelving for what you don't hang, and drawers for the smaller stuff, all built to your specific opening width.",
      "The mistake we see most often with reach-in closets is trying to add storage without changing the layout — an over-the-door rack here, a stackable shoe rack there — instead of redesigning the space itself. A good reach-in layout starts by looking at your opening's exact width and height and figuring out how many hanging zones, shelves, and drawers actually fit edge to edge, so there's no wasted gap on either side the way a generic wire shelving kit leaves behind.",
    ],
    included: [
      "Double-hang and shelf sections tailored to your wardrobe mix",
      "Slide-out drawers and hampers",
      "Vertical shoe storage",
      "Adjustable shelving that maximizes every inch of height",
      "Sliding or bifold door coordination",
      "Lighting for closets without natural light",
    ],
    designConsiderationsIntro: "Reach-in closets have less room to work with than a walk-in, so a few details matter more:",
    designConsiderations: [
      "Door type and swing — sliding, bifold, and swinging doors each affect how much of the closet's width is actually accessible at once",
      "Opening width down to the exact inch, since even a 2–3 inch miscalculation can mean a hanging rod that's slightly too short or a drawer bank that won't clear the doorframe",
      "Ceiling height for double-hang sections — most double-hang setups need at least 84 inches of total height to fit both rods comfortably",
      "Whether the closet backs up to another room, which sometimes limits how deep shelving or drawers can go",
      "Lighting — reach-in closets without a window are often the darkest storage in the house, and a small LED fixture makes a real difference in actually finding things",
    ],
    faqs: [
      {
        question: "Can a reach-in closet really hold as much as a walk-in?",
        answer:
          "For a lot of wardrobes, yes. Double-hang sections and full-height shelving use vertical space that a single rod and shelf leave empty, so a well-designed reach-in can rival a small walk-in's capacity.",
      },
      {
        question: "Will a custom system fit my exact opening width?",
        answer:
          "Yes — we measure your opening during the free in-home visit and build to those exact dimensions, so there's no wasted gap on either side.",
      },
      {
        question: "How long does a reach-in closet installation take?",
        answer: "Most reach-in installations are completed in a single day.",
      },
      {
        question: "What if my reach-in closet doesn't have a light?",
        answer:
          "We can add a battery-powered or hardwired LED fixture as part of the install — it's one of the most requested upgrades for reach-in closets that don't have their own ceiling light.",
      },
      {
        question: "Can you match a reach-in closet upstairs to one downstairs?",
        answer:
          "Yes — if you're doing multiple closets in the same finish, we can keep the material, hardware, and layout style consistent across all of them, even if the opening sizes are different.",
      },
    ],
    closingHeadline: "Ready to Design Your Reach-In Closet?",
  },
  {
    slug: "pantry-systems",
    title: "Pantry Systems",
    summary: "Pull-out shelving and dedicated zones that keep your kitchen storage in order.",
    icon: HomeIcon,
    metaTitle: "Custom Pantry Systems in Benton City, WA | Signature Closets",
    metaDescription:
      "Custom pantry organization systems in Benton City, WA. Pull-out shelving, dedicated zones, and smart storage for walk-in and reach-in pantries. Free consultation.",
    heroHeadline: "Pantry Systems That End the Kitchen Storage Scramble",
    heroDescription:
      "Pull-out shelving, dedicated zones, and smart organization that turn a cluttered pantry into the most efficient room in your kitchen.",
    heroImageAlt: "Custom pantry system with pull-out shelving in Benton City, WA home",
    whyTitle: "Why a Custom Pantry System Is Worth It",
    whyParagraphs: [
      "A pantry with fixed, evenly-spaced shelves rewards whoever put things away first and punishes everyone after — cans get lost behind other cans, boxes get crushed under heavier items, and the back third of every shelf goes completely unused because nothing back there is reachable without unloading half the pantry. Pull-out shelving and dedicated zones fix that by making the entire depth of the shelf visible and reachable at a glance.",
      "The most common mistake we see in pantry design is treating it like one big undifferentiated shelving unit instead of a set of specific zones — a spot for cans, a spot for boxed and bagged goods, a spot for small appliances, and so on. Without that structure, a freshly organized pantry works fine for about two weeks and then slowly turns into a single pile again. A good pantry layout also accounts for depth: deep shelving makes sense for bulk and rarely-used items, while shallow shelving near the front works better for things you grab daily.",
    ],
    included: [
      "Full-extension pull-out shelving",
      "Dedicated zones for cans, spices, and small appliances",
      "Adjustable shelving for odd-sized items",
      "Door-mounted storage racks",
      "Lighting for walk-in or reach-in pantries",
      "Labeled bins and basket options",
    ],
    designConsiderationsIntro:
      "Pantry layouts are shaped by your kitchen more than any other room we design for, so we plan around:",
    designConsiderations: [
      "Walk-in versus reach-in pantry footprint — walk-ins can support an aisle and shelving on multiple walls, while reach-in pantries need every inch of depth to earn its place",
      "Deep shelving (16+ inches) for bulk goods and small appliances versus shallow shelving (6–8 inches) for canned goods and spices you want visible at a glance",
      "Pull-out shelving on soft-close slides for anything at floor level or in a hard-to-reach back corner",
      "Existing outlets and vents, which are common in kitchen-adjacent pantries and have to be designed around rather than covered",
      "Door swing and clearance, especially in smaller kitchens where a pantry door and an appliance door can conflict if space isn't planned carefully",
    ],
    faqs: [
      {
        question: "Do you build pantry systems for both walk-in and reach-in pantries?",
        answer:
          "Yes — the layout changes based on your pantry's footprint, but pull-out shelving and dedicated zones work in either configuration.",
      },
      {
        question: "Can you work around existing outlets and vents?",
        answer:
          "Yes, we plan the layout around outlets, vents, and any other fixed features during your free in-home measurement.",
      },
      {
        question: "How do I know what pantry layout fits my kitchen?",
        answer:
          "Start with our Instant Quote Tool for a rough sense of cost, then a designer will confirm the exact layout at your free consultation.",
      },
      {
        question: "Can you add pull-out shelving to an existing pantry instead of a full redesign?",
        answer:
          "In many cases, yes — if your existing shelving is structurally sound, we can sometimes add pull-out shelving or door-mounted racks without rebuilding the whole pantry. We'll assess what's possible during your free in-home measurement.",
      },
      {
        question: "What's the best way to store small appliances in a pantry?",
        answer:
          "A dedicated deep shelf near counter height (so you're not lifting a heavy appliance far) works best, ideally with an outlet nearby if you use the appliance directly from the shelf.",
      },
    ],
    closingHeadline: "Ready to Design Your Pantry System?",
  },
  {
    slug: "garage-storage",
    title: "Garage Storage",
    summary: "Overhead racks, cabinets, and workbenches built for how you actually use your garage.",
    icon: Warehouse,
    metaTitle: "Custom Garage Storage in Benton City, WA | Signature Closets",
    metaDescription:
      "Custom garage storage systems in Benton City, WA. Overhead racks, wall cabinets, and workbenches designed around your tools and vehicles. Free consultation.",
    heroHeadline: "Garage Storage Built for How You Actually Use the Space",
    heroDescription:
      "Overhead racks, wall cabinets, and workbenches designed around your tools, gear, and vehicles — not a generic shelving kit.",
    heroImageAlt: "Custom garage storage with overhead racks and wall cabinets in Benton City, WA home",
    whyTitle: "Why a Custom Garage System Beats Big-Box Shelving",
    whyParagraphs: [
      "Generic shelving units and stackable bins solve garage storage in theory but rarely fit the actual walls, ceiling height, or the way you move around your vehicles. Most garages end up with usable overhead space that sits completely empty, floor space taken up by boxes that could be stored higher, and a workbench — if there's room for one at all — crammed into whatever corner was left over. A custom system starts from your actual garage dimensions and vehicle footprint, not a one-size-fits-all shelving kit.",
      "The biggest mistake we see in garage storage is buying storage before planning the layout — a shelving unit here, a set of drawers there — which ends up dictating the space instead of fitting it. A good garage layout starts with what has to stay accessible at floor level (tools you use often, a workbench, bikes) and moves everything else — seasonal decorations, rarely-used equipment — up and out of the way using overhead racks and wall-mounted systems.",
    ],
    included: [
      "Overhead storage racks for seasonal and rarely used items",
      "Wall-mounted cabinets and slat wall systems",
      "Custom workbenches with integrated storage",
      "Bike, tool, and sports equipment racks",
      "Heavy-duty flooring coordination (on request)",
      "Labeled bin and drawer systems",
    ],
    designConsiderationsIntro: "Garages have constraints that indoor closets don't, so we design around:",
    designConsiderations: [
      "Concrete or block walls, which require different mounting hardware than the drywall we use for closets — this affects what can be wall-mounted versus freestanding",
      "Seasonal item storage (holiday decorations, off-season sports gear), which is best placed on overhead racks that stay out of the way year-round",
      "Workbench integration — if you want a dedicated workbench, we plan storage around it rather than fitting a workbench into whatever space is left",
      "Temperature swings across Benton City's hot summers and cold winters, which means using hardware and materials rated for an unheated, uninsulated space",
      "Vehicle clearance — overhead racks and wall cabinets need enough clearance for your vehicle doors and mirrors, not just the vehicle itself",
      "Floor space for bikes, sports equipment, or a second freezer, which often competes directly with parking space if it isn't planned for",
    ],
    faqs: [
      {
        question: "Will garage storage hold up to Benton City summers and winters?",
        answer:
          "Yes — we use materials and hardware suited for unheated, uninsulated garage spaces, including temperature swings across the seasons.",
      },
      {
        question: "Can you design around a workshop area?",
        answer:
          "Absolutely. Workbenches, tool storage, and cabinetry can all be planned around a dedicated workshop zone during your free measurement.",
      },
      {
        question: "Do you install storage above the garage door?",
        answer:
          "In many garages, yes — the space above the door track is often usable for overhead racks. A designer will confirm what's possible for your specific setup.",
      },
      {
        question: "Can garage storage be designed around a specific vehicle, like a truck or SUV?",
        answer:
          "Yes — bring your vehicle's dimensions (or we can measure with your vehicle parked in the garage) so cabinets and overhead racks are placed with enough clearance for doors, mirrors, and tailgates.",
      },
      {
        question: "Do you offer any flooring or floor coating along with garage storage?",
        answer:
          "We can coordinate flooring as an add-on for garage projects, though it's typically handled alongside — not as part of — the storage installation itself. Ask your designer during your free consultation.",
      },
    ],
    closingHeadline: "Ready to Design Your Garage Storage?",
  },
];

export function getService(slug: string): Service {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    throw new Error(`Unknown service slug: ${slug}`);
  }
  return service;
}
