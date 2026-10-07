import InfoCardsSection from "@/components/InfoCardsSection";
import { MessageCircle, Star, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    image: "/sections/step-expert.webp",
    imageAlt: "Une conseillère échange avec un client autour d'une table",
    Icon: MessageCircle,
    title: "Échangez avec un expert",
    description:
      "Décrivez votre activité et vos besoins à l'un de nos conseillers agréés et transmettez-lui vos documents. Il analyse votre situation en détail.",
  },
  {
    image: "/sections/step-offers.webp",
    imageAlt: "Une femme compare des offres sur son ordinateur portable",
    Icon: Star,
    title: "Recevez les meilleures offres",
    description:
      "Notre expert compare les offres de plus de 100 assureurs pour identifier les garanties les mieux adaptées à vos besoins et à votre budget.",
  },
  {
    image: "/sections/step-subscribe.webp",
    imageAlt: "Poignée de main au-dessus d'un contrat signé",
    Icon: ShieldCheck,
    title: "Souscrivez et soyez protégé",
    description:
      "Choisissez l'offre qui vous convient et finalisez votre souscription en ligne en quelques minutes.",
  },
];

export default function OurProcess() {
  return (
    <InfoCardsSection
      title="Nous rendons le processus"
      titleItalic="simple."
      subtitle="New World Courtage propose des devis gratuits adaptés à vos besoins, avec l'accompagnement d'agents agréés, afin de vous aider à obtenir rapidement une couverture d'assurance et à reprendre le cours de votre vie."
      items={STEPS}
      cardStyle="style2"
      showSteps
      withContainer
      cols={3}
      ctaLabel="Devis gratuit"
    />
  );
}
