import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import { libreCaslon } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TrustPilot from "../../components/TrustPilot";
import { TESTIMONIALS } from "../../components/RealCustomers";

const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";



// A real, published Trustpilot review (same source as the home page reviews),
// linked to its original.
const FEATURED_REVIEW = TESTIMONIALS.find((review) => review.name === "Mehdi EL");

function FeaturedReview() {
  const { title, quote, name, href } = FEATURED_REVIEW;
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] font-semibold text-[var(--color-text)]">{name}</p>
          <p className="text-[14px] text-gray-400">Avis publié sur Trustpilot</p>
        </div>
        <blockquote className="flex flex-col gap-3">
          <p className="text-[20px] lg:text-[24px] leading-[1.4] text-[var(--color-text)]">&ldquo;{title}&rdquo;</p>
          <p className="text-[16px] text-gray-500 leading-relaxed">{quote}</p>
        </blockquote>
        <a href={href} target="_blank" rel="noopener noreferrer" className="w-fit text-[15px] font-bold text-[var(--color-brand)] hover:underline">
          Voir l&apos;avis sur Trustpilot
        </a>
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
        <div className="bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-5 max-w-4xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
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
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos", href: "/a-propos/" }, { label: "Avis clients" }]}
          image="/sections/done-scrolling-desktop.webp"
          mobileImage="/sections/done-scrolling-mobile.webp"
          title={<>Avis <em>clients</em>.</>}
          subtitle="Ce que nos clients disent de leur expérience avec New World Courtage."
        />
        <FeaturedReview />
        <TrustPilot className={cx} />
        <ExpertsSection />
      </main>
    </>
  );
}
