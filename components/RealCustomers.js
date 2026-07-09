"use client";
import { useState } from "react";
import { libreCaslon } from "@/lib/fonts";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

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
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#00b67a">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function RealCustomers() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">

          {/* Header */}
          <div className="flex flex-col gap-5 max-w-4xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              <em className={`italic ${libreCaslon.className}`}>Vrais</em> clients, vraies histoires.
            </h2>
            <p className="text-base text-gray-600 leading-[26px] sm:leading-6">
              New World Courtage vous aide à comparer les options d&apos;assurance et à trouver la bonne protection rapidement grâce à des devis gratuits et un accompagnement d&apos;experts.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {visible.map(({ title, quote, name }) => (
              <div key={name} className="bg-white rounded-2xl p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Stars />
                  <div className="flex items-center gap-1.5 text-gray-400 text-[13px]">
                    <BadgeCheck size={15} />
                    <span>Vérifié</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[var(--color-brand)] text-[44px] leading-none" style={{ fontFamily: "Georgia, serif" }}>&ldquo;</span>
                  <h3 className="text-[17px] font-bold text-[var(--color-text)] leading-snug -mt-3">{title}</h3>
                </div>

                <p className="text-[15px] text-gray-500 leading-relaxed">{quote}</p>

                <p className="text-[14px] font-semibold text-[var(--color-text)] mt-auto pt-2 border-t border-gray-100">{name}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-[var(--color-text)]" : "w-2 bg-gray-300"}`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
