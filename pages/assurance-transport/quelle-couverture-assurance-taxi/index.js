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

export default function QuelleCouverturePage() {
  return (
    <>
      <Head>
        <title>De quelle couverture ai-je besoin pour mon taxi ? — New World Courtage</title>
        <meta
          name="description"
          content="Garanties obligatoires, recommandées et optionnelles pour votre assurance taxi : comment choisir la couverture adaptée à votre véhicule et à votre activité."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/quelle-couverture-assurance-taxi/" />
      </Head>

      <main className="bg-white">
        <PageBreadcrumb />

        <ArticleHero
          category="Assurance taxi"
          categoryHref="/assurance-transport/taxi/"
          title="De quelle couverture ai-je besoin ?"
          intro="Choisir la bonne couverture dépend de la valeur de votre véhicule, de votre historique de sinistres et du niveau de risque lié à votre activité de chauffeur de taxi."
          author={{ name: "Loubna Moucharref", avatar: "/loubna_moucharref_profile.jpeg" }}
          updatedDate="22 juillet 2026"
          readingTime="4 minutes"
          expertReviewed={false}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 flex flex-col gap-10">

          <ArticleSection title="1. La garantie obligatoire : la responsabilité civile">
            <p>
              Comme tout véhicule en circulation, votre taxi doit être couvert au minimum par une responsabilité civile professionnelle. Elle prend en charge les dommages que vous pourriez causer à des tiers — passagers, autres usagers de la route, piétons — dans le cadre de votre activité de transport rémunéré de personnes.
            </p>
          </ArticleSection>

          <ArticleSection title="2. Les garanties recommandées">
            <p>
              Au-delà du minimum légal, la plupart des chauffeurs de taxi optent pour des garanties complémentaires adaptées à l&apos;usage intensif de leur véhicule :
            </p>
          </ArticleSection>

          <AccentCardGrid
            cols={1}
            items={[
              {
                heading: "Garanties complémentaires",
                body: (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5">
                    <li>Dommages tous accidents (avec ou sans tiers responsable)</li>
                    <li>Vol et incendie</li>
                    <li>Bris de glace, très fréquent sur un véhicule qui roule beaucoup</li>
                    <li>Protection du conducteur (en cas de blessure au volant)</li>
                  </ul>
                ),
              },
            ]}
          />

          <ArticleSection title="3. Les options à envisager selon votre activité">
            <p>
              Certaines garanties optionnelles prennent tout leur sens pour un usage professionnel intensif : la perte de recettes en cas d&apos;immobilisation du véhicule, l&apos;assistance dépannage 0 km, ou encore la protection juridique en cas de litige avec un client ou un tiers.
            </p>
          </ArticleSection>

          <ArticleSection title="4. Ce qui fait varier le niveau de couverture nécessaire">
            <p>
              Trois facteurs principaux déterminent la couverture la plus adaptée à votre situation : la valeur de votre véhicule (un véhicule récent ou haut de gamme justifie une couverture tous risques), votre historique de sinistres (un bon historique permet souvent de négocier de meilleures conditions), et votre zone d&apos;activité (une activité en zone urbaine dense expose à davantage de risques de sinistre matériel).
            </p>
          </ArticleSection>

          <p className="text-[15px] text-gray-600 leading-relaxed">
            Besoin d&apos;aide pour évaluer la couverture qui vous convient ?{" "}
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
