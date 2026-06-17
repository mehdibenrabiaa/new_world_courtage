import { Libre_Caslon_Text } from "next/font/google";
import CtaButton from "@/components/CtaButton";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const LOGOS = [
  { id: "axa",       name: "AXA",        src: "/insurances_logos/AXA_Versicherungen_Logo.svg" },
  { id: "maif",      name: "MAIF",       src: "/insurances_logos/Logo_Maif_2019.svg" },
  { id: "allianz",   name: "Allianz",    src: "/insurances_logos/Allianz.svg" },
  { id: "groupama",  name: "Groupama",   src: "/insurances_logos/Logo_Groupama_2024.svg" },
  { id: "generali",  name: "Generali",   src: "/insurances_logos/Assicurazioni_Generali.svg" },
  { id: "swisslife", name: "Swiss Life", src: "/insurances_logos/SLHN.SW_BIG.svg" },
  { id: "gmf",       name: "GMF",        src: "/insurances_logos/GMF_logo.svg" },
];

export default function Partners() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14">

          <div className="flex flex-col gap-5 max-w-2xl mx-auto text-center mb-12">
            <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[#131212] ${libreCaslon.className}`}>
              Plus de <em className={`italic ${libreCaslon.className}`}>100 compagnies</em> partenaires.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Nous comparons les offres de plus de 100 assureurs pour vous trouver la meilleure protection au meilleur prix.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 lg:gap-4 sm:max-w-[640px] sm:mx-auto">
            {LOGOS.map(({ id, name, src }) => (
              <div
                key={id}
                className="flex items-center justify-center rounded-md px-4 py-3 h-[72px] w-full sm:w-[145px] sm:h-[80px] border border-gray-300 transition-all duration-300"
              >
                <img src={src} alt={name} className="h-full w-auto object-contain max-h-10" />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <CtaButton
              href="/a-propos/nos-partenaires/"
              label="En savoir sur tous nos partenaires"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
