import Image from "next/image";
import Link from "next/link";
import { Phone, ChevronRight } from "lucide-react";

// The same minimal sticky header used by the devis wizards (see
// pages/assurance-pro-auto/garagiste/devis/index.js) — just the logo and the
// phone CTA, no nav menu/footer, so there's nothing to distract from the
// task at hand. Reused as-is for the account pages (connexion, inscription,
// espace client/partenaire...) for the same reason.
export default function QuestionnaireHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-12 h-16">
        <Link href="/">
          <Image src="/logos/nwc-logo.svg" alt="New World Courtage" width={120} height={33} className="h-7 w-auto" />
        </Link>
        <a
          href="tel:+33745891865"
          className="flex items-center gap-2 h-10 border border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 text-[var(--color-brand)] rounded-lg px-3.5 transition-colors"
        >
          <Phone size={15} className="shrink-0" />
          <span className="text-sm font-semibold">07 45 89 18 65</span>
          <ChevronRight size={14} className="shrink-0 opacity-70" />
        </a>
      </div>
    </header>
  );
}
