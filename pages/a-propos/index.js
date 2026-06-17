import Head from "next/head";
import Link from "next/link";
import { Libre_Caslon_Text } from "next/font/google";
import { Handshake, Newspaper, Settings, Phone } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Footer from "../../components/Footer";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";

function PageBreadcrumb() {
  return (
    <Breadcrumb className={`${cx} pt-6 pb-2`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>À propos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function Hero() {
  return (
    <div className={cx}>
      <div className="flex overflow-hidden">

        {/* Left — brand bg + title */}
        <div className="flex-1 bg-[var(--color-brand)] px-10 pt-20 lg:pt-[140px] pb-20 flex items-end">
          <h1 className="text-[24px] lg:text-[30px] font-semibold leading-none text-white">
            À propos de nous
          </h1>
        </div>

        {/* Right — image (half width) */}
        <div className="hidden sm:block w-1/2 min-h-[260px] lg:min-h-[340px] relative">
          <img
            src="/about-pic.jpg"
            alt="L'équipe New World Courtage"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Nos partenaires", href: "/a-propos/nos-partenaires/", icon: Handshake },
  { label: "Nos communiqués", href: "/a-propos/nos-communiques/", icon: Newspaper },
  { label: "Fonctionnement", href: "/a-propos/fonctionnement/", icon: Settings },
  { label: "Contact", href: "/contact/", icon: Phone },
];

function QuickNav() {
  return (
    <div className={`${cx} relative z-10 -mt-12 pb-6`}>
      <div className="mx-4 sm:mx-10 lg:mx-20 border border-gray-200 rounded-lg overflow-hidden flex divide-x divide-gray-200 bg-white">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-5 px-3 hover:bg-gray-50 transition-colors duration-150"
          >
            <Icon size={24} className="text-[var(--color-brand)] shrink-0" />
            <span className="text-[12px] sm:text-[14px] font-semibold text-[#131212] text-center leading-tight">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function AProposPage() {
  return (
    <>
      <Head>
        <title>À propos de New World Courtage — Courtier en assurance indépendant</title>
        <meta
          name="description"
          content="New World Courtage est un courtier en assurance indépendant immatriculé à l'ORIAS. Découvrez notre mission, nos valeurs et notre équipe d'experts agréés au service des particuliers et professionnels."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/a-propos/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.newworldcourtage.fr/a-propos/" />
        <meta property="og:title" content="À propos de New World Courtage — Courtier en assurance indépendant" />
        <meta property="og:description" content="New World Courtage est un courtier en assurance indépendant immatriculé à l'ORIAS. Découvrez notre mission, nos valeurs et notre équipe d'experts agréés." />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="New World Courtage" />
        <meta property="og:image" content="https://www.newworldcourtage.fr/about-pic.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="À propos de New World Courtage" />
        <meta name="twitter:description" content="Courtier en assurance indépendant immatriculé à l'ORIAS. Notre mission : vous trouver la meilleure couverture au meilleur prix." />
        <meta name="twitter:image" content="https://www.newworldcourtage.fr/about-pic.jpg" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "À propos de New World Courtage",
              url: "https://www.newworldcourtage.fr/a-propos/",
              description: "New World Courtage est un courtier en assurance indépendant immatriculé à l'ORIAS, spécialisé dans la comparaison d'assurances auto, habitation, santé et décennale.",
              publisher: {
                "@type": "InsuranceAgency",
                name: "New World Courtage",
                url: "https://www.newworldcourtage.fr",
                logo: "https://www.newworldcourtage.fr/nwc_logo.svg",
                telephone: "+33800000000",
                email: "contact@newworldcourtage.fr",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "FR",
                },
                areaServed: { "@type": "Country", name: "France" },
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.newworldcourtage.fr/" },
                  { "@type": "ListItem", position: 2, name: "À propos", item: "https://www.newworldcourtage.fr/a-propos/" },
                ],
              },
            }),
          }}
        />
      </Head>

      <main>
        <PageBreadcrumb />
        <Hero />
        <QuickNav />
      </main>

      <Footer />
    </>
  );
}
