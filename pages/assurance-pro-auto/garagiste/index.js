import Head from "next/head";
import PageHero from "@/components/PageHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import GarageIdentityForm from "@/components/GarageIdentityForm";
import PartnerLogos from "@/components/PartnerLogos";
import Testimonials from "@/components/Testimonials";
import { PARTNERS } from "@/lib/partners";
import InfoCardsSection from "@/components/InfoCardsSection";
import FinishedScrolling from "@/components/FinishedScrolling";
import { fetchGuideCardsByCategory } from "@/lib/api";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClipboardCheck, Umbrella, Scale, BookOpen, Shield, FileText } from "lucide-react";

// Garagiste-specific: the site-wide PARTNERS list (minus Swiss Life) plus two
// insurers used specifically for the garage product line. Kept local to this
// page rather than added to the shared list, so it doesn't also show up on
// the homepage or /a-propos/nos-partenaires.
const PARTNERS_BY_ID = Object.fromEntries(PARTNERS.map((p) => [p.id, p]));
const GARAGISTE_PARTNERS = [
  PARTNERS_BY_ID.axa,
  PARTNERS_BY_ID.allianz,
  { id: "axeria", name: "Axeria", src: "/partners/axeria.svg" },
  PARTNERS_BY_ID.gmf,
  PARTNERS_BY_ID.areas,
  PARTNERS_BY_ID.gan,
  PARTNERS_BY_ID.groupama,
  { id: "wakam", name: "Wakam", src: "/partners/wakam.svg" },
];

const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";
const GUIDE_ICONS = [ClipboardCheck, Umbrella, Scale, BookOpen, Shield, FileText];

const GUIDE_CARDS = [
  {
    Icon: ClipboardCheck,
    title: "Comment souscrire une assurance garage ?",
    description: "Vous pouvez souscrire directement auprès d'un assureur, via un agent ou en faisant appel à un courtier spécialisé comme New World Courtage pour comparer les offres du marché.",
    href: "/assurance-pro-auto/comment-souscrire-assurance-garage/",
  },
  {
    Icon: Umbrella,
    title: "De quelle couverture ai-je besoin ?",
    description: "Choisir la bonne couverture dépend de votre activité principale, de la valeur de votre flotte auto propre et du niveau de risque lié à votre atelier.",
    href: "/assurance-pro-auto/quelle-couverture-assurance-garage/",
  },
  {
    Icon: Scale,
    title: "Comment choisir son assurance garage ?",
    description: "Garanties, franchise, exclusions, tarif — notre équipe vous guide vers le contrat le plus adapté à votre activité de garagiste.",
    href: "/assurance-pro-auto/comment-choisir-assurance-garage/",
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
          <BreadcrumbPage>Assurance garage</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export async function getServerSideProps() {
  try {
    const guides = await fetchGuideCardsByCategory("Assurance Garage");
    return { props: { guideData: guides } };
  } catch {
    return { props: { guideData: null } };
  }
}

// Same page structure as pages/assurance-transport/taxi/index.js — hero,
// calculator, testimonials, guide cards — with garage-specific wording and
// content (see the 3 "Assurance Garage" guides created via the CRM's guides
// API, rendered by pages/assurance-pro-auto/[slug].js).
// GarageIdentityForm plays the same role here as VehicleIdentityForm does
// for taxi — collects identity up front and redirects into /devis/ with it
// as query params (see that page's buildInitialAnswers for how it's read).
export default function GaragistePage({ guideData }) {
  const offerCards = (guideData ?? []).map((g, i) => ({
    ...(g.image_url
      ? { image: g.image_url, imageAlt: g.title }
      : { Icon: GUIDE_ICONS[i % GUIDE_ICONS.length] }),
    title: g.title,
    description: g.intro || "",
    href: `/assurance-pro-auto/${g.slug}/`,
  }));

  return (
    <>
      <Head>
        <title>Assurance Garage — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance garage. Obtenez un devis gratuit en quelques minutes et protégez votre activité."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-pro-auto/garagiste/" />
      </Head>

      <main>
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <PageBreadcrumb />
        </div>
        <PageHero
          title={<>Le bon contrat d&apos;assurance garage commence par un{" "}<em className="italic">simple devis.</em></>}
          image="/heroes/garage-desktop.webp"
          mobileImage="/heroes/garage-mobile.webp"
          imageAlt="Assurance garage New World Courtage"
          titlePosition="bottom"
          titleClassName="!text-[7vw] sm:!text-[36px] lg:!text-[55px]"
        />

        <div className="px-4 lg:px-12 2xl:px-24 my-8">
          <PartnerLogos partners={GARAGISTE_PARTNERS} />
        </div>

        <CarCalculatorSection
          title={<>Recevez votre devis d&apos;assurance garage <em className="italic">gratuitement.</em></>}
          subtitle="Mécanicien, carrossier, centre d'entretien — un devis personnalisé pour votre garage, au même prix que chez l'assureur."
        >
          <GarageIdentityForm redirectTo="/assurance-pro-auto/garagiste/devis/" />
        </CarCalculatorSection>

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/garagist.webp"
          label="Garanties incluses"
          heading="Ce que couvre votre"
          headingItalic="assurance garage."
          description="Tous nos contrats d'assurance garage incluent les garanties de base adaptées à votre activité — négociées avec les meilleurs assureurs du marché."
          points={[
            "Responsabilité civile professionnelle",
            "Couverture du local et du matériel",
            "Flotte auto propre du garage",
            "Protection contre les dommages aux véhicules confiés",
          ]}
        />

        <InfoCardsSection
          title="Pas sûr par où"
          titleItalic="commencer ?"
          subtitle="Explorez nos guides pour tout savoir sur l'assurance garage."
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
            subtitle="Tout ce que vous devez savoir avant de souscrire votre assurance garage — expliqué simplement par nos experts."
            cardStyle="style2"
            showLink
            withContainer
            titleFont="sans"
            layout="scroll"
            mobileLayout="carousel"
            ctaLabel="Lire plus de guides"
            ctaHref="/assurance-pro-auto/garagiste/"
            items={offerCards}
          />
        )}
        <FinishedScrolling />
      </main>
    </>
  );
}
