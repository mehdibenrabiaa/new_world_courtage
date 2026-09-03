import Head from "next/head";
import Link from "next/link";
import { libreCaslon } from "@/lib/fonts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";

const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";

const CATEGORIES = [
  { id: "flotte-transport", label: "Flotte & Transport", href: "/assurance-transport/devis/", icon: "/icons/truck.svg" },
  { id: "pro-auto",         label: "Pro de l'auto",       href: "/assurance-pro-auto/",         icon: "/icons/car.svg" },
  { id: "construction",     label: "Construction",         href: "/assurance-construction/",     icon: "/icons/building.svg" },
  { id: "immobilier",       label: "Immobilier",           href: "/assurance-immobilier/",       icon: "/icons/home.svg" },
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
          <BreadcrumbPage>Devis gratuit</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function Hero() {
  return (
    <div className={cx}>
      <div className="bg-[var(--color-brand)] px-10 pt-20 lg:pt-[140px] pb-8 flex items-end">
        <h1 className="text-[24px] lg:text-[30px] font-semibold leading-none text-white">
          Devis gratuit
        </h1>
      </div>
    </div>
  );
}

function CategoryPicker() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h2 className={`text-[8vw] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
            Quelle assurance <em className={`italic ${libreCaslon.className}`}>recherchez-vous ?</em>
          </h2>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Choisissez votre activité pour démarrer votre demande de devis gratuit et sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIES.map(({ id, label, href, icon }) => (
            <Link key={id} href={href}>
              <Card className="shadow-none rounded-xl h-[150px] flex flex-col items-center justify-center gap-3 px-3 border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                <img src={icon} alt="" width={42} height={42} aria-hidden="true" className="shrink-0 w-10 h-10" />
                <span className="text-[15px] font-medium text-[var(--color-text)] text-center leading-tight">{label}</span>
              </Card>
            </Link>
          ))}
        </div>
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
        <PageBreadcrumb />
        <Hero />
        <CategoryPicker />
      </main>
    </>
  );
}
