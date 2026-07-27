"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Incorrect password.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm"
    >
      <h1 className="font-serif text-2xl font-semibold text-charcoal">Admin Login</h1>
      <p className="mt-2 text-sm text-charcoal/60">Enter the admin password to manage Instant Quote pricing.</p>

      <label
        htmlFor="admin-password"
        className="mb-1.5 mt-6 block text-xs font-medium uppercase tracking-wide text-charcoal/50"
      >
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-md border border-charcoal/20 bg-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
      />

      {error && <p className="mt-3 text-sm text-brand-red">{error}</p>}

      <button
        type="submit"
        disabled={loading || !password}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-brand-red px-6 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {loading ? "Checking..." : "Log In"}
      </button>
    </form>
  );
}
