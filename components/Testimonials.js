import Image from "next/image";
import { BadgeCheck, CheckCircle2, Eye, HandCoins, Scale } from "lucide-react";
import { headingFont } from "@/lib/fonts";

const DEFAULT_POINTS = [
  "Comparaison gratuite et sans engagement",
  "Aucun frais caché, totale transparence",
  "Conseils objectifs d'un courtier indépendant",
  "Service 100% fiable — enregistré à l'ORIAS",
];

// Icons for the four default points, in order; pages passing their own points get a check.
const DEFAULT_ICONS = [HandCoins, Eye, Scale, BadgeCheck];

const BRAND = "var(--color-brand)";

// Text half on the brand blue (home page) or on a light background (product pages).
const TONES = {
  brand: {
    text: "text-white",
    label: "text-white/75",
    description: "text-white/85",
    grid: "bg-white/20",
    // No visible box on the blue, so the first column lines up with the text above.
    tile: "py-5 pr-5 sm:even:pl-5",
    icon: "text-[#3b9bd8]",
  },
  light: {
    text: "text-[var(--color-text)]",
    label: "text-gray-500",
    description: "text-gray-600",
    grid: "bg-gray-200",
    tile: "bg-white p-5",
    icon: "text-[var(--color-brand)]",
  },
};

// Photo edge to edge on one half; label, title, text and a 2×2 grid of points on the other.
export default function Testimonials({
  label = "Qui sommes-nous ?",
  heading = "Vos économies d'assurance",
  headingItalic = "vous attendent.",
  description = "New World Courtage est votre courtier de confiance pour comparer et optimiser vos assurances. Non affiliés à aucun assureur — notre seul objectif est de vous aider à faire le meilleur choix.",
  points = DEFAULT_POINTS,
  image = "/sections/who-we-are.webp",
  imageAlt = "Clients satisfaits",
  bgColor = BRAND,
}) {
  const tone = bgColor === BRAND ? TONES.brand : TONES.light;

  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className={`grid lg:grid-cols-2 ${tone.text}`} style={{ backgroundColor: bgColor }}>
          <div className="relative min-h-[280px] sm:min-h-[360px]">
            <Image src={image} alt={imageAlt} fill className="object-cover object-top" sizes="(max-width: 1023px) 100vw, 50vw" />
          </div>

          <div className="flex flex-col gap-6 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <span className={`text-[12px] font-bold uppercase tracking-widest ${tone.label}`}>{label}</span>
            <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] ${headingFont.className}`}>
              <span className="block">{heading}</span>
              <span className="block"><em className={headingFont.className}>{headingItalic}</em></span>
            </h2>
            <p className={`max-w-lg text-base leading-relaxed ${tone.description}`}>{description}</p>
            <ul className={`grid gap-px sm:grid-cols-2 ${tone.grid}`}>
              {points.map((point, i) => {
                const Icon = points === DEFAULT_POINTS ? DEFAULT_ICONS[i] : CheckCircle2;
                return (
                  <li key={point} className={`flex flex-col gap-3 ${tone.tile}`} style={tone === TONES.brand ? { backgroundColor: bgColor } : undefined}>
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" className={tone.icon} />
                    <span className="text-[15px] font-medium">{point}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
