import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("pantry-systems");

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
};

export default function PantrySystemsPage() {
  return <ServicePage service={service} />;
}
