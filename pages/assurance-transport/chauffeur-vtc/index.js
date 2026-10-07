import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import Testimonials from "@/components/Testimonials";
import FinishedScrolling from "@/components/FinishedScrolling";

export default function AssuranceVtcPage() {
  return (
    <>
      <Head>
        <title>Assurance Chauffeur VTC — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance chauffeur VTC. Obtenez un devis gratuit en quelques minutes et protégez votre activité de transport de personnes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/chauffeur-vtc/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Taxi & VTC", href: "/assurance-transport/" }, { label: "Assurance chauffeur VTC" }]}
          title={<>L&apos;assurance des <em>chauffeurs VTC</em>.</>}
          subtitle="Un contrat adapté au transport de personnes, négocié auprès d'assureurs spécialistes du VTC."
          image="/heroes/vtc-desktop.webp"
          mobileImage="/heroes/vtc-mobile.webp"
          imageAlt="Chauffeur VTC au volant, GPS sur son téléphone"
        />

        <CarCalculatorSection
          redirectTo="/assurance-transport/chauffeur-vtc/devis/"
          title={<>Recevez votre devis d&apos;assurance VTC <em>gratuitement.</em></>}
          subtitle="Votre devis assurance VTC au même prix que chez l'assureur, tout simplement."
        />

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/vtc-driver.webp"
          imageAlt="Chauffeur VTC souriant avec un passager"
          label="Garanties"
          heading="Ce que peut couvrir votre"
          headingItalic="assurance VTC."
          description="Le transport de personnes à titre onéreux exige une assurance adaptée. Nos conseillers comparent les offres pour trouver les garanties dont votre activité a besoin."
          points={[
            "Responsabilité civile professionnelle VTC",
            "Dommages au véhicule (accident, vol, incendie)",
            "Garantie du conducteur",
            "Protection des passagers transportés",
          ]}
        />

        <FinishedScrolling />
      </main>
    </>
  );
}
