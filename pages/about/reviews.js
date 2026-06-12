import Head from "next/head";
import Link from "next/link";
import { Libre_Caslon_Text } from "next/font/google";
import { Star, ChevronRight, ExternalLink } from "lucide-react";
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

// ── Featured review ───────────────────────────────────────────────────────────

function FeaturedReview() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Photo */}
          <div className="relative rounded-[16px] overflow-hidden aspect-[4/3]">
            <img
              src="/section2.jpg"
              alt="Catherine D., cliente New World Courtage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-[16px]" />
          </div>

          {/* Review */}
          <div className="flex flex-col gap-6">
            <StarRow score={5} size={22} />
            <blockquote className="flex flex-col gap-4">
              <p className={`text-[24px] lg:text-[30px] leading-[1.35] text-[#131212] ${libreCaslon.className}`}>
                <em>
                  &ldquo;Je cherchais une assurance habitation depuis plusieurs semaines sans
                  trouver d&apos;offre adaptée à mon budget. L&apos;équipe de New World
                  Courtage a compris mes besoins dès le premier appel.&rdquo;
                </em>
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
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
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-1">
              <p className={`text-[20px] text-[#131212] ${libreCaslon.className}`}>
                Catherine D.
              </p>
              <p className="text-sm text-gray-500">
                Cliente depuis 2024 &middot; Lyon, Auvergne-Rhône-Alpes
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
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
    <div className="bg-white rounded-[12px] p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">
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
    </div>
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

function TrustPilotStar({ filled = true }) {
  return (
    <div
      className={`w-11 h-11 flex items-center justify-center rounded-[2px] ${filled ? "bg-[#00b67a]" : "bg-[#dcdce6]"}`}
    >
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <polygon
          fill="white"
          points="30,5 37.5,22.5 57,22.5 42,35 48,54 30,43 12,54 18,35 3,22.5 22.5,22.5"
        />
      </svg>
    </div>
  );
}

function TrustPilotBlock() {
  const score = 4.8;
  const reviewCount = 247;

  return (
    <section className="w-full py-14 lg:py-20">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-blue-navy)] text-white px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left — score */}
          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            {/* Trustpilot wordmark */}
            <div className="flex items-center gap-2.5">
              <TrustPilotStar filled />
              <span className="text-[26px] font-semibold tracking-tight text-white">
                Trustpilot
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[52px] lg:text-[64px] font-bold leading-none text-white">
                {score}
              </p>
              <p className="text-[15px] text-white/70">
                Noté <strong className="text-white">Excellent</strong> sur {reviewCount} avis vérifiés
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <TrustPilotStar key={i} filled />
              ))}
            </div>
          </div>

          {/* Right — description + CTA */}
          <div className="flex flex-col gap-6 max-w-md text-center lg:text-left">
            <p className={`text-[22px] lg:text-[28px] leading-[1.35] text-white ${libreCaslon.className}`}>
              <em>
                &ldquo;La satisfaction de nos clients est notre meilleure
                récompense.&rdquo;
              </em>
            </p>
            <p className="text-[14px] text-white/70 leading-relaxed">
              Tous nos avis sont collectés et vérifiés par Trustpilot, la plateforme
              d&apos;avis indépendante de référence. Consultez l&apos;ensemble de nos
              évaluations directement sur leur site.
            </p>
            <div>
              <a
                href="https://www.trustpilot.com/review/newworldcourtage.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00b67a] hover:bg-[#00a366] transition-colors text-white font-semibold text-[14px] px-6 py-3 rounded-full"
              >
                Voir nos avis sur Trustpilot
                <ExternalLink size={14} />
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

        {/* Page header */}
        <div className="px-4 lg:px-12 2xl:px-24 pt-8 pb-4">
          <h1
            className={`text-[38px] lg:text-[54px] leading-[1.1] text-[#131212] ${libreCaslon.className}`}
          >
            Avis <em className="italic">clients</em>
          </h1>
          <p className="mt-3 text-[15px] text-gray-500 max-w-xl leading-relaxed">
            Des milliers de personnes nous font confiance pour trouver la bonne assurance.
            Voici ce qu&apos;elles en pensent.
          </p>
        </div>

        <FeaturedReview />
        <QuotesSection />
        <TrustPilotBlock />
      </main>

      <Footer />
    </>
  );
}
