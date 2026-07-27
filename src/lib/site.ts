export const SITE = {
  phoneDisplay: "(509) 380-4129",
  phoneTel: "tel:+15093804129",
  phoneJsonLd: "+1-509-380-4129",
  address: "1614 Dale Ave, Benton City, WA 99320",
  addressParts: {
    streetAddress: "1614 Dale Ave",
    addressLocality: "Benton City",
    addressRegion: "WA",
    postalCode: "99320",
    addressCountry: "US",
  },
  coordinates: {
    lat: 46.267255,
    lng: -119.502601,
  },
  instagramUrl: "https://www.instagram.com/signatureclosetswa/",
  hours: [
    { days: "Mon–Thurs", time: "9:00 am – 5:00 pm" },
    { days: "Friday", time: "9:00 am – 1:00 pm" },
    { days: "Saturday–Sunday", time: "Closed" },
  ],
  // Schema.org convention: closed days are simply omitted, not listed with a "closed" entry.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
};
