import { Libre_Caslon_Text } from "next/font/google";
import CtaButton from "@/components/CtaButton";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function FinishedScrolling() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] overflow-hidden flex flex-col lg:flex-row min-h-[480px]">

          {/* Left — content */}
          <div className="order-2 lg:order-1 lg:w-1/2 bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14 flex flex-col justify-between gap-10">

            <div className="flex flex-col gap-5">
              <h2
                className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[#131212] ${libreCaslon.className}`}
              >
                <span className="block">Tu as fini</span>
                <span className="block">de scroller ?</span>
                <em className={`block italic ${libreCaslon.className}`}>Obtiens ton devis.</em>
              </h2>

              <p className="text-base text-gray-600 max-w-lg leading-relaxed">
                Trouvez l&apos;assurance qu&apos;il vous faut et économisez en comparant les offres des assureurs les plus fiables.
              </p>
            </div>

            <CtaButton label="Obtenir un devis gratuit" className="self-start" />

          </div>

          {/* Right — image */}
          <div className="order-1 lg:order-2 lg:w-1/2 h-[260px] lg:h-auto">
            <img
              src="/finished_scrolling.jpg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
