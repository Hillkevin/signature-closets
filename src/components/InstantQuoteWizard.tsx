"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Calendar,
  Check,
  DoorOpen,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { PricingData } from "@/lib/pricing";

type ProjectTypeKey = "closet" | "garage" | "storage";
type SizeKey = "small" | "medium" | "large";
type MaterialKey = "white-melamine" | "colored-melamine" | "textured-melamine";

type ProjectType = {
  key: ProjectTypeKey;
  label: string;
  copyLabel: string;
  description: string;
  icon: LucideIcon;
};

const PROJECT_TYPES: ProjectType[] = [
  { key: "closet", label: "Closet", copyLabel: "closet", description: "Walk-in or reach-in closet systems", icon: DoorOpen },
  { key: "garage", label: "Garage Cabinets", copyLabel: "garage cabinet", description: "Cabinetry, workbenches, and storage walls", icon: Warehouse },
  { key: "storage", label: "Storage", copyLabel: "storage", description: "Pantry, mudroom, or other storage systems", icon: Boxes },
];

const SIZES: { key: SizeKey; label: string; helper: string }[] = [
  { key: "small", label: "Small", helper: "Reach-in closet or single wall of storage" },
  { key: "medium", label: "Medium", helper: "Average walk-in or 2-wall garage setup" },
  { key: "large", label: "Large", helper: "Large walk-in, full garage, or multi-room project" },
];

// Multipliers themselves come from the pricing prop (editable in /admin/pricing) — only display metadata lives here.
const MATERIALS: { key: MaterialKey; label: string; swatch: string; textured?: boolean }[] = [
  { key: "white-melamine", label: "White Melamine", swatch: "#FAF7F0" },
  { key: "colored-melamine", label: "Colored Melamine", swatch: "#5B4A73" },
  { key: "textured-melamine", label: "Textured Melamine", swatch: "#9C8465", textured: true },
];

const TOTAL_STEPS = 5;

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const cardBase = "flex flex-col items-center gap-2 rounded-xl border p-6 text-center transition-all duration-200";
const cardState = (selected: boolean) =>
  selected
    ? "border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20"
    : "border-charcoal/15 bg-white hover:border-charcoal/30 hover:-translate-y-0.5 hover:shadow-md";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-charcoal/50";
