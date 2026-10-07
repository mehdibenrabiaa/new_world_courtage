import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import CarCalculatorSection from "../../../components/CarCalculatorSection";
import CarInsuranceProcess from "../../../components/CarInsuranceProcess";
const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";


export default function CarInsuranceCalculatorPage() {
  return (
    <>
      <Head>
        <title>Calculateur d&apos;assurance auto — New World Courtage</title>
        <meta
          name="description"
          content="Estimez le coût de votre assurance auto en quelques clics. Calculateur gratuit pour comparer les offres selon votre profil."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://new-world-courtage.vercel.app/assurance-auto/calculateur/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Assurance auto", href: "/assurance-auto/" }, { label: "Calculateur" }]} title={<>Calculez <em className="italic">rapidement</em> vos besoins en<br className="hidden lg:block" />assurance automobile.</>} image="/pages/calculator-desktop.jpg" imageAlt="Calculateur assurance auto" />
        <CarCalculatorSection />
        <CarInsuranceProcess />
      </main>
    </>
  );
}
