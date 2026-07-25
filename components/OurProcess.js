import InfoCardsSection from "@/components/InfoCardsSection";

const STEPS = [
  {
    image: "/sections/step-choose-insurance.webp",
    imageAlt: "Choose your insurance type",
    title: "Choisissez votre type d'assurance",
    description:
      "Sélectionnez parmi nos catégories — auto, habitation, santé ou décennale — selon vos besoins spécifiques.",
  },
  {
    image: "/sections/step-talk-to-expert.webp",
    imageAlt: "Talk to an expert",
    title: "Échangez avec un expert",
    description:
      "Prenez contact avec l'un de nos conseillers agréés et transmettez-lui vos documents. Il analyse votre situation en détail.",
  },
  {
    image: "/sections/step-receive-offers.webp",
    imageAlt: "Receive the best offers",
    title: "Recevez les meilleures offres",
    description:
      "Notre expert compare les offres de plus de 100 assureurs pour identifier les garanties les mieux adaptées à vos besoins et à votre budget.",
  },
  {
    image: "/sections/step-subscribe-protected.webp",
    imageAlt: "Subscribe and get protected",
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
      cols={4}
      ctaLabel="Devis gratuit"
    />
  );
}
