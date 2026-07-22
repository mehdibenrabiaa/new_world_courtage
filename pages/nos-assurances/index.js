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
    image: "/card_head_garagiste.png",
    imageAlt: "Assurance garagiste",
    title: "Assurance garagiste",
    description: "Une couverture adaptée aux garagistes : véhicules confiés, outillage et responsabilité professionnelle.",
    href: "/assurance-pro-auto/garagiste/",
  },
  {
    image: "/card_head_carrossier.png",
    imageAlt: "Assurance carrossier",
    title: "Assurance carrossier",
    description: "Protégez votre activité de carrosserie contre les risques liés aux véhicules confiés et à l'atelier.",
    href: "/assurance-pro-auto/carrossier/",
  },
  {
    image: "/card_head_auto-ecole.png",
    imageAlt: "Assurance auto-école",
    title: "Assurance auto-école",
    description: "Une assurance pensée pour les auto-écoles : véhicules-écoles, moniteurs et élèves conducteurs.",
    href: "/assurance-pro-auto/auto-ecole/",
  },
  {
    image: "/card_head_concessionnaire.png",
    imageAlt: "Assurance concessionnaire",
    title: "Assurance concessionnaire",
    description: "Des garanties sur-mesure pour les concessionnaires automobiles et leur parc de véhicules.",
    href: "/assurance-pro-auto/concessionnaire/",
  },
];

const CONSTRUCTION_CARDS = [
  {
    image: "/construction_site.png",
    imageAlt: "Tous risques chantier",
    title: "Tous risques chantier",
    description: "Couvrez les dommages matériels survenant sur votre chantier, du premier coup de pelle à la livraison.",
    href: "/assurance-construction/tous-risques-chantier/",
  },
  {
    image: "/construction_site_rc.png",
    imageAlt: "RC et décennale",
    title: "RC et décennale",
    description: "Une protection obligatoire pour les professionnels du bâtiment, contre les dommages engageant votre responsabilité.",
    href: "/assurance-construction/rc-decennale/",
  },
  {
    image: "/dommages_ouvrage.png",
    imageAlt: "Dommages ouvrage",
    title: "Dommages ouvrage",
    description: "Anticipez la réparation rapide des désordres, sans attendre qu'une responsabilité soit établie.",
    href: "/assurance-construction/dommages-ouvrage/",
  },
  {
    image: "/engins_de_chantier.png",
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
