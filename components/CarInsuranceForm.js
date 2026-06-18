import { useState } from "react";
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
  { id: 1,  section: "Véhicule",   type: "radio",  question: "Quel type de véhicule souhaitez-vous assurer ?", options: ["Moto", "Scooter", "Voiture"], values: ["moto", "scooter", "voiture"] },
  { id: 2,  section: "Véhicule",   type: "select", question: "Quelle est la marque de votre véhicule ?",
    optionsFn: (answers) => {
      const brands = answers[1] === "voiture" ? CAR_BRANDS : MOTO_BRANDS;
      return { options: brands, values: brands };
    },
  },
  { id: 3,  section: "Véhicule",   type: "input",  question: "Quel est le modèle ?", inputType: "text", placeholder: "Ex : Clio, Série 3, CB500…" },
  { id: 4,  section: "Véhicule",   type: "input",  question: "Quelle est la version ou finition ?", inputType: "text", placeholder: "Ex : Sport, Confort, 1.5 dCi…" },
  { id: 5,  section: "Véhicule",   type: "select", question: "Quelle est la cylindrée ?", options: ["Moins de 50 cc", "50 – 125 cc", "126 – 250 cc", "251 – 500 cc", "501 – 750 cc", "Plus de 750 cc"], values: ["<50", "50-125", "126-250", "251-500", "501-750", ">750"] },
  { id: 6,  section: "Véhicule",   type: "input",  question: "Quelle est la puissance du moteur ?", inputType: "number", placeholder: "Puissance en kW ou CV" },
  { id: 7,  section: "Véhicule",   type: "input",  question: "Quelle est la date d'achat de votre véhicule ?", inputType: "month" },
  { id: 8,  section: "Véhicule",   type: "input",  question: "Quel était le prix d'achat ?", inputType: "number", placeholder: "Montant en €" },
  { id: 9,  section: "Véhicule",   type: "input",  question: "Quelle est la date de première mise en circulation ?", inputType: "month" },
  { id: 10, section: "Véhicule",   type: "radio",  question: "Votre véhicule est-il neuf ou d'occasion ?", options: ["Neuf", "Occasion"], values: ["neuf", "occasion"] },
  { id: 11, section: "Véhicule",   type: "radio",  question: "Quel est l'usage principal de votre véhicule ?", options: ["Domicile – travail", "Loisirs", "Professionnel"], values: ["commute", "leisure", "professional"] },
  { id: 12, section: "Véhicule",   type: "select", question: "Quel est votre kilométrage annuel estimé ?", options: ["Moins de 5 000 km", "5 000 – 10 000 km", "10 000 – 15 000 km", "15 000 – 20 000 km", "Plus de 20 000 km"], values: ["<5000", "5000-10000", "10000-15000", "15000-20000", ">20000"] },
  { id: 13, section: "Véhicule",   type: "radio",  question: "Où stationnez-vous votre véhicule la nuit ?", options: ["Garage privé", "Rue", "Parking privé"], values: ["garage", "street", "private_parking"] },
  { id: 14, section: "Véhicule",   type: "checkbox", question: "Votre véhicule est-il équipé de dispositifs antivol ?", options: ["Alarme", "Antivol mécanique", "Traceur GPS"], values: ["alarm", "lock", "tracker"], optional: true },
  { id: 15, section: "Véhicule",   type: "radio",  question: "Comment avez-vous financé votre véhicule ?", options: ["Comptant", "Crédit", "Leasing"], values: ["owned", "loan", "leasing"] },
  // --- Conducteur ---
  { id: 16, section: "Conducteur", type: "input",  question: "Quel est votre âge ?", inputType: "number", placeholder: "Votre âge" },
  { id: 17, section: "Conducteur", type: "select", question: "Quel type de permis possédez-vous ?", options: ["Permis A – moto (> 35 kW)", "Permis A2 – moto limitée", "Permis A1 – 125 cc", "Permis B – voiture", "Permis AM – cyclomoteur"], values: ["A", "A2", "A1", "B", "AM"] },
  { id: 18, section: "Conducteur", type: "input",  question: "À quelle date avez-vous obtenu votre permis ?", inputType: "month" },
  { id: 19, section: "Conducteur", type: "input",  question: "Combien d'années d'expérience avez-vous ?", inputType: "number", placeholder: "Nombre d'années" },
  { id: 20, section: "Conducteur", type: "radio",  question: "Êtes-vous le conducteur principal ?", options: ["Conducteur principal", "Conducteur secondaire"], values: ["main", "secondary"] },
  { id: 21, section: "Conducteur", type: "select", question: "Combien de conducteurs supplémentaires souhaitez-vous déclarer ?", options: ["Aucun", "1 conducteur", "2 conducteurs", "3 ou plus"], values: ["0", "1", "2", "3+"] },
  // --- Historique ---
  { id: 22, section: "Historique", type: "radio",  question: "Avez-vous déclaré des sinistres au cours des 3 à 5 dernières années ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 23, section: "Historique", type: "radio",  question: "Ces sinistres étaient-ils de votre responsabilité ?", options: ["Responsable", "Non responsable", "Les deux"], values: ["responsible", "not_responsible", "both"] },
  { id: 24, section: "Historique", type: "input",  question: "Quel est votre coefficient bonus-malus actuel ?", inputType: "number", placeholder: "Ex : 1.00 (entre 0.50 et 3.50)" },
  { id: 25, section: "Historique", type: "radio",  question: "Votre permis a-t-il déjà été suspendu ou annulé ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  // --- Couverture ---
  { id: 26, section: "Couverture", type: "radio",  question: "Quel type de couverture souhaitez-vous ?", options: ["Au tiers", "Tous risques"], values: ["third-party", "comprehensive"] },
  { id: 27, section: "Couverture", type: "select", question: "Quel montant de franchise souhaitez-vous ?", options: ["150 €", "300 €", "500 €", "750 €", "1 000 €"], values: ["150", "300", "500", "750", "1000"] },
  { id: 28, section: "Couverture", type: "radio",  question: "Souhaitez-vous ajouter la protection juridique ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 29, section: "Couverture", type: "radio",  question: "Souhaitez-vous l'assistance routière ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 30, section: "Couverture", type: "radio",  question: "Souhaitez-vous un véhicule de remplacement en cas de sinistre ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  // --- Contrat ---
  { id: 31, section: "Contrat",    type: "input",  question: "À quelle date souhaitez-vous que votre assurance prenne effet ?", inputType: "date" },
  { id: 32, section: "Contrat",    type: "radio",  question: "Quelle fréquence de paiement préférez-vous ?", options: ["Mensuelle", "Annuelle"], values: ["monthly", "yearly"] },
  { id: 33, section: "Contrat",    type: "input",  question: "Avez-vous des préférences ou contraintes particulières ?", inputType: "text", placeholder: "Ex : assureur actuel, exclusions… (optionnel)", optional: true },
  // --- Contact ---
  { id: 34, section: "Contact",    type: "input",  question: "Quelle est votre adresse e-mail ?", inputType: "email", placeholder: "exemple@email.com" },
  { id: 35, section: "Contact",    type: "input",  question: "Quel est votre numéro de téléphone ?", inputType: "tel", placeholder: "Ex : 06 12 34 56 78" },
];

// Color tokens per theme
const TOKENS = {
  dark: {
    sectionLabel:    "text-white/60",
    stepCounter:     "text-white/40",
    progressTrack:   "bg-white/20",
    progressFill:    "bg-white",
    breadcrumbActive:"text-white",
    breadcrumbDone:  "text-white/30",
    breadcrumbAhead: "text-white/20",
    question:        "text-white font-semibold",
    cardUnselected:  "border-white/30 text-white hover:border-white/70 hover:bg-white/10",
    cardSelected:    "border-white bg-white text-[var(--color-brand)]",
    backBtn:         "text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20",
    nextBtn:         "bg-white text-[var(--color-brand)] hover:bg-white/90 font-semibold",
    selectTrigger:   "w-full bg-white text-[#131212]",
    skipLink:        "text-white/40 hover:text-white/60",
    successIcon:     "text-white",
    successHeading:  "text-white",
    successBody:     "text-white/70",
    dateInput:       "light", // DatePickerInput theme
  },
  light: {
    sectionLabel:    "text-gray-400",
    stepCounter:     "text-gray-400",
    progressTrack:   "bg-gray-200",
    progressFill:    "bg-[var(--color-brand)]",
    breadcrumbActive:"text-[#131212]",
    breadcrumbDone:  "text-gray-300",
    breadcrumbAhead: "text-gray-200",
    question:        "text-[#131212] font-semibold",
    cardUnselected:  "border-gray-200 text-[#131212] hover:border-[var(--color-brand)] hover:bg-[var(--color-light)]",
    cardSelected:    "border-[var(--color-brand)] bg-[var(--color-brand)] text-white",
    backBtn:         "text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30",
    nextBtn:         "cta-btn text-white font-semibold",
    selectTrigger:   "w-full text-[#131212]",
    skipLink:        "text-gray-300 hover:text-gray-500",
    successIcon:     "text-[var(--color-brand)]",
    successHeading:  "text-[#131212]",
    successBody:     "text-gray-500",
    dateInput:       "light",
  },
};

function OptionCard({ label, selected, onClick, tokens }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[var(--radius)] border-2 px-4 py-3 text-base font-medium text-left transition-all duration-150 ${
        selected ? tokens.cardSelected : tokens.cardUnselected
      }`}
    >
      {label}
    </button>
  );
}

export default function CarInsuranceForm({ initialAnswers = {}, startStep = 0, theme = "dark" }) {
  const [stepIdx, setStepIdx] = useState(startStep);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const t = TOKENS[theme];
  const current = STEPS[stepIdx];
  const answer = answers[current.id] ?? (current.type === "checkbox" ? [] : "");
  const sectionIdx = SECTIONS.indexOf(current.section);
  const progress = Math.round(((stepIdx + 1) / STEPS.length) * 100);
  const isLast = stepIdx === STEPS.length - 1;
  const canNext = current.optional || current.type === "checkbox" ? true : answer !== "";

  const dynamicOpts = current.optionsFn ? current.optionsFn(answers) : { options: current.options, values: current.values };

  function setAnswer(val) {
    setAnswers(prev => ({ ...prev, [current.id]: val }));
  }

  function handleRadioSelect(val) {
    setAnswer(val);
    if (!isLast) setTimeout(() => setStepIdx(s => s + 1), 200);
    else setSubmitted(true);
  }

  function handleNext() {
    if (isLast) setSubmitted(true);
    else setStepIdx(s => s + 1);
  }

  function handleBack() {
    if (stepIdx > 0) setStepIdx(s => s - 1);
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
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold uppercase tracking-wider ${t.sectionLabel}`}>
            {current.section}
          </span>
          <span className={`text-xs ${t.stepCounter}`}>{stepIdx + 1} / {STEPS.length}</span>
        </div>
        <div className={`w-full h-1 rounded-full overflow-hidden ${t.progressTrack}`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${t.progressFill}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 mt-0.5 flex-wrap">
          {SECTIONS.map((s, i) => (
            <span key={s} className={`text-[11px] font-medium ${
              i === sectionIdx ? t.breadcrumbActive : i < sectionIdx ? t.breadcrumbDone : t.breadcrumbAhead
            }`}>
              {i > 0 && <span className="mr-1">›</span>}{s}
            </span>
          ))}
        </div>
      </div>

      {/* Question */}
      <p className={`text-base leading-snug ${t.question}`}>
        {current.question}
      </p>

      {/* Answer area */}
      <div className="min-h-[80px]">

        {current.type === "radio" && (
          <div className="flex flex-wrap gap-2">
            {dynamicOpts.options.map((opt, i) => (
              <OptionCard
                key={i}
                label={opt}
                selected={answer === dynamicOpts.values[i]}
                onClick={() => handleRadioSelect(dynamicOpts.values[i])}
                tokens={t}
              />
            ))}
          </div>
        )}

        {current.type === "checkbox" && (
          <div className="flex flex-wrap gap-2">
            {current.options.map((opt, i) => {
              const val = current.values[i];
              const isSelected = answer.includes(val);
              return (
                <OptionCard
                  key={i}
                  label={opt}
                  selected={isSelected}
                  onClick={() => setAnswer(isSelected ? answer.filter(v => v !== val) : [...answer, val])}
                  tokens={t}
                />
              );
            })}
          </div>
        )}

        {current.type === "select" && (
          <Select value={answer} onValueChange={setAnswer}>
            <SelectTrigger className={t.selectTrigger}>
              <SelectValue placeholder="Sélectionnez une option" />
            </SelectTrigger>
            <SelectContent>
              {dynamicOpts.options.map((opt, i) => (
                <SelectItem key={i} value={dynamicOpts.values[i]}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {current.type === "input" && (current.inputType === "date" || current.inputType === "month") && (
          <DatePickerInput
            value={answer}
            onChange={setAnswer}
            placeholder={current.placeholder || "Sélectionnez une date"}
            theme={theme}
          />
        )}

        {current.type === "input" && current.inputType !== "date" && current.inputType !== "month" && (
          <Input
            type={current.inputType}
            placeholder={current.placeholder}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
        )}

      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-1">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={stepIdx === 0}
          className={`px-0 gap-1 ${t.backBtn}`}
        >
          <ChevronLeft size={16} />
          Retour
        </Button>

        {current.type !== "radio" && (
          <Button
            onClick={handleNext}
            disabled={!canNext}
            className={`gap-1 ${t.nextBtn}`}
          >
            {isLast ? "Envoyer ma demande" : "Suivant"}
            {!isLast && <ChevronRight size={16} />}
          </Button>
        )}
      </div>

      {current.optional && current.type !== "radio" && (
        <button
          type="button"
          onClick={handleNext}
          className={`text-xs text-center transition-colors -mt-3 ${t.skipLink}`}
        >
          Passer cette étape
        </button>
      )}

    </div>
  );
}
