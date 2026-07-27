import type { Metadata } from "next";
import LocationPage from "@/components/LocationPage";
import { getLocation } from "@/lib/locations";

const location = getLocation("hermiston");

export const metadata: Metadata = {
  title: `Custom Closets in ${location.city}, ${location.state} | Signature Closets`,
  description: `Custom walk-in closets, pantry systems & storage solutions for ${location.city}, ${location.state} homeowners. Serving ${location.city} from our Benton City workshop. Free consultation.`,
};

export default function HermistonPage() {
  return <LocationPage slug="hermiston" />;
}
