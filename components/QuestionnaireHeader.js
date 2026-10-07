import Link from "next/link";
import { Phone } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";

// The minimal sticky header used by the devis wizards (see
// pages/assurance-pro-auto/garagiste/devis/index.js) — just the logo and the
// phone number, no nav menu/footer, so there's nothing to distract from the
// task at hand. Reused as-is for the account pages (connexion, inscription,
// espace client/partenaire...) for the same reason. Styled like the main
// navbar: white bar, logo cell, full-height brand-blue block.
export default function QuestionnaireHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-gray-200 bg-white">
      <div className="flex h-full items-stretch">
        <Link href="/" className="flex shrink-0 items-center border-r border-gray-200 px-4 lg:px-12">
          <SiteLogo className="h-9 w-auto" />
        </Link>
        <div className="flex-1" />
        <a
          href="tel:+33745891865"
          className="flex items-center gap-2 bg-[var(--color-brand)] px-4 text-[15px] font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)] sm:px-7"
        >
          <Phone size={16} strokeWidth={2} aria-hidden="true" />
          07 45 89 18 65
        </a>
      </div>
    </header>
  );
}
