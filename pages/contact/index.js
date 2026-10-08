import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headingFont } from "@/lib/fonts";
import ReadyCta from "@/components/ReadyCta";

function WhatsAppIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.84L0 24l6.335-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.732.871.938-3.63-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

const CONTACT_CARDS = [
  {
    Icon: Phone,
    title: "Par téléphone",
    description: "Un conseiller vous répond directement pour toute question sur votre contrat ou votre devis.",
    value: "07 45 89 18 65",
    href: "tel:+33745891865",
    action: "Appeler",
  },
  {
    Icon: WhatsAppIcon,
    title: "Sur WhatsApp",
    description: "Écrivez-nous à tout moment, on vous répond dès que possible.",
    value: "07 74 59 53 29",
    href: "https://wa.me/33774595329",
    action: "Écrire sur WhatsApp",
    external: true,
  },
  {
    Icon: Mail,
    title: "Par email",
    description: "Pour toute demande générale ou envoi de documents.",
    value: "contact@newworldcourtage.com",
    href: "mailto:contact@newworldcourtage.com",
    action: "Envoyer un email",
  },
  {
    Icon: MapPin,
    title: "Par courrier",
    description: "Pour les envois postaux et courriers officiels.",
    value: "455 Promenade des Anglais\nImmeuble Nice Premier — Arenas Partners\n06000 Nice, France",
    href: null,
  },
];


// Same look as the article cards (InfoCardsSection style2): white, soft shadow,
// square icon tile, brand-blue action link pinned to the bottom.
function ContactCard({ Icon, title, description, value, href, action, external }) {
  const card = (
    <div className="group flex h-full flex-col gap-4 bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.14)] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)]">
      <span className="flex size-12 shrink-0 items-center justify-center bg-[var(--color-brand)]/10 text-[var(--color-brand)]" aria-hidden="true">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[20px] font-semibold text-[var(--color-text)]">{title}</h3>
        <p className="text-[15px] leading-relaxed text-gray-600">{description}</p>
      </div>
      <p className="flex-1 whitespace-pre-line text-[16px] font-bold text-[var(--color-text)]">{value}</p>
      {action && (
        <span className="mt-2 flex items-center gap-2 text-[15px] font-bold text-[var(--color-brand)]">
          <span className="group-hover:underline">{action}</span>
          <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      )}
    </div>
  );

  if (!href) return card;
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2">
      {card}
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact — New World Courtage</title>
        <meta
          name="description"
          content="Contactez New World Courtage par téléphone, WhatsApp, email ou courrier. Nos conseillers agréés vous répondent pour toute question sur votre assurance."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/contact/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.newworldcourtage.fr/contact/" />
        <meta property="og:title" content="Contact — New World Courtage" />
        <meta property="og:description" content="Contactez New World Courtage par téléphone, WhatsApp, email ou courrier." />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="New World Courtage" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact — New World Courtage",
              url: "https://www.newworldcourtage.fr/contact/",
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.newworldcourtage.fr/" },
                  { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.newworldcourtage.fr/contact/" },
                ],
              },
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-white">

        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
          image="/heroes/contactez-nous-desktop.webp"
          mobileImage="/heroes/contactez-nous-mobile.webp"
          title={<>Contactez-<em>nous</em>.</>}
          subtitle="Une question, un devis, un suivi de dossier ? Nos conseillers agréés sont à votre écoute, quel que soit le canal que vous préférez."
        >
          <Button size="lg" asChild className="bg-[#3b9bd8] text-white hover:bg-[#2c87c2]">
            <a href="tel:+33745891865"><Phone size={17} aria-hidden="true" />07 45 89 18 65</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white/70 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white">
            <a href="https://wa.me/33774595329" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} />WhatsApp</a>
          </Button>
        </PhotoHero>

        {/* Contact channels */}
        <section className="w-full py-4">
          <div className="px-4 lg:px-12 2xl:px-24">
            <div className="bg-[var(--color-light)] px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
              <h2 className={`mb-10 text-center text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--color-text)] ${headingFont.className}`}>
                Comment souhaitez-vous <em className={headingFont.className}>nous joindre</em> ?
              </h2>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
                {CONTACT_CARDS.map((card) => (
                  <ContactCard key={card.title} {...card} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ReadyCta />
      </main>
    </>
  );
}
