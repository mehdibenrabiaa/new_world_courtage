"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { libreCaslon } from "@/lib/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CtaButton from "@/components/CtaButton";

export const TESTIMONIALS = [
  {
    title: "Un accueil patient et efficace",
    quote: "Une excellente expérience avec New World Courtage ! Simple, efficace et à l'écoute, l'équipe a su répondre à mes attentes. Même sans maîtriser l'informatique, j'ai reçu une aide précieuse. Un grand merci à Loubna pour sa patience et son efficacité. Ne change surtout pas !",
    name: "Zaher",
    href: "https://www.trustpilot.com/users/6a54c4294024a440d9a2264d",
  },
  {
    title: "Professionnalisme et gentillesse",
    quote: "Un service de qualité, merci pour votre professionnalisme, votre gentillesse et votre patience. Mille merci !",
    name: "Zakir Belmellat",
    href: "https://www.trustpilot.com/reviews/6a550174923278d56dc35097",
  },
  {
    title: "Excellent conseiller – merci!",
    quote: "J'ai eu le plaisir d'échanger avec une conseillère nommée Loubna. Elle était très compétente et m'a énormément aidé à choisir la formule d'assurance la plus adaptée à mes besoins. Son professionnalisme, sa disponibilité et la qualité de ses conseils ont rendu mon expérience très agréable.",
    name: "Mehdi EL",
    href: "https://www.trustpilot.com/users/6a5178d34024a45bb49f4793",
  },
  {
    title: "Rapide et sans mauvaise surprise",
    quote: "Rapide, clair et sans mauvaise surprise. Exactement ce dont j'avais besoin pour trouver la bonne assurance au meilleur prix.",
    name: "Lucas P.",
  },
  {
    title: "Je n'aurais pas trouvé mieux seul",
    quote: "Je n'aurais jamais pensé trouver une meilleure offre aussi rapidement. Une aide précieuse du début à la fin. Merci à toute l'équipe !",
    name: "Sophie L.",
  },
  {
    title: "Un accompagnement humain",
    quote: "Un accompagnement humain et des conseils vraiment personnalisés. Je suis ravie d'avoir fait appel à New World Courtage pour mon assurance.",
    name: "Marie T.",
  },
];

export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/newworldcourtage.com";

const PER_PAGE = 3;

export function Stars() {
  return (
    <img src="/logos/trustpilot-stars.svg" alt="5 étoiles Trustpilot" loading="lazy" className="h-5 w-auto" />
  );
}

export function VerifiedBadge() {
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

export function CardInner({ title, quote, name, verified = true }) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <Stars />
        {verified && <VerifiedBadge />}
      </div>

      <div>
        <div className="flex items-start gap-2">
          <img src="/icons/quotation-mark.svg" alt="" aria-hidden="true" loading="lazy" className="shrink-0 h-7 w-auto mt-0.5" />
          <h3 className="text-[19px] font-semibold text-[var(--color-text)] leading-snug">{title}</h3>
        </div>
        <p className="text-[15px] text-gray-700 leading-relaxed mt-3">{quote}</p>
      </div>

      <div className="mt-auto flex items-center gap-3 border-t border-gray-200 pt-4">
        <span className="text-[15px] font-bold text-[var(--color-text)]">{name}</span>
        <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" className="ml-auto text-[var(--color-brand)] transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </>
  );
}

// Same card look as the article cards: white, soft shadow that deepens on hover.
export const CARD_CLASS = "group bg-white rounded-[4px] p-7 flex flex-col gap-5 shadow-[0_1px_4px_rgba(0,0,0,0.14)]";

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
        <div className="relative bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">

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
            <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              <em className={`italic ${libreCaslon.className}`}>Vrais</em> clients, vraies histoires.
            </h2>
            <p className="text-base text-gray-600 leading-[26px] sm:leading-6">
              New World Courtage vous aide à comparer les options d&apos;assurance et à trouver la bonne protection rapidement grâce à des devis gratuits et un accompagnement d&apos;experts.
            </p>
          </div>

          {/* Navigation — top right above cards */}
          <div className="flex items-center justify-end gap-3 mb-4">
            <Button variant="outline" size="icon-lg" onClick={() => { setDirection("prev"); setPage(p => Math.max(0, p - 1)); }} disabled={page === 0} aria-label="Précédent">
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon-lg" onClick={() => { setDirection("next"); setPage(p => Math.min(totalPages - 1, p + 1)); }} disabled={page === totalPages - 1} aria-label="Suivant">
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Visible cards */}
          <div key={page} className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${direction === "next" ? "slide-in-right" : "slide-in-left"}`}>
            {visible.map(({ title, quote, name, href }) => (
              <a
                key={name}
                href={href || "https://www.trustpilot.com/review/newworldcourtage.com"}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD_CLASS} w-full cursor-pointer transition-shadow duration-200 outline-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2`}
                style={isDesktop && minH ? { minHeight: minH } : undefined}
              >
                <CardInner title={title} quote={quote} name={name} />
              </a>
            ))}
          </div>

          {/* Read more CTA */}
          <div className="flex justify-center mt-2 mb-6">
            <CtaButton
              href="https://www.trustpilot.com/review/newworldcourtage.com"
              label="Voir plus d'avis"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>


        </div>
      </div>
    </section>
  );
}
