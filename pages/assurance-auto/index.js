import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import Testimonials from "@/components/Testimonials";
import FinishedScrolling from "@/components/FinishedScrolling";

export default function AssuranceAutoPage() {
  return (
    <>
      <Head>
        <title>Assurance Automobile — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance automobile. Obtenez un devis gratuit en quelques minutes, au même prix que chez l'assureur."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-auto/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Assurance automobile" }]}
          title={<>L&apos;assurance <em>automobile</em>.</>}
          subtitle="Comparez les offres de nos assureurs partenaires et assurez votre voiture au meilleur prix, sans frais."
          image="/heroes/auto-desktop.webp"
          mobileImage="/heroes/auto-mobile.webp"
          imageAlt="Conducteur au volant de sa voiture"
        />

        <CarCalculatorSection
          redirectTo="/assurance-auto/devis/"
          title={<>Recevez votre devis d&apos;assurance automobile <em>gratuitement.</em></>}
          subtitle="Votre devis assurance automobile au même prix que chez l'assureur, tout simplement."
        />

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/auto-driver.webp"
          imageAlt="Conducteur au volant face à la mer"
          label="Garanties"
          heading="Ce peut couvrir votre"
          headingItalic="assurance automobile."
          description="Selon la formule choisie, du tiers au tous risques, votre contrat protège votre voiture, vos passagers et votre responsabilité. Nos conseillers vous aident à choisir le bon niveau."
          points={[
            "Responsabilité civile obligatoire",
            "Vol, incendie et bris de glace",
            "Dommages tous accidents",
            "Assistance et garantie du conducteur",
          ]}
        />

        <FinishedScrolling />
      </main>
    </>
  );
}
