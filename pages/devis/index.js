import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import { libreCaslon } from "@/lib/fonts";
import { PhotoCardGrid } from "@/components/InsuranceSolutions";

const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";

const CATEGORIES = [
  {
    id: "auto-moto",
    label: "Auto & Moto",
    href: "/nos-assurances/#auto-moto",
    image: "/pages/driving-car.jpg",
    description: "Voiture, moto ou scooter… Comparez les offres et assurez votre véhicule au meilleur prix.",
  },
  {
    id: "taxi-vtc",
    label: "Taxi & VTC",
    href: "/assurance-transport/",
    image: "/heroes/taxi-desktop.webp",
    description: "Artisans taxi et chauffeurs VTC… Une couverture adaptée au transport de personnes.",
  },
  {
    id: "pro-auto",
    label: "Pro de l'auto",
    href: "/assurance-pro-auto/garagiste/",
    image: "/pages/garagist.webp",
    description: "Garagistes, convoyeurs, négociants… Des garanties adaptées aux véhicules confiés et à votre atelier.",
  },
];



function CategoryPicker() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
          Quelle assurance <em className={`italic ${libreCaslon.className}`}>recherchez-vous ?</em>
        </h2>
        <p className="text-[15px] text-gray-600 leading-relaxed">
          Choisissez votre activité pour démarrer votre demande de devis gratuit et sans engagement.
        </p>
      </div>
      <div className="mt-10 lg:mt-12">
        <PhotoCardGrid items={CATEGORIES} />
      </div>
    </section>
  );
}

export default function DevisLandingPage() {
  return (
    <>
      <Head>
        <title>Devis gratuit — New World Courtage</title>
        <meta
          name="description"
          content="Obtenez votre devis d'assurance gratuit et sans engagement avec New World Courtage. Choisissez votre activité pour commencer."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/devis/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Devis gratuit" }]}
          image="/pages/driving-car.jpg"
          title={<>Devis <em>gratuit</em>.</>}
          subtitle="Gratuit et sans engagement : choisissez votre activité et recevez les meilleures offres."
        />
        <CategoryPicker />
      </main>
    </>
  );
}