const inputClass =
  "w-full rounded-md border border-charcoal/20 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20";

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Next",
  showBack = true,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showBack?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/60 hover:text-charcoal"
        >
          <ArrowLeft size={15} />
          Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {nextLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default function InstantQuoteWizard({ pricing }: { pricing: PricingData }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState<ProjectTypeKey | null>(null);
  const [size, setSize] = useState<SizeKey | null>(null);
  const [material, setMaterial] = useState<MaterialKey | null>(null);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [lead, setLead] = useState({ name: "", email: "", zip: "", phone: "" });
  const [sendingLead, setSendingLead] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const toggleAccessory = (key: string) => {
    setAccessories((prev) => (prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]));
  };

  const estimate = useMemo(() => {
    if (!projectType || !size || !material) return null;
    const base = pricing.basePrices[projectType][size];
    const materialMultiplier = pricing.materialMultipliers[material] ?? 1;
    const accessoryTotal = accessories.reduce(
      (sum, key) => sum + (pricing.accessories.find((a) => a.key === key)?.cost ?? 0),
      0,
    );
    const subtotal = base * materialMultiplier + accessoryTotal;
    return {
      low: Math.round((subtotal * 0.85) / 10) * 10,
      high: Math.round((subtotal * 1.25) / 10) * 10,
    };
  }, [projectType, size, material, accessories, pricing]);

  const leadValid =
    lead.name.trim().length > 0 &&
    isValidEmail(lead.email) &&
    lead.zip.trim().length > 0 &&
    lead.phone.trim().length > 0;

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmitLead = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadValid || !estimate || !projectType || !size || !material) return;

    setSendError(null);
    setSendingLead(true);
    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "instant-quote",
          data: {
            name: lead.name,
            email: lead.email,
            zip: lead.zip,
            phone: lead.phone,
            projectType: PROJECT_TYPES.find((p) => p.key === projectType)?.label ?? projectType,
            size: SIZES.find((s) => s.key === size)?.label ?? size,
            material: MATERIALS.find((m) => m.key === material)?.label ?? material,
            accessories: accessories.map((key) => pricing.accessories.find((a) => a.key === key)?.label ?? key),
            estimateLow: estimate.low,
            estimateHigh: estimate.high,
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setSendError(body.error ?? "Something went wrong sending your quote. Please call us instead.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSendError("Something went wrong sending your quote. Please call us instead.");
    } finally {
      setSendingLead(false);
    }
  };

  const handleStartOver = () => {
    setSubmitted(false);
    setSendError(null);
    setStep(1);
    setProjectType(null);
    setSize(null);
    setMaterial(null);
    setAccessories([]);
    setLead({ name: "", email: "", zip: "", phone: "" });
  };

  const selectedProjectType = PROJECT_TYPES.find((p) => p.key === projectType);

  if (submitted && estimate) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10 lg:px-8 lg:py-14">
        <div
          key="result"
          className="animate-step-in rounded-2xl border border-charcoal/10 bg-charcoal p-8 text-center shadow-sm sm:p-12"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/20">
            <Check size={22} className="text-brand-red" />
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-cream/50">Your Instant Quote</p>
          <p className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            {formatUSD(estimate.low)} &ndash; {formatUSD(estimate.high)}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            Based on typical {selectedProjectType?.copyLabel} projects &mdash; confirmed exactly at your free
            in-home measurement.
          </p>
          <p className="mt-2 text-xs text-cream/50">We&apos;ll also email a copy of this quote to {lead.email}.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-7 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30"
            >
              <Calendar size={16} />
              Book a Free Consultation
            </Link>
            <button
              type="button"
              onClick={handleStartOver}
              className="text-sm font-medium text-cream/60 underline hover:text-white"
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-charcoal/50">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-charcoal/10">
          <div
            className="h-full rounded-full bg-brand-red transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div key={step} className="animate-step-in rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm sm:p-10">
        {step === 1 && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              What are you looking to organize?
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">Choose the project type that&apos;s the closest match.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PROJECT_TYPES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setProjectType(p.key)}
                  className={`${cardBase} ${cardState(projectType === p.key)}`}
                >
                  <p.icon size={28} className={projectType === p.key ? "text-brand-red" : "text-charcoal/60"} />
                  <span className="font-medium text-charcoal">{p.label}</span>
                  <span className="text-xs text-charcoal/50">{p.description}</span>
                </button>
              ))}
            </div>
            <StepNav onBack={goBack} onNext={goNext} nextDisabled={!projectType} showBack={false} />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              What size project is this?
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">
              Rough scale is fine &mdash; we&apos;ll confirm exact measurements for free.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {SIZES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSize(s.key)}
                  className={`${cardBase} ${cardState(size === s.key)}`}
                >
                  <span className="font-medium text-charcoal">{s.label}</span>
                  <span className="text-xs leading-snug text-charcoal/50">{s.helper}</span>
                </button>
              ))}
            </div>
            <StepNav onBack={goBack} onNext={goNext} nextDisabled={!size} />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              Choose a material finish
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">
              You&apos;ll see real finish samples and colors at your free consultation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {MATERIALS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMaterial(m.key)}
                  className={`${cardBase} ${cardState(material === m.key)}`}
                >
                  <span
                    aria-hidden="true"
                    className="h-10 w-10 rounded-full border border-charcoal/15"
                    style={
                      m.textured
                        ? {
                            background: `repeating-linear-gradient(135deg, ${m.swatch} 0px, ${m.swatch} 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)`,
                          }
                        : { background: m.swatch }
                    }
                  />
                  <span className="font-medium text-charcoal">{m.label}</span>
                </button>
              ))}
            </div>
            <StepNav onBack={goBack} onNext={goNext} nextDisabled={!material} />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              Any accessories you&apos;d like?
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">
              Select all that apply &mdash; you can adjust these later with your designer.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {pricing.accessories.map((a) => {
                const selected = accessories.includes(a.key);
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => toggleAccessory(a.key)}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-150 ${
                      selected
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/30"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected ? "border-cream bg-cream/10" : "border-charcoal/25"
                        }`}
                      >
                        {selected && <Check size={12} strokeWidth={3} />}
                      </span>
                      {a.label}
                    </span>
                    <span className={`text-sm ${selected ? "text-cream/70" : "text-charcoal/50"}`}>
                      +{formatUSD(a.cost)}
                    </span>
                  </button>
                );
              })}
            </div>
            <StepNav onBack={goBack} onNext={goNext} />
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              Almost There! <span className="text-brand-red">See Your Instant Quote</span>
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">
              Enter your info below and your quote will appear instantly. We&apos;ll also send a copy to your
              inbox for easy reference.
            </p>

            <form onSubmit={handleSubmitLead} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={lead.name}
                    onChange={(e) => setLead((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={lead.email}
                    onChange={(e) => setLead((f) => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                    placeholder="jane@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="lead-zip" className={labelClass}>
                    Zip Code
                  </label>
                  <input
                    id="lead-zip"
                    type="text"
                    inputMode="numeric"
                    required
                    value={lead.zip}
                    onChange={(e) => setLead((f) => ({ ...f, zip: e.target.value }))}
                    className={inputClass}
                    placeholder="99320"
                  />
                </div>
                <div>
                  <label htmlFor="lead-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    value={lead.phone}
                    onChange={(e) => setLead((f) => ({ ...f, phone: e.target.value }))}
                    className={inputClass}
                    placeholder="(509) 555-0123"
                  />
                </div>
              </div>

              <p className="text-xs leading-relaxed text-charcoal/60">
                Your quote will also be emailed to you along with relevant information to help you make your
                decision.{" "}
                <Link href="/privacy-policy" className="underline hover:text-brand-red">
                  View our Privacy Policy
                </Link>
                .
              </p>

              {sendError && (
                <div className="rounded-lg border border-brand-red/30 bg-brand-red/5 p-3 text-sm text-brand-red">
                  {sendError}
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/60 hover:text-charcoal"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!leadValid || sendingLead}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {sendingLead ? "Sending..." : "See My Instant Quote"}
                  {!sendingLead && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
