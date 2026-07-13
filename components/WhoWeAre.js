import { CheckCircle2, ShieldCheck } from "lucide-react";
import { libreCaslon } from "@/lib/fonts";
import CtaButton from "@/components/CtaButton";

const DEFAULT_POINTS = [
  "Comparaison gratuite et sans engagement",
  "Aucun frais caché, totale transparence",
  "Conseils objectifs d'un courtier indépendant",
  "Service 100% fiable — enregistré à l'ORIAS",
];

export default function WhoWeAre({
  label = "Qui sommes-nous ?",
  heading = "Vos économies d'assurance",
  headingItalic = "vous attendent.",
  description = "New World Courtage est votre courtier de confiance pour comparer et optimiser vos assurances auto, moto, habitation, santé et bien plus encore. Non affiliés à aucun assureur — notre seul objectif est de vous aider à faire le meilleur choix et d'augmenter votre pouvoir d'achat.",
  points = DEFAULT_POINTS,
  stat = "40%",
  statLabel = "Économies moyennes",
  statSub = "sur vos contrats d'assurance",
  ctaSubtext = "Prêt à économiser ? Découvrez en 2 minutes les meilleures offres adaptées à votre profil.",
  ctaText = "Obtenir mon devis gratuit",
  ctaHref = "/life-insurance/start",
  badge = "Courtier indépendant — ORIAS n° 25006506",
}) {
  return (
    <section className="w-full py-16 px-4 lg:px-12 2xl:px-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col gap-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-brand)]">
            {label}
          </span>
          <h2 className={`text-[36px] sm:text-[46px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
            {heading}{" "}
            <em className={`italic ${libreCaslon.className}`}>{headingItalic}</em>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg">
            {description}
          </p>
          <ul className="flex flex-col gap-3.5">
            {points.map((point) => (
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
              {statLabel}
            </p>
            <p className="text-[72px] font-bold leading-none text-white tracking-tight">
              {stat}
            </p>
            <p className="text-base text-white/70 mt-1">
              {statSub}
            </p>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex flex-col gap-5">
            <p className="text-[15px] text-white/80 leading-relaxed">
              {ctaSubtext}
            </p>
            <CtaButton
              href={ctaHref}
              label={ctaText}
              className="w-full justify-center"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <ShieldCheck size={14} className="text-white/40 shrink-0" />
            <p className="text-[12px] text-white/40">
              {badge}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
