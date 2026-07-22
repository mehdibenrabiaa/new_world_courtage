import Head from "next/head";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHero from "@/components/PageHero";
import InfoCardsSection from "@/components/InfoCardsSection";
import ReadyCta from "@/components/ReadyCta";
const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const TRANSPORT_CARDS = [
  {
    image: "/card_head_taxi.png",
    imageAlt: "Assurance taxi",
    title: "Assurance taxi",
    description: "Une couverture complète pour les artisans taxi, négociée avec les meilleurs assureurs du marché.",
    href: "/assurance-transport/taxi/",
  },
  {
    image: "/card_head_ambulance.png",
    imageAlt: "Assurance ambulance",
    title: "Assurance ambulance",
    description: "Protégez votre activité de transport sanitaire avec une assurance adaptée aux exigences du secteur.",
    href: "/assurance-transport/ambulance/",
  },
  {
    image: "/card_head_vtc.png",
    imageAlt: "Assurance chauffeur VTC",
    title: "Assurance chauffeur VTC",
    description: "Une couverture pensée pour les chauffeurs VTC, du véhicule à la responsabilité civile professionnelle.",
    href: "/assurance-transport/chauffeur-vtc/",
  },
  {
    image: "/card_head_poid_lourd.png",
    imageAlt: "Assurance poids lourd",
    title: "Assurance poids lourd",
    description: "Des garanties sur-mesure pour les professionnels du transport routier et poids lourds.",
    href: "/assurance-transport/poids-lourd/",
  },
];

function PageBreadcrumb() {
  return (
    <Breadcrumb className={`${cx} pt-6 pb-2`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Flotte & Transport</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function AssuranceTransportPage() {
  return (
    <>
      <Head>
        <title>Assurance Flotte & Transport — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance flotte & transport : taxi, ambulance, VTC, poids lourd. Obtenez un devis gratuit en quelques minutes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/" />
      </Head>

      <main>
        <PageBreadcrumb />
        <PageHero
          title="Assurance flotte & transport professionnel"
          image="/assurance-transport-page.png"
          imageAlt="Assurance flotte & transport New World Courtage"
          titleWidth="lg:w-[60%]"
        />

        <InfoCardsSection
          title="Assurance"
          titleItalic="transport."
          subtitle="Taxi, ambulance, VTC, poids lourd — une couverture adaptée à chaque activité de transport professionnel."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={4}
          items={TRANSPORT_CARDS}
        />

        <ReadyCta />
      </main>
    </>
  );
}
