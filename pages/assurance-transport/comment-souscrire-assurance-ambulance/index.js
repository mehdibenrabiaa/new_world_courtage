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

export default function CommentSouscrireAmbulancePage() {
  return (
    <>
      <Head>
        <title>Comment souscrire une assurance ambulance ? — New World Courtage</title>
        <meta
          name="description"
          content="Les étapes pour souscrire une assurance ambulance ou transport sanitaire : documents nécessaires, comparaison des offres, choix des garanties et signature du contrat."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/comment-souscrire-assurance-ambulance/" />
      </Head>

      <main className="bg-white">
        <PageBreadcrumb />

        <ArticleHero
          category="Assurance ambulance"
          categoryHref="/assurance-transport/ambulance/"
          title="Comment souscrire une assurance ambulance ?"
          intro="Vous pouvez souscrire directement auprès d'un assureur, via un agent local, ou en passant par un courtier spécialisé comme New World Courtage pour comparer les offres du marché sans démarches répétées."
          author={{ name: "Loubna Moucharref", avatar: "/loubna_moucharref_profile.jpeg" }}
          updatedDate="22 juillet 2026"
          readingTime="4 minutes"
          expertReviewed={false}
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
                    <li>Numéro SIREN de votre entreprise</li>
                    <li>Agrément préfectoral de transport sanitaire (ou récépissé de déclaration pour un VSL)</li>
                    <li>Carte grise du ou des véhicules à assurer</li>
                    <li>Permis de conduire du ou des conducteurs</li>
                    <li>Relevé d&apos;information de votre assureur précédent, si vous étiez déjà assuré</li>
                  </ul>
                ),
              },
            ]}
          />

          <ArticleSection title="2. Comparez les offres du marché">
            <p>
              Passer par un courtier spécialisé dans le transport sanitaire vous permet de comparer plusieurs compagnies en une seule demande, sans avoir à répéter vos démarches auprès de chaque assureur — et sans frais supplémentaire, puisque notre rémunération est déjà intégrée au tarif de la police.
            </p>
          </ArticleSection>

          <ArticleSection title="3. Choisissez vos garanties">
            <p>
              L&apos;assurance ambulance comporte des garanties spécifiques à l&apos;activité de transport sanitaire : responsabilité civile professionnelle, couverture du véhicule, assurance des locaux et du matériel médical embarqué, et protection des patients transportés. Votre conseiller vous aide à ajuster ces garanties selon votre activité (ambulance, VSL) et votre structure, mono-véhicule ou flotte.
            </p>
          </ArticleSection>

          <ArticleSection title="4. Signez votre contrat">
            <p>
              Une fois l&apos;offre choisie, la souscription se fait généralement sous 24 à 48h : signature électronique du contrat, mise en place du prélèvement, et remise de votre attestation d&apos;assurance — indispensable pour exercer votre activité de transport sanitaire en règle.
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
