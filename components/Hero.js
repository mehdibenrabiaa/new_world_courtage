import { useEffect, useRef } from "react";
import { libreCaslon } from "@/lib/fonts";
import Link from "next/link";
import { Card } from "@/components/ui/card";

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
  { id: "flotte-transport", label: "Flotte & Transport", href: "/assurance-transport/", icon: "/icons/truck.svg" },
  { id: "pro-auto", label: "Pro de l'auto", href: "/assurance-pro-auto/", icon: "/icons/car.svg" },
  { id: "construction", label: "Construction", href: "/assurance-construction/", icon: "/icons/building.svg" },
  { id: "immobilier", label: "Immobilier", href: "/assurance-immobilier/", icon: "/icons/home.svg" },
  { id: "moto", label: "Moto", href: "/assurance-moto/", icon: "/icons/motorcycle.svg" },
  { id: "sante", label: "Santé", href: "/assurance-sante/", icon: "/icons/heart-angle.svg" },
];

export default function Hero() {
  const titleRef = useMobileFitText();

  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full min-h-[650px] lg:h-[75vw] lg:max-h-[90vh] lg:min-h-[600px] overflow-hidden rounded-none lg:rounded-xl">
          <img
            src="/hero.png"
            alt="Protégez ce qui compte le plus pour vous."
            width={1600}
            height={900}
            decoding="async"
            loading="eager"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          <div className="relative z-10 h-full flex flex-col">
            {/* Headline â€” top left */}
            <div className="bg-white pl-4 sm:pl-6 pr-8 sm:pr-12 py-3 w-full sm:w-[90%] lg:w-[60%] rounded-br-none sm:rounded-br-[9999px]">
              <p
                ref={titleRef}
                className={`sm:text-[36px] lg:text-[55px] text-[var(--color-text)] leading-[1.1] ${libreCaslon.className}`}
              >
                <span className="block">La meilleure assurance</span>
                <em className={`block italic ${libreCaslon.className}`}>au meilleur prix.</em>
              </p>
            </div>

            {/* Bottom bar */}
            <div className="mt-[300px] lg:mt-auto px-4 lg:px-8 pb-6">
              <div className="bg-[var(--color-light)] rounded-xl px-4 py-4 flex flex-col gap-3 w-full lg:w-fit lg:mx-auto">
                <p className="font-semibold text-[15px] sm:text-[16px] text-[var(--color-text)] whitespace-nowrap shrink-0">
                  Quelle assurance recherchez-vous ?
                </p>
                <div className="flex flex-col lg:flex-row gap-2">
                  {CATEGORIES.map(({ id, label, href, icon }) => (
                    <Link key={id} href={href} className="lg:shrink-0">
                      <Card className="shadow-none rounded-xl w-full lg:w-[124px] lg:h-[124px] flex flex-row items-center lg:flex-col lg:justify-center gap-3 lg:gap-2 px-4 py-3 lg:px-1 lg:py-0 border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                        <img src={icon} alt="" width={42} height={42} aria-hidden="true" className="shrink-0 w-8 h-8 lg:w-11 lg:h-11" />
                        <span className="flex-1 lg:flex-none text-[16px] font-medium text-[var(--color-text)] lg:text-center leading-tight">{label}</span>
                        <img src="/chevron-right.svg" alt="" width={9} height={15} aria-hidden="true" className="lg:hidden shrink-0 opacity-40" />
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

