import Head from "next/head";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageHero from "../../../components/PageHero";
import CarCalculatorSection from "../../../components/CarCalculatorSection";
import CarInsuranceProcess from "../../../components/CarInsuranceProcess";
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
          <BreadcrumbLink href="/assurance-auto/">Assurance auto</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Calculateur</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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
        <PageBreadcrumb />
        <PageHero title={<>Calculez <em className="italic">rapidement</em> vos besoins en<br className="hidden lg:block" />assurance automobile.</>} image="/auto-insurance-calculator.jpg" imageAlt="Calculateur assurance auto" titlePosition="bottom" titleClassName="!text-[7vw] sm:!text-[36px] lg:!text-[48px]" />
        <CarCalculatorSection />
        <CarInsuranceProcess />
      </main>

      <Footer />
    </>
  );
}
