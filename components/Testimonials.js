import { CheckCircle2 } from "lucide-react";
import { libreCaslon } from "@/lib/fonts";

const POINTS = [
  "Comparaison gratuite et sans engagement",
  "Aucun frais caché, totale transparence",
  "Conseils objectifs d'un courtier indépendant",
  "Service 100% fiable — enregistré à l'ORIAS",
];

export default function Testimonials() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row min-h-[480px] bg-[#F2693D] py-8 lg:py-14 gap-6 lg:gap-0">

          {/* Left — image (1/3) */}
          <div className="lg:w-1/3 px-4 lg:px-6 flex items-start justify-center">
            <img
              src="/famille-assurance.jpg"
              alt="Clients satisfaits"
              className="w-full aspect-square object-cover object-top rounded-xl"
            />
          </div>

          {/* Right — content (2/3) */}
          <div className="lg:w-2/3 px-8 lg:px-14 flex flex-col gap-8">

            <div className="flex flex-col gap-7">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)]">
                Qui sommes-nous&nbsp;?
              </span>
              <h2 className={`text-[8vw] sm:text-[42px] lg:text-[52px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
                <span className="block">Vos économies d&apos;assurance</span>
                <span className="block"><em className={`italic ${libreCaslon.className}`}>vous attendent.</em></span>
              </h2>
              <p className="text-base text-[var(--color-text)] max-w-lg leading-relaxed">
                New World Courtage est votre courtier de confiance pour comparer et optimiser vos assurances. Non affiliés à aucun assureur — notre seul objectif est de vous aider à faire le meilleur choix.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-[var(--color-text)] shrink-0 mt-0.5" />
                  <span className="text-[15px] text-[var(--color-text)]">{point}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}
