import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import CarCalculatorSection from "@/components/CarCalculatorSection";
import Testimonials from "@/components/Testimonials";
import FinishedScrolling from "@/components/FinishedScrolling";

export default function AssuranceMotoPage() {
  return (
    <>
      <Head>
        <title>Assurance Moto — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance moto et scooter. Obtenez un devis gratuit en quelques minutes, au même prix que chez l'assureur."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-moto/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Assurance moto" }]}
          title={<>L&apos;assurance <em>moto</em>.</>}
          subtitle="Moto ou scooter : comparez les offres de nos assureurs partenaires et roulez couvert au meilleur prix."
          image="/heroes/moto-desktop.webp"
          mobileImage="/heroes/moto-mobile.webp"
          imageAlt="Motard sur une route de campagne"
        />

        <CarCalculatorSection
          redirectTo="/assurance-moto/devis/"
          title={<>Recevez votre devis d&apos;assurance moto <em>gratuitement.</em></>}
          subtitle="Votre devis assurance moto au même prix que chez l'assureur, tout simplement."
        />

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/moto-parked.webp"
          imageAlt="Moto garée au coucher du soleil"
          label="Garanties"
          heading="Ce que peut couvrir votre"
          headingItalic="assurance moto."
          description="Selon la formule choisie, votre contrat peut aller de la responsabilité civile obligatoire à une couverture complète. Nos conseillers vous aident à choisir le bon niveau."
          points={[
            "Responsabilité civile obligatoire",
            "Vol et incendie",
            "Dommages tous accidents",
            "Équipement du motard et garantie du pilote",
          ]}
        />

        <FinishedScrolling />
      </main>
    </>
  );
}
