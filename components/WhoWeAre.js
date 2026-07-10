import { CheckCircle2, ShieldCheck } from "lucide-react";
import { libreCaslon } from "@/lib/fonts";
import CtaButton from "@/components/CtaButton";

const POINTS = [
  "Comparaison gratuite et sans engagement",
  "Aucun frais caché, totale transparence",
  "Conseils objectifs d'un courtier indépendant",
  "Service 100% fiable — enregistré à l'ORIAS",
];

export default function WhoWeAre() {
  return (
    <section className="w-full py-16 px-4 lg:px-12 2xl:px-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col gap-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-brand)]">
            Qui sommes-nous&nbsp;?
          </span>
          <h2 className={`text-[36px] sm:text-[46px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
            Vos économies d&apos;assurance{" "}
            <em className={`italic ${libreCaslon.className}`}>vous attendent.</em>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg">
            New World Courtage est votre courtier de confiance pour comparer et optimiser vos assurances auto, moto, habitation, santé et bien plus encore. Non affiliés à aucun assureur — notre seul objectif est de vous aider à faire le meilleur choix et d&apos;augmenter votre pouvoir d&apos;achat.
          </p>
          <ul className="flex flex-col gap-3.5">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[var(--color-jungle-green)] shrink-0 mt-0.5" />
                <span className="text-[15px] text-[var(--color-text)]">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — dark card */}
        <div className="bg-[var(--color-blue-navy)] rounded-2xl p-8 sm:p-10 flex flex-col gap-7">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">
              Économies moyennes
            </p>
            <p className="text-[72px] font-bold leading-none text-white tracking-tight">
              40%
            </p>
            <p className="text-base text-white/70 mt-1">
              sur vos contrats d&apos;assurance
            </p>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex flex-col gap-5">
            <p className="text-[15px] text-white/80 leading-relaxed">
              Prêt à économiser&nbsp;? Découvrez en 2&nbsp;minutes les meilleures offres adaptées à votre profil.
            </p>
            <CtaButton
              href="/life-insurance/start"
              label="Obtenir mon devis gratuit"
              className="w-full justify-center"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <ShieldCheck size={14} className="text-white/40 shrink-0" />
            <p className="text-[12px] text-white/40">
              Courtier indépendant — ORIAS n°&nbsp;25006506
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
