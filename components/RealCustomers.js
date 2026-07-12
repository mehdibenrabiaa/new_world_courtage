"use client";
import { useState, useEffect, useRef } from "react";
import { libreCaslon } from "@/lib/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CtaButton from "@/components/CtaButton";

const TESTIMONIALS = [
  {
    title: "Facile à utiliser",
    quote: "Je cherchais une assurance vie pour protéger ma famille. L'équipe de New World Courtage m'a présenté plusieurs devis en quelques heures et l'intégration avec l'assureur choisi était parfaite. Je recommande !",
    name: "Paul M.",
  },
  {
    title: "Un processus fluide et des conseils d'experts",
    quote: "J'ai utilisé New World Courtage pour trouver une assurance vie et j'ai été vraiment impressionné. Le processus était simple et les outils de comparaison m'ont aidé à choisir la meilleure offre. Leurs conseillers sont compétents et disponibles à chaque étape.",
    name: "Mark D.",
  },
  {
    title: "Une équipe vraiment à l'écoute",
    quote: "Je me suis senti écouté et compris tout au long du processus. Une équipe vraiment professionnelle et disponible. Je n'hésiterai pas à les recommander à mon entourage.",
    name: "Karen S.",
  },
  {
    title: "Rapide et sans mauvaise surprise",
    quote: "Rapide, clair et sans mauvaise surprise. Exactement ce dont j'avais besoin pour trouver la bonne assurance au meilleur prix.",
    name: "Lucas P.",
  },
  {
    title: "Je n'aurais pas trouvé mieux seul",
    quote: "Je n'aurais jamais pensé trouver une meilleure offre aussi rapidement. Une aide précieuse du début à la fin. Merci à toute l'équipe !",
    name: "Sophie L.",
  },
  {
    title: "Un accompagnement humain",
    quote: "Un accompagnement humain et des conseils vraiment personnalisés. Je suis ravie d'avoir fait appel à New World Courtage pour mon assurance.",
    name: "Marie T.",
  },
];

const PER_PAGE = 3;

function Stars() {
  return (
    <img src="/trustpilot_starts.svg" alt="5 étoiles Trustpilot" className="h-5 w-auto" />
  );
}

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7.5" cy="7.5" r="7.5" fill="#6b7280" />
        <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[13px] font-semibold text-gray-600">Vérifié</span>
    </div>
  );
}

function CardInner({ title, quote, name }) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <Stars />
        <VerifiedBadge />
      </div>

      <div>
        <div className="flex items-start gap-2">
          <img src="/quotation-mark.svg" alt="" aria-hidden="true" className="shrink-0 h-7 w-auto mt-0.5" />
          <h3 className="text-[17px] font-bold text-[var(--color-text)] leading-snug">{title}</h3>
        </div>
        <p className="text-[16px] text-black leading-relaxed mt-3">{quote}</p>
      </div>

      <p className="text-[14px] font-semibold text-[var(--color-text)] mt-auto pt-2 border-t border-gray-100">{name}</p>
    </>
  );
}

const CARD_CLASS = "bg-transparent rounded-2xl p-6 flex flex-col gap-5 border border-[#e0e0e0]";

export default function RealCustomers() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [minH, setMinH] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const measureRef = useRef(null);

  const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;
    const cards = Array.from(measureRef.current.children);
    const max = Math.max(...cards.map(c => c.offsetHeight));
    setMinH(max);
  }, []);

  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative rounded-[20px] bg-[#F0F4F8] px-4 py-10 lg:px-8 lg:py-14">

          {/* Off-screen measurement grid — all 6 cards */}
          <div
            ref={measureRef}
            className="grid grid-cols-3 gap-4"
            style={{ position: "absolute", visibility: "hidden", top: 0, left: 32, right: 32, pointerEvents: "none" }}
          >
            {TESTIMONIALS.map(({ title, quote, name }) => (
              <div key={name} className={CARD_CLASS}>
                <CardInner title={title} quote={quote} name={name} />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex flex-col gap-5 max-w-4xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              <em className={`italic ${libreCaslon.className}`}>Vrais</em> clients, vraies histoires.
            </h2>
            <p className="text-base text-gray-600 leading-[26px] sm:leading-6">
              New World Courtage vous aide à comparer les options d&apos;assurance et à trouver la bonne protection rapidement grâce à des devis gratuits et un accompagnement d&apos;experts.
            </p>
          </div>

          {/* Navigation — top right above cards */}
          <div className="flex items-center justify-end gap-3 mb-4">
            <button
              onClick={() => { setDirection("prev"); setPage(p => Math.max(0, p - 1)); }}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => { setDirection("next"); setPage(p => Math.min(totalPages - 1, p + 1)); }}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Visible cards */}
          <div key={page} className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ${direction === "next" ? "slide-in-right" : "slide-in-left"}`}>
            {visible.map(({ title, quote, name }) => (
              <a
                key={name}
                href="https://www.trustpilot.com/review/newworldcourtage.fr"
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD_CLASS} cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] max-w-[400px] mx-auto w-full`}
                style={isDesktop && minH ? { minHeight: minH } : undefined}
              >
                <CardInner title={title} quote={quote} name={name} />
              </a>
            ))}
          </div>

          {/* Read more CTA */}
          <div className="flex justify-center mt-2 mb-6">
            <CtaButton
              href="/avis/"
              label="Voir plus d'avis"
            />
          </div>


        </div>
      </div>
    </section>
  );
}
