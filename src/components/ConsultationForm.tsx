"use client";

import { useState, type FormEvent } from "react";
import { Work_Sans } from "next/font/google";
import { Check, ChevronDown } from "lucide-react";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const PROJECT_TYPES = [
  { key: "walk-in-closet", label: "Walk-In Closet" },
  { key: "reach-in-closet", label: "Reach-In Closet" },
  { key: "pantry", label: "Pantry" },
  { key: "garage", label: "Garage" },
  { key: "home-office", label: "Home Office" },
  { key: "main-storage", label: "Main Storage Space" },
];

const BUDGET_RANGES = [
  { key: "under-2500", label: "Under $2,500" },
  { key: "2500-5000", label: "$2,500–$5,000" },
  { key: "5000-10000", label: "$5,000–$10,000" },
  { key: "10000-20000", label: "$10,000–$20,000" },
  { key: "20000-plus", label: "$20,000+" },
];

const TIMELINES = [
  { key: "asap", label: "As soon as possible" },
  { key: "1-3-months", label: "Within 1–3 months" },
  { key: "3-6-months", label: "Within 3–6 months" },
  { key: "exploring", label: "Just exploring options" },
];

type ConsultationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  projectTypes: string[];
  budget: string;
  timeline: string;
  message: string;
};

const EMPTY_FORM: ConsultationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  projectTypes: [],
  budget: "",
  timeline: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";
const inputClass =
  "w-full rounded-md border border-charcoal/20 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20";

export default function ConsultationForm() {
  const [form, setForm] = useState<ConsultationFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const toggleProjectType = (key: string) => {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(key)
        ? prev.projectTypes.filter((t) => t !== key)
        : [...prev.projectTypes, key],
    }));
  };

  const validate = (): string[] => {
    const list: string[] = [];
    if (!form.firstName.trim()) list.push("First name is required.");
    if (!form.lastName.trim()) list.push("Last name is required.");
    if (!isValidEmail(form.email)) list.push("A valid email address is required.");
    if (!form.phone.trim()) list.push("Phone number is required.");
    if (!form.city.trim()) list.push("City is required.");
    if (form.projectTypes.length === 0) list.push("Select at least one project type.");
    if (!form.budget) list.push("Please select a budget range.");
    if (!form.timeline) list.push("Please select when you'd like to begin.");
    return list;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setSending(true);

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "consultation", data: form }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrors([body.error ?? "Something went wrong sending your request. Please call us instead."]);
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors(["Something went wrong sending your request. Please call us instead."]);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className={`${workSans.className} rounded-xl border border-emerald-600/20 bg-emerald-50 p-8 text-emerald-800`}>
        <div className="flex items-center gap-2 font-semibold">
          <Check size={18} />
          Request received, {form.firstName}.
        </div>
        <p className="mt-2 text-sm leading-relaxed">
          We&apos;ll reach out to {form.email} or {form.phone} within 1 business day to confirm your free
          consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${workSans.className} space-y-6`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className={inputClass}
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            className={inputClass}
            placeholder="Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="jane@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClass}
            placeholder="(509) 555-0123"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className={labelClass}>
          City
        </label>
        <input
          id="city"
          type="text"
          required
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          className={inputClass}
          placeholder="Benton City"
        />
        <p className="mt-1.5 text-xs text-charcoal/50">To confirm you&apos;re within our service area.</p>
      </div>

      <div>
        <p className={labelClass}>Project Type</p>
        <p className="mb-2 text-xs text-charcoal/50">Select all that apply.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PROJECT_TYPES.map((type) => {
            const checked = form.projectTypes.includes(type.key);
            return (
              <label
                key={type.key}
                className={`flex items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-sm text-charcoal transition-colors ${
                  checked ? "border-brand-red bg-brand-red/5" : "border-charcoal/20 hover:border-charcoal/35"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleProjectType(type.key)}
                  className="h-4 w-4 accent-brand-red"
                />
                {type.label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget Range
          </label>
          <div className="relative">
            <select
              id="budget"
              required
              value={form.budget}
              onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              className={`${inputClass} appearance-none pr-9`}
            >
              <option value="" disabled>
                Select a range
              </option>
              {BUDGET_RANGES.map((b) => (
                <option key={b.key} value={b.key}>
                  {b.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          </div>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            When would you like to begin?
          </label>
          <div className="relative">
            <select
              id="timeline"
              required
              value={form.timeline}
              onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
              className={`${inputClass} appearance-none pr-9`}
            >
              <option value="" disabled>
                Select a timeframe
              </option>
              {TIMELINES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your project <span className="font-normal text-charcoal/50">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={inputClass}
          placeholder="Anything else that would help us prepare for your consultation..."
        />
      </div>

      {errors.length > 0 && (
        <div className="rounded-lg border border-brand-red/30 bg-brand-red/5 p-4">
          <ul className="list-disc space-y-1 pl-5 text-sm text-brand-red">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
      >
        {sending ? "Sending..." : "Book My Free Consultation"}
      </button>
    </form>
  );
}
