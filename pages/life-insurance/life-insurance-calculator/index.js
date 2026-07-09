import { useState } from "react";
import Head from "next/head";
import { libreCaslon } from "@/lib/fonts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Footer from "../../../components/Footer";

const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

function PageBreadcrumb() {
  return (
    <Breadcrumb className={`${cx} pt-6 pb-2`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/life-insurance/">Assurance vie</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Calculateur</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function Hero() {
  return (
    <div className="w-full py-4 px-4 lg:px-12 2xl:px-24">
      <div className="flex overflow-hidden rounded-xl">
        <div className="flex-1 bg-[var(--color-brand)] px-10 pt-20 lg:pt-[140px] pb-20 flex items-end">
          <h1 className="text-[26px] lg:text-[33px] font-semibold leading-none text-white">
            Calculateur d&apos;assurance vie
          </h1>
        </div>
        <div className="hidden sm:block w-1/2 min-h-[260px] lg:min-h-[340px] relative">
          <img
            src="/finished_scrolling.jpg"
            alt="Calculateur assurance vie"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

function Calculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [coverage, setCoverage] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState(null);

  function handleCalculate() {
    if (!age || !gender || !coverage || !duration) return;
    const base = parseInt(coverage) * 0.0004;
    const ageFactor = 1 + (parseInt(age) - 30) * 0.03;
    const genderFactor = gender === "homme" ? 1.05 : 1;
    const monthly = Math.round(base * ageFactor * genderFactor * 10) / 10;
    setResult(monthly);
  }

  return (
    <div className={`${cx} py-10 pb-16`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-0 flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <h2 className={`text-[30px] leading-tight text-[var(--color-text)] ${libreCaslon.className}`}>
            Estimez votre prime mensuelle
          </h2>
          <p className="text-base text-gray-600 leading-[26px] sm:leading-6">
            Renseignez vos informations pour obtenir une estimation indicative de votre cotisation mensuelle.
          </p>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">Âge</label>
            <input
              type="number"
              min={18}
              max={75}
              placeholder="Ex : 35"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-11 w-full rounded-lg border border-input px-4 text-sm text-[var(--color-text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">Genre</label>
            <Select onValueChange={setGender}>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homme">Homme</SelectItem>
                <SelectItem value="femme">Femme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">Capital souhaité</label>
            <Select onValueChange={setCoverage}>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50000">50 000 €</SelectItem>
                <SelectItem value="100000">100 000 €</SelectItem>
                <SelectItem value="150000">150 000 €</SelectItem>
                <SelectItem value="200000">200 000 €</SelectItem>
                <SelectItem value="300000">300 000 €</SelectItem>
                <SelectItem value="500000">500 000 €</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">Durée du contrat</label>
            <Select onValueChange={setDuration}>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 ans</SelectItem>
                <SelectItem value="15">15 ans</SelectItem>
                <SelectItem value="20">20 ans</SelectItem>
                <SelectItem value="25">25 ans</SelectItem>
                <SelectItem value="30">30 ans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleCalculate}
            className="cta-btn text-white text-base font-medium py-[25px] px-[15px] w-full mt-2"
          >
            Calculer mon estimation
          </Button>
        </div>

        {result !== null && (
          <div className="rounded-xl bg-[var(--color-light)] p-8 flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estimation indicative</p>
            <p className={`text-[42px] leading-none text-[var(--color-text)] ${libreCaslon.className}`}>
              {result} €<span className="text-[20px] text-gray-500"> / mois</span>
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Cette estimation est fournie à titre indicatif. Le tarif définitif dépend de votre profil médical et des conditions de l&apos;assureur.
            </p>
            <Button className="cta-btn text-white text-base font-medium py-[25px] px-[15px] w-fit mt-2">
              Devis gratuit
            </Button>
          </div>
        )}

        <p className="text-sm text-gray-400 leading-relaxed">
          * Les estimations fournies par ce calculateur sont à titre indicatif uniquement et ne constituent pas un engagement contractuel. Contactez un conseiller New World Courtage pour un devis personnalisé.
        </p>

      </div>
    </div>
  );
}

export default function LifeInsuranceCalculatorPage() {
  return (
    <>
      <Head>
        <title>Calculateur d&apos;assurance vie — New World Courtage</title>
        <meta
          name="description"
          content="Estimez votre prime d'assurance vie en quelques clics. Calculateur gratuit pour connaître le coût de votre couverture selon votre âge, capital et durée."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/life-insurance/life-insurance-calculator/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.newworldcourtage.fr/life-insurance/life-insurance-calculator/" />
        <meta property="og:title" content="Calculateur d'assurance vie — New World Courtage" />
        <meta property="og:description" content="Estimez votre prime d'assurance vie en quelques clics." />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="New World Courtage" />
      </Head>

      <main>
        <PageBreadcrumb />
        <Hero />
        <Calculator />
      </main>

      <Footer />
    </>
  );
}
