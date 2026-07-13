import Head from "next/head";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Partners from "../components/Partners";
import OurProcess from "../components/OurProcess";
import RealCustomers from "../components/RealCustomers";
import TrustPilot from "../components/TrustPilot";
import FinishedScrolling from "../components/FinishedScrolling";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          L'assurance des professionnels et entrepreneurs | New World Courtage
        </title>
        <meta
          name="description"
          content="New World Courtage, votre courtier en assurance pour pros et particuliers. Comparez les meilleures offres en flotte & transport, construction, immobilier, santé et moto. Devis gratuit en quelques minutes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/" />
        <link rel="preload" as="image" href="/hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.newworldcourtage.fr/" />
        <meta
          property="og:title"
          content="Courtier en Assurance — Flotte, Construction, Immobilier & Santé | New World Courtage"
        />
        <meta
          property="og:description"
          content="New World Courtage, votre courtier en assurance pour pros et particuliers. Comparez les meilleures offres et obtenez un devis gratuit en quelques minutes."
        />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="New World Courtage" />
        <meta property="og:image" content="https://www.newworldcourtage.fr/hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Courtier en Assurance — Pros & Particuliers | New World Courtage"
        />
        <meta
          name="twitter:description"
          content="Comparez les meilleures offres d'assurance pour pros et particuliers. Devis gratuit en quelques minutes."
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
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <Hero />
        </div>
        <Partners />
        <TrustPilot />
        <RealCustomers />
        <Testimonials />
        <OurProcess />
        <FinishedScrolling />
        <FAQ className="px-4 lg:px-12 2xl:px-24" />
      </main>
    </>
  );
}
