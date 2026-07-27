import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "sc_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function hash(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function sessionValueForPassword(password: string): string {
  return hash(password).toString("hex");
}

export function verifyPassword(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = hash(candidate);
  const b = hash(password);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const store = await cookies();
  const cookieValue = store.get(COOKIE_NAME)?.value;
  if (!cookieValue) return false;

  const expected = sessionValueForPassword(password);
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set.");
  }
  const store = await cookies();
  store.set(COOKIE_NAME, sessionValueForPassword(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
