import Head from "next/head";
import Link from "next/link";
import { Libre_Caslon_Text } from "next/font/google";
import { Star, ChevronRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "../../components/Footer";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// ── Stars ─────────────────────────────────────────────────────────────────────

function StarRow({ score = 5, size = 18 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(score)
              ? "fill-[#00b67a] text-[#00b67a]"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav aria-label="Fil d'ariane" className="px-4 lg:px-12 2xl:px-24 pt-6 pb-2">
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

// ── Page header + featured review ────────────────────────────────────────────

function FeaturedReview() {
  return (
    <>
      {/* Orange hero box with title at bottom-left */}
      <div className="w-full bg-[var(--color-brand)] px-4 lg:px-12 2xl:px-24 pt-16 pb-8 flex items-end">
        <h1 className="text-[48px] lg:text-[68px] font-bold leading-[1.0] text-white">
          Customer Reviews
        </h1>
      </div>

      {/* Review content */}
      <section className="w-full py-10 lg:py-14">
        <div className="px-4 lg:px-12 2xl:px-24 flex flex-col gap-6 max-w-3xl">
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-semibold text-[#131212]">Catherine D.</p>
            <p className="text-[13px] text-gray-400">Cliente depuis 2024 &middot; Lyon, Auvergne-Rhône-Alpes</p>
          </div>
          <blockquote className="flex flex-col gap-3">
            <p className="text-[22px] leading-[1.4] text-[#131212]">
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
    </>
  );
}

// ── Customer quotes ───────────────────────────────────────────────────────────

const QUOTES = [
  {
    id: 1,
    name: "Thomas B.",
    location: "Paris, Île-de-France",
    score: 5,
    text: "Un service vraiment à l'écoute. J'ai obtenu un devis en moins d'une heure et mon conseiller a pris le temps de tout m'expliquer. Je recommande vivement.",
    date: "mars 2025",
  },
  {
    id: 2,
    name: "Isabelle M.",
    location: "Bordeaux, Nouvelle-Aquitaine",
    score: 5,
    text: "Après avoir essayé plusieurs comparateurs en ligne, New World Courtage a été de loin la meilleure expérience. Humain, rapide et efficace. Résultat : 30 % d'économies sur mon assurance auto.",
    date: "février 2025",
  },
  {
    id: 3,
    name: "Ahmed K.",
    location: "Marseille, PACA",
    score: 4,
    text: "Très bonne prise en charge. Quelques délais de réponse un peu longs au début, mais le résultat final était excellent. Une belle économie sur mon assurance auto.",
    date: "janvier 2025",
  },
  {
    id: 4,
    name: "Nathalie R.",
    location: "Nantes, Pays de la Loire",
    score: 5,
    text: "Je ne pensais pas qu'il était possible d'économiser autant. Le conseiller a trouvé une offre qui correspond parfaitement à mes besoins et à ceux de ma famille.",
    date: "avril 2025",
  },
  {
    id: 5,
    name: "David P.",
    location: "Lille, Hauts-de-France",
    score: 5,
    text: "Le processus est simple, transparent et sans surprise. J'ai souscrit en quelques clics après un appel de conseil. Parfait.",
    date: "mars 2025",
  },
  {
    id: 6,
    name: "Lucie V.",
    location: "Strasbourg, Grand Est",
    score: 5,
    text: "Enfin un courtier qui explique vraiment ce que l'on souscrit. Pas de jargon inutile, juste des conseils clairs et honnêtes. Merci !",
    date: "décembre 2024",
  },
  {
    id: 7,
    name: "Karim S.",
    location: "Lyon, Auvergne-Rhône-Alpes",
    score: 5,
    text: "J'ai contacté New World Courtage pour une assurance décennale. Le dossier a été traité rapidement et le prix était compétitif. Je reviendrai sans hésiter.",
    date: "novembre 2024",
  },
  {
    id: 8,
    name: "Émilie T.",
    location: "Toulouse, Occitanie",
    score: 4,
    text: "Très bonne expérience globale. Le service client est réactif et professionnel. J'aurais aimé plus d'options pour la mutuelle santé, mais dans l'ensemble je suis très satisfaite.",
    date: "octobre 2024",
  },
];

function QuoteCard({ name, location, score, text, date }) {
  return (
    <Card className="rounded-[12px] flex flex-col">
      <CardContent className="pt-6 flex flex-col gap-4 h-full">
        <StarRow score={score} size={16} />
        <p className="text-[14.5px] text-gray-700 leading-relaxed flex-1">
          &ldquo;{text}&rdquo;
        </p>
        <div className="pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            <p className={`text-[16px] text-[#131212] ${libreCaslon.className}`}>{name}</p>
            <p className="text-[12px] text-gray-400">{location}</p>
          </div>
          <p className="text-[11px] text-gray-400 shrink-0">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function QuotesSection() {
  return (
    <section className="w-full py-10 lg:py-16 bg-[var(--color-light)]">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="flex flex-col gap-3 mb-10">
          <h2
            className={`text-[32px] lg:text-[42px] leading-[1.15] text-[#131212] ${libreCaslon.className}`}
          >
            Ce que disent nos <em className="italic">autres clients</em>
          </h2>
          <p className="text-[15px] text-gray-500 max-w-xl">
            Des centaines de clients nous font confiance chaque année pour trouver la meilleure couverture au meilleur prix.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUOTES.map((q) => (
            <QuoteCard key={q.id} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TrustPilot block ──────────────────────────────────────────────────────────

// TrustPilot star box — fill: 0–1 controls how much of the square is green
function TpStarBox({ fill = 1 }) {
  const clip = Math.round((1 - fill) * 100);
  return (
    <div className="relative w-11 h-11 rounded-[3px] overflow-hidden shrink-0">
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
    <section className="w-full py-8">
      <div className="px-4 lg:px-12 2xl:px-24 flex justify-center">
        <div className="inline-flex flex-col items-start gap-2 border-y-2 border-[#00b67a] py-1">

          {/* Trustpilot wordmark */}
          <img
            src="/Trustpilot_Logo_(2022).svg"
            alt="Trustpilot"
            className="h-8 w-auto"
          />

          {/* Stars + score */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {starFills.map((fill, i) => (
                <TpStarBox key={i} fill={fill} />
              ))}
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[19px] font-bold text-[#131212]">
                TrustScore {score} sur 5
              </p>
              <a
                href="https://www.trustpilot.com/review/newworldcourtage.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[19px] text-[var(--color-brand)] underline hover:text-[var(--color-brand-hover)]"
              >
                Basé sur {reviewCount} avis
              </a>
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
        <FeaturedReview />
        <TrustPilotBlock />
        <QuotesSection />
      </main>

      <Footer />
    </>
  );
}
