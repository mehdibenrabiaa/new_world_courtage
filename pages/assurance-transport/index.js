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

const PRO_AUTO_CARDS = [
  {
    image: "/assurance-transport-page.png",
    imageAlt: "Assurance garagiste",
    title: "Assurance garagiste",
    description: "Une couverture adaptée aux garagistes : véhicules confiés, outillage et responsabilité professionnelle.",
    href: "/assurance-pro-auto/garagiste/",
  },
  {
    image: "/auto-insurance-calculator.jpg",
    imageAlt: "Assurance carrossier",
    title: "Assurance carrossier",
    description: "Protégez votre activité de carrosserie contre les risques liés aux véhicules confiés et à l'atelier.",
    href: "/assurance-pro-auto/carrossier/",
  },
  {
    image: "/auto-insurance-calculator-mobile.jpg",
    imageAlt: "Assurance auto-école",
    title: "Assurance auto-école",
    description: "Une assurance pensée pour les auto-écoles : véhicules-écoles, moniteurs et élèves conducteurs.",
    href: "/assurance-pro-auto/auto-ecole/",
  },
  {
    image: "/taxi_page.png",
    imageAlt: "Assurance concessionnaire",
    title: "Assurance concessionnaire",
    description: "Des garanties sur-mesure pour les concessionnaires automobiles et leur parc de véhicules.",
    href: "/assurance-pro-auto/concessionnaire/",
  },
];

const CONSTRUCTION_CARDS = [
  {
    image: "/assurance-transport-page.png",
    imageAlt: "Tous risques chantier",
    title: "Tous risques chantier",
    description: "Couvrez les dommages matériels survenant sur votre chantier, du premier coup de pelle à la livraison.",
    href: "/assurance-construction/tous-risques-chantier/",
  },
  {
    image: "/auto-insurance-calculator.jpg",
    imageAlt: "RC et décennale",
    title: "RC et décennale",
    description: "Une protection obligatoire pour les professionnels du bâtiment, contre les dommages engageant votre responsabilité.",
    href: "/assurance-construction/rc-decennale/",
  },
  {
    image: "/auto-insurance-calculator-mobile.jpg",
    imageAlt: "Dommages ouvrage",
    title: "Dommages ouvrage",
    description: "Anticipez la réparation rapide des désordres, sans attendre qu'une responsabilité soit établie.",
    href: "/assurance-construction/dommages-ouvrage/",
  },
  {
    image: "/taxi_page.png",
    imageAlt: "Assurance engins de chantier",
    title: "Assurance engins de chantier",
    description: "Protégez vos engins et machines de chantier contre le vol, le vandalisme et les dommages.",
    href: "/assurance-construction/engins-chantier/",
  },
];

const IMMOBILIER_CARDS = [
  {
    image: "/assurance-transport-page.png",
    imageAlt: "Assurance copropriété",
    title: "Assurance copropriété",
    description: "Une couverture complète pour les parties communes et la responsabilité civile de la copropriété.",
    href: "/assurance-immobilier/copropriete/",
  },
  {
    image: "/auto-insurance-calculator.jpg",
    imageAlt: "Assurance immeuble",
    title: "Assurance immeuble",
    description: "Protégez votre patrimoine immobilier locatif contre les sinistres et pertes de loyers.",
    href: "/assurance-immobilier/immeuble/",
  },
  {
    image: "/auto-insurance-calculator-mobile.jpg",
    imageAlt: "Assurance loyers impayés",
    title: "Assurance loyers impayés",
    description: "Sécurisez vos revenus locatifs en cas de défaut de paiement de vos locataires.",
    href: "/assurance-immobilier/loyers-impayes/",
  },
  {
    image: "/taxi_page.png",
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
          <BreadcrumbPage>Assurance auto</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function AssuranceAutoPage() {
  return (
    <>
      <Head>
        <title>Assurance Auto — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance auto. Obtenez un devis gratuit en quelques minutes et économisez sur votre assurance automobile."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-auto/" />
      </Head>

      <main>
        <PageBreadcrumb />
        <PageHero
          title="Nos domaines d'assurance professionnelle"
          image="/assurance-transport-page.png"
          imageAlt="Assurance professionnelle New World Courtage"
          titleWidth="lg:w-[60%]"
        />

        <InfoCardsSection
          title="Assurance"
          titleItalic="automobile."
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
          titleItalic="construction."
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
          titleItalic="immobilier."
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
