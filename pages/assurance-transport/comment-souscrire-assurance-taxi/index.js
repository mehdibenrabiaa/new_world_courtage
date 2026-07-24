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
          <BreadcrumbPage>Comment souscrire</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function CommentSouscrirePage() {
  return (
    <>
      <Head>
        <title>Comment obtenir un devis d'assurance taxi ? — New World Courtage</title>
        <meta
          name="description"
          content="Les étapes pour souscrire une assurance taxi : documents nécessaires, comparaison des offres, choix des garanties et signature du contrat."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/comment-souscrire-assurance-taxi/" />
      </Head>

      <main className="bg-white">
        <PageBreadcrumb />

        <ArticleHero
          category="Assurance taxi"
          categoryHref="/assurance-transport/taxi/"
          title="Comment obtenir un devis d'assurance taxi ?"
          intro="Souscrire une assurance taxi demande de réunir quelques documents clés et de comparer les offres du marché — voici comment procéder étape par étape."
          author={{ name: "Loubna Moucharref", avatar: "/loubna_moucharref_profile.jpeg" }}
          editor={{ name: "Anna Swartz" }}
          reviewer={{ name: "Fabio Faschi, PLCS, SBCS, CLCS" }}
          updatedDate="22 juillet 2026"
          readingTime="4 minutes"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 flex flex-col gap-10">

          <ArticleSection title="1. Rassemblez les documents nécessaires">
            <p>
              Avant de démarrer vos démarches, préparez les pièces que tout assureur vous demandera pour établir un devis :
            </p>
          </ArticleSection>

          <AccentCardGrid
            cols={1}
            items={[
              {
                heading: "Documents nécessaires",
                body: (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5">
                    <li>Permis de conduire (en cours de validité, catégorie B minimum)</li>
                    <li>Carte grise du véhicule</li>
                    <li>Carte professionnelle de taxi (carte verte) et autorisation de stationnement (ADS)</li>
                    <li>Relevé d&apos;information de votre assureur précédent, si vous étiez déjà assuré</li>
                  </ul>
                ),
              },
            ]}
          />

          <ArticleSection title="2. Comparez les offres du marché">
            <p>
              Vous pouvez souscrire directement auprès d&apos;un assureur, via un agent local, ou en passant par un courtier spécialisé comme New World Courtage. Passer par un courtier vous permet de comparer plusieurs compagnies en une seule demande, sans avoir à répéter vos démarches auprès de chaque assureur — et sans frais supplémentaire, puisque notre rémunération est déjà intégrée au tarif de la police.
            </p>
          </ArticleSection>

          <ArticleSection title="3. Choisissez vos garanties">
            <p>
              L&apos;assurance taxi comporte des garanties spécifiques à l&apos;activité de transport rémunéré de personnes : responsabilité civile professionnelle, dommages tous accidents, protection juridique, assistance dépannage, et couverture des passagers transportés. Votre conseiller vous aide à ajuster ces garanties selon votre véhicule, votre zone d&apos;activité et votre budget.
            </p>
          </ArticleSection>

          <ArticleSection title="4. Signez votre contrat">
            <p>
              Une fois l&apos;offre choisie, la souscription se fait généralement sous 24 à 48h : signature électronique du contrat, mise en place du prélèvement, et remise de votre attestation d&apos;assurance — indispensable pour exercer votre activité de taxi en règle.
            </p>
          </ArticleSection>

          <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">
            <p>Vous cherchez une assurance taxi complète à un tarif compétitif ?</p>
            <p>
              New World Courtage, courtier spécialisé dans l&apos;assurance des professionnels, s&apos;impose comme un acteur de référence dans l&apos;assurance du transport professionnel. Que vous soyez chauffeur de taxi propriétaire ou non de votre véhicule, votre activité de transport de personnes est soumise à une obligation d&apos;assurance professionnelle. New World Courtage connaît vos enjeux et vous accompagne avec des solutions sur-mesure pour exercer votre métier en toute sérénité.
            </p>
            <p>
              Nous accompagnons les artisans taxi depuis plus de 10 ans. Nous vous proposons une couverture complète au meilleur tarif, en négociant pour vous auprès des assureurs spécialistes reconnus du secteur, puis en comparant ensemble les différentes solutions pour vous protéger au mieux, vous et vos passagers.
            </p>
          </div>

          <ArticleSection title="À savoir">
            <p>
              Une simple assurance véhicule professionnel ne suffit pas à couvrir votre activité. L&apos;assurance taxi répond à des exigences spécifiques, adaptées aux risques de votre métier : responsabilité civile professionnelle propre aux artisans taxi, couverture du véhicule, protection du chauffeur et des passagers transportés.
            </p>
            <p>Ces garanties sont incluses dans tous nos contrats de base.</p>
          </ArticleSection>

          <ArticleSection title="Une assurance taxi accessible">
            <p>
              New World Courtage est un acteur reconnu de l&apos;assurance auto pour les taxis en France. Au-delà de la richesse de nos garanties, nous bénéficions de tarifs préférentiels négociés auprès des plus grandes compagnies d&apos;assurance, intégralement répercutés sur nos clients.
            </p>
          </ArticleSection>

          <ArticleSection title="Un devis en ligne en quelques minutes">
            <p>
              Complétez notre formulaire dédié à l&apos;assurance taxi, et l&apos;un de nos conseillers vous transmettra par email une proposition détaillée sous 24h.
            </p>
          </ArticleSection>

          <AccentCardGrid
            title="Vous pouvez opter pour des options supplémentaires"
            cols={1}
            items={[
              {
                heading: "Options disponibles",
                body: (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5">
                    <li>Dégâts occasionnés sur les équipements extérieurs et intérieurs du véhicule</li>
                    <li>Assistance dépannage du taxi</li>
                    <li>Perte de recette</li>
                    <li>Garantie « car-jacking »</li>
                    <li>Frais de stage de récupération de points</li>
                  </ul>
                ),
              },
            ]}
          />

          <p className="text-[15px] text-gray-600 leading-relaxed">
            Vous avez des questions sur votre situation spécifique ?{" "}
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
