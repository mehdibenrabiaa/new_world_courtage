import Head from "next/head";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Partners from "../components/Partners";
import OurProcess from "../components/OurProcess";
import RealCustomers from "../components/RealCustomers";
import TrustPilot from "../components/TrustPilot";
import FinishedScrolling from "../components/FinishedScrolling";
import SocialMedia from "../components/SocialMedia";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Assurance Auto, Habitation, Santé & Décennale — Comparez et économisez
        </title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance auto, habitation, santé et décennale. Obtenez des devis gratuits en quelques minutes et économisez sur votre assurance."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.newworldcourtage.fr/" />
        <meta
          property="og:title"
          content="Assurance Auto, Habitation, Santé & Décennale — Comparez et économisez"
        />
        <meta
          property="og:description"
          content="Comparez les meilleures offres d'assurance auto, habitation, santé et décennale. Obtenez des devis gratuits en quelques minutes."
        />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="New World Courtage" />
        <meta property="og:image" content="https://www.newworldcourtage.fr/hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Assurance Auto, Habitation, Santé & Décennale"
        />
        <meta
          name="twitter:description"
          content="Comparez les meilleures offres d'assurance et économisez."
        />
        <meta name="twitter:image" content="https://www.newworldcourtage.fr/hero.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              name: "New World Courtage",
              url: "https://www.newworldcourtage.fr",
              logo: "https://www.newworldcourtage.fr/hero.jpg",
              description:
                "New World Courtage est un courtier en assurance indépendant. Comparez gratuitement les meilleures offres d'assurance auto, habitation, santé et décennale.",
              telephone: "+33745891865",
              email: "contact@newworldcourtage.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "455 Promenade des Anglais, Immeuble Nice Premier – Arenas Partners",
                addressLocality: "Nice",
                postalCode: "06000",
                addressCountry: "FR",
              },
              areaServed: {
                "@type": "Country",
                name: "France",
              },
              priceRange: "Gratuit",
              knowsAbout: [
                "Assurance Auto",
                "Assurance Habitation",
                "Assurance Santé",
                "Assurance Décennale",
              ],
            }),
          }}
        />
      </Head>
      <main>
        <h1 className="sr-only">
          Comparez les meilleures assurances en France
        </h1>
        <Hero />
        <Partners />
        <TrustPilot />
        <RealCustomers />
        <Testimonials />
        <OurProcess />
        <SocialMedia />
        <FinishedScrolling />
        <FAQ className="px-4 lg:px-12 2xl:px-24" />
      </main>
      <Footer />
    </>
  );
}
