import Head from "next/head";
import PageHero from "@/components/PageHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import { ClipboardCheck, Umbrella, Scale, BookOpen, Shield, FileText } from "lucide-react";
import { fetchGuideCardsByCategory } from "@/lib/api";
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

const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const GUIDE_CARDS = [
  {
    Icon: ClipboardCheck,
    title: "Comment souscrire une assurance taxi ?",
    description: "Vous pouvez souscrire directement auprès d'un assureur, via un agent ou en faisant appel à un courtier spécialisé comme New World Courtage pour comparer les offres du marché.",
    href: "/assurance-transport/comment-souscrire-assurance-taxi/",
  },
  {
    Icon: Umbrella,
    title: "De quelle couverture ai-je besoin ?",
    description: "Choisir la bonne couverture dépend de la valeur de votre véhicule, de votre historique de sinistres et du niveau de risque lié à votre activité de chauffeur de taxi.",
    href: "/assurance-transport/quelle-couverture-assurance-taxi/",
  },
  {
    Icon: Scale,
    title: "Comment choisir son assurance taxi ?",
    description: "Garanties, franchise, exclusions, tarif — notre équipe vous guide vers le contrat le plus adapté à votre activité, pour vous protéger au meilleur prix.",
    href: "/assurance-transport/comment-choisir-assurance-taxi/",
  },
];

const GUIDE_ICONS = [ClipboardCheck, Umbrella, Scale, BookOpen, Shield, FileText];

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
          <BreadcrumbPage>Assurance taxi</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export async function getServerSideProps() {
  try {
    const guides = await fetchGuideCardsByCategory("Taxi");
    return { props: { guideData: guides } };
  } catch {
    return { props: { guideData: null } };
  }
}

export default function AssuranceTaxiPage({ guideData }) {
  const offerCards = (guideData ?? []).map((g, i) => ({
    ...(g.image_url
      ? { image: g.image_url, imageAlt: g.title }
      : { Icon: GUIDE_ICONS[i % GUIDE_ICONS.length] }),
    title: g.title,
    description: g.intro || "",
    href: `/assurance-transport/${g.slug}/`,
  }));
  return (
    <>
      <Head>
        <title>Assurance Taxi — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance taxi. Obtenez un devis gratuit en quelques minutes et protégez votre activité de transport de personnes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/taxi/" />
      </Head>

      <main>
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <PageBreadcrumb />
        </div>
        <PageHero
          title={<>Le bon contrat d&apos;assurance taxi commence par un{" "}<em className="italic">simple devis.</em></>}
          image="/heroes/taxi-desktop.webp"
          mobileImage="/heroes/taxi-mobile.webp"
          imageAlt="Assurance taxi New World Courtage"
          titlePosition="bottom"
          titleClassName="!text-[7vw] sm:!text-[36px] lg:!text-[55px]"
        />

        <CarCalculatorSection redirectTo="/assurance-transport/taxi/devis/" />

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/taxi-driver.webp"
          label="Garanties incluses"
          heading="Ce que couvre votre"
          headingItalic="assurance taxi."
          description="Tous nos contrats d'assurance taxi incluent les garanties de base obligatoires pour exercer votre activité en toute sérénité — négociées avec les meilleurs assureurs du marché."
          points={[
            "Responsabilité civile professionnelle artisan taxi",
            "Couverture du véhicule (dommages, vol, incendie)",
            "Assurance du chauffeur de taxi",
            "Protection des passagers transportés",
          ]}
        />

        <InfoCardsSection
          title="Pas sûr par où"
          titleItalic="commencer ?"
          subtitle="Explorez nos guides pour tout savoir sur l'assurance taxi."
          cardStyle="style1"
          showLink
          titleFont="serif"
          layout="grid"
          items={GUIDE_CARDS}
        />

        {offerCards.length > 0 && (
          <InfoCardsSection
            title="Guides & conseils"
            titleItalic="assurance."
            subtitle="Tout ce que vous devez savoir avant de souscrire votre assurance taxi — expliqué simplement par nos experts."
            cardStyle="style2"
            showLink
            withContainer
            titleFont="sans"
            layout="scroll"
            mobileLayout="carousel"
            ctaLabel="Lire plus de guides"
            ctaHref="/assurance-transport/taxi/"
            items={offerCards}
          />
        )}
        <FinishedScrolling />
      </main>
    </>
  );
}
