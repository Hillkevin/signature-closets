import Link from "next/link";
import { Work_Sans } from "next/font/google";
import { ChevronRight } from "lucide-react";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] });

export default function StickyBookButton() {
  return (
    <Link
      href="/instant-quote"
      className={`${workSans.className} fixed right-0 top-auto bottom-6 z-[9999] flex translate-y-0 items-center gap-1 bg-brand-red px-4 py-2.5 text-lg text-white transition-all duration-200 hover:scale-105 hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/30 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:px-7 sm:py-4 sm:text-[22px]`}
    >
      Book a Free Consultation
      <ChevronRight size={20} className="shrink-0" />
    </Link>
  );
}
