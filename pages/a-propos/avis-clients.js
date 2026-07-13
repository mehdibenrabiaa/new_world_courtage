import Head from "next/head";
import { libreCaslon } from "@/lib/fonts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TrustPilot from "../../components/TrustPilot";

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
          <BreadcrumbLink href="/a-propos/">À propos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Avis clients</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function Hero() {
  return (
    <div className={cx}>
      <div className="bg-[var(--color-brand)] px-10 pt-20 lg:pt-[140px] pb-8 flex items-end">
        <h1 className="text-[24px] lg:text-[30px] font-semibold leading-none text-white">
          Avis clients
        </h1>
      </div>
    </div>
  );
}

function FeaturedReview() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] font-semibold text-[var(--color-text)]">Catherine D.</p>
          <p className="text-[14px] text-gray-400">
            Cliente depuis 2024 &middot; Lyon, Auvergne-Rhône-Alpes
          </p>
        </div>
        <blockquote className="flex flex-col gap-3">
          <p className="text-[20px] lg:text-[24px] leading-[1.4] text-[var(--color-text)]">
            &ldquo;Je cherchais une assurance habitation depuis plusieurs semaines sans
            trouver d&apos;offre adaptée à mon budget. L&apos;équipe de New World
            Courtage a compris mes besoins dès le premier appel.&rdquo;
          </p>
          <p className="text-[16px] text-gray-500 leading-relaxed">
            En moins de 48 heures, ils m&apos;ont présenté trois offres comparées,
            clairement expliquées, avec les avantages et les limites de chacune.
            J&apos;ai pu poser toutes mes questions sans me sentir pressée. Le
            conseiller a été patient, professionnel et vraiment à l&apos;écoute.
            J&apos;ai finalement souscrit une formule qui me protège bien mieux que
            mon ancienne assurance, pour 20&nbsp;% moins cher. Je recommande sans
            hésitation à toute personne qui souhaite gagner du temps et faire de
            vraies économies.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

const EXPERTS = [
  {
    id: 1,
    source: "Le Monde",
    quote: (
      <>
        &ldquo;New World Courtage se distingue par{" "}
        <strong>la transparence de ses comparatifs</strong> et la qualité de
        l&apos;accompagnement proposé à chaque assuré.&rdquo;
      </>
    ),
    href: "#",
  },
  {
    id: 2,
    source: "Capital",
    quote: (
      <>
        &ldquo;Un courtier qui{" "}
        <strong>simplifie vraiment le marché de l&apos;assurance</strong> en
        France, avec des conseils personnalisés et des tarifs négociés.&rdquo;
      </>
    ),
    href: "#",
  },
  {
    id: 3,
    source: "BFM Business",
    quote: (
      <>
        &ldquo;Là où les comparateurs s&apos;arrêtent,{" "}
        <strong>New World Courtage prend le relais</strong> pour trouver
        l&apos;offre la plus adaptée à chaque profil.&rdquo;
      </>
    ),
    href: "#",
  },
  {
    id: 4,
    source: "Les Échos",
    quote: (
      <>
        &ldquo;Le modèle du courtage indépendant{" "}
        <strong>génère en moyenne 20 à 30&nbsp;% d&apos;économies</strong> pour
        les particuliers qui font appel à ces experts.&rdquo;
      </>
    ),
    href: "#",
  },
];

function ExpertCard({ source, quote, href }) {
  return (
    <Card className="rounded-none border-t-[6px] border-t-[var(--color-brand)] shadow-sm flex flex-col">
      <CardContent className="p-6 flex flex-col gap-4 h-full">
        <p className="text-base font-bold text-[var(--color-text)]">{source}</p>
        <p className="text-base text-gray-700 leading-[26px] sm:leading-6 flex-1">{quote}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-[var(--color-brand)] underline hover:text-[var(--color-brand-hover)] w-fit"
        >
          Lire l&apos;article
        </a>
      </CardContent>
    </Card>
  );
}

function ExpertsSection() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-5 max-w-4xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              Ce que disent les <em className={`italic ${libreCaslon.className}`}>experts.</em>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Des médias et spécialistes indépendants qui parlent de nous.
            </p>
          </div>
          <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
            {EXPERTS.map((e) => (
              <ExpertCard key={e.id} {...e} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AvisClientsPage() {
  return (
    <>
      <Head>
        <title>Avis clients — New World Courtage</title>
        <meta
          name="description"
          content="Découvrez les avis de nos clients sur New World Courtage. Plus de 247 avis vérifiés et une note Excellent sur Trustpilot."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/a-propos/avis-clients/" />
      </Head>

      <main>
        <PageBreadcrumb />
        <Hero />
        <FeaturedReview />
        <TrustPilot className={cx} />
        <ExpertsSection />
      </main>
    </>
  );
}
