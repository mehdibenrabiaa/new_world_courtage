import Head from "next/head";
import SectionTabs from "@/components/SectionTabs";
import PhotoHero from "@/components/PhotoHero";
import InfoCardsSection from "@/components/InfoCardsSection";
import ReadyCta from "@/components/ReadyCta";
const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const AUTO_MOTO_CARDS = [
  {
    image: "/pages/driving-car.jpg",
    imageAlt: "Assurance auto",
    title: "Assurance auto",
    description: "Comparez les offres pour votre voiture et trouvez la bonne couverture au meilleur prix.",
    href: "/assurance-auto/devis/",
  },
  {
    image: "/cards/moto.webp",
    imageAlt: "Assurance moto",
    title: "Assurance moto",
    description: "Moto ou scooter : une assurance adaptée à votre deux-roues et à votre façon de rouler.",
    href: "/assurance-moto/",
  },
  {
    image: "/pages/risques-aggraves.webp",
    imageAlt: "Assurance risques aggravés",
    title: "Assurance risques aggravés",
    description: "Malussé, résilié ou après une suspension de permis : une solution pour assurer votre voiture ou votre moto.",
    href: "/assurance-risques-aggraves/",
  },
];

const TAXI_VTC_CARDS = [
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

const PRO_AUTO_CARDS = [
  {
    image: "/pages/garagist.webp",
    imageAlt: "Assurance garagiste",
    title: "Assurance garagiste",
    description: "Une couverture adaptée aux garagistes : véhicules confiés, outillage et responsabilité professionnelle.",
    href: "/assurance-pro-auto/garagiste/",
  },
  {
    image: "/heroes/garage-convoyeur-desktop.webp",
    imageAlt: "Assurance convoyage",
    title: "Assurance convoyage",
    description: "Convoyez les véhicules de vos clients en toute sérénité, du départ à la livraison.",
    href: "/assurance-pro-auto/garagiste/?activite=convoyage",
  },
  {
    image: "/heroes/negociant-automobile-desktop.webp",
    imageAlt: "Assurance négociant automobile",
    title: "Assurance négociant automobile",
    description: "Protégez votre stock de véhicules et vos locaux d'achat-revente.",
    href: "/assurance-pro-auto/garagiste/?activite=negociant",
  },
];

const SECTIONS = [
  { id: "auto-moto", label: "Auto & Moto" },
  { id: "taxi-vtc", label: "Taxi & VTC" },
  { id: "pro-automobile", label: "Pro de l'automobile" },
];

export default function NosAssurancesPage() {
  return (
    <>
      <Head>
        <title>Nos Assurances — New World Courtage</title>
        <meta
          name="description"
          content="Découvrez nos assurances : auto, moto, taxi, VTC, garagiste, convoyage et négociant automobile. Devis gratuit en quelques minutes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/nos-assurances/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Nos assurances" }]}
          title={<>Nos <em>assurances</em>.</>}
          image="/heroes/nos-assurances-desktop.webp"
          mobileImage="/heroes/nos-assurances-mobile.webp"
          imageAlt="Assurance professionnelle New World Courtage"
        />

        <SectionTabs items={SECTIONS} ariaLabel="Catégories d'assurance" />

        <InfoCardsSection
          id="auto-moto"
          title="Auto &"
          titleItalic="moto"
          subtitle="Voiture, moto ou scooter — comparez les offres et assurez votre véhicule au meilleur prix."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={3}
          items={AUTO_MOTO_CARDS}
        />

        <InfoCardsSection
          id="taxi-vtc"
          title="Taxi &"
          titleItalic="VTC"
          subtitle="Artisans taxi et chauffeurs VTC — une couverture adaptée au transport de personnes."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={3}
          items={TAXI_VTC_CARDS}
        />

        <InfoCardsSection
          id="pro-automobile"
          title="Pro de"
          titleItalic="l'automobile"
          subtitle="Garagistes, convoyeurs, négociants — des garanties pensées pour les métiers de l'automobile."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={3}
          items={PRO_AUTO_CARDS}
        />

        <ReadyCta />
      </main>
    </>
  );
}
