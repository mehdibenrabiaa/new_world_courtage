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

function IconAuto() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
      <path d="M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Zm48-24H223a32,32,0,0,0-62,0H95a32,32,0,0,0-62,0H16V128H240Z"/>
    </svg>
  )
}

function IconHabitation() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
      <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"/>
    </svg>
  )
}

function IconSante() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
      <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"/>
    </svg>
  )
}

function IconDecennale() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
      <path d="M240,192h-8V130.57l1.49,2.08a8,8,0,1,0,13-9.3l-40-56a8,8,0,0,0-2-1.94L137,18.77l-.1-.07a16,16,0,0,0-17.76,0l-.1.07L51.45,65.42a8,8,0,0,0-2,1.94l-40,56a8,8,0,1,0,13,9.3L24,130.57V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,108.17,61.7,77.79,128,32l66.3,45.78L216,108.17V192H192V120a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8v72H40Zm88,42L97,128H159Zm48-14.62v48.91L141.76,160ZM114.24,160,80,184.46V135.55ZM128,169.83,159,192H97ZM104,88a8,8,0,0,1,8-8h32a8,8,0,1,1,0,16H112A8,8,0,0,1,104,88Z"/>
    </svg>
  )
}

const CATEGORIES = [
  { id: "auto", label: "Auto", href: "/assurance-auto/", Icon: IconAuto },
  { id: "habitation", label: "Habitation", href: "/assurance-habitation/", Icon: IconHabitation },
  { id: "sante", label: "Santé", href: "/assurance-sante/", Icon: IconSante },
  { id: "decennale", label: "Décennale", href: "/assurance-decennale/", Icon: IconDecennale },
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
              fetchPriority="high"
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
                  {CATEGORIES.map(({ id, label, href, Icon }) => (
                    <Button
                      key={id}
                      variant="outline"
                      asChild
                      className="bg-white border-0 shadow-none rounded-lg px-4 py-3 h-auto w-full md:w-auto md:shrink-0 hover:bg-white"
                    >
                      <Link href={href} className="flex items-center w-full gap-3">
                        <span className="shrink-0 text-[var(--color-brand)]"><Icon /></span>
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
