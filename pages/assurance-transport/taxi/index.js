import Head from "next/head";
import Link from "next/link";
import { libreCaslon } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Umbrella, Scale } from "lucide-react";
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
import Testimonials from "../../../components/Testimonials";
import InfoCardsSection from "../../../components/InfoCardsSection";
import FinishedScrolling from "../../../components/FinishedScrolling";

const cx = "px-4 sm:px-8 lg:px-16 2xl:px-24";

const GUIDE_CARDS = [
  {
    Icon: ClipboardCheck,
    title: "Comment souscrire une assurance taxi ?",
    description: "Vous pouvez souscrire directement auprès d'un assureur, via un agent ou en faisant appel à un courtier spécialisé comme New World Courtage pour comparer les offres du marché.",
    href: "/assurance-transport/taxi/comment-souscrire/",
  },
  {
    Icon: Umbrella,
    title: "De quelle couverture ai-je besoin ?",
    description: "Choisir la bonne couverture dépend de la valeur de votre véhicule, de votre historique de sinistres et du niveau de risque lié à votre activité de chauffeur de taxi.",
    href: "/assurance-transport/taxi/couverture/",
  },
  {
    Icon: Scale,
    title: "Comment choisir son assurance taxi ?",
    description: "Garanties, franchise, exclusions, tarif — notre équipe vous guide vers le contrat le plus adapté à votre activité, pour vous protéger au meilleur prix.",
    href: "/assurance-transport/taxi/comment-choisir/",
  },
];

const OFFER_CARDS = [
  {
    image: "/taxi_page.png",
    imageAlt: "Assurance artisan taxi",
    title: "Nous assurons les artisans taxi depuis plus de 10 ans",
    description: "Nous proposons une assurance taxi avec une couverture optimale au meilleur tarif. Nous négocions pour vous avec des assureurs spécialistes et reconnus de l'assurance taxi.",
    href: "/assurance-transport/taxi/comment-souscrire/",
  },
  {
    image: "/auto-insurance-calculator.jpg",
    imageAlt: "Couverture assurance taxi",
    title: "Une couverture adaptée aux risques de votre activité",
    description: "L'assurance taxi comporte de nombreuses spécificités : RC professionnelle, couverture du véhicule, assurance du chauffeur et des passagers. Ces garanties sont incluses dans tous nos contrats de base.",
    href: "/assurance-transport/taxi/couverture/",
  },
  {
    image: "/auto-insurance-calculator-mobile.jpg",
    imageAlt: "Devis assurance taxi",
    title: "Votre assurance taxi moins chère",
    description: "Nous bénéficions de tarifs exceptionnels négociés avec les plus grandes compagnies d'assurance, entièrement répercutés auprès de nos clients. Devis sous 24h.",
    href: "/assurance-transport/taxi/comment-choisir/",
  },
  {
    image: "/taxi_page.png",
    imageAlt: "Responsabilité civile taxi",
    title: "Responsabilité civile : une protection indispensable",
    description: "La RC professionnelle spécifique aux artisans taxi couvre les dommages causés à vos passagers et aux tiers lors de votre activité de transport rémunéré.",
    href: "/assurance-transport/taxi/rc-professionnelle/",
  },
  {
    image: "/auto-insurance-calculator.jpg",
    imageAlt: "Options assurance taxi",
    title: "Des options pour renforcer votre couverture",
    description: "Perte de recette, assistance dépannage, garantie car-jacking, récupération de points... Personnalisez votre contrat selon vos besoins réels.",
    href: "/assurance-transport/taxi/options/",
  },
  {
    image: "/auto-insurance-calculator-mobile.jpg",
    imageAlt: "Devis en ligne taxi",
    title: "Devis en ligne sous 24h",
    description: "Remplissez notre formulaire dédié et l'un de nos experts vous envoie par mail une proposition détaillée sous 24h, sans engagement.",
    href: "/assurance-transport/calculateur/",
  },
];

