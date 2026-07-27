"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Work_Sans } from "next/font/google";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] });

const SERVICE_LINKS = SERVICES.map((service) => ({ label: service.title, href: `/services/${service.slug}` }));

export default function Header({ showInstantQuoteCta = false }: { showInstantQuoteCta?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const desktopServicesRef = useRef<HTMLDivElement>(null);

  const servicesActive = SERVICE_LINKS.some((link) => pathname === link.href);

  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (desktopServicesRef.current && !desktopServicesRef.current.contains(event.target as Node)) {
        setDesktopServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMobileMenu() {
    setOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <header className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:py-5 xl:py-6 lg:px-8">
      <Link href="/" className="inline-block shrink-0" onClick={closeMobileMenu}>
        <Image
          src="/logo.png"
          alt="Signature Closets"
          width={280}
          height={117}
          priority
          className="h-auto w-[190px] sm:w-[230px] xl:w-[280px]"
        />
      </Link>

      <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex">
        <Link
          href="/"
          className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-red ${
            pathname === "/" ? "text-brand-red" : "text-charcoal"
          }`}
        >
          Home
        </Link>

        <div ref={desktopServicesRef} className="group relative">
          <button
            type="button"
            onClick={() => setDesktopServicesOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={desktopServicesOpen}
            className={`flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-red ${
              servicesActive ? "text-brand-red" : "text-charcoal"
            }`}
          >
            Services
            <ChevronDown size={15} className={`transition-transform ${desktopServicesOpen ? "rotate-180" : ""}`} />
          </button>

          <div
            className={`absolute left-1/2 top-full z-40 mt-2 w-56 -translate-x-1/2 rounded-xl border border-charcoal/10 bg-white p-2 shadow-lg transition-opacity ${
              desktopServicesOpen
                ? "visible opacity-100"
                : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
            }`}
          >
            {SERVICE_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDesktopServicesOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-cream hover:text-brand-red ${
                    active ? "text-brand-red" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {[
          { label: "Gallery", href: "/gallery" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ].map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-red ${
                active ? "text-brand-red" : "text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <a
          href={SITE.phoneTel}
          className="hidden items-center gap-2 font-medium text-charcoal transition-colors hover:text-brand-red sm:flex"
        >
          <Phone size={18} className="text-brand-red" />
          {SITE.phoneDisplay}
        </a>
        {showInstantQuoteCta && (
          <Link
            href="/instant-quote"
            className={`${workSans.className} hidden items-center rounded-full bg-brand-red px-5 py-2.5 text-sm text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 sm:flex`}
          >
            Instant Quote
          </Link>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="flex items-center justify-center rounded-md p-2 text-charcoal xl:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 mt-2 rounded-xl border border-charcoal/10 bg-white p-4 shadow-lg xl:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-cream hover:text-brand-red ${
                pathname === "/" ? "text-brand-red" : "text-charcoal"
              }`}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-cream hover:text-brand-red ${
                servicesActive ? "text-brand-red" : "text-charcoal"
              }`}
            >
              Services
              <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-charcoal/10 pl-3">
                {SERVICE_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-cream hover:text-brand-red ${
                        active ? "text-brand-red" : "text-charcoal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {[
              { label: "Gallery", href: "/gallery" },
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-cream hover:text-brand-red ${
                    active ? "text-brand-red" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <a
            href={SITE.phoneTel}
            className="mt-3 flex items-center gap-2 border-t border-charcoal/10 px-3 pt-3 font-medium text-charcoal transition-colors hover:text-brand-red sm:hidden"
          >
            <Phone size={18} className="text-brand-red" />
            {SITE.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
