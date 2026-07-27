import { promises as fs } from "fs";
import path from "path";

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

export async function getPricing(): Promise<PricingData> {
  const raw = await fs.readFile(PRICING_FILE, "utf-8");
  return JSON.parse(raw) as PricingData;
}

export async function savePricing(data: PricingData): Promise<void> {
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
