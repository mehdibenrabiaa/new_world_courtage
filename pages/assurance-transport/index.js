import Head from "next/head";
import Link from "next/link";
import { libreCaslon } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
          <BreadcrumbPage>Assurance auto</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function HeroWithForm() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full min-h-[400px] lg:min-h-[560px] overflow-hidden rounded-none lg:rounded-xl">

          {/* Background image */}
          <picture className="absolute inset-0 w-full h-full">
            <source media="(max-width: 1023px)" srcSet="/auto-insurance-calculator-mobile.jpg" />
            <img
              src="/auto-insurance-calculator.jpg"
              alt="Assurance auto New World Courtage"
              className="w-full h-full object-cover object-center"
            />
          </picture>

          {/* White container at bottom — title + form */}
          <div className="relative z-10 h-full min-h-[400px] lg:min-h-[560px] flex flex-col justify-end">
            <div className="bg-white pl-4 sm:pl-6 pr-4 sm:pr-16 pt-5 pb-5 w-full sm:w-[90%] lg:w-[80%] rounded-tr-none sm:rounded-tr-[60px] flex flex-col gap-4">

              <h1 className={`text-[7vw] sm:text-[36px] lg:text-[48px] text-[var(--color-text)] leading-[1.15] mb-2 ${libreCaslon.className}`}>
                Le bon contrat d&apos;assurance auto commence par un{" "}
                <em className={`italic ${libreCaslon.className}`}>simple devis.</em>
              </h1>

              {/* Form */}
              <div className="bg-[var(--color-brand)] rounded-lg p-6 flex flex-col md:flex-row md:items-end gap-4">

                <div className="flex flex-col gap-1.5 w-full md:flex-1">
                  <label className="text-[13px] font-semibold text-white">Type d&apos;assurance</label>
                  <Select defaultValue="auto">
                    <SelectTrigger className="bg-white w-full h-10">
                      <SelectValue>{`Auto`}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="habitation">Habitation</SelectItem>
                      <SelectItem value="sante">Santé</SelectItem>
                      <SelectItem value="decennale">Décennale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 w-full md:flex-1">
                  <label className="text-[13px] font-semibold text-white">Couverture</label>
                  <Select defaultValue="full">
                    <SelectTrigger className="bg-white w-full h-10">
                      <SelectValue>{`Full coverage`}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full coverage</SelectItem>
                      <SelectItem value="third-party">Third party</SelectItem>
                      <SelectItem value="third-party-plus">Third party +</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 w-full md:flex-1">
                  <label className="text-[13px] font-semibold text-white">Code postal</label>
                  <input
                    type="text"
                    placeholder="75001"
                    maxLength={5}
                    className="h-10 bg-white rounded-md px-4 text-sm text-[var(--color-text)] placeholder:text-gray-400 border border-input focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] w-full"
                  />
                </div>

                <Link href="/assurance-auto/calculateur/" className="w-full md:w-auto shrink-0">
                  <Button className="h-10 bg-white hover:bg-gray-100 text-black font-semibold px-6 rounded-md w-full">
                    Commencer
                  </Button>
                </Link>

              </div>
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
        <PageBreadcrumb />
        <HeroWithForm />
      </main>
    </>
  );
}
