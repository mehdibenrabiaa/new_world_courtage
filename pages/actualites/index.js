import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import InfoCardsSection from "@/components/InfoCardsSection";
import { fetchGuideCardsByCategory } from "@/lib/api";

export async function getServerSideProps() {
  try {
    const guides = await fetchGuideCardsByCategory("Actualités");
    return { props: { guides } };
  } catch {
    return { props: { guides: [] } };
  }
}

export default function ActualitesPage({ guides }) {
  const items = guides.map((g) => ({
    image: g.image_url,
    imageAlt: g.title,
    title: g.title,
    description: g.intro || "",
    href: `/actualites/${g.slug}/`,
  }));

  return (
    <>
      <Head>
        <title>Actualités — New World Courtage</title>
        <meta
          name="description"
          content="Les actualités de New World Courtage : vie de l'entreprise, évolutions réglementaires et conseils pour mieux vous assurer."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/actualites/" />
      </Head>

      <main>
        <PhotoHero
          tone="neutral"
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
          title={<>Nos <em>actualités</em>.</>}
          subtitle="Vie de l'entreprise, évolutions réglementaires et conseils pour mieux vous assurer."
          image="/sections/who-we-are.webp"
        />

        <InfoCardsSection
          items={items}
          cardStyle="style2"
          showLink
          cols={3}
        />
      </main>
    </>
  );
}
