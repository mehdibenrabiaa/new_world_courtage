import { Search, MessageSquare, MailOpen, ShieldCheck } from "lucide-react";
import InfoCardsSection from "@/components/InfoCardsSection";

const STEPS = [
  {
    Icon: Search,
    title: "Choisissez votre type d'assurance",
    description:
      "Sélectionnez parmi nos catégories — auto, habitation, santé ou décennale — selon vos besoins spécifiques.",
  },
  {
    Icon: MessageSquare,
    title: "Échangez avec un expert",
    description:
      "Prenez contact avec l'un de nos conseillers agréés et transmettez-lui vos documents. Il analyse votre situation en détail.",
  },
  {
    Icon: MailOpen,
    title: "Recevez les meilleures offres",
    description:
      "Notre expert compare les offres de plus de 100 assureurs pour identifier les garanties les mieux adaptées à vos besoins et à votre budget.",
  },
  {
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
      imageVariant="icon"
      showSteps
      withContainer
      cols={4}
      ctaLabel="Devis gratuit"
    />
  );
}
