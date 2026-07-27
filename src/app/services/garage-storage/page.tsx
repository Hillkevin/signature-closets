import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("garage-storage");

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
};

export default function GarageStoragePage() {
  return <ServicePage service={service} />;
}
