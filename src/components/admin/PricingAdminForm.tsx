"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, Trash2 } from "lucide-react";
import type { PricingData } from "@/lib/pricing";

const PROJECT_TYPES: { key: keyof PricingData["basePrices"]; label: string }[] = [
  { key: "closet", label: "Closet" },
  { key: "garage", label: "Garage Cabinets" },
  { key: "storage", label: "Storage" },
];

const SIZES: { key: "small" | "medium" | "large"; label: string }[] = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];

const MATERIALS: { key: keyof PricingData["materialMultipliers"]; label: string }[] = [
  { key: "white-melamine", label: "White Melamine" },
  { key: "colored-melamine", label: "Colored Melamine" },
  { key: "textured-melamine", label: "Textured Melamine" },
];

function slugify(label: string, existing: string[]): string {
  const base =
    label
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "accessory";
  let candidate = base;
  let n = 2;
  while (existing.includes(candidate)) {
    candidate = `${base}-${n}`;
    n += 1;
  }
  return candidate;
}

const inputClass =
  "w-full rounded-md border border-charcoal/20 bg-white px-3.5 py-2.5 text-sm text-charcoal focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-charcoal/50";

export default function PricingAdminForm({ initialPricing }: { initialPricing: PricingData }) {
  const router = useRouter();
  const [pricing, setPricing] = useState<PricingData>(initialPricing);
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const updateBasePrice = (type: keyof PricingData["basePrices"], size: "small" | "medium" | "large", value: string) => {
    setSaved(false);
    setPricing((prev) => ({
      ...prev,
      basePrices: {
        ...prev.basePrices,
        [type]: { ...prev.basePrices[type], [size]: Number(value) },
      },
    }));
  };

  const updateMultiplier = (key: keyof PricingData["materialMultipliers"], value: string) => {
    setSaved(false);
    setPricing((prev) => ({
      ...prev,
      materialMultipliers: { ...prev.materialMultipliers, [key]: Number(value) },
    }));
  };

  const updateAccessory = (index: number, field: "label" | "cost", value: string) => {
    setSaved(false);
    setPricing((prev) => {
      const accessories = [...prev.accessories];
      const current = accessories[index];
      accessories[index] = field === "cost" ? { ...current, cost: Number(value) } : { ...current, label: value };
      return { ...prev, accessories };
    });
  };

  const addAccessory = () => {
    setSaved(false);
    setPricing((prev) => ({
      ...prev,
      accessories: [
        ...prev.accessories,
        { key: slugify("new-accessory", prev.accessories.map((a) => a.key)), label: "", cost: 0 },
      ],
    }));
  };

  const removeAccessory = (index: number) => {
    setSaved(false);
    setPricing((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((_, i) => i !== index),
    }));
  };

  const validate = (): string[] => {
    const list: string[] = [];
    for (const type of PROJECT_TYPES) {
      for (const size of SIZES) {
        const value = pricing.basePrices[type.key]?.[size.key];
        if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
          list.push(`Base price for ${type.label} / ${size.label} must be zero or greater.`);
        }
      }
    }
    for (const m of MATERIALS) {
      const value = pricing.materialMultipliers[m.key];
      if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
        list.push(`Multiplier for ${m.label} must be zero or greater.`);
      }
    }
    if (pricing.accessories.length === 0) {
      list.push("At least one accessory is required.");
    }
    pricing.accessories.forEach((a, i) => {
      if (!a.label.trim()) list.push(`Accessory #${i + 1} needs a label.`);
      if (typeof a.cost !== "number" || Number.isNaN(a.cost) || a.cost < 0) {
        list.push(`Cost for "${a.label || `accessory #${i + 1}`}" must be zero or greater.`);
      }
    });
    return list;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaved(false);
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    setErrors([]);
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricing),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors([body.error ?? "Failed to save pricing."]);
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setErrors(["Something went wrong. Please try again."]);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-sm font-medium text-charcoal/60 underline hover:text-charcoal"
        >
          Log out
        </button>
      </div>

      <section className="mt-4 rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-charcoal">Base Prices</h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Starting price by project type and size, before material and accessories are added.
        </p>
        <div className="mt-6 space-y-6">
          {PROJECT_TYPES.map((type) => (
            <div key={type.key}>
              <p className="text-sm font-medium text-charcoal">{type.label}</p>
              <div className="mt-2 grid gap-4 sm:grid-cols-3">
                {SIZES.map((size) => (
                  <div key={size.key}>
                    <label className={labelClass}>{size.label}</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-charcoal/40">
                        $
                      </span>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={pricing.basePrices[type.key][size.key]}
                        onChange={(e) => updateBasePrice(type.key, size.key, e.target.value)}
                        className={`${inputClass} pl-7`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-charcoal">Material Multipliers</h2>
        <p className="mt-1 text-sm text-charcoal/60">Multiplied against the base price. 1.0 means no change.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MATERIALS.map((m) => (
            <div key={m.key}>
              <label className={labelClass}>{m.label}</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={pricing.materialMultipliers[m.key]}
                onChange={(e) => updateMultiplier(m.key, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal">Accessories</h2>
            <p className="mt-1 text-sm text-charcoal/60">Flat amount added on top of the base + material price.</p>
          </div>
          <button
            type="button"
            onClick={addAccessory}
            className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <Plus size={15} />
            Add Accessory
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {pricing.accessories.map((accessory, index) => (
            <div
              key={accessory.key}
              className="flex flex-col gap-3 rounded-lg border border-charcoal/10 p-3 sm:flex-row sm:items-end"
            >
              <div className="flex-1">
                <label className={labelClass}>Label</label>
                <input
                  type="text"
                  value={accessory.label}
                  onChange={(e) => updateAccessory(index, "label", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Soft-close drawers"
                />
              </div>
              <div className="sm:w-32">
                <label className={labelClass}>Cost</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-charcoal/40">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={accessory.cost}
                    onChange={(e) => updateAccessory(index, "cost", e.target.value)}
                    className={`${inputClass} pl-7`}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeAccessory(index)}
                aria-label={`Remove ${accessory.label || "accessory"}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-charcoal/15 text-charcoal/60 transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {errors.length > 0 && (
        <div className="mt-6 rounded-lg border border-brand-red/30 bg-brand-red/5 p-4">
          <ul className="list-disc space-y-1 pl-5 text-sm text-brand-red">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {saved && errors.length === 0 && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-600/20 bg-emerald-50 p-4 text-sm text-emerald-800">
          <Check size={16} />
          Pricing saved. The Instant Quote tool now reflects these numbers.
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red px-8 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
