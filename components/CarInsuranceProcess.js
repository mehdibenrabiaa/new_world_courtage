import { libreCaslon } from "@/lib/fonts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CtaButton from "@/components/CtaButton";

const STEPS = [
  {
    id: 1,
    icon: "/illustrations/quote_steps_1.webp",
    title: "Renseignez votre véhicule",
    description: "Indiquez le type, la marque, le modèle, la version et l'usage principal de votre véhicule. Ces informations nous permettent d'évaluer précisément votre profil de risque et d'identifier les garanties les mieux adaptées à votre situation.",
  },
  {
    id: 2,
    icon: "/illustrations/quote_steps_2.webp",
    title: "Complétez votre profil conducteur",
    description: "Votre âge, votre expérience au volant, votre type de permis et la présence d'éventuels conducteurs secondaires sont des critères déterminants. Plus votre profil est précis, plus nos recommandations seront pertinentes et compétitives.",
  },
  {
    id: 3,
    icon: "/illustrations/quote_steps_1.webp",
    title: "Souscrivez en toute sérénité",
    description: "Une fois l'offre choisie, finalisez votre souscription en ligne en quelques minutes ou en échangeant directement avec votre conseiller. Votre attestation d'assurance vous est transmise immédiatement, sans frais cachés ni engagement caché.",
  },
];

export default function CarInsuranceProcess() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-xl bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14">

          {/* Header */}
          <div className="flex flex-col gap-5 mb-10 lg:mb-14 max-w-4xl mx-auto text-center">
            <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              Votre devis auto en <em className={`italic ${libreCaslon.className}`}>3 étapes.</em>
            </h2>
            <p className="text-base text-gray-600 leading-[26px] sm:leading-6">
              Notre calculateur guide chaque conducteur à travers un parcours simple et rapide. En quelques minutes, obtenez une estimation personnalisée et entrez en contact avec un conseiller agréé.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-[1140px] mx-auto">
            {STEPS.map(({ id, icon, title, description }) => (
              <Card key={id} className="w-full overflow-hidden">
                <div className="w-full h-36 lg:h-44 relative overflow-hidden">
                  <img src={icon} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="p-5 flex flex-col gap-4">
                  <Badge className="w-8 h-8 p-0 flex items-center justify-center rounded-full bg-[var(--color-text)] border-transparent text-white text-sm">
                    {id}
                  </Badge>
                  <h3 className={`text-[22px] leading-snug text-[var(--color-text)] ${libreCaslon.className}`}>{title}</h3>
                  <p className="text-base text-[var(--color-text)] leading-[26px] sm:leading-6">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <CtaButton label="Calculer mon tarif" />
          </div>

        </div>
      </div>
    </section>
  );
}