function PageBreadcrumb() {
  return (
    <Breadcrumb className={`${cx} pt-6 pb-2`}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/assurance-transport/">Flotte &amp; Transport</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Assurance taxi</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function HeroWithForm() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full min-h-[560px] lg:min-h-[720px] overflow-hidden rounded-none lg:rounded-xl">

          <picture className="absolute inset-0 w-full h-full">
            <source media="(max-width: 1023px)" srcSet="/taxi_page.png" />
            <img
              src="/taxi_page.png"
              alt="Assurance taxi New World Courtage"
              className="w-full h-full object-cover object-center"
            />
          </picture>

          <div className="relative z-10 h-full min-h-[560px] lg:min-h-[720px] flex flex-col justify-end">
            <div className="bg-white pl-4 sm:pl-6 pr-4 sm:pr-16 pt-5 pb-5 w-full sm:w-[90%] lg:w-[80%] max-w-[900px] rounded-tr-none sm:rounded-tr-[60px] flex flex-col gap-4">

              <h1 className={`text-[7vw] sm:text-[36px] lg:text-[55px] text-[var(--color-text)] leading-[1.15] mb-2 ${libreCaslon.className}`}>
                Le bon contrat d&apos;assurance taxi commence par un{" "}
                <em className={`italic ${libreCaslon.className}`}>simple devis.</em>
              </h1>

              <div className="bg-[var(--color-brand)] rounded-lg p-6 flex flex-col md:flex-row md:items-end gap-4">

                <div className="flex flex-col gap-1.5 w-full md:flex-1">
                  <label className="text-[15px] font-semibold text-white">Type d&apos;assurance</label>
                  <Select defaultValue="taxi">
                    <SelectTrigger className="bg-white w-full h-10">
                      <SelectValue>{`Taxi`}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taxi">Taxi</SelectItem>
                      <SelectItem value="vtc">Chauffeur VTC</SelectItem>
                      <SelectItem value="ambulance">Ambulance</SelectItem>
                      <SelectItem value="transport-public">Transport public de voyageurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 w-full md:flex-1">
                  <label className="text-[15px] font-semibold text-white">Couverture</label>
                  <Select defaultValue="full">
                    <SelectTrigger className="bg-white w-full h-10">
                      <SelectValue>{`Tous risques`}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Tous risques</SelectItem>
                      <SelectItem value="third-party">Au tiers</SelectItem>
                      <SelectItem value="third-party-plus">Au tiers étendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 w-full md:flex-1">
                  <label className="text-[15px] font-semibold text-white">Bonus malus</label>
                  <Select defaultValue="1.00">
                    <SelectTrigger className="bg-white w-full h-10">
                      <SelectValue>{`1.00`}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.50">0.50 — Bonus maximum</SelectItem>
                      <SelectItem value="0.60">0.60</SelectItem>
                      <SelectItem value="0.70">0.70</SelectItem>
                      <SelectItem value="0.80">0.80</SelectItem>
                      <SelectItem value="0.90">0.90</SelectItem>
                      <SelectItem value="1.00">1.00 — Référence</SelectItem>
                      <SelectItem value="1.25">1.25</SelectItem>
                      <SelectItem value="1.50">1.50</SelectItem>
                      <SelectItem value="2.00">2.00</SelectItem>
                      <SelectItem value="2.50">2.50</SelectItem>
                      <SelectItem value="3.50">3.50 — Malus maximum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Link href="/assurance-transport/calculateur/" className="w-full md:w-auto shrink-0">
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

export default function AssuranceTaxiPage() {
  return (
    <>
      <Head>
        <title>Assurance Taxi — New World Courtage</title>
        <meta
          name="description"
          content="Comparez les meilleures offres d'assurance taxi. Obtenez un devis gratuit en quelques minutes et protégez votre activité de transport de personnes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-transport/taxi/" />
      </Head>

      <main>
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <PageBreadcrumb />
        </div>
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <HeroWithForm />
        </div>

        <Testimonials
          bgColor="#f5f5f3"
          label="Garanties incluses"
          heading="Ce que couvre votre"
          headingItalic="assurance taxi."
          description="Tous nos contrats d'assurance taxi incluent les garanties de base obligatoires pour exercer votre activité en toute sérénité — négociées avec les meilleurs assureurs du marché."
          points={[
            "Responsabilité civile professionnelle artisan taxi",
            "Couverture du véhicule (dommages, vol, incendie)",
            "Assurance du chauffeur de taxi",
            "Protection des passagers transportés",
          ]}
        />

        <InfoCardsSection
          title="Pas sûr par où"
          titleItalic="commencer ?"
          subtitle="Explorez nos guides pour tout savoir sur l'assurance taxi."
          cardStyle="style1"
          showLink
          titleFont="serif"
          layout="grid"
          items={GUIDE_CARDS}
        />

        <InfoCardsSection
          title="Guides & conseils"
          titleItalic="assurance."
          subtitle="Tout ce que vous devez savoir avant de souscrire votre assurance taxi — expliqué simplement par nos experts."
          cardStyle="style2"
          showLink
          withContainer
          titleFont="sans"
          layout="scroll"
          ctaLabel="Lire plus de guides"
          ctaHref="/assurance-transport/taxi/"
          items={OFFER_CARDS}
        />
        <FinishedScrolling />
      </main>
    </>
  );
}
