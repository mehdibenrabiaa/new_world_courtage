import { Libre_Caslon_Text } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CtaButton from "@/components/CtaButton";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const STEPS = [
  {
    id: 1,
    icon: "/illustrations/step1.svg",
    title: "Choisissez votre type d'assurance",
    description: "Sélectionnez parmi nos catégories — auto, habitation, santé ou décennale — selon vos besoins spécifiques.",
  },
  {
    id: 2,
    icon: "/illustrations/step2.svg",
    title: "Obtenez un devis personnalisé",
    description: "Remplissez un formulaire simple et rapide. Nos agents agréés analysent votre profil pour vous proposer les meilleures offres.",
  },
  {
    id: 3,
    icon: "/illustrations/step3.svg",
    title: "Comparez les offres",
    description: "Visualisez en un coup d'œil les garanties et tarifs de plus de 100 compagnies partenaires, sans engagement.",
  },
  {
    id: 4,
    icon: "/illustrations/step4.svg",
    title: "Souscrivez et soyez protégé",
    description: "Choisissez l'offre qui vous convient et finalisez votre souscription en ligne en quelques minutes.",
  },
];

export default function OurProcess() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14">

          {/* Header */}
          <div className="flex flex-col gap-5 mb-10 lg:mb-14 max-w-4xl mx-auto text-center">
            <h2
              className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[#131212] ${libreCaslon.className}`}
            >
              Nous rendons le processus <em className={`italic ${libreCaslon.className}`}>simple.</em>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              New World Courtage propose des devis gratuits adaptés à vos besoins, avec l&apos;accompagnement d&apos;agents agréés, afin de vous aider à obtenir rapidement une couverture d&apos;assurance et à reprendre le cours de votre vie.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {STEPS.map(({ id, icon, title, description }) => (
              <Card key={id} className="w-full">
                <CardHeader className="p-5 pb-0">
                  <img src={icon} alt="" width={120} height={120} aria-hidden="true" className="w-[120px] h-[120px] object-contain" />
                </CardHeader>
                <CardContent className="p-5 flex flex-col gap-4">
                  <Badge className="w-8 h-8 p-0 flex items-center justify-center rounded-full bg-[#131212] border-transparent text-white text-sm">
                    {id}
                  </Badge>
                  <h3 className={`text-[22px] leading-snug text-[#131212] ${libreCaslon.className}`}>{title}</h3>
                  <p className="text-[15px] text-[#131212] leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <CtaButton label="Obtenir un devis gratuit" />
          </div>

        </div>
      </div>
    </section>
  );
}
