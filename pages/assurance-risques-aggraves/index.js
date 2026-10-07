import Head from "next/head";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import Testimonials from "@/components/Testimonials";
import { headingFont } from "@/lib/fonts";

const PHONE = { display: "07 45 89 18 65", href: "tel:+33745891865" };

// Call-back / phone buttons, shared by the hero and the closing band.
function ContactButtons() {
  return (
    <>
      <Link
        href="/contact/"
        className="inline-flex h-12 items-center justify-center gap-0.5 border border-white/70 px-6 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
      >
        Être rappelé
        <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
      </Link>
      <a
        href={PHONE.href}
        className="inline-flex h-12 items-center justify-center gap-2 bg-[#3b9bd8] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#2c87c2]"
      >
        <Phone size={16} aria-hidden="true" />
        {PHONE.display}
      </a>
    </>
  );
}

export default function AssuranceRisquesAggravesPage() {
  return (
    <>
      <Head>
        <title>Assurance Risques Aggravés Auto & Moto — New World Courtage</title>
        <meta
          name="description"
          content="Malussé, résilié par votre assureur ou après une suspension de permis ? Nos conseillers trouvent une assurance auto ou moto adaptée à votre profil."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/assurance-risques-aggraves/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Assurance risques aggravés" }]}
          title={<>L&apos;assurance <em>risques aggravés</em>.</>}
          subtitle="Malus, résiliation, suspension de permis : nos conseillers cherchent un assureur qui accepte votre profil, en auto comme en moto."
          image="/heroes/risques-aggraves-desktop.webp"
          mobileImage="/heroes/risques-aggraves-mobile.webp"
          imageAlt="Conducteur au volant en ville au coucher du soleil"
        >
          <ContactButtons />
        </PhotoHero>

        <Testimonials
          bgColor="#f5f5f3"
          image="/pages/risques-aggraves.webp"
          imageAlt="Conducteur au volant de sa voiture"
          label="Pour qui ?"
          heading="Une solution pour les"
          headingItalic="conducteurs à risques aggravés."
          description="Être malussé ou résilié ne vous empêche pas de rouler assuré. Nous comparons les offres d'assureurs spécialisés qui acceptent ces profils, et vous accompagnons jusqu'à la souscription."
          points={[
            "Conducteurs malussés",
            "Résiliés par leur assureur (sinistres, non-paiement)",
            "Suspension, annulation ou retrait de permis",
            "Voitures, motos et scooters",
          ]}
        />

        <section className="w-full py-4">
          <div className="px-4 lg:px-12 2xl:px-24">
            <div className="flex flex-col gap-6 bg-[var(--color-brand)] px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
              <div className="flex max-w-2xl flex-col gap-3">
                <h2 className={`text-[28px] leading-[1.1] sm:text-[34px] lg:text-[40px] ${headingFont.className}`}>
                  Parlons de <em className={headingFont.className}>votre situation.</em>
                </h2>
                <p className="text-base leading-relaxed text-white/85">
                  Chaque dossier est différent. Un conseiller étudie le vôtre et vous rappelle avec les solutions possibles — gratuitement et sans engagement.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ContactButtons />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
