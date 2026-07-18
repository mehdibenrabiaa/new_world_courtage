import { libreCaslon } from "@/lib/fonts";
import CtaButton from "@/components/CtaButton";
import { Separator } from "@/components/ui/separator";

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
        <div className="rounded-[5px] bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14">

          <div className="flex flex-col items-center gap-8 text-center">

            <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              Plus de <em className={`italic ${libreCaslon.className}`}>100 compagnies</em> partenaires.
            </h2>

            <p className="text-base text-gray-600 leading-relaxed max-w-xl">
              Nous comparons les offres de plus de 100 assureurs pour vous trouver la meilleure protection au meilleur prix.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-y-6">
              {LOGOS.map(({ id, name, src }, i) => (
                <div key={id} className="flex items-center h-10">
                  {i > 0 && <Separator orientation="vertical" className="mx-6 lg:mx-8 h-8" />}
                  <img src={src} alt={name} className="h-7 lg:h-9 w-auto object-contain max-w-[80px] lg:max-w-[110px]" />
                </div>
              ))}
            </div>

            <CtaButton href="/a-propos/nos-partenaires/" label="Voir nos partenaires" />

          </div>

        </div>
      </div>
    </section>
  );
}
