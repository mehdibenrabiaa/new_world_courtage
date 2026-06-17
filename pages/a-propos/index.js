import Head from "next/head";
import Link from "next/link";
import { Libre_Caslon_Text } from "next/font/google";
import { Handshake, Newspaper, Settings, Phone } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SocialMedia from "../../components/SocialMedia";
import Footer from "../../components/Footer";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

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

function Hero() {
  return (
    <div className="w-full py-4 px-4 lg:px-12 2xl:px-24">
      <div className="flex overflow-hidden rounded-[20px]">

        {/* Left — brand bg + title */}
        <div className="flex-1 bg-[var(--color-brand)] px-10 pt-20 lg:pt-[140px] pb-20 flex items-end">
          <h1 className="text-[26px] lg:text-[33px] font-semibold leading-none text-white">
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

function ContentBlock({ heading, children }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className={`text-[22px] leading-snug text-[#131212] ${libreCaslon.className}`}>
        {heading}
      </h3>
      <p className="text-base font-normal leading-[26px] sm:leading-6 text-gray-700 text-left">
        {children}
      </p>
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
    <div className="px-4 lg:px-12 2xl:px-24 relative z-10 -mt-12 pb-6">
      <div className="max-w-5xl mx-auto border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-white">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-5 px-3 hover:bg-gray-50 transition-colors duration-150"
          >
            <span className="text-base font-semibold text-[#131212] text-center leading-tight">{label}</span>
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
        <div className={`${cx} py-8 pb-16`}>
          <div className="max-w-3xl lg:max-w-4xl 2xl:max-w-5xl mx-auto px-3 sm:px-0 flex flex-col gap-12">

            {/* Intro paragraphs */}
            <div className="text-base font-normal leading-[26px] sm:leading-6 text-gray-700 text-left flex flex-col gap-4">
              <p>New World Courtage réinvente l&apos;expérience de l&apos;assurance en proposant une plateforme unique et intégrée. Désormais, les consommateurs peuvent comparer les offres des plus grands assureurs, bénéficier de conseils d&apos;experts impartiaux, souscrire à leurs polices et gérer l&apos;ensemble de leur portefeuille en toute simplicité.</p>
              <p>Grâce à notre technologie propriétaire connectée aux leaders du marché (assurance vie, invalidité, habitation et auto), nous offrons un parcours numérique fluide et performant, tant pour les assurés que pour les compagnies d&apos;assurance.</p>
              <p>Depuis 2014, nos guides, nos outils digitaux et nos spécialistes ont accompagné des millions de personnes dans leurs démarches, totalisant plus de 200 milliards de dollars de capitaux assurés. En 2023, Policygenius a été acquis par Zinnia, un acteur majeur des technologies et services numériques appliqués à l&apos;assurance.</p>
            </div>

            {/* Ce qui nous distingue */}
            <div className="flex flex-col gap-12">
              <Separator />
              <h2 className={`text-[33px] leading-tight text-[#131212] ${libreCaslon.className}`}>
                Ce qui nous distingue
              </h2>
              <ContentBlock heading="Comparer les offres, simplement">
                No need to fill out forms on a dozen different sites — with Policygenius&apos; modern tools, you can compare quotes from multiple leading insurance companies side by side in minutes. Already have coverage? We can help you re-shop your policy to look for a lower rate.
              </ContentBlock>
              <ContentBlock heading="Comparison shopping made easy">
                No need to fill out forms on a dozen different sites — with Policygenius&apos; modern tools, you can compare quotes from multiple leading insurance companies side by side in minutes. Already have coverage? We can help you re-shop your policy to look for a lower rate.
              </ContentBlock>
              <ContentBlock heading="Des conseils qui vous placent en priorité">
                Avec des centaines de conseillers en assurance agréés disponibles et des milliers d&apos;articles vérifiés sur notre site, nous avons des réponses à toutes vos questions, que vous souhaitiez parler à quelqu&apos;un en direct ou effectuer vos recherches de manière autonome.
              </ContentBlock>
              <ContentBlock heading="Des standards éditoriaux rigoureux">
                Nos articles sont rédigés et édités par une équipe éditoriale de premier plan, puis soigneusement vérifiés par des conseillers en assurance agréés et des planificateurs financiers certifiés. Découvrez nos standards éditoriaux, notamment notre processus de rédaction, nos responsables et nos experts examinateurs.
              </ContentBlock>
            </div>

            {/* Comment nous gagnons notre argent */}
            <div className="flex flex-col gap-4">
              <Separator />
              <h2 className={`text-[33px] leading-tight text-[#131212] ${libreCaslon.className}`}>
                Comment nous gagnons notre argent
              </h2>
              <p className="text-base font-normal leading-[26px] sm:leading-6 text-gray-700 text-left">
                Nous sommes un courtier en assurance indépendant : nous percevons une commission de la part des compagnies d&apos;assurance pour chaque vente réalisée. Ces commissions sont déjà intégrées dans le prix des polices d&apos;assurance, de sorte que vous ne payez rien de plus en passant par nous. Notre rémunération peut varier selon plusieurs facteurs — type et montant du produit, assureur concerné ou volume d&apos;affaires — mais nous ne favorisons jamais un assureur au détriment d&apos;un autre en raison de la commission. Notre mission, c&apos;est de défendre vos intérêts, pas les nôtres.
              </p>
            </div>

            {/* Blue info boxes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-[var(--color-light)] border-0 shadow-none rounded-xl">
                <CardContent className="p-8 flex flex-col gap-4">
                  <h3 className="text-[20px] font-semibold text-[#131212] leading-snug">
                    Est-il moins cher de souscrire une assurance via New World Courtage ?
                  </h3>
                  <p className="text-base text-[#131212] leading-[26px] sm:leading-6">
                    Les tarifs d&apos;assurance sont réglementés par la loi, ce qui signifie qu&apos;aucune société, courtier ou agent ne peut vous proposer de remise sur une police. Vous pouvez tout de même faire des économies ! Chaque assureur évalue le risque différemment et s&apos;efforce de proposer des tarifs compétitifs. C&apos;est pourquoi New World Courtage vous permet de comparer les devis de plusieurs compagnies en un seul endroit : pour vous aider à trouver facilement les meilleures offres adaptées à vos besoins.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[var(--color-light)] border-0 shadow-none rounded-xl">
                <CardContent className="p-8 flex flex-col gap-4">
                  <h3 className="text-[20px] font-semibold text-[#131212] leading-snug">
                    New World Courtage est-il affilié à une compagnie d&apos;assurance ?
                  </h3>
                  <p className="text-base text-[#131212] leading-[26px] sm:leading-6">
                    Non. Nous sommes un cabinet de courtage indépendant, ce qui signifie que nous ne sommes pas détenus par une compagnie d&apos;assurance et que nous n&apos;en possédons pas non plus. Nous commercialisons des polices auprès de plusieurs assureurs, sans parti pris ni favoritisme envers aucun d&apos;eux. Il est essentiel pour nous de vous aider à trouver la police la plus adaptée à vos besoins, quelle que soit la compagnie auprès de laquelle vous la souscrivez.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Nos agréments */}
            <div className="flex flex-col gap-4">
              <Separator />
              <h2 className={`text-[33px] leading-tight text-[#131212] ${libreCaslon.className}`}>
                Nos agréments
              </h2>
              <p className="text-base font-normal leading-[26px] sm:leading-6 text-gray-700">
                Tout intermédiaire en assurance est tenu par la loi d&apos;être immatriculé auprès de l&apos;ORIAS dans chaque territoire où il exerce son activité. Vous pouvez consulter nos agréments{" "}
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] underline hover:text-[var(--color-brand-hover)] transition-colors">ici</a>.
              </p>
            </div>

          </div>
        </div>
        <SocialMedia />
      </main>

      <Footer />
    </>
  );
}
