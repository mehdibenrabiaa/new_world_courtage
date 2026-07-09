import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.84L0 24l6.335-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.732.871.938-3.63-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

const TOP_LINKS = [
  {
    heading: "Produits",
    items: [
      { label: "Assurance Vie", href: "/life-insurance/" },
      { label: "Assurance Habitation", href: "/assurance-habitation/" },
      { label: "Assurance Auto", href: "/auto-insurance/" },
      { label: "Assurance Décennale", href: "/assurance-decennale/" },
      { label: "Calculateur d'assurance", href: "/life-insurance/life-insurance-calculator/" },
    ],
  },
  {
    heading: "Entreprise",
    items: [
      { label: "À propos", href: "/a-propos/" },
      { label: "Avis clients", href: "/a-propos/avis-clients/" },
      { label: "Actualités", href: "/actualites/" },
      { label: "Recrutement", href: "/recrutement/" },
      { label: "Partenariats", href: "/a-propos/nos-partenaires/" },
    ],
  },
];

const CONTACT = {
  email: "contact@newworldcourtage.com",
  phone: "07 45 89 18 65",
  tel: "+33745891865",
  whatsappDisplay: "07 74 59 53 29",
  whatsappHref: "https://wa.me/33774595329",
  address: ["455 Promenade des Anglais", "Immeuble Nice Premier – Arenas Partners", "06000 Nice, France"],
};

const nbsp = (s) => s.replace(/ ([?!:;»])/g, " $1");

const GUIDE_LINKS = [
  {
    heading: "Vie",
    items: [
      { label: "Types d'assurance vie", href: "/life-insurance/types-of-life-insurance/" },
      { label: "Assurance vie : comment choisir ?", href: "/life-insurance/how-to-buy-life-insurance/" },
      { label: "De quel capital ai-je besoin ?", href: "/life-insurance/life-insurance-calculator/" },
      { label: "Comment fonctionne l'assurance vie ?", href: "/life-insurance/how-does-life-insurance-work/" },
    ],
  },
  {
    heading: "Habitation",
    items: [
      { label: "Comment choisir son assurance habitation ?", href: "/assurance-habitation/comment-choisir/" },
      { label: "Quel niveau de couverture choisir ?", href: "/assurance-habitation/niveau-de-couverture/" },
      { label: "Pourquoi ma prime a-t-elle augmenté ?", href: "/assurance-habitation/augmentation-prime/" },
    ],
  },
  {
    heading: "Auto",
    items: [
      { label: "Comment choisir son assurance auto ?", href: "/auto-insurance/how-to-buy-car-insurance/" },
      { label: "Quelle couverture auto choisir ?", href: "/auto-insurance/how-much-car-insurance-do-you-need/" },
      { label: "Calculateur assurance auto", href: "/assurance-auto/calculateur/" },
    ],
  },
  {
    heading: "Décennale",
    items: [
      { label: "Comment fonctionne la décennale ?", href: "/assurance-decennale/fonctionnement/" },
      { label: "Types de garanties décennales", href: "/assurance-decennale/types-de-garanties/" },
      { label: "Suis-je obligé de m'assurer ?", href: "/assurance-decennale/obligation/" },
      { label: "Combien coûte la décennale ?", href: "/assurance-decennale/tarifs/" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Politique de confidentialité", href: "/confidentialite/" },
  { label: "Accessibilité", href: "/accessibilite/" },
  { label: "Conditions générales", href: "/conditions-generales/" },
  { label: "Mentions légales", href: "/mentions-legales/" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-blue-navy)] mt-4">
      <div className="px-4 sm:px-6 lg:px-12 2xl:px-24 py-14">

        {/* Top section — logo + columns */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 pb-12 border-b border-white/10">

          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" aria-label="New World Courtage — Accueil">
              <Image
                src="/nwc_logo_white.svg"
                alt="New World Courtage"
                width={160}
                height={40}
                className="h-11 w-auto"
              />
            </Link>
          </div>

          {/* Link groups + contact */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 lg:gap-16">

            {TOP_LINKS.map(({ heading, items }) => (
              <div key={heading} className="flex flex-col gap-3 min-w-[140px]">
                <h3 className="text-[15px] font-bold text-white">{heading}</h3>
                <ul className="flex flex-col gap-2.5">
                  {items.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-[15px] text-white/75 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div className="flex flex-col gap-3 min-w-[140px]">
              <h3 className="text-[15px] font-bold text-white">Contact</h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-[15px] text-white/75 hover:text-white transition-colors break-all">
                    <Mail size={15} className="shrink-0 text-white/60" />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-2.5 text-[15px] text-white/75 hover:text-white transition-colors">
                    <Phone size={15} className="shrink-0 text-white/60" />
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp : ${CONTACT.whatsappDisplay} (ouvre dans un nouvel onglet)`} className="flex items-center gap-2.5 text-[15px] text-white/75 hover:text-white transition-colors">
                    <span className="shrink-0 text-white/60"><WhatsAppIcon size={15} /></span>
                    {CONTACT.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-[15px] text-white/75">
                  <MapPin size={15} className="shrink-0 text-white/60 mt-0.5" />
                  <div>
                    {CONTACT.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Guide link groups */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {GUIDE_LINKS.map(({ heading, items }) => (
              <div key={heading} className="flex flex-col gap-3">
                <h3 className="text-[15px] font-bold text-white">{heading}</h3>
                <ul className="flex flex-col gap-2.5">
                  {items.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-[15px] text-white/75 hover:text-white transition-colors leading-snug block">
                        {nbsp(label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal section */}
        <div className="pt-10 flex flex-col gap-5">

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="text-[14px] text-white/60 hover:text-white/70 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <p className="text-[13px] text-white/60 leading-relaxed max-w-4xl">
            New World Courtage SAS — courtier en assurance indépendant immatriculé à l&apos;ORIAS. Les informations fournies sur ce site ont été développées à des fins générales d&apos;information et d&apos;éducation. Nous faisons de notre mieux pour nous assurer que ces informations sont exactes et à jour. Les devis ou fourchettes de primes d&apos;assurance affichés ne sont pas contractuels. La prime définitive est déterminée par la compagnie d&apos;assurance à l&apos;issue du processus de souscription.
          </p>

          <p className="text-[13px] text-white/60 leading-relaxed max-w-4xl">
            <strong className="text-white/60">Mention :</strong> Les images présentes sur ce site peuvent être générées par intelligence artificielle. Toute ressemblance avec des personnes réelles, vivantes ou décédées, serait purement fortuite.
          </p>

          <p className="text-[13px] text-white/60">
            © {new Date().getFullYear()} New World Courtage. Tous droits réservés.
          </p>

        </div>

      </div>
    </footer>
  );
}
