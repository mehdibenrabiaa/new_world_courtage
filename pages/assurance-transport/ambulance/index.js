import { useEffect, useState } from "react";
import Head from "next/head";
import PageHero from "@/components/PageHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import { libreCaslon } from "@/lib/fonts";
import { ClipboardCheck, Umbrella, Scale } from "lucide-react";
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
import { fetchGuides } from "@/lib/api";

const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const GUIDE_CARDS = [
  {
    Icon: ClipboardCheck,
    title: "Comment souscrire une assurance ambulance ?",
    description: "Vous pouvez souscrire directement auprès d'un assureur, via un agent ou en faisant appel à un courtier spécialisé comme New World Courtage pour comparer les offres du marché.",
    href: "/assurance-transport/comment-souscrire-assurance-ambulance/",
  },
  {
    Icon: Umbrella,
    title: "De quelle couverture ai-je besoin ?",
    description: "Véhicules, locaux, matériel médical embarqué : le niveau de couverture dépend de la nature de votre activité (ambulance, VSL) et de votre statut, mono-véhicule ou flotte.",
    href: "/assurance-transport/quelle-couverture-assurance-ambulance/",
  },
  {
    Icon: Scale,
    title: "Comment choisir son assurance ambulance ?",
    description: "Garanties, franchise, exclusions, tarif — notre équipe vous guide vers le contrat le plus adapté à votre activité de transport sanitaire.",
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

export default function AssuranceAmbulancePage() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetchGuides("ambulance")
      .then(setGuides)
      .catch(() => {});
  }, []);

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
          image="/ambulance.jpg"
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
          image="/ambulance_small.jpg"
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

        <InfoCardsSection
          title="Pas sûr par où"
          titleItalic="commencer ?"
          subtitle="Explorez nos guides pour tout savoir sur l'assurance ambulance."
          cardStyle="style1"
          showLink
          titleFont="serif"
          layout="grid"
          items={GUIDE_CARDS}
        />

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
          items={guides}
        />
        <FinishedScrolling />
      </main>
    </>
  );
}
