import { Resend } from "resend";
import { SITE } from "@/lib/site";

// Resend's shared sending address — swap for a verified domain address (e.g. leads@signatureclosets.com)
// once the business domain is verified with Resend.
const FROM_ADDRESS = "Signature Closets <onboarding@resend.dev>";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set.");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export type EmailField = { label: string; value: string };

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function sendLeadNotification({
  subject,
  fields,
  replyTo,
}: {
  subject: string;
  fields: EmailField[];
  replyTo?: string;
}) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!to) {
    throw new Error("LEAD_NOTIFICATION_EMAIL environment variable is not set.");
  }

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2A2A2B;">
      <h2 style="color: #B30808; margin-bottom: 16px;">${escapeHtml(subject)}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${fields
          .map(
            (f) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: 600; white-space: nowrap; vertical-align: top;">${escapeHtml(f.label)}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(f.value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  const text = fields.map((f) => `${f.label}: ${f.value}`).join("\n");

  const client = getResendClient();
  const result = await client.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export async function sendCustomerQuoteCopy({
  to,
  name,
  projectType,
  estimateLow,
  estimateHigh,
}: {
  to: string;
  name: string;
  projectType: string;
  estimateLow: number;
  estimateHigh: number;
}) {
  const subject = "Your Instant Quote from Signature Closets";
  const range = `${formatUSD(estimateLow)} – ${formatUSD(estimateHigh)}`;
  const firstName = name.trim().split(/\s+/)[0] || name;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2A2A2B; max-width: 560px;">
      <h2 style="color: #B30808; margin-bottom: 4px;">Your Instant Quote from Signature Closets</h2>
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for using our Instant Quote tool! Here's a copy of your estimate for your records:</p>
      <div style="background: #3A3A3B; color: #ffffff; border-radius: 8px; padding: 20px 24px; margin: 20px 0;">
        <div style="font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; color: #d6d5d3;">
          Your ${escapeHtml(projectType)} Quote
        </div>
        <div style="font-size: 28px; font-weight: 600; margin-top: 6px;">${range}</div>
      </div>
      <p>
        This is a real price range based on typical costs for your project — your exact price is confirmed for
        free once we measure your space.
      </p>
      <p>
        We'll be in touch shortly to schedule your free in-home (or virtual) consultation. If you'd like to
        reach us sooner, call us at ${escapeHtml(SITE.phoneDisplay)}.
      </p>
      <p style="margin-top: 24px;">&mdash; The Signature Closets Team</p>
    </div>
  `;

  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for using our Instant Quote tool! Here's a copy of your estimate:",
    "",
    `Your ${projectType} Quote: ${range}`,
    "",
    "This is a real price range based on typical costs for your project — your exact price is confirmed for free once we measure your space.",
    "",
    `We'll be in touch shortly to schedule your free in-home (or virtual) consultation. If you'd like to reach us sooner, call us at ${SITE.phoneDisplay}.`,
    "",
    "— The Signature Closets Team",
  ].join("\n");

  const client = getResendClient();
  const result = await client.emails.send({ from: FROM_ADDRESS, to, subject, html, text });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
