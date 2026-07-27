# Signature Closets — Homepage Structure (SEO Draft)

*Note: replace [City], [Phone], and bracketed placeholders with your actual details.*

---

## 1. Meta Tags (not visible on page, but critical)

- **Title tag:** Custom Closets in [City] | Signature Closets
- **Meta description:** Signature Closets designs and installs custom walk-in closets, reach-in closets & storage solutions in [City]. Free consultation — see our work.

---

## 2. Hero Section (above the fold)

**H1:** Custom Closets Designed for the Way You Live in [City]

**Subheading:** From walk-in closets to pantry systems, Signature Closets builds storage that fits your space and your style.

**CTA button:** Get a Free Design Consultation

*Visual:* High-quality photo/slideshow of a finished closet project (with descriptive alt text like "custom walk-in closet with island storage in [City] home").

---

## 3. Trust Bar (immediately below hero)

Small strip with:
- Years in business / # of closets installed
- Star rating (pulled via Review schema so stars can show in Google search results)
- Logos: BBB, Houzz, local awards, etc. if applicable

---

## 4. Instant Estimate Strip (NEW — links to the calculator tool)

**H2:** Curious What Your Closet Would Cost?

A compact, high-visibility strip — not a full section — placed right after the trust bar, while intent is still high from the hero.

**Layout:** Two columns.
- **Left:** 1-2 sentence pitch + CTA button
  - Copy: "Enter your dimensions and get a real price range in under a minute — no calls, no waiting."
  - **CTA button:** Try the Instant Estimate Tool → links to `/instant-estimate` (its own dedicated page, not a modal — see below for why)
- **Right:** A small static preview graphic of the tool (screenshot or simplified illustration of the blueprint-style diagram) so people know what they're clicking into.

**Why this belongs on the homepage but lives on its own page:**
- Homepage keeps its job (introduce the brand, build trust, route people onward)
- The tool gets a real URL, its own title tag, and its own content — which means it can rank on its own for searches like "custom closet cost calculator" or "closet price estimator," not just live buried in your homepage's content
- You can link to `/instant-estimate` from the blog cost-guide post, service pages, and ad campaigns — one asset, many entry points

---

## 5. Services Overview (H2)

**H2:** Our Custom Storage Solutions

Grid of 4-6 service cards, each linking to its own dedicated page (not just anchor links):
- Walk-In Closets
- Reach-In Closets
- Pantry Systems
- Garage Storage
- Home Office Built-Ins
- Mudroom & Entryway Storage

Each card: short 1-sentence description + "Learn More" link. This internal linking structure is a big SEO lever — it tells Google these are distinct, important pages.

---

## 6. How It Works (H2)

**H2:** From Idea to Installed — Our Process

Simple 3-4 step visual (numbered):
1. Get your instant estimate
2. Free in-home consultation & measurement
3. 3D design & material selection
4. Custom build & professional installation

Good for both SEO (unique content, answers "how does it work" search intent) and conversion (reduces buyer hesitation). Note this now opens with the estimate tool as step 1 — it's the natural first move for a visitor.

---

## 7. Featured Projects / Gallery (H2)

**H2:** Recent Projects in [City]

3-6 before/after photo pairs, each with descriptive alt text and a short caption. Link to full Portfolio/Gallery page.

*Why this matters:* Image search traffic is significant in this industry — proper alt text and file names (e.g., `walk-in-closet-city-name.jpg` not `IMG_2841.jpg`) help you show up there.

---

## 8. Why Choose Signature Closets (H2)

**H2:** Why Homeowners in [City] Choose Signature Closets

3-4 short value props with icons:
- Custom-fit, not one-size-fits-all
- Lifetime warranty (if applicable)
- Local, in-house design & installation team
- Wide range of finishes/materials

---

## 9. Testimonials (H2)

**H2:** What Our Clients Say

3-4 rotating reviews, ideally with customer photos of their closets. Mark up with Review/AggregateRating schema.

---

## 10. FAQ Section (H2)

**H2:** Frequently Asked Questions

Mark up with FAQ schema so questions can appear directly in Google search results. Suggested questions:
- How much do custom closets cost?
- How long does installation take?
- Do you offer free consultations?
- What areas do you serve?
- What materials do you use?

(This section doubles as a great place to link out to your fuller blog posts on cost, materials, etc., and to the Instant Estimate page.)

---

## 11. Service Area (H2)

**H2:** Proudly Serving [City] and Surrounding Areas

Brief paragraph + list of neighborhoods/towns served, each linking to a dedicated location page if you have them. Helps local SEO significantly.

---

## 12. Final CTA Section

**H2:** Ready to Design Your Custom Closet?

Repeat the consultation CTA with a phone number, contact form, or scheduling link. Keep this frictionless — this is often the highest-intent moment on the page.

---

## 13. Footer

- NAP (Name, Address, Phone) — consistent with Google Business Profile
- Links to all service pages, gallery, blog, contact, and Instant Estimate tool
- Social links
- LocalBusiness schema markup embedded in footer/site-wide

---

## Schema Markup Checklist for This Page

- [ ] LocalBusiness schema (site-wide, usually footer)
- [ ] Review / AggregateRating schema (testimonials section)
- [ ] FAQPage schema (FAQ section)
- [ ] BreadcrumbList schema (helps internal pages too)

---

## Notes on Execution

- Every "Learn More" link above should go to a real, unique page — thin or missing service pages are a common reason custom closet sites underperform in search.
- Keep page load fast: compress hero images, lazy-load gallery photos below the fold.
- Update the Featured Projects section regularly — fresh content signals an active, relevant site to Google.
- See the companion doc `instant-estimate-landing-page.md` for the dedicated tool page's SEO content.
