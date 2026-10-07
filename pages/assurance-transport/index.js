import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import InfoCardsSection from "@/components/InfoCardsSection";
import ReadyCta from "@/components/ReadyCta";
const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const TRANSPORT_CARDS = [
  {
    image: "/cards/taxi.webp",
    imageAlt: "Assurance taxi",
    title: "Assurance taxi",
    description: "Une couverture complète pour les artisans taxi, négociée avec les meilleurs assureurs du marché.",
    href: "/assurance-transport/taxi/",
  },
  {
    image: "/cards/vtc.webp",
    imageAlt: "Assurance chauffeur VTC",
    title: "Assurance chauffeur VTC",
    description: "Une couverture pensée pour les chauffeurs VTC, du véhicule à la responsabilité civile professionnelle.",
    href: "/assurance-transport/chauffeur-vtc/",
  },
];


export default function AssuranceTransportPage() {
  return (
    <>
      <Head>
        <title>Assurance Taxi & VTC — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance taxi et chauffeur VTC. Obtenez un devis gratuit en quelques minutes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Taxi & VTC" }]}
          title={<>L&apos;assurance <em>taxi &amp; VTC</em>.</>}
          image="/heroes/taxi-desktop.webp"
          mobileImage="/heroes/taxi-mobile.webp"
          imageAlt="Assurance taxi et VTC New World Courtage"
        />

        <InfoCardsSection
          title="Assurance"
          titleItalic="transport."
          subtitle="Artisans taxi et chauffeurs VTC — une couverture adaptée au transport de personnes."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={2}
          maxWidth="56rem"
          items={TRANSPORT_CARDS}
        />

        <ReadyCta />
      </main>
    </>
  );
}
