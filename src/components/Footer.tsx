import Link from "next/link";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-semibold text-charcoal">Signature Closets</p>
            <p className="mt-2 text-sm text-charcoal/70">{SITE.address}</p>
            <p className="mt-1 text-sm text-charcoal/70">{SITE.phoneDisplay}</p>
            <ul className="mt-3 space-y-0.5 text-sm text-charcoal/70">
              {SITE.hours.map((entry) => (
                <li key={entry.days}>
                  {entry.days}: {entry.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">Services</p>
            <ul className="mt-2 space-y-1 text-sm text-charcoal/70">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-brand-red">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">Explore</p>
            <ul className="mt-2 space-y-1 text-sm text-charcoal/70">
              <li>
                <Link href="/instant-quote" className="hover:text-brand-red">
                  Instant Quote
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-red">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-red">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">Follow Us</p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Signature Closets on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-charcoal/50">
          © {new Date().getFullYear()} Signature Closets. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
