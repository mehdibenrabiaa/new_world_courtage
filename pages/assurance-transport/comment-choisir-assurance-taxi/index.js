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
          <BreadcrumbPage>Comment choisir</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function CommentChoisirPage() {
  return (
    <>
      <Head>
        <title>Comment choisir son assurance taxi ? — New World Courtage</title>
        <meta
          name="description"
          content="Garanties, franchise, exclusions, tarif : les critères à comparer pour choisir le contrat d'assurance taxi le plus adapté à votre activité."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/comment-choisir-assurance-taxi/" />
      </Head>

      <main className="bg-white">
        <PageBreadcrumb />

        <ArticleHero
          category="Assurance taxi"
          categoryHref="/assurance-transport/taxi/"
          title="Comment choisir son assurance taxi ?"
          intro="Garanties, franchise, exclusions, tarif — voici les critères à comparer pour choisir le contrat le plus adapté à votre activité, et vous protéger au meilleur prix."
          author={{ name: "Loubna Moucharref", avatar: "/loubna_moucharref_profile.jpeg" }}
          updatedDate="22 juillet 2026"
          readingTime="4 minutes"
          expertReviewed={false}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 flex flex-col gap-10">

          <ArticleSection title="1. Comparez les garanties, pas seulement le prix">
            <p>
              Deux contrats au même tarif peuvent couvrir des risques très différents. Avant de comparer les prix, vérifiez que les garanties essentielles à votre activité — dommages tous accidents, protection du conducteur, couverture des passagers — sont bien incluses, et non proposées en option payante.
            </p>
          </ArticleSection>

          <ArticleSection title="2. Comprenez le rôle de la franchise">
            <p>
              La franchise est la somme qui reste à votre charge en cas de sinistre. Une franchise plus élevée réduit votre cotisation mensuelle, mais augmente votre reste à charge en cas d&apos;accident. Le bon équilibre dépend de votre trésorerie et de votre tolérance au risque — un conseiller peut vous aider à trouver le niveau adapté à votre situation.
            </p>
          </ArticleSection>

          <ArticleSection title="3. Lisez attentivement les exclusions">
            <p>
              Chaque contrat comporte des situations non couvertes. Ces exclusions varient d&apos;un assureur à l&apos;autre et peuvent faire une réelle différence en cas de sinistre.
            </p>
          </ArticleSection>

          <AccentCardGrid
            cols={1}
            items={[
              {
                heading: "Exemples d'exclusions courantes",
                body: (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5">
                    <li>Conduite sous l&apos;emprise d&apos;alcool ou de stupéfiants</li>
                    <li>Usage du véhicule hors de l&apos;activité déclarée</li>
                    <li>Défaut d&apos;entretien du véhicule</li>
                  </ul>
                ),
              },
            ]}
          />

          <ArticleSection title="4. Comparez les tarifs à garanties équivalentes">
            <p>
              Une fois les garanties et exclusions comparées, le prix redevient un critère pertinent. Passer par un courtier comme New World Courtage vous permet de comparer plusieurs offres à garanties équivalentes en une seule demande, et de bénéficier de tarifs négociés auprès des assureurs spécialistes du transport de personnes.
            </p>
          </ArticleSection>

          <p className="text-[15px] text-gray-600 leading-relaxed">
            Vous voulez comparer les offres adaptées à votre situation ?{" "}
            <Link href="/contact/" className="text-[var(--color-brand)] hover:underline">Contactez nos conseillers</Link>{" "}
            ou{" "}
            <Link href="/assurance-transport/taxi/devis/" className="text-[var(--color-brand)] hover:underline">obtenez votre devis gratuit</Link>.
          </p>

        </div>

        <ReadyCta />
      </main>
    </>
  );
}
