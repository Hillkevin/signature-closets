import { NextRequest, NextResponse } from "next/server";
import { sendCustomerQuoteCopy, sendLeadNotification, type EmailField } from "@/lib/email";

type ConsultationPayload = {
  type: "consultation";
  data: {
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
};

type InstantQuotePayload = {
  type: "instant-quote";
  data: {
    name: string;
    email: string;
    zip: string;
    phone: string;
    projectType: string;
    size: string;
    material: string;
    accessories: string[];
    estimateLow: number;
    estimateHigh: number;
  };
};

type LeadPayload = ConsultationPayload | InstantQuotePayload;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function buildConsultationFields(data: ConsultationPayload["data"]): EmailField[] {
  return [
    { label: "Name", value: `${data.firstName} ${data.lastName}` },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "City", value: data.city },
    { label: "Project Type", value: data.projectTypes.join(", ") },
    { label: "Budget Range", value: data.budget },
    { label: "Timeline", value: data.timeline },
    { label: "Project Details", value: data.message.trim() || "—" },
  ];
}

function buildInstantQuoteFields(data: InstantQuotePayload["data"]): EmailField[] {
  return [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Zip Code", value: data.zip },
    { label: "Project Type", value: data.projectType },
    { label: "Size", value: data.size },
    { label: "Material", value: data.material },
    { label: "Accessories", value: data.accessories.length > 0 ? data.accessories.join(", ") : "None selected" },
    { label: "Quote Range", value: `${formatUSD(data.estimateLow)} – ${formatUSD(data.estimateHigh)}` },
  ];
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.type === "consultation") {
    const d = body.data;
    if (
      !isNonEmptyString(d?.firstName) ||
      !isNonEmptyString(d?.lastName) ||
      !isNonEmptyString(d?.email) ||
      !isNonEmptyString(d?.phone) ||
      !isNonEmptyString(d?.city) ||
      !Array.isArray(d?.projectTypes) ||
      d.projectTypes.length === 0 ||
      !isNonEmptyString(d?.budget) ||
      !isNonEmptyString(d?.timeline)
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    try {
      await sendLeadNotification({
        subject: `New Consultation Request — ${d.firstName} ${d.lastName}`,
        fields: buildConsultationFields(d),
        replyTo: d.email,
      });
    } catch (err) {
      console.error("Failed to send consultation lead email:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  if (body.type === "instant-quote") {
    const d = body.data;
    if (!isNonEmptyString(d?.name) || !isNonEmptyString(d?.email) || !isNonEmptyString(d?.zip) || !isNonEmptyString(d?.phone)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    try {
      await sendLeadNotification({
        subject: `New Instant Quote Lead — ${d.name}`,
        fields: buildInstantQuoteFields(d),
        replyTo: d.email,
      });
    } catch (err) {
      console.error("Failed to send instant quote lead email:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    // Best-effort: the lead is already captured above, so a failure here shouldn't tell
    // the customer their submission failed — it just means they won't get their copy.
    try {
      await sendCustomerQuoteCopy({
        to: d.email,
        name: d.name,
        projectType: d.projectType,
        estimateLow: d.estimateLow,
        estimateHigh: d.estimateHigh,
      });
    } catch (err) {
      console.error("Failed to send customer quote copy (lead notification still succeeded):", err);
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown lead type." }, { status: 400 });
}
