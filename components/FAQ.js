import { useState } from "react";
import { libreCaslon } from "@/lib/fonts";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const ITEMS = [
  {
    q: "Qu'est-ce qu'un courtier en assurance ?",
    a: "Un courtier en assurance est un intermédiaire indépendant qui compare les offres de plusieurs compagnies d'assurance pour trouver la solution la plus adaptée à votre situation. Contrairement à un agent exclusif, il n'est lié à aucun assureur et agit dans votre seul intérêt.",
  },
  {
    q: "Les services de New World Courtage sont-ils gratuits ?",
    a: "Oui, nos services sont entièrement gratuits pour vous. Nous sommes rémunérés par les compagnies d'assurance sous forme de commission, déjà intégrée dans le prix de votre prime. Vous ne payez donc rien de plus en passant par nous.",
  },
  {
    q: "Quels types d'assurances proposez-vous ?",
    a: "Nous couvrons l'assurance auto, habitation, santé, décennale, moto et poids lourd. Nos conseillers comparent les offres de plus de 100 compagnies partenaires pour vous proposer la meilleure protection au meilleur tarif.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Il vous suffit de sélectionner le type d'assurance souhaité sur notre plateforme et de remplir un formulaire rapide. L'un de nos conseillers agréés analysera votre profil et vous présentera plusieurs offres comparées sous 48 heures.",
  },
  {
    q: "Mes données personnelles sont-elles protégées ?",
    a: "Absolument. Nous respectons strictement le Règlement Général sur la Protection des Données (RGPD). Vos informations ne sont jamais revendues à des tiers et sont utilisées uniquement dans le cadre de votre demande de devis.",
  },
];

export default function FAQ({ className = "" }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={`w-full py-10 ${className}`}>
      <div className="flex flex-col gap-6 max-w-2xl mx-auto px-4 sm:px-0">
        <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] text-center ${libreCaslon.className}`}>
          Questions fréquentes
        </h2>
        <Accordion>
          {ITEMS.map(({ q, a }, i) => (
            <AccordionItem key={q} open={openIndex === i}>
              <AccordionTrigger
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {q}
              </AccordionTrigger>
              <AccordionContent open={openIndex === i}>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
