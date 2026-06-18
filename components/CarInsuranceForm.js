"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePickerInput } from "@/components/DatePickerInput";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const SECTIONS = ["Véhicule", "Conducteur", "Historique", "Couverture", "Contrat", "Contact"];

const CAR_BRANDS = [
  "Audi", "BMW", "Citroën", "Dacia", "DS Automobiles", "Fiat", "Ford", "Honda",
  "Hyundai", "Kia", "Mazda", "Mercedes-Benz", "Nissan", "Opel", "Peugeot",
  "Renault", "Seat", "Skoda", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo",
];

const MOTO_BRANDS = [
  "Aprilia", "BMW", "Ducati", "Harley-Davidson", "Honda", "Kawasaki", "KTM",
  "Piaggio", "Royal Enfield", "Suzuki", "Triumph", "Vespa", "Yamaha",
];

const STEPS = [
  // --- Véhicule ---
  { id: 1,  section: "Véhicule",   type: "radio",    question: "Quel type de véhicule souhaitez-vous assurer ?", hint: "Le type de véhicule détermine les garanties et tarifs proposés.", options: ["Moto", "Scooter", "Voiture"], values: ["moto", "scooter", "voiture"] },
  { id: 2,  section: "Véhicule",   type: "select",   question: "Quelle est la marque de votre véhicule ?",
    optionsFn: (answers) => {
      const brands = answers[1] === "voiture" ? CAR_BRANDS : MOTO_BRANDS;
      return { options: brands, values: brands };
    },
  },
  { id: 3,  section: "Véhicule",   type: "input",    question: "Quel est le modèle ?", inputType: "text", placeholder: "Ex : Clio, Série 3, CB500…" },
  { id: 4,  section: "Véhicule",   type: "input",    question: "Quelle est la version ou finition ?", inputType: "text", placeholder: "Ex : Sport, Confort, 1.5 dCi…" },
  { id: 5,  section: "Véhicule",   type: "select",   question: "Quelle est la cylindrée ?", options: ["Moins de 50 cc", "50 – 125 cc", "126 – 250 cc", "251 – 500 cc", "501 – 750 cc", "Plus de 750 cc"], values: ["<50", "50-125", "126-250", "251-500", "501-750", ">750"] },
  { id: 6,  section: "Véhicule",   type: "input",    question: "Quelle est la puissance du moteur ?", inputType: "number", placeholder: "Puissance en kW ou CV" },
  { id: 7,  section: "Véhicule",   type: "input",    question: "Quelle est la date d'achat de votre véhicule ?", inputType: "month" },
  { id: 8,  section: "Véhicule",   type: "input",    question: "Quel était le prix d'achat ?", inputType: "number", placeholder: "Montant en €", hint: "Indiquez le prix payé au moment de l'achat, en euros." },
  { id: 9,  section: "Véhicule",   type: "input",    question: "Quelle est la date de première mise en circulation ?", inputType: "month" },
  { id: 10, section: "Véhicule",   type: "radio",    question: "Votre véhicule est-il neuf ou d'occasion ?", options: ["Neuf", "Occasion"], values: ["neuf", "occasion"] },
  { id: 11, section: "Véhicule",   type: "radio",    question: "Quel est l'usage principal de votre véhicule ?", hint: "L'usage influe directement sur le niveau de couverture recommandé.", options: ["Domicile – travail", "Loisirs", "Professionnel"], values: ["commute", "leisure", "professional"] },
  { id: 12, section: "Véhicule",   type: "select",   question: "Quel est votre kilométrage annuel estimé ?", options: ["Moins de 5 000 km", "5 000 – 10 000 km", "10 000 – 15 000 km", "15 000 – 20 000 km", "Plus de 20 000 km"], values: ["<5000", "5000-10000", "10000-15000", "15000-20000", ">20000"] },
  { id: 13, section: "Véhicule",   type: "radio",    question: "Où stationnez-vous votre véhicule la nuit ?", options: ["Garage privé", "Rue", "Parking privé"], values: ["garage", "street", "private_parking"] },
  { id: 14, section: "Véhicule",   type: "checkbox", question: "Votre véhicule est-il équipé de dispositifs antivol ?", hint: "Sélectionnez tout ce qui s'applique.", options: ["Alarme", "Antivol mécanique", "Traceur GPS"], values: ["alarm", "lock", "tracker"], optional: true },
  { id: 15, section: "Véhicule",   type: "radio",    question: "Comment avez-vous financé votre véhicule ?", options: ["Comptant", "Crédit", "Leasing"], values: ["owned", "loan", "leasing"] },
  // --- Conducteur ---
  { id: 16, section: "Conducteur", type: "input",    question: "Quel est votre âge ?", inputType: "number", placeholder: "Votre âge", hint: "L'âge est l'un des principaux facteurs qui influence votre tarif." },
  { id: 17, section: "Conducteur", type: "select",   question: "Quel type de permis possédez-vous ?", options: ["Permis A – moto (> 35 kW)", "Permis A2 – moto limitée", "Permis A1 – 125 cc", "Permis B – voiture", "Permis AM – cyclomoteur"], values: ["A", "A2", "A1", "B", "AM"] },
  { id: 18, section: "Conducteur", type: "input",    question: "À quelle date avez-vous obtenu votre permis ?", inputType: "month" },
  { id: 19, section: "Conducteur", type: "input",    question: "Combien d'années d'expérience avez-vous ?", inputType: "number", placeholder: "Nombre d'années" },
  { id: 20, section: "Conducteur", type: "radio",    question: "Êtes-vous le conducteur principal ?", options: ["Conducteur principal", "Conducteur secondaire"], values: ["main", "secondary"] },
  { id: 21, section: "Conducteur", type: "select",   question: "Combien de conducteurs supplémentaires souhaitez-vous déclarer ?", options: ["Aucun", "1 conducteur", "2 conducteurs", "3 ou plus"], values: ["0", "1", "2", "3+"] },
  // --- Historique ---
  { id: 22, section: "Historique", type: "radio",    question: "Avez-vous déclaré des sinistres au cours des 3 à 5 dernières années ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 23, section: "Historique", type: "radio",    question: "Ces sinistres étaient-ils de votre responsabilité ?", options: ["Responsable", "Non responsable", "Les deux"], values: ["responsible", "not_responsible", "both"] },
  { id: 24, section: "Historique", type: "input",    question: "Quel est votre coefficient bonus-malus actuel ?", inputType: "number", placeholder: "Ex : 1.00 (entre 0.50 et 3.50)", hint: "Vous trouverez ce coefficient sur votre relevé d'information." },
  { id: 25, section: "Historique", type: "radio",    question: "Votre permis a-t-il déjà été suspendu ou annulé ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  // --- Couverture ---
  { id: 26, section: "Couverture", type: "radio",    question: "Quel type de couverture souhaitez-vous ?", options: ["Au tiers", "Tous risques"], values: ["third-party", "comprehensive"] },
  { id: 27, section: "Couverture", type: "select",   question: "Quel montant de franchise souhaitez-vous ?", hint: "La franchise est le montant restant à votre charge en cas de sinistre.", options: ["150 €", "300 €", "500 €", "750 €", "1 000 €"], values: ["150", "300", "500", "750", "1000"] },
  { id: 28, section: "Couverture", type: "radio",    question: "Souhaitez-vous ajouter la protection juridique ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 29, section: "Couverture", type: "radio",    question: "Souhaitez-vous l'assistance routière ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 30, section: "Couverture", type: "radio",    question: "Souhaitez-vous un véhicule de remplacement en cas de sinistre ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  // --- Contrat ---
  { id: 31, section: "Contrat",    type: "input",    question: "À quelle date souhaitez-vous que votre assurance prenne effet ?", inputType: "date" },
  { id: 32, section: "Contrat",    type: "radio",    question: "Quelle fréquence de paiement préférez-vous ?", options: ["Mensuelle", "Annuelle"], values: ["monthly", "yearly"] },
  { id: 33, section: "Contrat",    type: "input",    question: "Avez-vous des préférences ou contraintes particulières ?", inputType: "text", placeholder: "Ex : assureur actuel, exclusions…", optional: true },
  // --- Contact ---
  { id: 34, section: "Contact",    type: "input",    question: "Quelle est votre adresse e-mail ?", inputType: "email", placeholder: "exemple@email.com" },
  { id: 35, section: "Contact",    type: "input",    question: "Quel est votre numéro de téléphone ?", inputType: "tel", placeholder: "Ex : 06 12 34 56 78" },
];

const TOKENS = {
  dark: {
    sectionLabel:    "text-white/60",
    stepCounter:     "text-gray-400",
    progressTrack:   "bg-white/20",
    progressFill:    "bg-white",
    breadcrumbActive:"text-white",
    breadcrumbDone:  "text-white/30",
    breadcrumbAhead: "text-white/20",
    label:           "text-white font-semibold",
    hint:            "text-white/50",
    optional:        "text-white/30",
    radioText:       "text-white",
    radioDot:        "border-white/40 group-hover:border-white/80",
    radioDotSelected:"border-white bg-white",
    radioDotInner:   "bg-[var(--color-brand)]",
    checkText:       "text-white",
    checkBox:        "border-white/40 group-hover:border-white/80",
    checkBoxSelected:"border-white bg-white",
    checkMark:       "text-[var(--color-brand)]",
    backBtn:         "text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20",
    nextBtn:         "bg-white text-[var(--color-brand)] hover:bg-white/90 font-semibold",
    selectTrigger:   "w-full bg-white text-[#131212]",
    divider:         "border-white/10",
    successIcon:     "text-white",
    successHeading:  "text-white",
    successBody:     "text-white/70",
  },
  light: {
    sectionLabel:    "text-gray-400",
    stepCounter:     "text-gray-400",
    progressTrack:   "bg-gray-200",
    progressFill:    "bg-[var(--color-brand)]",
    breadcrumbActive:"text-[#131212]",
    breadcrumbDone:  "text-gray-300",
    breadcrumbAhead: "text-gray-200",
    label:           "text-[#131212] font-semibold",
    hint:            "text-gray-400",
    optional:        "text-gray-300",
    radioText:       "text-gray-700",
    radioDot:        "border-gray-300 group-hover:border-[var(--color-brand)]",
    radioDotSelected:"border-[var(--color-brand)] bg-[var(--color-brand)]",
    radioDotInner:   "bg-white",
    checkText:       "text-gray-700",
    checkBox:        "border-gray-300 rounded group-hover:border-[var(--color-brand)]",
    checkBoxSelected:"border-[var(--color-brand)] bg-[var(--color-brand)] rounded",
    checkMark:       "text-white",
    backBtn:         "text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30",
    nextBtn:         "cta-btn text-white font-semibold",
    selectTrigger:   "w-full text-[#131212]",
    divider:         "border-gray-100",
    successIcon:     "text-[var(--color-brand)]",
    successHeading:  "text-[#131212]",
    successBody:     "text-gray-500",
  },
};

export default function CarInsuranceForm({ initialAnswers = {}, startSection = 0, theme = "dark", onProgress }) {
  const [sectionIdx, setSectionIdx] = useState(startSection);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const t = TOKENS[theme];
  const currentSectionName = SECTIONS[sectionIdx];
  const sectionSteps = STEPS.filter(s => s.section === currentSectionName);
  const isLastSection = sectionIdx === SECTIONS.length - 1;
  const progress = Math.round(((sectionIdx + 1) / SECTIONS.length) * 100);

  useEffect(() => {
    onProgress?.(progress);
  }, [progress]);

  const canNext = sectionSteps.every(step => {
    if (step.optional || step.type === "checkbox") return true;
    const ans = answers[step.id] ?? "";
    return ans !== "";
  });

  function setAnswer(stepId, val) {
    setAnswers(prev => ({ ...prev, [stepId]: val }));
  }

  function handleNext() {
    if (isLastSection) setSubmitted(true);
    else setSectionIdx(s => s + 1);
  }

  function handleBack() {
    if (sectionIdx > 0) setSectionIdx(s => s - 1);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 size={44} className={t.successIcon} />
        <h3 className={`text-xl font-semibold ${t.successHeading}`}>Demande envoyée !</h3>
        <p className={`text-base max-w-xs leading-relaxed ${t.successBody}`}>
          Un conseiller New World Courtage vous contactera dans les plus brefs délais avec vos devis personnalisés.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Section breadcrumb */}
      <div className="flex items-center gap-2 flex-wrap">
        {SECTIONS.map((s, i) => (
          <span key={s} className={`flex items-center gap-2 text-sm font-medium ${
            i === sectionIdx ? t.breadcrumbActive : i < sectionIdx ? t.breadcrumbDone : t.breadcrumbAhead
          }`}>
            {i > 0 && <span className="opacity-40">›</span>}
            {s}
          </span>
        ))}
      </div>

      {/* Questions */}
      <div className="flex flex-col">
        {sectionSteps.map((step, qi) => {
          const answer = answers[step.id] ?? (step.type === "checkbox" ? [] : "");
          const dynamicOpts = step.optionsFn ? step.optionsFn(answers) : { options: step.options, values: step.values };

          return (
            <div key={step.id}>
              {qi > 0 && <hr className={`border-t ${t.divider} my-6`} />}

              <div className="flex flex-col gap-2">
                {/* Label */}
                <p className={`text-sm ${t.label}`}>
                  {step.question}
                  {step.optional && <span className={`ml-2 font-normal text-xs ${t.optional}`}>(optionnel)</span>}
                </p>

                {/* Hint */}
                {step.hint && (
                  <p className={`text-xs leading-relaxed ${t.hint}`}>{step.hint}</p>
                )}

                {/* Radio */}
                {step.type === "radio" && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                    {dynamicOpts.options.map((opt, i) => {
                      const selected = answer === dynamicOpts.values[i];
                      return (
                        <label
                          key={i}
                          className="flex items-center gap-2.5 cursor-pointer group"
                          onClick={() => setAnswer(step.id, dynamicOpts.values[i])}
                        >
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            selected ? t.radioDotSelected : t.radioDot
                          }`}>
                            {selected && <span className={`w-1.5 h-1.5 rounded-full ${t.radioDotInner}`} />}
                          </span>
                          <span className={`text-sm ${t.radioText}`}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Checkbox */}
                {step.type === "checkbox" && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                    {step.options.map((opt, i) => {
                      const val = step.values[i];
                      const isSelected = answer.includes(val);
                      return (
                        <label
                          key={i}
                          className="flex items-center gap-2.5 cursor-pointer group"
                          onClick={() => setAnswer(step.id, isSelected ? answer.filter(v => v !== val) : [...answer, val])}
                        >
                          <span className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? t.checkBoxSelected : t.checkBox
                          }`}>
                            {isSelected && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className={`text-sm ${t.checkText}`}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Select */}
                {step.type === "select" && (
                  <div className="mt-1">
                    <Select value={answer} onValueChange={val => setAnswer(step.id, val)}>
                      <SelectTrigger className={t.selectTrigger}>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {dynamicOpts.options.map((opt, i) => (
                          <SelectItem key={i} value={dynamicOpts.values[i]}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Date / month picker */}
                {step.type === "input" && (step.inputType === "date" || step.inputType === "month") && (
                  <div className="mt-1">
                    <DatePickerInput
                      value={answer}
                      onChange={val => setAnswer(step.id, val)}
                      placeholder={step.placeholder || "Sélectionnez une date"}
                      theme={theme}
                    />
                  </div>
                )}

                {/* Text / number / email / tel input */}
                {step.type === "input" && step.inputType !== "date" && step.inputType !== "month" && (
                  <div className="mt-1">
                    <Input
                      type={step.inputType}
                      placeholder={step.placeholder}
                      value={answer}
                      onChange={e => setAnswer(step.id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={sectionIdx === 0}
          className={`px-0 gap-1 ${t.backBtn}`}
        >
          <ChevronLeft size={16} />
          Retour
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canNext}
          className={`gap-1 ${t.nextBtn}`}
        >
          {isLastSection ? "Envoyer ma demande" : "Suivant"}
          {!isLastSection && <ChevronRight size={16} />}
        </Button>
      </div>

    </div>
  );
}
