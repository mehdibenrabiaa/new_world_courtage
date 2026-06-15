import Head from "next/head";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../../components/Footer";

// Shared horizontal padding applied to every section
const cx = "px-4 sm:px-8 lg:px-28 2xl:px-44";

// ── Breadcrumb ────────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav aria-label="Fil d'ariane" className={`${cx} pt-6 pb-2`}>
      <ol className="flex items-center gap-1.5 flex-wrap text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">
            Accueil
          </Link>
        </li>
        <li><ChevronRight size={13} className="text-gray-300" /></li>
        <li>
          <Link href="/about/" className="hover:text-[var(--color-brand)] transition-colors">
            À propos
          </Link>
        </li>
        <li><ChevronRight size={13} className="text-gray-300" /></li>
        <li className="text-[#131212] font-medium">Avis clients</li>
      </ol>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <div className={cx}>
      <div className="bg-[var(--color-brand)] px-8 pt-16 lg:pt-[120px] pb-5 flex items-end">
        <h1 className="text-[20px] font-bold leading-none text-white">
          Customer Reviews
        </h1>
      </div>
    </div>
  );
}

// ── Featured review ───────────────────────────────────────────────────────────

function FeaturedReview() {
  return (
    <section className={`${cx} py-10 lg:py-14`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] font-semibold text-[#131212]">Catherine D.</p>
          <p className="text-[13px] text-gray-400">
            Cliente depuis 2024 &middot; Lyon, Auvergne-Rhône-Alpes
          </p>
        </div>
        <blockquote className="flex flex-col gap-3">
          <p className="text-[18px] lg:text-[22px] leading-[1.4] text-[#131212]">
            &ldquo;Je cherchais une assurance habitation depuis plusieurs semaines sans
            trouver d&apos;offre adaptée à mon budget. L&apos;équipe de New World
            Courtage a compris mes besoins dès le premier appel.&rdquo;
          </p>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            En moins de 48 heures, ils m&apos;ont présenté trois offres comparées,
            clairement expliquées, avec les avantages et les limites de chacune.
            J&apos;ai pu poser toutes mes questions sans me sentir pressée. Le
            conseiller a été patient, professionnel et vraiment à l&apos;écoute.
            J&apos;ai finalement souscrit une formule qui me protège bien mieux que
            mon ancienne assurance, pour 20&nbsp;% moins cher. Je recommande sans
            hésitation à toute personne qui souhaite gagner du temps et faire de
            vraies économies.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

// ── TrustPilot ────────────────────────────────────────────────────────────────

function TpStarBox({ fill = 1 }) {
  const clip = Math.round((1 - fill) * 100);
  return (
    <div className="relative w-9 h-9 sm:w-11 sm:h-11 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-[#dcdce6]" />
      {fill > 0 && (
        <div
          className="absolute inset-0 bg-[#00b67a]"
          style={{ clipPath: `inset(0 ${clip}% 0 0)` }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 120 115" xmlns="http://www.w3.org/2000/svg" className="w-[58%] h-[58%]">
          <polygon
            fill="white"
            points="60,8.7 74.9,48.8 117.6,48.8 83.4,73.1 96.4,113.1 60,88.8 23.6,113.1 36.6,73.1 2.4,48.8 45.1,48.8"
          />
        </svg>
      </div>
    </div>
  );
}

function TrustPilotBlock() {
  const score = 4.8;
  const reviewCount = 247;
  const starFills = [1, 1, 1, 1, 0.8];

  return (
    <section className={`${cx} py-8`}>
      <div className="max-w-3xl border-y border-[#00b67a] py-5 flex justify-center">
        <div className="flex flex-col items-start gap-0">
          <img
            src="/Trustpilot_Logo_(2022).svg"
            alt="Trustpilot"
            className="h-8 w-auto"
          />
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              {starFills.map((fill, i) => (
                <TpStarBox key={i} fill={fill} />
              ))}
            </div>
            <div className="flex flex-col gap-0 py-2">
              <p className="text-[16px] font-bold text-[#131212]">
                TrustScore {score} sur 5
              </p>
              <Button
                variant="link"
                asChild
                className="h-auto p-0 text-[16px] font-normal text-[var(--color-brand)] justify-start underline"
              >
                <a
                  href="https://www.trustpilot.com/review/newworldcourtage.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Basé sur {reviewCount} avis
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  return (
    <>
      <Head>
        <title>Avis clients — New World Courtage</title>
        <meta
          name="description"
          content="Découvrez les avis de nos clients sur New World Courtage. Plus de 247 avis vérifiés et une note Excellent sur Trustpilot."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newworldcourtage.fr/about/reviews" />
      </Head>

      <main>
        <Breadcrumb />
        <Hero />
        <FeaturedReview />
        <TrustPilotBlock />
      </main>

      <Footer />
    </>
  );
}
