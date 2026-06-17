import { Libre_Caslon_Text } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CtaButton from "@/components/CtaButton";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const CATEGORIES = [
  { id: "auto", label: "Auto", href: "/assurance-auto/", icon: "/illustrations/auto.svg" },
  { id: "habitation", label: "Habitation", href: "/assurance-habitation/", icon: "/illustrations/home.svg" },
  { id: "sante", label: "Santé", href: "/assurance-sante/", icon: "/illustrations/health.svg" },
  { id: "decennale", label: "Décennale", href: "/assurance-decennale/", icon: "/illustrations/building.svg" },
];

export default function Hero() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full h-[75vw] max-h-[90vh] min-h-[600px] overflow-hidden rounded-none lg:rounded-xl">
          <picture className="absolute inset-0 w-full h-full">
            <source
              media="(max-width: 767px)"
              srcSet="/hero.png"
              type="image/png"
            />
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
            <div className="bg-white pl-0 pr-4 sm:pr-8 py-4 sm:py-6 w-full lg:w-fit lg:rounded-br-[20px]">
              <p
                className={`text-[7vw] sm:text-[42px] lg:text-[55px] text-[#131212] leading-[1.1] ${libreCaslon.className}`}
              >
                <span className="block whitespace-nowrap">Une approche <em className={`italic ${libreCaslon.className}`}>humaine</em></span>
                <span className="block">de l&apos;assurance.</span>
              </p>
            </div>

            {/* Bottom bar */}
            <div className="px-4 lg:px-8 pb-6">
              <div className="bg-[var(--color-light)] rounded-xl px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-fit lg:mx-auto">

                {/* Label */}
                <p className="font-semibold text-[16px] text-[#131212] whitespace-nowrap shrink-0">
                  Que recherchez-vous ?
                </p>

                {/* Category buttons + CTA */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 w-full lg:w-auto overflow-x-auto">
                  {CATEGORIES.map(({ id, label, href, icon }) => (
                    <Button
                      key={id}
                      variant="outline"
                      asChild
                      className="bg-white border-0 shadow-none rounded-lg px-4 py-3 h-auto w-full md:w-auto md:shrink-0 hover:bg-white"
                    >
                      <Link href={href} className="flex items-center w-full gap-3">
                        <img src={icon} alt="" width={32} height={32} aria-hidden="true" className="shrink-0" />
                        <span className="text-sm font-semibold text-[#131212]">{label}</span>
                        <img src="/chevron-right.svg" alt="" width={9} height={15} aria-hidden="true" className="shrink-0 ml-auto" />
                      </Link>
                    </Button>
                  ))}

                  <CtaButton className="self-start md:self-center shrink-0" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
