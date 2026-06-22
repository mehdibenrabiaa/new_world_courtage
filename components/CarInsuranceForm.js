"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePickerInput } from "@/components/DatePickerInput";
import { ChevronLeft, ChevronRight, CheckCircle2, Check, Phone, Mail, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";

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

// cols: 1 = half width, 2 = full width
const STEPS = [
  // --- Véhicule ---
  { id: 1,  cols: 2, section: "Véhicule",   type: "radio", card: true, question: "Quel type de véhicule souhaitez-vous assurer ?", options: ["Moto", "Scooter", "Voiture"], values: ["moto", "scooter", "voiture"] },
  { id: 2,  cols: 1, section: "Véhicule",   type: "select",   question: "Marque du véhicule",
    optionsFn: (answers) => {
      const brands = answers[1] === "voiture" ? CAR_BRANDS : MOTO_BRANDS;
      return { options: brands, values: brands };
    },
  },
  { id: 3,  cols: 1, section: "Véhicule",   type: "input",    question: "Modèle", inputType: "text", placeholder: "Ex : Clio, Série 3, CB500…" },
  { id: 4,  cols: 2, section: "Véhicule",   type: "input",    question: "Version ou finition", inputType: "text", placeholder: "Ex : Sport, Confort, 1.5 dCi…" },
  { id: 5,  cols: 1, section: "Véhicule",   type: "select",   question: "Cylindrée", options: ["Moins de 50 cc", "50 – 125 cc", "126 – 250 cc", "251 – 500 cc", "501 – 750 cc", "Plus de 750 cc"], values: ["<50", "50-125", "126-250", "251-500", "501-750", ">750"] },
  { id: 6,  cols: 1, section: "Véhicule",   type: "input",    question: "Puissance du moteur", inputType: "number", placeholder: "Puissance en kW ou CV" },
  { id: 7,  cols: 1, section: "Véhicule",   type: "input",    question: "Date d'achat du véhicule", inputType: "month" },
  { id: 8,  cols: 1, section: "Véhicule",   type: "input",    question: "Prix d'achat", inputType: "number", placeholder: "Montant en €" },
  { id: 9,  cols: 1, section: "Véhicule",   type: "input",    question: "Première mise en circulation", inputType: "month" },
  { id: 10, cols: 1, section: "Véhicule",   type: "radio",    question: "Neuf ou d'occasion ?", options: ["Neuf", "Occasion"], values: ["neuf", "occasion"] },
  { id: 11, cols: 2, section: "Véhicule",   type: "radio",    question: "Usage principal du véhicule", options: ["Domicile – travail", "Loisirs", "Professionnel"], values: ["commute", "leisure", "professional"] },
  { id: 12, cols: 1, section: "Véhicule",   type: "select",   question: "Kilométrage annuel estimé", options: ["Moins de 5 000 km", "5 000 – 10 000 km", "10 000 – 15 000 km", "15 000 – 20 000 km", "Plus de 20 000 km"], values: ["<5000", "5000-10000", "10000-15000", "15000-20000", ">20000"] },
  { id: 13, cols: 2, section: "Véhicule",   type: "radio",    question: "Stationnement la nuit", options: ["Garage privé", "Rue", "Parking privé"], values: ["garage", "street", "private_parking"] },
  { id: 14, cols: 2, section: "Véhicule",   type: "checkbox", question: "Dispositifs antivol", hint: "Sélectionnez tout ce qui s'applique.", options: ["Alarme", "Antivol mécanique", "Traceur GPS"], values: ["alarm", "lock", "tracker"], optional: true },
  { id: 15, cols: 2, section: "Véhicule",   type: "radio",    question: "Financement du véhicule", options: ["Comptant", "Crédit", "Leasing"], values: ["owned", "loan", "leasing"] },
  // --- Conducteur ---
  { id: 16, cols: 1, section: "Conducteur", type: "select",   question: "Votre âge", options: ["16 – 24 ans", "25 – 35 ans", "36 – 45 ans", "46 – 55 ans", "56 – 65 ans", "66 ans et plus"], values: ["16-24", "25-35", "36-45", "46-55", "56-65", "66+"] },
  { id: 17, cols: 1, section: "Conducteur", type: "select",   question: "Type de permis", options: ["Permis A – moto (> 35 kW)", "Permis A2 – moto limitée", "Permis A1 – 125 cc", "Permis B – voiture", "Permis AM – cyclomoteur"], values: ["A", "A2", "A1", "B", "AM"] },
  { id: 18, cols: 1, section: "Conducteur", type: "input",    question: "Date d'obtention du permis", inputType: "month" },
  { id: 19, cols: 1, section: "Conducteur", type: "select",   question: "Années d'expérience", options: ["Moins d'1 an", "1 – 3 ans", "4 – 6 ans", "7 – 10 ans", "11 – 20 ans", "Plus de 20 ans"], values: ["<1", "1-3", "4-6", "7-10", "11-20", "20+"] },
  { id: 20, cols: 2, section: "Conducteur", type: "radio",    question: "Êtes-vous le conducteur principal ?", options: ["Conducteur principal", "Conducteur secondaire"], values: ["main", "secondary"] },
  { id: 21, cols: 1, section: "Conducteur", type: "select",   question: "Conducteurs supplémentaires", options: ["Aucun", "1 conducteur", "2 conducteurs", "3 ou plus"], values: ["0", "1", "2", "3+"] },
  // --- Historique ---
  { id: 22, cols: 2, section: "Historique", type: "radio",    question: "Sinistres déclarés ces 3 à 5 dernières années ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 23, cols: 2, section: "Historique", type: "radio",    question: "Ces sinistres étaient-ils de votre responsabilité ?", options: ["Responsable", "Non responsable", "Les deux"], values: ["responsible", "not_responsible", "both"] },
  { id: 24, cols: 1, section: "Historique", type: "select",   question: "Coefficient bonus-malus", options: ["0.50 — Bonus maximum", "0.51 – 0.79 — Bon conducteur", "0.80 – 0.99 — Conducteur confirmé", "1.00 — Référence", "1.01 – 1.25 — Malus léger", "1.26 – 2.00 — Malus modéré", "2.01 – 3.50 — Malus élevé"], values: ["0.50", "0.51-0.79", "0.80-0.99", "1.00", "1.01-1.25", "1.26-2.00", "2.01-3.50"] },
  { id: 25, cols: 2, section: "Historique", type: "radio",    question: "Votre permis a-t-il déjà été suspendu ou annulé ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  // --- Couverture ---
  { id: 26, cols: 2, section: "Couverture", type: "radio",    question: "Type de couverture souhaité", options: ["Au tiers", "Tous risques"], values: ["third-party", "comprehensive"] },
  { id: 27, cols: 1, section: "Couverture", type: "select",   question: "Montant de franchise", options: ["150 €", "300 €", "500 €", "750 €", "1 000 €"], values: ["150", "300", "500", "750", "1000"] },
  { id: 28, cols: 2, section: "Couverture", type: "radio",    question: "Protection juridique ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 29, cols: 2, section: "Couverture", type: "radio",    question: "Assistance routière ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  { id: 30, cols: 2, section: "Couverture", type: "radio",    question: "Véhicule de remplacement en cas de sinistre ?", options: ["Oui", "Non"], values: ["oui", "non"] },
  // --- Contrat ---
  { id: 31, cols: 1, section: "Contrat",    type: "input",    question: "Date de prise d'effet", inputType: "date" },
  { id: 32, cols: 2, section: "Contrat",    type: "radio",    question: "Fréquence de paiement", options: ["Mensuelle", "Annuelle"], values: ["monthly", "yearly"] },
  { id: 33, cols: 2, section: "Contrat",    type: "input",    question: "Préférences ou contraintes", inputType: "text", placeholder: "Ex : assureur actuel, exclusions…", optional: true },
  // --- Contact ---
  { id: 34, cols: 1, section: "Contact",    type: "input",    question: "Adresse e-mail", inputType: "email", placeholder: "exemple@email.com" },
  { id: 35, cols: 1, section: "Contact",    type: "input",    question: "Numéro de téléphone", inputType: "tel", placeholder: "Ex : 06 12 34 56 78" },
];

const TOKENS = {
  dark: {
    label:           "text-[var(--color-text)] font-semibold",
    hint:            "text-white/50",
    optional:        "text-white/30",
    radioText:       "text-white",
    radioDot:        "border-white/40 group-hover:border-white/80",
    radioDotSelected:"border-white bg-white",
    radioDotInner:   "bg-[var(--color-brand)]",
    checkText:       "text-white",
    checkBox:        "border-white/40 group-hover:border-white/80",
    checkBoxSelected:"border-white bg-white",
    backBtn:         "text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20",
    nextBtn:         "bg-white text-[var(--color-brand)] hover:bg-white/90 font-semibold",
    selectTrigger:   "w-full bg-white text-[var(--color-text)]",
    divider:         "border-gray-100",
    successIcon:     "text-white",
    successHeading:  "text-white",
    successBody:     "text-white/70",
    stepCircleDone:  "bg-[var(--color-brand)] text-white",
    stepCircleActive:"bg-[var(--color-brand)] text-white",
    stepCircleAhead: "bg-gray-100 text-gray-400",
    stepLabelDone:   "text-[var(--color-brand)] font-medium",
    stepLabelActive: "text-[var(--color-text)] font-semibold",
    stepLabelAhead:  "text-gray-400",
    stepLine:        "bg-[var(--color-brand)]",
    stepLineAhead:   "bg-gray-200",
  },
  light: {
    label:           "text-[rgba(0,0,0,0.88)] font-normal",
    hint:            "text-gray-400",
    optional:        "text-gray-400",
    radioText:       "text-[rgba(0,0,0,0.88)]",
    radioDot:        "border-[#d9d9d9] bg-white group-hover:border-[var(--color-brand)]",
    radioDotSelected:"border-[var(--color-brand)] bg-[var(--color-brand)]",
    radioDotInner:   "bg-white",
    checkText:       "text-[rgba(0,0,0,0.88)]",
    checkBox:        "border-[#d9d9d9] bg-white rounded-[3px] group-hover:border-[var(--color-brand)]",
    checkBoxSelected:"border-[var(--color-brand)] bg-[var(--color-brand)] rounded-[3px]",
    backBtn:         "text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30",
    nextBtn:         "cta-btn text-white font-semibold",
    selectTrigger:   "w-full",
    divider:         "border-gray-100",
    successIcon:     "text-[var(--color-brand)]",
    successHeading:  "text-[var(--color-text)]",
    successBody:     "text-gray-500",
    stepCircleDone:  "bg-[var(--color-brand)] text-white",
    stepCircleActive:"bg-[var(--color-brand)] text-white",
    stepCircleAhead: "border-2 border-[#d9d9d9] text-[rgba(0,0,0,0.45)] bg-white",
    stepLabelDone:   "text-[var(--color-brand)]",
    stepLabelActive: "text-[rgba(0,0,0,0.88)] font-medium",
    stepLabelAhead:  "text-[rgba(0,0,0,0.45)]",
    stepLine:        "bg-[var(--color-brand)]",
    stepLineAhead:   "bg-[#d9d9d9]",
  },
};

// ── Booking helpers ──────────────────────────────────────────────────────────

const SLOTS = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00",
];
const DAYS_LONG   = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
const MONTHS_LONG = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function getUnavailable(date) {
  const seed = date.getDate() * 3 + date.getMonth() * 7;
  return [seed % SLOTS.length, (seed + 3) % SLOTS.length].map(i => SLOTS[i]);
}

function fmtDate(d) {
  return `${DAYS_LONG[d.getDay()]} ${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

function BookingPanel({ t }) {
  const [bookDate, setBookDate]   = useState(null);
  const [bookSlot, setBookSlot]   = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isDisabled(date) {
    const d = date.getDay();
    return date <= today || d === 0 || d === 6;
  }

  function handleDate(date) { setBookDate(date); setBookSlot(null); }

  const unavail   = bookDate ? getUnavailable(bookDate) : [];
  const slotItems = SLOTS.map(s => ({ time: s, free: !unavail.includes(s) }));

  if (confirmed) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CalendarDays size={28} className="text-green-600" />
        </div>
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${t.successHeading}`}>Rendez-vous confirmé !</h3>
          <p className={`text-base ${t.successBody}`}>
            Nous vous appellerons le{" "}
            <span className={`font-semibold ${t.successHeading}`}>{fmtDate(bookDate)}</span>
            {" "}à <span className={`font-semibold ${t.successHeading}`}>{bookSlot}</span>.
          </p>
          <p className={`text-sm mt-1 ${t.successBody}`}>Un e-mail de confirmation vous sera envoyé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <CheckCircle2 size={40} className="text-green-500" />
        <h3 className={`text-xl font-semibold ${t.successHeading}`}>Demande envoyée !</h3>
        <p className={`text-base max-w-sm ${t.successBody}`}>
          Choisissez un créneau pour votre rappel gratuit avec un conseiller agréé.
        </p>
      </div>

      {/* Calendar + slots */}
      <Card className="rounded-xl border border-gray-100 shadow-none">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6">

          {/* Calendar */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Sélectionnez une date</p>
            <Calendar
              selected={bookDate}
              onSelect={handleDate}
              disabled={isDisabled}
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 1}
            />
          </div>

          {/* Slots */}
          <div className="flex flex-col">
            {bookDate ? (
              <>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 capitalize">
                  {fmtDate(bookDate)}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {slotItems.map(({ time, free }) => (
                    <Button
                      key={time}
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={!free}
                      onClick={() => setBookSlot(time)}
                      className={`h-10 rounded-lg text-sm transition-colors ${
                        !free
                          ? "border-gray-100 text-gray-300 bg-gray-50"
                          : bookSlot === time
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand)] hover:text-white"
                            : "border-gray-200 text-gray-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-transparent"
                      }`}
                    >
                      {free ? time : <s>{time}</s>}
                    </Button>
                  ))}
                </div>
                {bookSlot && (
                  <Button
                    type="button"
                    onClick={() => setConfirmed(true)}
                    className="mt-4 w-full cta-btn text-white font-semibold"
                  >
                    Confirmer {bookSlot}
                  </Button>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-400 text-center leading-relaxed">
                  Sélectionnez une date pour voir<br />les créneaux disponibles.
                </p>
              </div>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Direct contact */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 w-full">
          <Separator className="flex-1" />
          <span className="text-xs text-gray-400 whitespace-nowrap px-2">Ou contactez-nous directement</span>
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" asChild className="gap-2 h-10 rounded-lg border-gray-200 text-gray-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-transparent">
            <a href="tel:+33800000000">
              <Phone size={15} />
              +33 800 000 000
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-2 h-10 rounded-lg border-gray-200 text-gray-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-transparent">
            <a href="mailto:contact@newworldcourtage.fr">
              <Mail size={15} />
              contact@newworldcourtage.fr
            </a>
          </Button>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CarInsuranceForm({ initialAnswers = {}, startSection = 0, theme = "dark", onProgress }) {
  const [sectionIdx, setSectionIdx] = useState(startSection);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const t = TOKENS[theme];
  const currentSectionName = SECTIONS[sectionIdx];
  const sectionSteps = STEPS.filter(s => s.section === currentSectionName);
  const isLastSection = sectionIdx === SECTIONS.length - 1;
  const progress = Math.round(((sectionIdx + 1) / SECTIONS.length) * 100);

  useEffect(() => {
    onProgress?.(progress);
  }, [progress]);

  function setAnswer(stepId, val) {
    setAnswers(prev => ({ ...prev, [stepId]: val }));
    setErrors(prev => { const e = { ...prev }; delete e[stepId]; return e; });
  }

  function handleNext() {
    const newErrors = {};
    sectionSteps.forEach(step => {
      if (step.optional || step.type === "checkbox") return;
      const ans = answers[step.id] ?? "";
      if (ans === "") newErrors[step.id] = "Ce champ est requis.";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstId = Object.keys(newErrors)[0];
      const el =
        document.getElementById(`field-${firstId}`) ||
        document.getElementById(`radio-${firstId}-0`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    if (isLastSection) setSubmitted(true);
    else setSectionIdx(s => s + 1);
  }

  function handleBack() {
    if (sectionIdx > 0) setSectionIdx(s => s - 1);
  }

  if (submitted) {
    return <BookingPanel t={t} />;
  }

  return (
    <div className="flex flex-col gap-10">

      {/* Steps — sticky below the header (64px logo row + 5px progress bar = 69px) */}
      <div className="sticky top-[69px] z-30 bg-white -mx-4 px-4 lg:-mx-6 lg:px-6 py-4 border-b border-gray-100">

        {/* Desktop */}
        <div className="hidden sm:flex items-start">
          {SECTIONS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < sectionIdx ? t.stepCircleDone : i === sectionIdx ? t.stepCircleActive : t.stepCircleAhead
                }`}>
                  {i < sectionIdx ? <Check size={14} strokeWidth={2.5} /> : i + 1}
                </div>
                <span className={`text-xs whitespace-nowrap transition-colors ${
                  i < sectionIdx ? t.stepLabelDone : i === sectionIdx ? t.stepLabelActive : t.stepLabelAhead
                }`}>
                  {s}
                </span>
              </div>
              {i < SECTIONS.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-5 transition-colors ${i < sectionIdx ? t.stepLine : t.stepLineAhead}`} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile compact */}
        <div className="flex sm:hidden items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${t.stepCircleActive}`}>
            {sectionIdx + 1}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className={`text-base font-semibold ${t.stepLabelActive}`}>{currentSectionName}</span>
            <span className={`text-xs ${t.stepLabelAhead}`}>Étape {sectionIdx + 1} sur {SECTIONS.length}</span>
          </div>
          <div className={`flex-1 h-1.5 rounded-full overflow-hidden ml-2 ${t.stepLineAhead}`}>
            <div className={`h-full rounded-full transition-all duration-300 ${t.stepLine}`} style={{ width: `${progress}%` }} />
          </div>
        </div>

      </div>

      {/* Questions — 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {sectionSteps.map((step) => {
          const answer = answers[step.id] ?? (step.type === "checkbox" ? [] : "");
          const dynamicOpts = step.optionsFn ? step.optionsFn(answers) : { options: step.options, values: step.values };

          return (
            <div
              key={step.id}
              className={`flex flex-col gap-3 ${step.cols === 2 ? "col-span-1 sm:col-span-2" : "col-span-1"}`}
            >
              {/* Label */}
              {(step.type === "radio" || step.type === "checkbox") ? (
                <p className={`text-base lg:text-lg leading-snug ${t.label}`}>
                  {step.question}
                  {step.optional && <span className={`ml-2 font-normal text-sm ${t.optional}`}>(optionnel)</span>}
                </p>
              ) : (
                <label htmlFor={`field-${step.id}`} className={`text-base lg:text-lg leading-snug cursor-pointer ${t.label}`}>
                  {step.question}
                  {step.optional && <span className={`ml-2 font-normal text-sm ${t.optional}`}>(optionnel)</span>}
                </label>
              )}

              {/* Radio — card style (vehicle type) */}
              {step.type === "radio" && step.card && (
                <>
                  <RadioGroup
                    value={answer}
                    onValueChange={val => setAnswer(step.id, val)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    {dynamicOpts.options.map((opt, i) => (
                      <FieldLabel key={i} htmlFor={`radio-${step.id}-${i}`}>
                        <Field
                          orientation="horizontal"
                          className={`transition-colors ${
                            answer === dynamicOpts.values[i]
                              ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                              : errors[step.id]
                                ? "border-[var(--color-error)]"
                                : "hover:border-[var(--color-brand)]"
                          }`}
                        >
                          <FieldContent>
                            <FieldTitle>{opt}</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value={dynamicOpts.values[i]} id={`radio-${step.id}-${i}`} />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {errors[step.id] && <p className="text-xs text-[var(--color-error)] mt-0.5">{errors[step.id]}</p>}
                </>
              )}

              {/* Radio — inline style */}
              {step.type === "radio" && !step.card && (
                <>
                  <RadioGroup
                    value={answer}
                    onValueChange={val => setAnswer(step.id, val)}
                  >
                    {dynamicOpts.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <RadioGroupItem value={dynamicOpts.values[i]} id={`radio-${step.id}-${i}`} />
                        <Label htmlFor={`radio-${step.id}-${i}`} className={`text-base font-normal ${t.radioText}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors[step.id] && <p className="text-xs text-[var(--color-error)] mt-0.5">{errors[step.id]}</p>}
                </>
              )}

              {/* Checkbox */}
              {step.type === "checkbox" && (
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {step.options.map((opt, i) => {
                    const val = step.values[i];
                    const isSelected = answer.includes(val);
                    return (
                      <label key={i} className="flex items-center gap-2.5 cursor-pointer group"
                        onClick={() => setAnswer(step.id, isSelected ? answer.filter(v => v !== val) : [...answer, val])}>
                        <span className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? t.checkBoxSelected : t.checkBox
                        }`}>
                          {isSelected && (
                            <svg width="11" height="9" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span className={`text-base ${t.checkText}`}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Select */}
              {step.type === "select" && (
                <>
                  <Select value={answer} onValueChange={val => setAnswer(step.id, val)}>
                    <SelectTrigger
                      id={`field-${step.id}`}
                      className={`w-full ${errors[step.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_rgba(255,77,79,0.15)]" : ""}`}
                    >
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent>
                      {dynamicOpts.options.map((opt, i) => (
                        <SelectItem key={i} value={dynamicOpts.values[i]}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[step.id] && <p className="text-xs text-[var(--color-error)] mt-0.5">{errors[step.id]}</p>}
                </>
              )}

              {/* Date / month picker */}
              {step.type === "input" && (step.inputType === "date" || step.inputType === "month") && (
                <>
                  <DatePickerInput
                    id={`field-${step.id}`}
                    value={answer}
                    onChange={val => setAnswer(step.id, val)}
                    placeholder={step.placeholder || "Sélectionnez une date"}
                    theme={theme}
                    error={!!errors[step.id]}
                  />
                  {errors[step.id] && <p className="text-xs text-[var(--color-error)] mt-0.5">{errors[step.id]}</p>}
                </>
              )}

              {/* Text / number / email / tel */}
              {step.type === "input" && step.inputType !== "date" && step.inputType !== "month" && (
                <>
                  <Input
                    id={`field-${step.id}`}
                    type={step.inputType}
                    placeholder={step.placeholder}
                    value={answer}
                    onChange={e => setAnswer(step.id, e.target.value)}
                    className={errors[step.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_rgba(255,77,79,0.15)]" : ""}
                  />
                  {errors[step.id] && <p className="text-xs text-[var(--color-error)] mt-0.5">{errors[step.id]}</p>}
                </>
              )}
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
          className={`gap-1 ${t.nextBtn}`}
        >
          {isLastSection ? "Envoyer ma demande" : "Suivant"}
          {!isLastSection && <ChevronRight size={16} />}
        </Button>
      </div>

    </div>
  );
}
