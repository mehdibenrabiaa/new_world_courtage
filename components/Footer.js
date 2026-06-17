import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  {
    heading: "Nos assurances",
    items: [
      { label: "Assurance Auto", href: "/assurance-auto/" },
      { label: "Assurance Habitation", href: "/assurance-habitation/" },
      { label: "Assurance Santé", href: "/assurance-sante/" },
      { label: "Assurance Décennale", href: "/assurance-decennale/" },
    ],
  },
  {
    heading: "Entreprise",
    items: [
      { label: "À propos", href: "/about/" },
      { label: "Notre processus", href: "/processus/" },
      { label: "Témoignages", href: "/temoignages/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    heading: "Légal",
    items: [
      { label: "Mentions légales", href: "/mentions-legales/" },
      { label: "Politique de confidentialité", href: "/confidentialite/" },
      { label: "CGU", href: "/cgu/" },
      { label: "Cookies", href: "/cookies/" },
    ],
  },
];

function FooterLogo() {
  return (
    <Image
      src="/nwc_logo_2.svg"
      alt="New World Courtage"
      width={182}
      height={223}
      className="h-12 w-auto"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-blue-navy)] text-white mt-4">
      <div className="px-4 lg:px-12 2xl:px-24 py-14">

        {/* Top — logo + columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/"><FooterLogo /></Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              New World Courtage vous aide à comparer les meilleures offres d&apos;assurance et à trouver la couverture adaptée à vos besoins.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+33800000000" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Phone size={14} />
                0 800 000 000
              </a>
              <a href="mailto:contact@newworldcourtage.fr" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Mail size={14} />
                contact@newworldcourtage.fr
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map(({ heading, items }) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                {heading}
              </p>
              <ul className="flex flex-col">
                {items.map(({ label, href }) => (
                  <li key={href}>
                    <Button variant="link" asChild className="h-auto py-1 px-2 text-[13.5px] text-white/70 font-normal justify-start hover:text-white">
                      <Link href={href}>{label}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} New World Courtage. Tous droits réservés.</p>
          <p>Courtier en assurances immatriculé à l&apos;ORIAS</p>
        </div>

      </div>
    </footer>
  );
}
