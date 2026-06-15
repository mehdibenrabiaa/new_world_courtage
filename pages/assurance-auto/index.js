import Head from "next/head";
import { Libre_Caslon_Text } from "next/font/google";
import { Button } from "@/components/ui/button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const selectClass =
  "h-11 bg-white rounded-lg px-4 text-sm font-medium text-[#131212] border-0 shadow-none appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] pr-8 bg-[right_0.75rem_center] bg-no-repeat";

const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
};

function HeroSection() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full h-[75vw] max-h-[90vh] min-h-[600px] overflow-hidden rounded-none lg:rounded-xl">

          {/* Background image */}
          <picture className="absolute inset-0 w-full h-full">
            <source media="(max-width: 767px)" srcSet="/hero.png" type="image/png" />
            <img
              src="/hero.jpg"
              alt="Assurance auto New World Courtage"
              width={1600}
              height={900}
              decoding="sync"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover object-top"
            />
          </picture>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center gap-8 px-4 lg:px-12 text-center">

            {/* Headline */}
            <h1
              className={`text-[7vw] sm:text-[38px] lg:text-[52px] text-white leading-[1.15] max-w-3xl ${libreCaslon.className}`}
            >
              Le bon contrat d&apos;assurance auto commence par un{" "}
              <em className={`italic ${libreCaslon.className}`}>simple devis.</em>
            </h1>

            {/* Form bar */}
            <div className="bg-[var(--color-light)] rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 w-full max-w-2xl">

              {/* Insurance type */}
              <div className="relative flex-1">
                <select className={`${selectClass} w-full`} style={selectStyle} defaultValue="auto">
                  <option value="auto">Auto</option>
                  <option value="habitation">Habitation</option>
                  <option value="sante">Santé</option>
                  <option value="decennale">Décennale</option>
                </select>
              </div>

              {/* Policy type */}
              <div className="relative flex-1">
                <select className={`${selectClass} w-full`} style={selectStyle} defaultValue="full">
                  <option value="full">Full coverage</option>
                  <option value="third-party">Third party</option>
                  <option value="third-party-plus">Third party +</option>
                </select>
              </div>

              {/* Zip code */}
              <input
                type="text"
                placeholder="Code postal"
                maxLength={5}
                className="h-11 flex-1 bg-white rounded-lg px-4 text-sm text-[#131212] placeholder:text-gray-400 border-0 shadow-none focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] w-full"
              />

              {/* CTA */}
              <Button className="h-11 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-semibold px-6 rounded-lg shrink-0 w-full md:w-auto">
                Get started
              </Button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function AssuranceAutoPage() {
  return (
    <>
      <Head>
        <title>Assurance Auto — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance auto. Obtenez un devis gratuit en quelques minutes et économisez sur votre assurance automobile."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-auto/" />
      </Head>

      <main>
        <HeroSection />
      </main>

      <Footer />
    </>
  );
}
