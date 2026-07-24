import Head from "next/head";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ArticleHero from "@/components/ArticleHero";
import ArticleSection from "@/components/ArticleSection";
import AccentCardGrid from "@/components/AccentCardGrid";
import ReadyCta from "@/components/ReadyCta";

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
          <span>Articles</span>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Quelle couverture</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function QuelleCouvertureAmbulancePage() {
  return (
    <>
      <Head>
        <title>De quelle couverture ai-je besoin pour mon ambulance ? — New World Courtage</title>
        <meta
          name="description"
          content="Véhicules, locaux, matériel, RC Pro : découvrez les garanties essentielles pour votre activité d'ambulance et de transport sanitaire."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/quelle-couverture-assurance-ambulance/" />
      </Head>

      <main className="bg-white">
        <PageBreadcrumb />

        <ArticleHero
          category="Assurance ambulance"
          categoryHref="/assurance-transport/ambulance/"
          title="De quelle couverture ai-je besoin pour mon ambulance ?"
          intro="New World Courtage est spécialisé dans l'assurance ambulance et le transport sanitaire au sens large (VSL, transport sanitaire assis...) — un développement naturel de notre offre assurance transport professionnel, avec des contrats complets offrant le maximum de garanties."
          author={{ name: "Loubna Moucharref", avatar: "/loubna_moucharref_profile.jpeg" }}
          updatedDate="22 juillet 2026"
          readingTime="4 minutes"
          expertReviewed={false}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 flex flex-col gap-10">

          <ArticleSection title="Un acteur majeur de l'assurance transport sanitaire">
            <p>
              New World Courtage est un acteur reconnu de l&apos;assurance transport sanitaire en France. Nous assurons aussi bien vos véhicules que vos locaux et votre matériel, avec des contrats pensés spécifiquement pour les professionnels du secteur.
            </p>
          </ArticleSection>

          <AccentCardGrid
            cols={1}
            items={[
              {
                heading: "Des produits sur-mesure pour les professionnels du transport sanitaire",
                body: (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5">
                    <li>Assurance ambulance tous risques (mono véhicule et flotte)</li>
                    <li>Assurance des locaux</li>
                    <li>Assurance de vos équipements</li>
                    <li>Responsabilité civile professionnelle</li>
                  </ul>
                ),
              },
            ]}
          />

          <ArticleSection title="RC Pro pour les sociétés de transport sanitaire">
            <p>
              Vous êtes un professionnel du transport sanitaire, une société d&apos;ambulance ? New World Courtage propose un contrat de responsabilité civile professionnelle complet, qui vous couvre contre l&apos;ensemble des dommages matériels et immatériels que vous pourriez occasionner dans le cadre de votre activité.
            </p>
          </ArticleSection>

          <ArticleSection title="RC Pro pour les stagiaires ambulanciers">
            <p>
              En tant que stagiaire ambulancier, vous êtes tenu de disposer d&apos;une assurance responsabilité civile professionnelle qui vous couvrira contre les dommages matériels et immatériels dont vous pourriez être responsable durant votre formation.
            </p>
          </ArticleSection>

          <ArticleSection title="Des options pour renforcer votre couverture">
            <p>
              Vous pouvez compléter votre contrat avec des options adaptées à votre activité, comme l&apos;assurance de vos équipements et aménagements professionnels.
            </p>
          </ArticleSection>

          <ArticleSection title="Une solution pour chaque profil">
            <p>
              Mono-contrat pour un véhicule unique ou contrat flotte pour plusieurs véhicules : nous adaptons votre couverture à la taille de votre structure, qu&apos;il s&apos;agisse d&apos;un artisan ambulancier ou d&apos;une société avec plusieurs véhicules.
            </p>
          </ArticleSection>

          <p className="text-[15px] text-gray-600 leading-relaxed">
            Besoin d&apos;un renseignement ?{" "}
            <Link href="/contact/" className="text-[var(--color-brand)] hover:underline">Contactez un conseiller</Link>{" "}
            au{" "}
            <a href="tel:+33745891865" className="text-[var(--color-brand)] hover:underline">07 45 89 18 65</a>
            {" "}ou{" "}
            <Link href="/assurance-transport/devis/" className="text-[var(--color-brand)] hover:underline">obtenez votre devis gratuit</Link>.
          </p>

        </div>

        <ReadyCta />
      </main>
    </>
  );
}
