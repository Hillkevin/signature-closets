export function jsonLdScriptProps(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const SITE_URL = "https://www.signatureclosets.com";

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
