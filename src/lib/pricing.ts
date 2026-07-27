import { promises as fs } from "fs";
import path from "path";
import { kv } from "@vercel/kv";

export type ProjectTypeKey = "closet" | "garage" | "storage";
export type SizeKey = "small" | "medium" | "large";
export type MaterialKey = "white-melamine" | "colored-melamine" | "textured-melamine";

export type Accessory = {
  key: string;
  label: string;
  cost: number;
};

export type PricingData = {
  basePrices: Record<ProjectTypeKey, Record<SizeKey, number>>;
  materialMultipliers: Record<MaterialKey, number>;
  accessories: Accessory[];
};

const PROJECT_TYPES: ProjectTypeKey[] = ["closet", "garage", "storage"];
const SIZES: SizeKey[] = ["small", "medium", "large"];
const MATERIAL_KEYS: MaterialKey[] = ["white-melamine", "colored-melamine", "textured-melamine"];

const PRICING_FILE = path.join(process.cwd(), "data", "pricing.json");
const PRICING_KV_KEY = "signature-closets:pricing";

// Vercel's production filesystem is read-only, so persisted edits must go to KV there.
// Locally (no KV credentials configured), we fall back to reading/writing the JSON file
// on disk so `npm run dev` keeps working without needing a database connection.
const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function readSeedPricing(): Promise<PricingData> {
  const raw = await fs.readFile(PRICING_FILE, "utf-8");
  return JSON.parse(raw) as PricingData;
}

export async function getPricing(): Promise<PricingData> {
  if (hasKv) {
    const stored = await kv.get<PricingData>(PRICING_KV_KEY);
    if (stored) return stored;
    // First run: seed KV from the bundled JSON file so the admin page has starting values.
    const seed = await readSeedPricing();
    await kv.set(PRICING_KV_KEY, seed);
    return seed;
  }
  return readSeedPricing();
}

export async function savePricing(data: PricingData): Promise<void> {
  if (hasKv) {
    await kv.set(PRICING_KV_KEY, data);
    return;
  }
  await fs.writeFile(PRICING_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

// Authoritative validation — enforced server-side regardless of what the admin form already checked client-side.
export function validatePricing(data: unknown): string[] {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null) {
    return ["Pricing data must be an object."];
  }
  const d = data as Partial<PricingData>;

  if (typeof d.basePrices !== "object" || d.basePrices === null) {
    errors.push("Base prices are missing.");
  } else {
    for (const type of PROJECT_TYPES) {
      const sizes = (d.basePrices as Record<string, unknown>)[type];
      if (typeof sizes !== "object" || sizes === null) {
        errors.push(`Base prices for "${type}" are missing.`);
        continue;
      }
      for (const size of SIZES) {
        const value = (sizes as Record<string, unknown>)[size];
        if (!isFiniteNonNegative(value)) {
          errors.push(`Base price for ${type} / ${size} must be a number that isn't negative.`);
        }
      }
    }
  }

  if (typeof d.materialMultipliers !== "object" || d.materialMultipliers === null) {
    errors.push("Material multipliers are missing.");
  } else {
    for (const key of MATERIAL_KEYS) {
      const value = (d.materialMultipliers as Record<string, unknown>)[key];
      if (!isFiniteNonNegative(value)) {
        errors.push(`Material multiplier for "${key}" must be a number that isn't negative.`);
      }
    }
  }

  if (!Array.isArray(d.accessories)) {
    errors.push("Accessories must be a list.");
  } else {
    if (d.accessories.length === 0) {
      errors.push("At least one accessory is required.");
    }
    const seenKeys = new Set<string>();
    d.accessories.forEach((accessory, index) => {
      if (typeof accessory !== "object" || accessory === null) {
        errors.push(`Accessory #${index + 1} is invalid.`);
        return;
      }
      const a = accessory as Partial<Accessory>;
      if (!a.label || typeof a.label !== "string" || a.label.trim().length === 0) {
        errors.push(`Accessory #${index + 1} needs a label.`);
      }
      if (!isFiniteNonNegative(a.cost)) {
        errors.push(`Cost for "${a.label ?? `accessory #${index + 1}`}" must be a number that isn't negative.`);
      }
      if (!a.key || typeof a.key !== "string" || a.key.trim().length === 0) {
        errors.push(`Accessory #${index + 1} is missing an internal key.`);
      } else if (seenKeys.has(a.key)) {
        errors.push(`Duplicate accessory key "${a.key}".`);
      } else {
        seenKeys.add(a.key);
      }
    });
  }

  return errors;
}
