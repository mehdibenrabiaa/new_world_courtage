import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import { LogoTile } from "@/components/Partners";
import { libreCaslon } from "@/lib/fonts";
import ReadyCta from "@/components/ReadyCta";
import { PARTNERS } from "@/lib/partners";

const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";


function Intro() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-5 text-center">
        <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
          Plus de <em className={`italic ${libreCaslon.className}`}>100 compagnies</em> partenaires.
        </h2>
        <p className="text-[15px] text-gray-600 leading-relaxed">
          En tant que courtier indépendant, nous travaillons avec un large réseau d&apos;assureurs
          français et internationaux. Cela nous permet de comparer objectivement leurs offres et
          de vous orienter vers celle qui correspond le mieux à votre profil, sans jamais favoriser
          un assureur au détriment d&apos;un autre.
        </p>
      </div>
    </section>
  );
}

function PartnerGrid() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {PARTNERS.map(({ id, name, src }) => (
              <LogoTile key={id} name={name} src={src} className="h-24 lg:h-28" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowWeChoose() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <h2 className={`text-[24px] lg:text-[28px] leading-[1.15] text-[var(--color-text)] ${libreCaslon.className}`}>Comment nous <em className={`italic ${libreCaslon.className}`}>choisissons</em> nos partenaires</h2>
        <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">
          <p>
            Chaque assureur partenaire est sélectionné pour la solidité de ses garanties, la
            qualité de sa gestion des sinistres et sa compétitivité tarifaire. Nous évaluons
            régulièrement ces critères afin de vous garantir un accès aux meilleures offres du
            marché.
          </p>
          <p>
            Notre rémunération provient des commissions versées par les assureurs, déjà incluses
            dans le prix des polices : vous ne payez donc jamais de frais supplémentaires en
            passant par New World Courtage.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function NosPartenairesPage() {
  return (
    <>
      <Head>
        <title>Nos partenaires — New World Courtage</title>
        <meta
          name="description"
          content="Découvrez le réseau de plus de 100 compagnies d'assurance partenaires de New World Courtage, courtier indépendant en assurance."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/a-propos/nos-partenaires/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos", href: "/a-propos/" }, { label: "Nos partenaires" }]}
          image="/sections/who-we-are.webp"
          title={<>Nos <em>partenaires</em>.</>}
          subtitle="Un large réseau d'assureurs français et internationaux, comparés en toute indépendance pour vous."
        />
        <Intro />
        <PartnerGrid />
        <HowWeChoose />
        <ReadyCta />
      </main>
    </>
  );
}
