import Head from "next/head";
import PhotoHero from "@/components/PhotoHero";
import TrustPilot from "../../components/TrustPilot";
import { TESTIMONIALS } from "../../components/RealCustomers";

const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";



// A real, published Trustpilot review (same source as the home page reviews),
// linked to its original.
const FEATURED_REVIEW = TESTIMONIALS.find((review) => review.name === "Mehdi EL");

function FeaturedReview() {
  const { title, quote, name, href } = FEATURED_REVIEW;
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] font-semibold text-[var(--color-text)]">{name}</p>
          <p className="text-[14px] text-gray-400">Avis publié sur Trustpilot</p>
        </div>
        <blockquote className="flex flex-col gap-3">
          <p className="text-[20px] lg:text-[24px] leading-[1.4] text-[var(--color-text)]">&ldquo;{title}&rdquo;</p>
          <p className="text-[16px] text-gray-500 leading-relaxed">{quote}</p>
        </blockquote>
        <a href={href} target="_blank" rel="noopener noreferrer" className="w-fit text-[15px] font-bold text-[var(--color-brand)] hover:underline">
          Voir l&apos;avis sur Trustpilot
        </a>
      </div>
    </section>
  );
}

export default function AvisClientsPage() {
  return (
    <>
      <Head>
        <title>Avis clients — New World Courtage</title>
        <meta
          name="description"
          content="Découvrez les avis de nos clients sur New World Courtage. Plus de 247 avis vérifiés et une note Excellent sur Trustpilot."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/a-propos/avis-clients/" />
      </Head>

      <main>
        <PhotoHero
          breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos", href: "/a-propos/" }, { label: "Avis clients" }]}
          image="/sections/done-scrolling-desktop.webp"
          mobileImage="/sections/done-scrolling-mobile.webp"
          title={<>Avis <em>clients</em>.</>}
          subtitle="Ce que nos clients disent de leur expérience avec New World Courtage."
        />
        <FeaturedReview />
        <TrustPilot className={cx} />
      </main>
    </>
  );
}
