import { Libre_Caslon_Text } from "next/font/google";
import VehicleIdentityForm from "./VehicleIdentityForm";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function CarCalculatorSection() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] overflow-hidden flex flex-col lg:flex-row min-h-[480px] bg-[var(--color-brand)]">

          {/* Left — title (1/3) */}
          <div className="hidden lg:flex lg:w-[40%] px-8 py-10 lg:px-14 lg:py-14 items-center">
            <h2 className={`text-[8vw] sm:text-[38px] lg:text-[46px] leading-[1.1] text-white ${libreCaslon.className}`}>
              Combien d&apos;assurance auto vous faut-il et à quel <em className={`italic ${libreCaslon.className}`}>coût ?</em>
            </h2>
          </div>

          {/* Right — content (2/3) */}
          <div className="lg:w-[60%] px-8 py-10 lg:px-14 lg:py-14 flex flex-col gap-6">

            <div className="inline-flex items-start bg-white/10 border border-white/20 rounded-xl px-5 py-4 max-w-lg">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-white">0 frais. 0 commission.</p>
                <p className="text-sm text-white/80 leading-snug">
                  Votre devis assurance moto au même prix que chez l&apos;assureur, tout simplement.
                </p>
              </div>
            </div>

            <VehicleIdentityForm />

          </div>
        </div>
      </div>
    </section>
  );
}
