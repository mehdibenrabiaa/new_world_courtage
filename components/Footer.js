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
    heading: "Nos assurances",
    items: [
      { label: "Toutes nos assurances", href: "/nos-assurances/" },
      { label: "Flotte & Transport", href: "/assurance-transport/" },
      { label: "Pro de l'auto", href: "/assurance-pro-auto/" },
      { label: "Construction", href: "/assurance-construction/" },
      { label: "Immobilier", href: "/assurance-immobilier/" },
      { label: "Calculateur assurance auto", href: "/assurance-transport/calculateur/" },
    ],
  },
  {
    heading: "Entreprise",
    items: [
      { label: "À propos", href: "/a-propos/" },
      { label: "Avis clients", href: "/a-propos/avis-clients/" },
      { label: "Actualités", href: "/actualites/" },
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
  address: ["455 Promenade des Anglais", "Immeuble Nice Premier — Arenas Partners", "06000 Nice, France"],
};

const GUIDE_LINKS = [
  {
    heading: "Flotte & Transport",
    items: [
      { label: "Assurance taxi", href: "/assurance-transport/taxi/" },
      { label: "Assurance ambulance", href: "/assurance-transport/ambulance/" },
      { label: "Assurance chauffeur VTC", href: "/assurance-transport/chauffeur-vtc/" },
      { label: "Assurance poids lourd", href: "/assurance-transport/poids-lourd/" },
    ],
  },
  {
    heading: "Pro de l'auto",
    items: [
      { label: "Assurance garagiste", href: "/assurance-pro-auto/garagiste/" },
      { label: "Assurance carrossier", href: "/assurance-pro-auto/carrossier/" },
      { label: "Assurance auto-école", href: "/assurance-pro-auto/auto-ecole/" },
      { label: "Assurance concessionnaire", href: "/assurance-pro-auto/concessionnaire/" },
    ],
  },
  {
    heading: "Construction",
    items: [
      { label: "Tous risques chantier", href: "/assurance-construction/tous-risques-chantier/" },
      { label: "RC et décennale", href: "/assurance-construction/rc-decennale/" },
      { label: "Dommages ouvrage", href: "/assurance-construction/dommages-ouvrage/" },
      { label: "Assurance engins de chantier", href: "/assurance-construction/engins-chantier/" },
    ],
  },
  {
    heading: "Immobilier",
    items: [
      { label: "Assurance copropriété", href: "/assurance-immobilier/copropriete/" },
      { label: "Assurance immeuble", href: "/assurance-immobilier/immeuble/" },
      { label: "Assurance loyers impayés", href: "/assurance-immobilier/loyers-impayes/" },
      { label: "Assurance syndic", href: "/assurance-immobilier/syndic/" },
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
              <Image src="/nwc_logo_white.svg" alt="New World Courtage" width={160} height={40} className="h-11 w-auto" />
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
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[15px] text-white/75 hover:text-white transition-colors">
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
              <Link key={href} href={href} className="text-[14px] text-white/60 transition-colors">
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
