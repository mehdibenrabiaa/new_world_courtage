import Head from "next/head";
import { Libre_Caslon_Text } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Footer from "../../components/Footer";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

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

          {/* Content — bottom left, 70% width container */}
          <div className="relative z-10 h-full flex flex-col justify-end items-start px-4 lg:px-8 pb-6 gap-4 w-[70%]">

            {/* Headline — bottom left, black text */}
            <h1 className={`text-[7vw] sm:text-[38px] lg:text-[48px] text-[#131212] leading-[1.15] ${libreCaslon.className}`}>
              Le bon contrat d&apos;assurance auto commence par un{" "}
              <em className={`italic ${libreCaslon.className}`}>simple devis.</em>
            </h1>

            {/* Form bar — white container with all inputs */}
            <div className="bg-white rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 w-full">

              {/* Insurance type */}
              <Select defaultValue="auto">
                <SelectTrigger className="flex-1 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="habitation">Habitation</SelectItem>
                  <SelectItem value="sante">Santé</SelectItem>
                  <SelectItem value="decennale">Décennale</SelectItem>
                </SelectContent>
              </Select>

              {/* Policy type */}
              <Select defaultValue="full">
                <SelectTrigger className="flex-1 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full coverage</SelectItem>
                  <SelectItem value="third-party">Third party</SelectItem>
                  <SelectItem value="third-party-plus">Third party +</SelectItem>
                </SelectContent>
              </Select>

              {/* Zip code */}
              <input
                type="text"
                placeholder="Code postal"
                maxLength={5}
                className="h-11 flex-1 bg-white rounded-lg px-4 text-sm text-[#131212] placeholder:text-gray-400 border border-input focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] w-full min-w-0"
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
