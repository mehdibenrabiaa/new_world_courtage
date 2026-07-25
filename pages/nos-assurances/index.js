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
    image: "/cards/taxi.webp",
    imageAlt: "Assurance taxi",
    title: "Assurance taxi",
    description: "Une couverture complète pour les artisans taxi, négociée avec les meilleurs assureurs du marché.",
    href: "/assurance-transport/taxi/",
  },
  {
    image: "/cards/ambulance.webp",
    imageAlt: "Assurance ambulance",
    title: "Assurance ambulance",
    description: "Protégez votre activité de transport sanitaire avec une assurance adaptée aux exigences du secteur.",
    href: "/assurance-transport/ambulance/",
  },
  {
    image: "/cards/vtc.webp",
    imageAlt: "Assurance chauffeur VTC",
    title: "Assurance chauffeur VTC",
    description: "Une couverture pensée pour les chauffeurs VTC, du véhicule à la responsabilité civile professionnelle.",
    href: "/assurance-transport/chauffeur-vtc/",
  },
  {
    image: "/cards/heavy-truck.webp",
    imageAlt: "Assurance poids lourd",
    title: "Assurance poids lourd",
    description: "Des garanties sur-mesure pour les professionnels du transport routier et poids lourds.",
    href: "/assurance-transport/poids-lourd/",
  },
];

const PRO_AUTO_CARDS = [
  {
    image: "/garagist.webp",
    imageAlt: "Assurance garagiste",
    title: "Assurance garagiste",
    description: "Une couverture adaptée aux garagistes : véhicules confiés, outillage et responsabilité professionnelle.",
    href: "/assurance-pro-auto/garagiste/",
  },
  {
    image: "/cards/body-shop.webp",
    imageAlt: "Assurance carrossier",
    title: "Assurance carrossier",
    description: "Protégez votre activité de carrosserie contre les risques liés aux véhicules confiés et à l'atelier.",
    href: "/assurance-pro-auto/carrossier/",
  },
  {
    image: "/cards/driving-school.webp",
    imageAlt: "Assurance auto-école",
    title: "Assurance auto-école",
    description: "Une assurance pensée pour les auto-écoles : véhicules-écoles, moniteurs et élèves conducteurs.",
    href: "/assurance-pro-auto/auto-ecole/",
  },
  {
    image: "/cards/car-dealership.webp",
    imageAlt: "Assurance concessionnaire",
    title: "Assurance concessionnaire",
    description: "Des garanties sur-mesure pour les concessionnaires automobiles et leur parc de véhicules.",
    href: "/assurance-pro-auto/concessionnaire/",
  },
];

const CONSTRUCTION_CARDS = [
  {
    image: "/cards/construction-site.webp",
    imageAlt: "Tous risques chantier",
    title: "Tous risques chantier",
    description: "Couvrez les dommages matériels survenant sur votre chantier, du premier coup de pelle à la livraison.",
    href: "/assurance-construction/tous-risques-chantier/",
  },
  {
    image: "/cards/civil-liability.webp",
    imageAlt: "RC et décennale",
    title: "RC et décennale",
    description: "Une protection obligatoire pour les professionnels du bâtiment, contre les dommages engageant votre responsabilité.",
    href: "/assurance-construction/rc-decennale/",
  },
  {
    image: "/cards/damage-works.webp",
    imageAlt: "Dommages ouvrage",
    title: "Dommages ouvrage",
    description: "Anticipez la réparation rapide des désordres, sans attendre qu'une responsabilité soit établie.",
    href: "/assurance-construction/dommages-ouvrage/",
  },
  {
    image: "/cards/construction-equipment.webp",
    imageAlt: "Assurance engins de chantier",
    title: "Assurance engins de chantier",
    description: "Protégez vos engins et machines de chantier contre le vol, le vandalisme et les dommages.",
    href: "/assurance-construction/engins-chantier/",
  },
];

const IMMOBILIER_CARDS = [
  {
    image: "/cards/co-ownership.webp",
    imageAlt: "Assurance copropriété",
    title: "Assurance copropriété",
    description: "Une couverture complète pour les parties communes et la responsabilité civile de la copropriété.",
    href: "/assurance-immobilier/copropriete/",
  },
  {
    image: "/cards/building-landlord.webp",
    imageAlt: "Assurance immeuble",
    title: "Assurance immeuble",
    description: "Protégez votre patrimoine immobilier locatif contre les sinistres et pertes de loyers.",
    href: "/assurance-immobilier/immeuble/",
  },
  {
    image: "/cards/unpaid-rent.webp",
    imageAlt: "Assurance loyers impayés",
    title: "Assurance loyers impayés",
    description: "Sécurisez vos revenus locatifs en cas de défaut de paiement de vos locataires.",
    href: "/assurance-immobilier/loyers-impayes/",
  },
  {
    image: "/cards/property-manager.webp",
    imageAlt: "Assurance syndic",
    title: "Assurance syndic",
    description: "Une couverture dédiée à la responsabilité civile professionnelle des syndics de copropriété.",
    href: "/assurance-immobilier/syndic/",
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
          <BreadcrumbPage>Nos assurances</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function NosAssurancesPage() {
  return (
    <>
      <Head>
        <title>Nos Assurances — New World Courtage</title>
        <meta
          name="description"
          content="Découvrez toutes nos assurances professionnelles : flotte & transport, pro de l'auto, construction et immobilier. Devis gratuit en quelques minutes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/nos-assurances/" />
      </Head>

      <main>
        <PageBreadcrumb />
        <PageHero
          title="Nos domaines d'assurance professionnelle"
          image="/heroes/nos-assurances-desktop.webp"
          mobileImage="/heroes/nos-assurances-mobile.webp"
          imageAlt="Assurance professionnelle New World Courtage"
          titleWidth="lg:w-[60%]"
          titleClassName="!text-[29px] sm:!text-[36px] lg:!text-[48px]"
        />

        <InfoCardsSection
          title="Assurance"
          titleItalic="automobile"
          subtitle="Taxi, ambulance, VTC, poids lourd, garagistes, carrossiers, auto-écoles, concessionnaires — une couverture adaptée à chaque activité liée à l'automobile."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={4}
          items={[...TRANSPORT_CARDS, ...PRO_AUTO_CARDS]}
        />

        <InfoCardsSection
          title="Assurance"
          titleItalic="construction"
          subtitle="Tous risques chantier, RC décennale, dommages ouvrage — protégez chaque étape de vos projets."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={4}
          items={CONSTRUCTION_CARDS}
        />

        <InfoCardsSection
          title="Assurance"
          titleItalic="immobilier"
          subtitle="Copropriété, immeuble, syndic, loyers impayés — sécurisez votre patrimoine immobilier."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="grid"
          cols={4}
          items={IMMOBILIER_CARDS}
        />

        <ReadyCta />
      </main>
    </>
  );
}
