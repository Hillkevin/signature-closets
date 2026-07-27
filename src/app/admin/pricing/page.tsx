import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { getPricing } from "@/lib/pricing";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import PricingAdminForm from "@/components/admin/PricingAdminForm";

export const metadata: Metadata = {
  title: "Pricing Admin | Signature Closets",
  robots: { index: false, follow: false },
};

export default async function AdminPricingPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <AdminLoginForm />
      </div>
    );
  }

  const pricing = await getPricing();

  return (
    <div className="min-h-screen bg-cream px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">Instant Quote Pricing</h1>
        <p className="mt-2 text-sm text-charcoal/60">
          These numbers directly control what customers see on the Instant Quote tool. Changes take effect as
          soon as you save.
        </p>
        <PricingAdminForm initialPricing={pricing} />
      </div>
    </div>
  );
}
