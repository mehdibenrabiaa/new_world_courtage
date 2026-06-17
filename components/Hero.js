import { useEffect, useRef } from "react";
import { Libre_Caslon_Text } from "next/font/google";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

function useMobileFitText() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "";
      if (window.innerWidth >= 640) return;

      const maxW = el.offsetWidth;
      if (!maxW) return;
      const lines = [...el.children];

      lines.forEach((s) => (s.style.whiteSpace = "nowrap"));

      let lo = 8, hi = 120;
      while (hi - lo > 0.25) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        const widest = Math.max(...lines.map((s) => s.scrollWidth));
        widest <= maxW ? (lo = mid) : (hi = mid);
      }

      lines.forEach((s) => (s.style.whiteSpace = ""));
      el.style.fontSize = `${Math.floor(lo)}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return ref;
}

const CATEGORIES = [
  { id: "auto", label: "Auto", href: "/assurance-auto/", icon: "/icons/car.svg" },
  { id: "habitation", label: "Habitation", href: "/assurance-habitation/", icon: "/icons/home.svg" },
  { id: "sante", label: "Santé", href: "/assurance-sante/", icon: "/icons/heart-angle.svg" },
  { id: "decennale", label: "Décennale", href: "/assurance-decennale/", icon: "/icons/building.svg" },
  { id: "moto", label: "Moto", href: "/assurance-moto/", icon: "/icons/motorcycle.svg" },
  { id: "poids-lourd", label: "Poids lourd", href: "/assurance-poids-lourd/", icon: "/icons/truck.svg" },
];

export default function Hero() {
  const titleRef = useMobileFitText();

  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full h-[75vw] max-h-[90vh] min-h-[600px] overflow-hidden rounded-none lg:rounded-xl">
          <picture className="absolute inset-0 w-full h-full">
            <img
              src="/hero.jpg"
              alt="Protégez ce qui compte le plus pour vous."
              width={1600}
              height={900}
              decoding="sync"
              loading="eager"
              fetchpriority="high"
              className="w-full h-full object-cover object-top"
            />
          </picture>

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Headline — top left */}
            <div className="bg-white pl-4 sm:pl-6 pr-8 sm:pr-12 py-4 sm:py-6 w-full sm:w-[90%] rounded-br-none sm:rounded-br-[9999px]">
              <p
                ref={titleRef}
                className={`sm:text-[36px] lg:text-[55px] text-[#131212] leading-[1.1] ${libreCaslon.className}`}
              >
                <span className="block">Comparer vos assurances</span>
                <span className="block sm:inline">n&apos;a jamais été </span>
                <span className="block sm:inline">aussi <em className={`italic ${libreCaslon.className}`}>facile.</em></span>
              </p>
            </div>

            {/* Bottom bar */}
            <div className="px-4 lg:px-8 pb-6">
              <div className="bg-[var(--color-light)] rounded-xl px-4 py-4 flex flex-col gap-3 w-full lg:w-fit lg:mx-auto">

                {/* Label */}
                <p className="font-semibold text-[17px] sm:text-[19px] text-[#131212] whitespace-nowrap shrink-0">
                  Que recherchez-vous ?
                </p>

                {/* 3-col on mobile, single row on lg */}
                <div className="grid grid-cols-3 lg:flex lg:flex-row gap-2">
                  {CATEGORIES.map(({ id, label, href, icon }) => (
                    <Link key={id} href={href} className="lg:shrink-0">
                      <Card className="border-0 shadow-none rounded-xl w-full lg:w-[124px] lg:h-[124px] aspect-square lg:aspect-auto flex flex-col items-center justify-center gap-2 lg:gap-2 px-2 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <img src={icon} alt="" width={42} height={42} aria-hidden="true" className="shrink-0 sm:w-11 sm:h-11" />
                        <span className="text-[15px] sm:text-[14px] lg:text-[16px] font-semibold text-[#131212] text-center leading-tight">{label}</span>
                      </Card>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
