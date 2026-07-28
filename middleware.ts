import { NextRequest, NextResponse } from "next/server";

// While the site is being finished, this middleware hides every page behind a
// "Coming Soon" placeholder for the public. Anyone with the secret preview
// link (?preview_key=...) gets a cookie that lets them browse the real site
// normally afterward. Remove this file (and the SITE_PREVIEW_SECRET env var)
// once the site is ready to go fully live.

const BYPASS_COOKIE = "sc_preview_access";
const BYPASS_PARAM = "preview_key";
const COMING_SOON_PATH = "/coming-soon";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Always allow the placeholder page itself and Next's internal/static assets.
  if (
    pathname === COMING_SOON_PATH ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const secret = process.env.SITE_PREVIEW_SECRET;

  // If no secret is configured (e.g. local dev), don't gate anything.
  if (!secret) {
    return NextResponse.next();
  }

  // Visiting with the correct ?preview_key sets a long-lived cookie and lets you through.
  const keyParam = searchParams.get(BYPASS_PARAM);
  if (keyParam === secret) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete(BYPASS_PARAM);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(BYPASS_COOKIE, secret, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  // Already have the bypass cookie from a previous visit.
  if (request.cookies.get(BYPASS_COOKIE)?.value === secret) {
    return NextResponse.next();
  }

  // Otherwise, show the Coming Soon placeholder instead of the real page.
  // A header (not the URL, since this is a rewrite) tells the layout to hide
  // site chrome like the sticky "Book a Consultation" button.
  const comingSoonUrl = request.nextUrl.clone();
  comingSoonUrl.pathname = COMING_SOON_PATH;
  comingSoonUrl.search = "";
  const headers = new Headers(request.headers);
  headers.set("x-showing-coming-soon", "1");
  return NextResponse.rewrite(comingSoonUrl, { request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
