import Head from "next/head";
import { libreCaslon } from "@/lib/fonts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ReadyCta from "@/components/ReadyCta";
import { PARTNERS } from "@/lib/partners";

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
          <BreadcrumbPage>Nos partenaires</BreadcrumbPage>
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
          Nos partenaires
        </h1>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-5 text-center">
        <h2 className={`text-[8vw] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
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

function PartnerCard({ name, src }) {
  return (
    <div className="flex items-center justify-center h-24 lg:h-28 rounded-xl border border-gray-100 bg-white px-6 hover:border-gray-300 transition-colors duration-150">
      <img src={src} alt={name} loading="lazy" className="h-9 lg:h-11 w-auto object-contain max-w-[140px]" />
    </div>
  );
}

function PartnerGrid() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {PARTNERS.map(({ id, name, src }) => (
              <PartnerCard key={id} name={name} src={src} />
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
        <h2 className="text-xl font-bold text-[#131212]">Comment nous choisissons nos partenaires</h2>
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
        <PageBreadcrumb />
        <Hero />
        <Intro />
        <PartnerGrid />
        <HowWeChoose />
        <ReadyCta />
      </main>
    </>
  );
}
