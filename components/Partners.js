import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { headingFont } from "@/lib/fonts";
import { PARTNERS } from "@/lib/partners";

// White square tile holding one partner logo; also used by the partners page grid.
export function LogoTile({ name, src, className = "" }) {
  return (
    <div className={`flex items-center justify-center border border-gray-200 bg-white ${className}`}>
      <img src={src} alt={name} loading="lazy" className="max-h-12 max-w-[75%] object-contain lg:max-h-14" />
    </div>
  );
}

// Endless horizontal strip: the content is rendered twice and the track (see
// .logo-marquee in global.css) slides by half its width, so the loop is
// seamless. It pauses while hovered; `reverse` scrolls the other way and
// `duration` (seconds) sets the speed.
export function Marquee({ children, reverse = false, duration }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full">
      <div
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="logo-marquee flex w-max"
          style={{
            animationPlayState: hovered ? "paused" : "running",
            animationDirection: reverse ? "reverse" : "normal",
            ...(duration ? { animationDuration: `${duration}s` } : {}),
          }}
        >
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0" aria-hidden="true" inert="">{children}</div>
        </div>
      </div>
    </div>
  );
}

const PARTNERS_HREF = "/a-propos/nos-partenaires/";

// Fixed grid of partner logo tiles; the last tile links to all partners.
function LogoGrid() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
      {PARTNERS.map((p) => <LogoTile key={p.id} {...p} className="h-24 lg:h-28" />)}
      <Link href={PARTNERS_HREF} className="flex h-24 flex-col items-center justify-center bg-[var(--color-brand)] text-white transition-colors hover:bg-[var(--color-brand-hover)] lg:h-28">
        <span className={`text-[28px] leading-none ${headingFont.className}`}>+100</span>
        <span className="mt-1 text-[13px] font-semibold">autres assureurs</span>
      </Link>
    </div>
  );
}

const FIGURES = [
  { value: "+100", label: "assureurs comparés" },
  { value: "0 €", label: "de frais pour vous" },
  { value: "100 %", label: "indépendant" },
];

// Home-page partners section: title, key figures separated by thin rules, the
// partner logo grid and a text link to the partners page.
export default function Partners() {
  return (
    <section className="w-full px-4 py-12 lg:px-12 lg:py-16 2xl:px-24">
      <div className="flex flex-col items-center gap-10 text-center text-[var(--color-text)]">
        <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] ${headingFont.className}`}>
          Plus de <em className={headingFont.className}>100 compagnies</em> partenaires.
        </h2>
        <dl className="flex w-full max-w-4xl flex-col divide-y divide-gray-200 border-y border-gray-200 sm:flex-row sm:divide-x sm:divide-y-0">
          {FIGURES.map(({ value, label }) => (
            <div key={label} className="flex flex-1 flex-col-reverse items-center gap-1 py-6">
              <dt className="text-[14px] uppercase tracking-widest text-gray-500">{label}</dt>
              <dd className={`text-[44px] leading-none text-[var(--color-brand)] lg:text-[52px] ${headingFont.className}`}>{value}</dd>
            </div>
          ))}
        </dl>
        <LogoGrid />
        <Link href={PARTNERS_HREF} className="inline-flex items-center gap-1 text-[15px] font-bold text-[var(--color-brand)] hover:underline">
          Voir tous nos partenaires <ChevronRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
