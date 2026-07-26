import Head from "next/head";
import PageHero from "@/components/PageHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import { libreCaslon } from "@/lib/fonts";
import { ClipboardCheck, Umbrella, Scale, BookOpen, Shield, FileText } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Testimonials from "../../../components/Testimonials";
import InfoCardsSection from "../../../components/InfoCardsSection";
import FinishedScrolling from "../../../components/FinishedScrolling";
import { fetchGuideCardsByCategory } from "@/lib/api";

const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const GUIDE_ICONS = [ClipboardCheck, Umbrella, Scale, BookOpen, Shield, FileText];

const OFFER_CARDS = [
  {
    image: "/heroes/ambulance-desktop.webp",
    imageAlt: "Assurance ambulance professionnelle",
    title: "Nous assurons les ambulanciers depuis plus de 10 ans",
    description: "Nous proposons une assurance ambulance avec une couverture optimale au meilleur tarif, négociée avec des assureurs spécialistes reconnus du transport sanitaire.",
    href: "/assurance-transport/comment-souscrire-assurance-ambulance/",
  },
  {
    image: "/pages/ambulance-side-angle.webp",
    imageAlt: "Couverture assurance transport sanitaire",
    title: "Une couverture adaptée au transport sanitaire",
    description: "Responsabilité civile professionnelle, véhicule, matériel médical embarqué et protection des patients — toutes ces garanties sont incluses dans nos contrats de base.",
    href: "/assurance-transport/quelle-couverture-assurance-ambulance/",
  },
  {
    image: "/pages/calculator-mobile.jpg",
    imageAlt: "Devis assurance ambulance",
    title: "Votre assurance ambulance moins chère",
    description: "Nous bénéficions de tarifs exceptionnels négociés avec les plus grandes compagnies d'assurance spécialisées dans le transport sanitaire. Devis sous 24h.",
    href: "/assurance-transport/comment-choisir-assurance-ambulance/",
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
          <BreadcrumbLink href="/assurance-transport/">Flotte &amp; Transport</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Assurance ambulance</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export async function getServerSideProps() {
  try {
    const guides = await fetchGuideCardsByCategory("Ambulance");
    return { props: { guideData: guides } };
  } catch {
    return { props: { guideData: null } };
  }
}

export default function AssuranceAmbulancePage({ guideData }) {
  const guideCards = (guideData ?? []).map((g, i) => ({
    Icon: GUIDE_ICONS[i % GUIDE_ICONS.length],
    title: g.title,
    description: g.intro || "",
    href: `/assurance-transport/${g.slug}/`,
  }));

  return (
    <>
      <Head>
        <title>Assurance Ambulance — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance ambulance et transport sanitaire. Obtenez un devis gratuit en quelques minutes et protégez votre activité."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/ambulance/" />
      </Head>

      <main>
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <PageBreadcrumb />
        </div>
        <PageHero
          title={<>Votre activité de transport sanitaire mérite une couverture{" "}<em className="italic">sur-mesure.</em></>}
          image="/heroes/ambulance-desktop.webp"
          mobileImage="/heroes/ambulance-mobile.webp"
          imageAlt="Assurance ambulance New World Courtage"
          titlePosition="bottom"
          titleClassName="!text-[7vw] sm:!text-[36px] lg:!text-[55px]"
        />

        <CarCalculatorSection
          redirectTo="/assurance-transport/devis/"
          variant="business"
          title={<>Recevez votre devis d&apos;assurance ambulance <em className={`italic ${libreCaslon.className}`}>gratuitement.</em></>}
          subtitle="Votre devis assurance ambulance au même prix que chez l'assureur, tout simplement."
        />

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/ambulance-side-angle.webp"
          label="Garanties incluses"
          heading="Ce que couvre votre"
          headingItalic="assurance ambulance."
          description="Tous nos contrats d'assurance ambulance et transport sanitaire incluent les garanties de base indispensables pour exercer votre activité en toute sérénité — négociées avec les meilleurs assureurs spécialistes du secteur."
          points={[
            "Responsabilité civile professionnelle transport sanitaire",
            "Couverture du véhicule (dommages, vol, incendie)",
            "Assurance des locaux et du matériel médical embarqué",
            "Protection des patients transportés",
          ]}
        />

        {guideCards.length > 0 && (
          <InfoCardsSection
            title="Pas sûr par où"
            titleItalic="commencer ?"
            subtitle="Explorez nos guides pour tout savoir sur l'assurance ambulance."
            cardStyle="style1"
            showLink
            titleFont="serif"
            layout="grid"
            items={guideCards}
          />
        )}

        <InfoCardsSection
          title="Guides & conseils"
          titleItalic="assurance."
          subtitle="Tout ce que vous devez savoir avant de souscrire votre assurance ambulance — expliqué simplement par nos experts."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="scroll"
          mobileLayout="carousel"
          ctaLabel="Lire plus de guides"
          ctaHref="/assurance-transport/ambulance/"
          items={OFFER_CARDS}
        />
        <FinishedScrolling />
      </main>
    </>
  );
}
