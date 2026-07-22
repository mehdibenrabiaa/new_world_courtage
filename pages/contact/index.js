import Head from "next/head";
import { Phone, Mail, MapPin } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
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
  },
  {
    Icon: WhatsAppIcon,
    title: "Sur WhatsApp",
    description: "Écrivez-nous à tout moment, on vous répond dès que possible.",
    value: "07 74 59 53 29",
    href: "https://wa.me/33774595329",
  },
  {
    Icon: Mail,
    title: "Par email",
    description: "Pour toute demande générale ou envoi de documents.",
    value: "contact@newworldcourtage.com",
    href: "mailto:contact@newworldcourtage.com",
  },
  {
    Icon: MapPin,
    title: "Par courrier",
    description: "Pour les envois postaux et courriers officiels.",
    value: "455 Promenade des Anglais\nImmeuble Nice Premier — Arenas Partners\n06000 Nice, France",
    href: null,
  },
];

function PageBreadcrumb() {
  return (
    <Breadcrumb className="px-4 sm:px-8 lg:px-16 2xl:px-24 pt-6 pb-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Contact</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ContactCard({ Icon, title, description, value, href }) {
  const content = (
    <Card className="h-full shadow-none rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center shrink-0">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[17px] font-semibold text-[var(--color-text)]">{title}</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">{description}</p>
        </div>
        <p className="text-[15px] font-medium text-[var(--color-text)] whitespace-pre-line">{value}</p>
      </CardContent>
    </Card>
  );

  if (!href) return content;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
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
        <PageBreadcrumb />

        {/* Hero */}
        <div className="bg-[var(--color-brand)] py-24 px-6 sm:px-10">
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              Contactez-nous
            </h1>
            <p className="text-white/80 text-[15px] sm:text-base max-w-xl">
              Une question, un devis, un suivi de dossier ? Nos conseillers agréés sont à votre écoute, quel que soit le canal que vous préférez.
            </p>
          </div>
        </div>

        {/* Contact cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONTACT_CARDS.map((card) => (
              <ContactCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        <ReadyCta />
      </main>
    </>
  );
}
