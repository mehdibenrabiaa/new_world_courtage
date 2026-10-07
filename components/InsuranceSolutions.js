import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { libreCaslon } from "@/lib/fonts";

// Photo cards: a title band that grows on hover/focus to
// reveal the description, pushing the photo up.
const CATEGORIES = [
  {
    id: "vtc",
    label: "VTC",
    href: "/assurance-transport/chauffeur-vtc/",
    image: "/pages/taxi-driver.webp",
    description: "Véhicule, responsabilité civile professionnelle, protection du conducteur… Chauffeurs VTC, roulez assurés avec une couverture adaptée à votre activité.",
  },
  {
    id: "auto",
    label: "Auto",
    href: "/assurance-auto/devis",
    image: "/pages/driving-car.jpg",
    description: "Tiers, tous risques, assistance… Comparez les offres d'assurance auto et trouvez la formule adaptée à votre voiture et à votre budget.",
  },
  {
    id: "garagiste",
    label: "Garagiste",
    href: "/assurance-pro-auto/garagiste/",
    image: "/pages/garagist.webp",
    description: "Atelier, véhicules confiés, responsabilité civile… Garagistes, découvrez les garanties adaptées à votre métier.",
  },
];

// Grid of photo cards (also used on /devis). Each item: { id, label, href, image, description }.
export function PhotoCardGrid({ items }) {
  return (
    <div className="w-full">
      {/* Cards shrink with the window and stop growing at 330px, so they never overlap. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-[repeat(3,minmax(0,330px))] lg:justify-center lg:gap-6">
        {items.map(({ id, label, href, image, description }) => (
          <Link
            key={id}
            href={href}
            className="group relative block h-[380px] lg:h-[420px] w-full overflow-hidden bg-[var(--color-brand)] text-white outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            {/* The photo always fills the card; the band below is laid over it and
                grows upward on hover, so the photo never resizes. */}
            <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-[var(--color-brand)] px-6 py-6 md:px-4 lg:px-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[24px] font-bold leading-tight md:text-[20px] lg:text-[24px]">{label}</span>
                <ChevronRight size={26} strokeWidth={1.75} aria-hidden="true" className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
              </div>
              {/* The band opens first (grid rows 0fr → 1fr); the text then fades and
                  rises into place a beat later, and leaves faster than it came. */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <p className="overflow-hidden text-[15px] font-medium leading-relaxed text-white/90">
                  <span className="block pt-5 opacity-0 translate-y-3 transition-[opacity,transform] duration-200 ease-in group-hover:opacity-100 group-hover:translate-y-0 group-hover:duration-500 group-hover:delay-150 group-hover:ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible:opacity-100 group-focus-visible:translate-y-0">{description}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function InsuranceSolutions() {
  return (
    <section aria-labelledby="insurance-solutions-title" className="w-full py-10 lg:py-16">
      <div className="px-4 lg:px-12 2xl:px-24">
        <h2
          id="insurance-solutions-title"
          className={`mx-auto mb-8 lg:mb-12 max-w-4xl text-center text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}
        >
          Des solutions d&apos;assurance dédiées pour <em className={`italic ${libreCaslon.className}`}>protéger votre activité</em>.
        </h2>
        <PhotoCardGrid items={CATEGORIES} />
      </div>
    </section>
  );
}
