import Image from "next/image";
import Link from "next/link";

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
  email: "Contact@newworldcourtage.com",
  phone: "07 45 89 18 65",
  tel: "+33745891865",
  whatsappDisplay: "07 74 59 53 29",
  whatsappHref: "https://wa.me/33774595329",
  address: ["455 Promenade des Anglais", "Immeuble Nice Premier – Arenas Partners", "06000 Nice, France"],
};

const GUIDE_LINKS = [
  {
    heading: "Vie",
    items: [
      { label: "Types d'assurance vie", href: "/life-insurance/types-of-life-insurance/" },
      { label: "Assurance vie : comment choisir ?", href: "/life-insurance/how-to-buy-life-insurance/" },
      { label: "De quel capital ai-je besoin ?", href: "/life-insurance/life-insurance-calculator/" },
      { label: "Comment fonctionne l'assurance vie ?", href: "/life-insurance/how-does-life-insurance-work/" },
    ],
  },
  {
    heading: "Habitation",
    items: [
      { label: "Comment choisir son assurance habitation ?", href: "/assurance-habitation/comment-choisir/" },
      { label: "Quel niveau de couverture choisir ?", href: "/assurance-habitation/niveau-de-couverture/" },
      { label: "Pourquoi ma prime a-t-elle augmenté ?", href: "/assurance-habitation/augmentation-prime/" },
    ],
  },
  {
    heading: "Auto",
    items: [
      { label: "Comment choisir son assurance auto ?", href: "/auto-insurance/how-to-buy-car-insurance/" },
      { label: "Quelle couverture auto choisir ?", href: "/auto-insurance/how-much-car-insurance-do-you-need/" },
      { label: "Calculateur assurance auto", href: "/assurance-auto/calculateur/" },
    ],
  },
  {
    heading: "Décennale",
    items: [
      { label: "Comment fonctionne la décennale ?", href: "/assurance-decennale/fonctionnement/" },
      { label: "Types de garanties décennales", href: "/assurance-decennale/types-de-garanties/" },
      { label: "Suis-je obligé de m'assurer ?", href: "/assurance-decennale/obligation/" },
      { label: "Combien coûte la décennale ?", href: "/assurance-decennale/tarifs/" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Politique de confidentialité", href: "/confidentialite/" },
  { label: "Gestion des cookies", href: "/cookies/" },
  { label: "Accessibilité", href: "/accessibilite/" },
  { label: "Conditions générales", href: "/cgu/" },
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
            <Link href="/">
              <Image
                src="/nwc_logo_white.svg"
                alt="New World Courtage"
                width={160}
                height={40}
                className="h-14 w-auto"
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
                      <Link href={href} className="text-[15px] text-white/55 hover:text-white transition-colors">
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
              <ul className="flex flex-col gap-2.5">
                <li className="flex flex-col">
                  <span className="text-[12px] uppercase tracking-widest text-white/30 mb-0.5">Email</span>
                  <a href={`mailto:${CONTACT.email}`} className="text-[15px] text-white/55 hover:text-white transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex flex-col">
                  <span className="text-[12px] uppercase tracking-widest text-white/30 mb-0.5">Ligne directe</span>
                  <a href={`tel:${CONTACT.tel}`} className="text-[15px] text-white/55 hover:text-white transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex flex-col">
                  <span className="text-[12px] uppercase tracking-widest text-white/30 mb-0.5">WhatsApp</span>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-[15px] text-white/55 hover:text-white transition-colors">
                    {CONTACT.whatsappDisplay}
                  </a>
                </li>
              </ul>
              <div className="mt-1">
                {CONTACT.address.map((line) => (
                  <p key={line} className="text-[15px] text-white/55">{line}</p>
                ))}
              </div>
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
                      <Link href={href} className="text-[15px] text-white/55 hover:text-white transition-colors leading-snug block">
                        {label}
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
              <Link key={href} href={href} className="text-[14px] text-white/40 hover:text-white/70 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <p className="text-[13px] text-white/30 leading-relaxed max-w-4xl">
            New World Courtage SAS — courtier en assurance indépendant immatriculé à l&apos;ORIAS. Les informations fournies sur ce site ont été développées à des fins générales d&apos;information et d&apos;éducation. Nous faisons de notre mieux pour nous assurer que ces informations sont exactes et à jour. Les devis ou fourchettes de primes d&apos;assurance affichés ne sont pas contractuels. La prime définitive est déterminée par la compagnie d&apos;assurance à l&apos;issue du processus de souscription.
          </p>

          <p className="text-[13px] text-white/30 leading-relaxed max-w-4xl">
            <strong className="text-white/40">Mention :</strong> Les images présentes sur ce site peuvent être générées par intelligence artificielle. Toute ressemblance avec des personnes réelles, vivantes ou décédées, serait purement fortuite.
          </p>

          <p className="text-[13px] text-white/30">
            © {new Date().getFullYear()} New World Courtage. Tous droits réservés.
          </p>

        </div>

      </div>
    </footer>
  );
}
