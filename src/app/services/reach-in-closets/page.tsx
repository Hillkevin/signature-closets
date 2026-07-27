import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("reach-in-closets");

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
};

export default function ReachInClosetsPage() {
  return <ServicePage service={service} />;
}
