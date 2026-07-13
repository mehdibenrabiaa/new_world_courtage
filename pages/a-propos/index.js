import Head from "next/head";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import PageHero from "../../components/PageHero";
import SocialMedia from "../../components/SocialMedia";
const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

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



const NAV_ITEMS = [
  { label: "Nos partenaires", href: "/a-propos/nos-partenaires/", icon: "/icons/handshake.svg" },
  { label: "Nos communiqués", href: "/a-propos/nos-communiques/", icon: "/icons/document.svg" },
  { label: "Fonctionnement", href: "/a-propos/fonctionnement/", icon: "/icons/function.svg" },
  { label: "Contact", href: "/contact/", icon: "/icons/phone.svg" },
];

function QuickNav() {
  return (
    <div className="px-4 lg:px-12 2xl:px-24 relative z-10 -mt-20 pb-6">
      <div className="bg-[var(--color-light)] rounded-xl px-4 py-4 flex flex-col gap-3 w-full lg:w-fit lg:mx-auto">
        <p className="font-semibold text-[15px] sm:text-[16px] text-[var(--color-text)] whitespace-nowrap shrink-0">
          Que souhaitez-vous explorer ?
        </p>
        <div className="flex flex-col lg:flex-row gap-2">
          {NAV_ITEMS.map(({ label, href, icon }) => (
            <Link key={href} href={href} className="lg:shrink-0">
              <Card className="shadow-none rounded-xl w-full lg:w-[190px] lg:h-[130px] flex flex-row items-center lg:flex-col lg:justify-center gap-3 lg:gap-2 px-4 py-3 lg:px-3 lg:py-0 border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                <img src={icon} alt="" aria-hidden="true" className="shrink-0 w-8 h-8 lg:w-11 lg:h-11" />
                <span className="flex-1 lg:flex-none text-[16px] font-medium text-[var(--color-text)] lg:text-center leading-tight">{label}</span>
                <img src="/chevron-right.svg" alt="" width={9} height={15} aria-hidden="true" className="lg:hidden shrink-0 opacity-40" />
              </Card>
            </Link>
          ))}
        </div>
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
                telephone: "+33745891865",
                email: "contact@newworldcourtage.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "455 Promenade des Anglais, Immeuble Nice Premier – Arenas Partners",
                  addressLocality: "Nice",
                  postalCode: "06000",
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
        <PageHero title="À propos de nous" image="/about-hero.jpg" mobileImage="/about-hero-mobile.jpg" imageAlt="L'équipe New World Courtage" titleWidth="lg:w-[50%]" />
        <QuickNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-14 flex flex-col gap-12">

          {/* Intro */}
          <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">
            <p>New World Courtage réinvente l&apos;expérience de l&apos;assurance en proposant une plateforme unique et intégrée. Désormais, les consommateurs peuvent comparer les offres des plus grands assureurs, bénéficier de conseils d&apos;experts impartiaux, souscrire à leurs polices et gérer l&apos;ensemble de leur portefeuille en toute simplicité.</p>
            <p>Grâce à notre technologie propriétaire connectée aux leaders du marché (assurance vie, invalidité, habitation et auto), nous offrons un parcours numérique fluide et performant, tant pour les assurés que pour les compagnies d&apos;assurance.</p>
            <p>Depuis 2014, nos guides, nos outils digitaux et nos spécialistes ont accompagné des millions de personnes dans leurs démarches, totalisant plus de 200 milliards de dollars de capitaux assurés.</p>
          </div>

          {/* Ce qui nous distingue */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#131212]">Ce qui nous distingue</h2>
            <div className="flex flex-col gap-5 text-[15px] text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-100">
              {[
                { heading: "Comparer les offres, simplement", body: "Avec nos outils modernes, comparez les devis de plusieurs grandes compagnies d'assurance côte à côte en quelques minutes. Vous avez déjà une couverture ? Nous pouvons vous aider à magasiner votre police pour trouver un tarif plus avantageux." },
                { heading: "Des conseils qui vous placent en priorité", body: "Avec des centaines de conseillers en assurance agréés disponibles et des milliers d'articles vérifiés sur notre site, nous avons des réponses à toutes vos questions, que vous souhaitiez parler à quelqu'un en direct ou effectuer vos recherches de manière autonome." },
                { heading: "Des standards éditoriaux rigoureux", body: "Nos articles sont rédigés et édités par une équipe éditoriale de premier plan, puis soigneusement vérifiés par des conseillers en assurance agréés et des planificateurs financiers certifiés." },
              ].map(({ heading, body }) => (
                <div key={heading} className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] font-semibold text-[#131212]">{heading}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comment nous gagnons notre argent */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#131212]">Comment nous gagnons notre argent</h2>
            <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">
              <p>
                Nous sommes un courtier en assurance indépendant : nous percevons une commission de la part des compagnies d&apos;assurance pour chaque vente réalisée. Ces commissions sont déjà intégrées dans le prix des polices d&apos;assurance, de sorte que vous ne payez rien de plus en passant par nous.
              </p>
              <p>
                Notre rémunération peut varier selon plusieurs facteurs — type et montant du produit, assureur concerné ou volume d&apos;affaires — mais nous ne favorisons jamais un assureur au détriment d&apos;un autre en raison de la commission. Notre mission, c&apos;est de défendre vos intérêts, pas les nôtres.
              </p>
            </div>
          </section>

          {/* FAQ cards */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#131212]">Questions fréquentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[var(--color-light)] border-0 shadow-none">
                <CardContent className="p-6 flex flex-col gap-3">
                  <h3 className="text-[15px] font-semibold text-[#131212] leading-snug">
                    Est-il moins cher de souscrire une assurance via New World Courtage ?
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    Les tarifs d&apos;assurance sont réglementés par la loi. Chaque assureur évalue le risque différemment — c&apos;est pourquoi notre comparateur vous permet de trouver facilement les meilleures offres adaptées à vos besoins.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[var(--color-light)] border-0 shadow-none">
                <CardContent className="p-6 flex flex-col gap-3">
                  <h3 className="text-[15px] font-semibold text-[#131212] leading-snug">
                    New World Courtage est-il affilié à une compagnie d&apos;assurance ?
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    Non. Nous sommes un cabinet de courtage indépendant, non détenu par une compagnie d&apos;assurance. Nous commercialisons des polices auprès de plusieurs assureurs sans parti pris afin de défendre vos intérêts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Nos agréments */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#131212]">Nos agréments</h2>
            <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">
              <p>
                Tout intermédiaire en assurance est tenu par la loi d&apos;être immatriculé auprès de l&apos;ORIAS dans chaque territoire où il exerce son activité. Vous pouvez consulter nos agréments{" "}
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] hover:underline">ici</a>.
              </p>
            </div>
          </section>

        </div>
        <SocialMedia />
      </main>
    </>
  );
}
