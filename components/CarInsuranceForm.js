"use client"

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePickerInput } from "@/components/DatePickerInput";
import { MonthYearInput } from "@/components/MonthYearInput";
import { ChevronLeft, ChevronRight, CheckCircle2, Phone, Mail, CalendarDays, Car, User, ListChecks, Shield, FileText, Circle, AlertTriangle, Wallet, Paperclip, Loader2 } from "lucide-react";
import { fetchAvailability, bookConsultation } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";

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
const DEFAULT_STEPS = [
  // --- Véhicule ---
  { id: 0,  cols: 2, section: "Véhicule",   type: "radio", card: true, eyebrow: "Pour commencer", question: "Quel véhicule souhaitez-vous assurer ?", options: ["Mon véhicule actuel", "Un futur achat"], values: ["current", "future"] },
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

const SECTION_ICONS = {
  "Véhicule": Car,
  "Conducteur": User,
  "Historique": ListChecks,
  "Couverture": Shield,
  "Contrat": FileText,
  "Contact": Phone,
  "Coordonnées": User,
  "Risques": AlertTriangle,
  "Antécédents": ListChecks,
  "Flotte auto propre": Car,
  "Tarification": Wallet,
};

const TOKENS = {
  dark: {
    eyebrow:         "text-white/60 font-medium",
    bigQuestion:     "text-white",
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
    eyebrow:         "text-gray-500 font-medium",
    bigQuestion:     "text-[var(--color-text)]",
    label:           "text-[rgba(0,0,0,0.88)] font-semibold",
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

function fmtDate(d) {
  return `${DAYS_LONG[d.getDay()]} ${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function BookingPanel({ t, leadId, bookingDocs = [] }) {
  const [bookDate, setBookDate] = useState(null);
  const [bookSlot, setBookSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isDisabled(date) {
    const d = date.getDay();
    return date <= today || d === 0 || d === 6;
  }

  function handleDate(date) {
    setBookDate(date);
    setBookSlot(null);
    setBookError(null);
  }

  // Real availability from the consultants table (see backend
  // routers/consultants.py) instead of a placeholder pattern — a slot only
  // shows as free if at least one active consultant has no booking there yet.
  useEffect(() => {
    if (!bookDate) return;
    let cancelled = false;
    setLoadingSlots(true);
    fetchAvailability(toISODate(bookDate))
      .then((data) => { if (!cancelled) setSlots(data.slots); })
      .catch(() => { if (!cancelled) setSlots(SLOTS.map((s) => ({ time: s, available: false }))); })
      .finally(() => { if (!cancelled) setLoadingSlots(false); });
    return () => { cancelled = true; };
  }, [bookDate]);

  function handleConfirm() {
    if (!bookDate || !bookSlot) return;
    setBooking(true);
    setBookError(null);
    bookConsultation({ date: toISODate(bookDate), time: bookSlot, leadId })
      .then((res) => setConfirmedBooking(res))
      .catch((err) => {
        setBookError(err.message || "Ce créneau n'est plus disponible, merci d'en choisir un autre.");
        setBookSlot(null);
        fetchAvailability(toISODate(bookDate)).then((data) => setSlots(data.slots)).catch(() => {});
      })
      .finally(() => setBooking(false));
  }

  if (confirmedBooking) {
    const [y, m, d] = confirmedBooking.date.split("-").map(Number);
    const confirmedDate = new Date(y, m - 1, d);
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CalendarDays size={28} className="text-green-600" />
        </div>
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${t.successHeading}`}>Rendez-vous confirmé !</h3>
          <p className={`text-base ${t.successBody}`}>
            Nous vous appellerons le{" "}
            <span className={`font-semibold ${t.successHeading}`}>{fmtDate(confirmedDate)}</span>
            {" "}à <span className={`font-semibold ${t.successHeading}`}>{confirmedBooking.time}</span>.
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
          Un de nos experts va vous contacter dans les plus brefs délais. Pour être sûr de vous
          joindre au bon moment, proposez-nous un créneau ci-dessous.
        </p>
      </div>

      {/* Required documents */}
      {bookingDocs.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Paperclip size={15} className={t.successIcon} />
            <p className={`text-xs font-semibold uppercase tracking-wide ${t.hint}`}>
              Documents à préparer avant l&apos;appel
            </p>
          </div>
          <div className={`grid grid-cols-1 ${bookingDocs.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-3`}>
            {bookingDocs.map(({ icon: Icon, label, desc }, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] leading-snug">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              loadingSlots ? (
                <div className="flex-1 flex items-center justify-center gap-2 text-gray-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Chargement des créneaux…</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 capitalize">
                    {fmtDate(bookDate)}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map(({ time, available }) => (
                      <Button
                        key={time}
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={!available}
                        onClick={() => setBookSlot(time)}
                        className={`h-10 rounded-lg text-sm transition-colors ${
                          !available
                            ? "border-gray-100 text-gray-300 bg-gray-50"
                            : bookSlot === time
                              ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand)] hover:text-white"
                              : "border-gray-200 text-gray-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-transparent"
                        }`}
                      >
                        {available ? time : <s>{time}</s>}
                      </Button>
                    ))}
                  </div>
                  {bookError && <p className="text-xs text-[var(--color-error)] mt-2">{bookError}</p>}
                  {bookSlot && (
                    <Button
                      type="button"
                      onClick={handleConfirm}
                      disabled={booking}
                      className="mt-4 w-full cta-btn text-white font-semibold gap-2"
                    >
                      {booking && <Loader2 size={16} className="animate-spin" />}
                      Confirmer {bookSlot}
                    </Button>
                  )}
                </>
              )
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
            <a href="tel:+33745891865">
              <Phone size={15} />
              07 45 89 18 65
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-2 h-10 rounded-lg border-gray-200 text-gray-700 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-transparent">
            <a href="mailto:devis@newworldcourtage.com">
              <Mail size={15} />
              devis@newworldcourtage.com
            </a>
          </Button>
        </div>
      </div>

    </div>
  );
}

// ── Skip-logic (rules) ───────────────────────────────────────────────────────

function isStepSkipped(step, answers, selectedProducts) {
  if (step.alwaysSkip) return true;
  // Product-gated question (e.g. garage-only "Surface du risque") — skipped
  // unless the prospect picked at least one of its allowed products on the
  // gate screen.
  if (step.products && selectedProducts && !step.products.some(p => selectedProducts.includes(p))) {
    return true;
  }
  if (!step.rules || step.rules.length === 0) return false;
  return step.rules.some(rule => {
    if (rule.action !== "skip") return false;
    const sourceValue = answers[rule.source_question_id];
    if (rule.operator === "not_equals") return sourceValue !== rule.value;
    return sourceValue === rule.value;
  });
}

// All questions belonging to `section` that aren't currently skipped —
// what actually renders in that section's field grid.
function sectionFields(steps, section, answers, selectedProducts) {
  return steps.filter(s => s.section === section && !isStepSkipped(s, answers, selectedProducts));
}

// Questions in `section` that were answered via URL prefill (e.g. redirected
// here from an identity form) rather than product/rule gating — shown as a
// read-only recap up top so the user sees we already captured them, instead
// of just silently omitting them from the field grid.
function prefilledSectionFields(steps, section) {
  return steps.filter(s => s.section === section && s.alwaysSkip);
}

// Splits a section's visible fields into the generic ones (no `products`,
// apply to everyone) and one group per selected product, in the order the
// prospect picked them on the gate screen. A field naming more than one
// selected product (shared across offers) is claimed by whichever of those
// comes first, so it's never listed twice.
function groupFieldsByProduct(fields, selectedProducts) {
  const generic = fields.filter(f => !f.products || f.products.length === 0);
  const claimed = new Set();
  const groups = [];
  // No real gate answer to order by (see the selectedProducts fallback to
  // null above) — fall back to every product actually referenced by these
  // fields, in first-appearance order, so a product-tagged field still
  // renders somewhere instead of being silently dropped.
  const products = selectedProducts || [...new Set(fields.flatMap(f => f.products || []))];
  for (const product of products) {
    const productFields = fields.filter(f => f.products?.includes(product) && !claimed.has(f.id));
    productFields.forEach(f => claimed.add(f.id));
    if (productFields.length > 0) groups.push({ product, fields: productFields });
  }
  return { generic, groups };
}

// Splits an already-ordered list of fields into contiguous runs sharing the
// same `eyebrow` value, so a product's fields can render as several
// banner-headed sub-blocks (e.g. Convoyeur's "Analyse des risques —
// Sinistralité" / "Local et risques associés") instead of one flat grid.
// Fields with no eyebrow get their own headerless run.
function groupFieldsByEyebrow(fields) {
  const runs = [];
  for (const f of fields) {
    const key = f.eyebrow || null;
    const last = runs[runs.length - 1];
    const belongsToLastRun = f.parentKey && last?.fields.some(field => field.key === f.parentKey);
    if (belongsToLastRun || (last && last.eyebrow === key)) last.fields.push(f);
    else runs.push({ eyebrow: key, fields: [f] });
  }
  return runs;
}

function formatAnswerValue(step, value) {
  if (value == null || value === "") return "";
  if (step.inputType === "date" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }
  if (step.inputType === "tel") {
    // French grouping: "0619018921" -> "06-19-01-89-21"
    const digits = String(value).replace(/\D/g, "");
    return digits.replace(/(\d{2})(?=\d)/g, "$1-");
  }
  if (step.key === "siret") {
    // SIRET grouping: 3-3-3-5 (SIREN + NIC), e.g. "123456789 00012" -> "123 456 789 00012"
    const digits = String(value).replace(/\D/g, "");
    const siren = digits.slice(0, 9).replace(/(\d{3})(?=\d)/g, "$1 ").trim();
    const nic = digits.slice(9);
    return nic ? `${siren} ${nic}` : siren;
  }
  return String(value);
}

// Walks in `dir` (+1/-1) from `fromIdx`, skipping any section that ends up
// with zero visible fields (e.g. every question in it was URL-prefilled or
// none of it applies to the selected products), and returns the first
// visible section index (or an out-of-bounds index).
function findVisibleSectionIndex(sections, steps, fromIdx, dir, answers, selectedProducts) {
  let i = fromIdx;
  while (i >= 0 && i < sections.length && sectionFields(steps, sections[i], answers, selectedProducts).length === 0) {
    i += dir;
  }
  return i;
}

// ── Resume-in-progress persistence (localStorage) ────────────────────────────
// Only the answered field values are remembered here — which step is showing
// lives entirely in the URL's ?step= param (see the component below), so the
// browser's own Back/Forward always match what's on screen with no separate
// source of truth to drift out of sync.

function progressStorageKey(key) {
  return `nwc_car_form_${key}`;
}

function readStoredProgress(key) {
  if (!key) return null;
  try {
    const raw = localStorage.getItem(progressStorageKey(key));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredProgress(key, data) {
  if (!key) return;
  try {
    localStorage.setItem(progressStorageKey(key), JSON.stringify(data));
  } catch {}
}

function clearStoredProgress(key) {
  if (!key) return;
  try {
    localStorage.removeItem(progressStorageKey(key));
  } catch {}
}

// Half-width by default; full-width for anything that tends to need more
// horizontal room (option groups, free text) or that explicitly asks for it
// via a catalog-level cols: 2.
function isWideField(step) {
  if (step.cols === 2) return true;
  if (step.cols === 1) return false;
  if (step.key === "negociant_type_bien") return false;
  if (step.key === "w_garage_vehicules" || step.key === "flotte_immatriculations" || step.key === "pct_detention_capital") return true;
  if (step.type === "radio" || step.type === "checkbox") return true;
  if (step.type === "input" && step.inputType === "textarea") return true;
  return false;
}

// Closes the same gap grid-flow-dense would (a lone half-width field before
// a full-width one) but respects question dependencies — a field skip_unless
// on an earlier one is never pulled ahead of it just to fill a hole. Pulls
// the next dependency-satisfied half-width field forward instead.
function packFieldsAvoidingGaps(fields) {
  const result = [];
  const remaining = [...fields];
  const placedIds = new Set();
  let awaitingPartner = false;

  const satisfied = f => !f.rules?.length || f.rules.every(r => placedIds.has(r.source_question_id));

  while (remaining.length > 0) {
    const field = remaining.shift();
    const wide = isWideField(field);

    if (wide && awaitingPartner && field.type !== "checkbox") {
      const idx = remaining.findIndex(f => !isWideField(f) && satisfied(f));
      if (idx !== -1) {
        const filler = remaining.splice(idx, 1)[0];
        result.push(filler);
        placedIds.add(filler.id);
      }
      awaitingPartner = false;
    }

    result.push(field);
    placedIds.add(field.id);
    awaitingPartner = wide ? false : !awaitingPartner;
  }

  return result;
}

function isEmbeddedParentField(step) {
  return step.key === "w_garage_nombre_vehicules" || step.key === "flotte_nombre_vehicules";
}

// ── Multi-associate capital % field ──────────────────────────────────────────
// "% détention du capital" needs one input per associé — a new one appears
// automatically as long as the running total is still under 100%, and no
// entry can push the sum over 100% or go negative.
const EMPTY_ASSOCIE = { pct: "", civilite: "", naissance: "", commune: "" };

function AssocieCapitalField({ s, answer, setAnswer, theme }) {
  const committed = Array.isArray(answer) ? answer : [];

  const slots = [];
  let sum = 0;
  for (const v of committed) {
    slots.push(v);
    sum += parseFloat(v?.pct) || 0;
    if (sum >= 100) break;
  }
  if (slots.length === 0 || (slots[slots.length - 1]?.pct !== "" && sum < 100)) {
    slots.push({ ...EMPTY_ASSOCIE });
  }

  function handleChange(i, field, raw) {
    const next = slots.slice(0, i + 1).map((v) => ({ ...EMPTY_ASSOCIE, ...v }));

    if (field === "pct") {
      const priorSum = next.slice(0, i).reduce((acc, v) => acc + (parseFloat(v.pct) || 0), 0);
      const remaining = Math.max(0, 100 - priorSum);

      let v = raw.replace(/[^\d.]/g, "");
      const firstDot = v.indexOf(".");
      if (firstDot !== -1) v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, "");
      if (v !== "" && v !== ".") {
        const num = parseFloat(v);
        if (!isNaN(num) && num > remaining) v = String(remaining);
      }
      next[i] = { ...next[i], pct: v };
    } else {
      next[i] = { ...next[i], [field]: raw };
    }

    setAnswer(s.id, next);
  }

  return (
    <div className="flex flex-col gap-6">
      {slots.map((v, i) => (
        <div key={i} className={`flex flex-col gap-3 ${i > 0 ? "pt-6 border-t border-gray-200" : ""}`}>
          <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[var(--color-brand)]/10 px-3 py-1 text-xs font-bold tracking-wide text-[var(--color-brand)] uppercase">
            Associé {i + 1}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">% détention du capital</label>
              <Input
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                value={v.pct}
                onChange={e => handleChange(i, "pct", e.target.value)}
                placeholder="Ex : 50"
                className="bg-white h-[50px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Civilité</label>
              <Select value={v.civilite} onValueChange={val => handleChange(i, "civilite", val)}>
                <SelectTrigger className="w-full bg-white !h-[50px]">
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">Monsieur</SelectItem>
                  <SelectItem value="mme">Madame</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Date de naissance</label>
              <DatePickerInput
                value={v.naissance}
                onChange={val => handleChange(i, "naissance", val)}
                placeholder="__/__/____"
                theme={theme}
                className="bg-white h-[50px] w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Commune de naissance</label>
              <Input
                value={v.commune}
                onChange={e => handleChange(i, "commune", e.target.value)}
                placeholder="Ex : Paris"
                className="bg-white h-[50px]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Per-vehicle fleet details ────────────────────────────────────────────────
// "Immatriculations (carte grise) des véhicules" becomes one repeating group
// of fields (véhicule, immatriculation, mode d'achat, usage) per vehicle,
// with the number of groups driven by the "Nombre de véhicules dans la
// flotte" question elsewhere in the same section.
function FlotteVehiculesField({ s, answer, setAnswer, wizardSteps, answers, errors = {} }) {
  const countField = wizardSteps.find(f => f.key === "flotte_nombre_vehicules");
  const rawCount = countField ? answers[countField.id] : "";
  const count = Math.max(0, Math.min(50, parseInt(rawCount, 10) || 0));

  const stored = Array.isArray(answer) ? answer : [];
  const rows = Array.from({ length: count }, (_, i) => stored[i] || { vehicule: "", immatriculation: "", modeAchat: "", usage: "" });

  function updateRow(i, field, value) {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r));
    setAnswer(s.id, next);
  }

  const countEditor = countField && (
    <div id={`field-card-${countField.id}`} className="flex w-full flex-col gap-2 sm:w-[calc(50%-0.75rem)]">
      <label htmlFor={`field-${countField.id}`} className="text-[16px] cursor-pointer block text-[var(--color-text)] min-h-11">
        {countField.question}
        {!countField.optional && <span className="ml-0.5">*</span>}
      </label>
      <Input id={`field-${countField.id}`} type="number" min={0} inputMode="decimal" value={rawCount}
        onChange={e => setAnswer(countField.id, e.target.value)}
        className={`bg-white h-[50px] ${errors[countField.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_rgba(242,105,61,0.15)]" : ""}`} />
      {errors[countField.id] && <p className="text-xs text-[var(--color-error)]">{errors[countField.id]}</p>}
    </div>
  );
  const detailsHeading = <p className="text-[16px] text-[var(--color-text)]">{s.question}</p>;

  if (count === 0) {
    return (
      <div className="flex flex-col gap-4">
        {countEditor}
        {detailsHeading}
        <p className="text-sm text-gray-400">Renseignez le nombre de véhicules pour ajouter les détails.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {countEditor}
      {detailsHeading}
      {rows.map((row, i) => (
        <div key={i} className={`flex flex-col gap-3 pl-8 ${i > 0 ? "pt-6 border-t border-gray-200" : ""}`}>
          <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[var(--color-brand)]/10 px-3 py-1 text-xs font-bold tracking-wide text-[var(--color-brand)] uppercase">
            Véhicule {i + 1}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Véhicule</label>
              <Input
                value={row.vehicule}
                onChange={e => updateRow(i, "vehicule", e.target.value)}
                placeholder="Ex : Renault Trafic"
                className="bg-white h-[50px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">N° d'immatriculation</label>
              <Input
                value={row.immatriculation}
                onChange={e => updateRow(i, "immatriculation", e.target.value.toUpperCase())}
                placeholder="Ex : AB-123-CD"
                className="bg-white h-[50px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Mode d'achat</label>
              <Select value={row.modeAchat} onValueChange={v => updateRow(i, "modeAchat", v)}>
                <SelectTrigger className="w-full bg-white !h-[50px] data-[size=default]:!h-[50px]">
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comptant">Comptant</SelectItem>
                  <SelectItem value="credit">Crédit</SelectItem>
                  <SelectItem value="leasing">Leasing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Usage</label>
              <Select value={row.usage} onValueChange={v => updateRow(i, "usage", v)}>
                <SelectTrigger className="w-full bg-white !h-[50px] data-[size=default]:!h-[50px]">
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professionnel">Professionnel</SelectItem>
                  <SelectItem value="mixte">Mixte (pro et personnel)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const W_GARAGE_MODE_ACHAT_OPTIONS = [
  { label: "Comptant", value: "comptant" },
  { label: "LOA", value: "loa" },
  { label: "LLD", value: "lld" },
  { label: "Crédit bancaire", value: "credit_bancaire" },
];

const W_GARAGE_USAGE_OPTIONS = [
  { label: "Courtoisie", value: "courtoisie" },
  { label: "Véhicule de société", value: "vehicule_societe" },
  { label: "Location", value: "location" },
  { label: "Gérant", value: "gerant" },
];

// Same repeat-per-count pattern as FlotteVehiculesField above, driven by
// "w_garage_nombre_vehicules" instead of "flotte_nombre_vehicules" — one
// Mode d'achat + Usage pair per W Garage vehicle.
function WGarageVehiculesField({ s, answer, setAnswer, wizardSteps, answers, errors = {}, labelClass }) {
  const countField = wizardSteps.find(f => f.key === "w_garage_nombre_vehicules");
  const rawCount = countField ? answers[countField.id] : "";
  const count = Math.max(0, Math.min(50, parseInt(rawCount, 10) || 0));

  const stored = Array.isArray(answer) ? answer : [];
  const rows = Array.from({ length: count }, (_, i) => stored[i] || { modeAchat: "", usage: "" });

  function updateRow(i, field, value) {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r));
    setAnswer(s.id, next);
  }

  const countEditor = countField && (
    <div id={`field-card-${countField.id}`} className="flex w-full flex-col gap-2 sm:w-[calc(50%-0.75rem)]">
      <label htmlFor={`field-${countField.id}`} className={`text-[16px] cursor-pointer block min-h-11 ${labelClass}`}>
        {countField.question}
        {!countField.optional && <span className="ml-0.5">*</span>}
      </label>
      <Input id={`field-${countField.id}`} type="number" min={0} inputMode="decimal" value={rawCount}
        onChange={e => setAnswer(countField.id, e.target.value)}
        className={`bg-white h-[50px] ${errors[countField.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_rgba(242,105,61,0.15)]" : ""}`} />
      {errors[countField.id] && <p className="text-xs text-[var(--color-error)]">{errors[countField.id]}</p>}
    </div>
  );
  const detailsHeading = <p className="text-[16px] text-[var(--color-text)]">{s.question}</p>;

  if (count === 0) {
    return (
      <div className="flex flex-col gap-4">
        {countEditor}
        {detailsHeading}
        <p className="text-sm text-gray-400">Renseignez le nombre de véhicules pour ajouter les détails.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {countEditor}
      {detailsHeading}
      {rows.map((row, i) => (
        <div key={i} className={`flex flex-col gap-3 pl-8 ${i > 0 ? "pt-6 border-t border-gray-200" : ""}`}>
          <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[var(--color-brand)]/10 px-3 py-1 text-xs font-bold tracking-wide text-[var(--color-brand)] uppercase">
            Véhicule {i + 1}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Mode d'achat</label>
              <Select value={row.modeAchat} onValueChange={v => updateRow(i, "modeAchat", v)}>
                <SelectTrigger className="w-full bg-white !h-[50px] data-[size=default]:!h-[50px]">
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {W_GARAGE_MODE_ACHAT_OPTIONS.map(o => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Usage</label>
              <Select value={row.usage} onValueChange={v => updateRow(i, "usage", v)}>
                <SelectTrigger className="w-full bg-white !h-[50px] data-[size=default]:!h-[50px]">
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {W_GARAGE_USAGE_OPTIONS.map(o => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CarInsuranceForm({ steps: rawSteps = DEFAULT_STEPS, initialAnswers = {}, theme = "dark", onProgress, onSubmit, footerContent, storageKey, bookingDocs }) {
  // Questions already answered via URL params (e.g. redirected here from an
  // identity form that collected name/phone/email/etc.) shouldn't be asked
  // again — mark them as always-skipped so they're filtered out of their
  // section's field grid, while their value still counts toward submission.
  // Gate fields (e.g. GarageIdentityForm's product picker) are excluded from
  // this: they never render in a section grid anyway (wizardSteps already
  // drops every `gate` field below), but `alwaysSkip` is also what
  // isStepSkipped uses to compute gateFields — tagging the gate field itself
  // would wipe out productsGateField/selectedProducts and un-gate every
  // product-specific question instead of narrowing them down.
  const steps = useMemo(() => {
    const prefilledIds = new Set(
      Object.entries(initialAnswers)
        .filter(([, v]) => (Array.isArray(v) ? v.length > 0 : v !== "" && v != null))
        .map(([id]) => Number(id))
    );
    if (prefilledIds.size === 0) return rawSteps;
    return rawSteps.map(s => (prefilledIds.has(s.id) && !s.gate ? { ...s, alwaysSkip: true } : s));
  }, [rawSteps, initialAnswers]);

  const [direction, setDirection] = useState("next");
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState(null);
  const [errors, setErrors] = useState({});
  const [hydrated, setHydrated] = useState(false);

  const t = TOKENS[theme];
  const router = useRouter();

  // "Gate" questions (catalog-level `gate: true`) are shown on their own
  // screen before the step-by-step wizard begins — they're never one of its
  // sections/tabs.
  const gateFields = steps.filter(s => s.gate && !isStepSkipped(s, answers));
  const wizardSteps = steps.filter(s => !s.gate);

  // Which step is showing is derived entirely from the URL (?step=gate | a
  // section index) — never from local state or localStorage — so the
  // browser's Back/Forward buttons and the in-app ones both just change the
  // URL and let this same derivation decide what renders. No query param at
  // all means "the very start" (gate if this questionnaire has one).
  const stepParam = router.query.step;
  const hasGate = gateFields.length > 0;
  const gatePassed = !hasGate || (stepParam !== undefined && stepParam !== "gate");
  const stepIdx = gatePassed ? Math.max(0, parseInt(stepParam, 10) || 0) : 0;

  // The gate's own answer (which product(s) the prospect picked) — used to
  // filter which of the rest of the questions apply to them.
  const productsGateField = gateFields.find(s => s.type === "checkbox" || s.type === "radio");
  const rawSelectedProducts = productsGateField ? answers[productsGateField.id] : undefined;
  const selectedProductsList = Array.isArray(rawSelectedProducts) ? rawSelectedProducts : [rawSelectedProducts].filter(Boolean);
  // An empty list here only happens if the gate was bypassed without ever
  // being answered (e.g. GarageIdentityForm's redirect landing on a step
  // without its "produits" param) — treat that the same as "no gate at all"
  // (null) so every product-gated question stays visible instead of every
  // one of them silently disappearing, which is what `[].includes(p)` being
  // always false would otherwise do to isStepSkipped.
  const selectedProducts = selectedProductsList.length > 0 ? selectedProductsList : null;

  // Sections, in first-appearance order — excluding any section that ends up
  // with no visible fields for the selected products (so its tab never
  // shows at all, rather than being an unreachable dead end).
  const sections = [...new Set(wizardSteps.map(s => s.section).filter(Boolean))]
    .filter(sec => sectionFields(wizardSteps, sec, answers, selectedProducts).length > 0);
  const currentSection = sections[stepIdx];
  const visibleFields = sectionFields(wizardSteps, currentSection, answers, selectedProducts);
  const prefilledFields = prefilledSectionFields(wizardSteps, currentSection);
  const { generic: genericFields, groups: productGroups } = groupFieldsByProduct(visibleFields, selectedProducts);
  const productLabel = (value) => {
    const idx = productsGateField?.values?.indexOf(value) ?? -1;
    return idx >= 0 ? productsGateField.options[idx] : value;
  };
  const isLastStep = findVisibleSectionIndex(sections, wizardSteps, stepIdx + 1, 1, answers, selectedProducts) >= sections.length;
  const progress = Math.round(((stepIdx + 1) / sections.length) * 100);

  useEffect(() => {
    onProgress?.(progress);
  }, [progress]);

  // Land at the top of the new step instead of wherever the previous one
  // happened to be scrolled to.
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, gatePassed]);

  // Resume from a previous visit: merge any saved field values under
  // `answers` (URL-derived initialAnswers still win on conflicts) so nothing
  // already filled in has to be retyped. Which step is showing is not
  // restored from here — that's the URL's job, per the derivation above.
  useEffect(() => {
    const saved = readStoredProgress(storageKey);
    const mergedAnswers = saved ? { ...saved.answers, ...initialAnswers } : initialAnswers;
    setAnswers(mergedAnswers);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Slide-in direction for the step transition — derived by comparing this
  // render's step against the last one, so it's correct whether the change
  // came from a click or from the browser's own Back/Forward.
  const stepRankRef = useRef(null);
  useEffect(() => {
    const rank = gatePassed ? stepIdx : -1;
    if (stepRankRef.current !== null && stepRankRef.current !== rank) {
      setDirection(rank >= stepRankRef.current ? "next" : "prev");
    }
    stepRankRef.current = rank;
  }, [stepIdx, gatePassed]);

  // Persist just the answers as the user fills the form, so a reload or a
  // later visit doesn't force retyping — see the resume effect above.
  useEffect(() => {
    if (!hydrated) return;
    writeStoredProgress(storageKey, { answers });
  }, [answers, storageKey, hydrated]);

  function setAnswer(stepId, val) {
    setAnswers(prev => ({ ...prev, [stepId]: val }));
    setErrors(prev => { const e = { ...prev }; delete e[stepId]; return e; });
  }

  // Pushes a new URL (same page, ?step=<n>) — a real history entry, so the
  // browser's own Back button naturally lands on whatever step preceded it.
  function pushStep(nextStepIdx) {
    router.push({ pathname: router.pathname, query: { ...router.query, step: String(nextStepIdx) } }, undefined, { shallow: true, scroll: false });
  }

  // Hand-rolled instead of el.scrollIntoView({behavior:"smooth"}) — browsers
  // silently downgrade that to an instant jump under prefers-reduced-motion,
  // and even without it the native duration can be so short it barely reads
  // as animated. This guarantees a visible, consistent glide every time.
  function animateScrollTo(targetY, duration = 500) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 1) return;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // A required field can be off-screen (above or below the fold) when
  // validation blocks "Suivant" — without this, clicking it just silently
  // does nothing as far as the user can tell. `fields` is the section's own
  // field order, so this lands on whichever invalid one appears first.
  function scrollToFirstError(fields, newErrors) {
    const first = fields.find(s => newErrors[s.id]);
    if (!first) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(`field-card-${first.id}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = Math.max(0, Math.min(
        window.scrollY + rect.top - (window.innerHeight - rect.height) / 2,
        maxScroll
      ));
      animateScrollTo(targetY);
    });
  }

  function handleGateNext() {
    const newErrors = {};
    for (const s of gateFields) {
      if (s.optional) continue;
      const ans = answers[s.id];
      const isEmpty = s.type === "checkbox" ? !Array.isArray(ans) || ans.length === 0 : (ans ?? "") === "";
      if (isEmpty) newErrors[s.id] = "Ce champ est requis.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      scrollToFirstError(gateFields, newErrors);
      return;
    }
    setErrors({});
    pushStep(0);
  }

  function handleNext() {
    const newErrors = {};
    for (const s of visibleFields) {
      if (s.optional) continue;
      if (s.key === "pct_detention_capital") {
        const vals = Array.isArray(answers[s.id]) ? answers[s.id] : [];
        const sum = vals.reduce((acc, v) => acc + (parseFloat(v?.pct) || 0), 0);
        if (sum !== 100) newErrors[s.id] = "La répartition doit atteindre 100 % au total.";
        continue;
      }
      const ans = answers[s.id];
      const isEmpty = s.type === "checkbox" ? !Array.isArray(ans) || ans.length === 0 : (ans ?? "") === "";
      if (isEmpty) newErrors[s.id] = "Ce champ est requis.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      scrollToFirstError(visibleFields, newErrors);
      return;
    }

    setErrors({});
    const next = findVisibleSectionIndex(sections, wizardSteps, stepIdx + 1, 1, answers, selectedProducts);
    if (next >= sections.length) {
      clearStoredProgress(storageKey);
      setSubmitted(true);
      // onSubmit may return the created lead (a promise) — captured so the
      // booking panel can attach the meeting to the right lead once it
      // resolves, without blocking the confirmation screen on it.
      const result = onSubmit?.(answers);
      if (result && typeof result.then === "function") {
        result.then((lead) => lead?.id != null && setCreatedLeadId(lead.id)).catch(() => {});
      }
    } else {
      pushStep(next);
    }
  }

  // Real backward navigation (router.back(), not a new push) — so a
  // follow-up press of the actual browser Back button continues stepping
  // back instead of bouncing forward again through an entry we just added.
  function handleBack() {
    const prev = findVisibleSectionIndex(sections, wizardSteps, stepIdx - 1, -1, answers, selectedProducts);
    if (prev >= 0 || gateFields.length > 0) {
      setErrors({});
      router.back();
    }
  }

  // One question's field control — shared between the gate screen and the
  // section grid so both stay visually and behaviorally identical.
  function renderFieldCard(s, { index = 0 } = {}) {
    const answer = answers[s.id] ?? (s.type === "checkbox" ? [] : "");
    const dynamicOpts = s.optionsFn ? s.optionsFn(answers) : { options: s.options, values: s.values };
    const wide = isWideField(s);
    const shouldAnimateReveal = s.parentKey && s.rules?.length;
    const conditionalStyle = shouldAnimateReveal ? { animationDelay: `${Math.min(index, 4) * 55}ms` } : undefined;

    return (
      <div key={s.id} id={`field-card-${s.id}`} className={`flex flex-col gap-2 h-full ${wide ? "sm:col-span-2" : ""} ${shouldAnimateReveal ? "conditional-field-reveal" : ""}`} style={conditionalStyle}>
              {!['w_garage_vehicules', 'flotte_immatriculations'].includes(s.key) && ((s.type === "radio" || s.type === "checkbox") ? (
                <p className={`text-[16px] ${t.label} ${!wide ? "min-h-11" : ""}`}>
                  {s.question}
                  {!s.optional && <span className="ml-0.5">*</span>}
                </p>
              ) : (
                <label htmlFor={`field-${s.id}`} className={`text-[16px] cursor-pointer block ${t.label} ${!wide ? "min-h-11" : ""}`}>
                  {s.question}
                  {s.key === "pct_detention_capital" && <span className="font-normal text-gray-400"> (pour chaque associé)</span>}
                  {!s.optional && <span className="ml-0.5">*</span>}
                </label>
              ))}
              {s.hint && <p className={`text-xs -mt-1 ${t.hint}`}>{s.hint}</p>}

              {/* Radio — card style */}
              {s.type === "radio" && s.card && (
                <RadioGroup
                  value={answer}
                  onValueChange={val => setAnswer(s.id, val)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {dynamicOpts.options.map((opt, i) => (
                    <FieldLabel
                      key={i}
                      htmlFor={`radio-${s.id}-${i}`}
                      className={`transition-colors ${
                        answer === dynamicOpts.values[i]
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : errors[s.id]
                            ? "border-[var(--color-error)]"
                            : "hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{opt}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem
                          value={dynamicOpts.values[i]}
                          id={`radio-${s.id}-${i}`}
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              )}

              {/* Radio — inline style */}
              {s.type === "radio" && !s.card && (
                <RadioGroup
                  value={answer}
                  onValueChange={val => setAnswer(s.id, val)}
                  className="flex flex-wrap gap-x-6 gap-y-3"
                >
                  {dynamicOpts.options.map((opt, i) => (
                    <Label
                      key={i}
                      htmlFor={`radio-${s.id}-${i}`}
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => setAnswer(s.id, dynamicOpts.values[i])}
                    >
                      <RadioGroupItem value={dynamicOpts.values[i]} id={`radio-${s.id}-${i}`} />
                      <span className={`text-base font-normal ${t.radioText}`}>{opt}</span>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              {/* Checkbox — card style */}
              {s.type === "checkbox" && s.card && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {s.options.map((opt, i) => {
                    const val = s.values[i];
                    const isSelected = answer.includes(val);
                    return (
                      <FieldLabel
                        key={i}
                        htmlFor={`checkbox-${s.id}-${i}`}
                        className={`transition-colors ${
                          isSelected
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                            : errors[s.id]
                              ? "border-[var(--color-error)] bg-white"
                              : "hover:border-[var(--color-brand)] bg-white"
                        }`}
                      >
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>{opt}</FieldTitle>
                          </FieldContent>
                          <Checkbox
                            id={`checkbox-${s.id}-${i}`}
                            checked={isSelected}
                            onCheckedChange={() => setAnswer(s.id, isSelected ? answer.filter(v => v !== val) : [...answer, val])}
                          />
                        </Field>
                      </FieldLabel>
                    );
                  })}
                </div>
              )}

              {/* Checkbox — plain list */}
              {s.type === "checkbox" && !s.card && (
                <div className="flex flex-col gap-4">
                  {s.options.map((opt, i) => {
                    const val = s.values[i];
                    const isSelected = answer.includes(val);
                    return (
                      <label key={i} className="flex items-center gap-2.5 cursor-pointer group"
                        onClick={() => setAnswer(s.id, isSelected ? answer.filter(v => v !== val) : [...answer, val])}>
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
              {s.type === "select" && (
                <Select value={answer} onValueChange={val => setAnswer(s.id, val)}>
                  <SelectTrigger
                    id={`field-${s.id}`}
                    aria-label={s.question}
                    className={`w-full bg-white h-[50px] data-[size=default]:h-[50px] ${errors[s.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_rgba(242,105,61,0.15)]" : ""}`}
                  >
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {dynamicOpts.options.map((opt, i) => (
                      <SelectItem key={i} value={dynamicOpts.values[i]}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Full date picker — native OS date input on mobile (e.g.
                  iOS's wheel picker, matching GarageIdentityForm's own
                  "Date de naissance" field), custom popover calendar on
                  desktop where there's no native picker UI to fall back on. */}
              {s.type === "input" && s.inputType === "date" && (
                <DatePickerInput
                  id={`field-${s.id}`}
                  value={answer}
                  onChange={val => setAnswer(s.id, val)}
                  placeholder={s.placeholder || "__/__/____"}
                  theme={theme}
                  error={!!errors[s.id]}
                  className="bg-white h-[50px] w-full"
                />
              )}

              {/* Month + year dropdowns */}
              {s.type === "input" && s.inputType === "month" && (
                <MonthYearInput
                  mode="month"
                  value={answer}
                  onChange={val => setAnswer(s.id, val)}
                  error={!!errors[s.id]}
                  className="w-full"
                />
              )}

              {/* Year-only dropdown */}
              {s.type === "input" && s.inputType === "year" && (
                <MonthYearInput
                  mode="year"
                  value={answer}
                  onChange={val => setAnswer(s.id, val)}
                  error={!!errors[s.id]}
                  className="w-full max-w-[160px]"
                />
              )}

              {/* Free-text comments */}
              {s.type === "input" && s.inputType === "textarea" && (
                <Textarea
                  id={`field-${s.id}`}
                  placeholder={s.placeholder}
                  value={answer}
                  onChange={e => setAnswer(s.id, e.target.value)}
                  maxLength={1000}
                  rows={6}
                  className={`bg-white ${errors[s.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus-visible:border-[var(--color-error)] focus-visible:ring-[rgba(242,105,61,0.15)]" : ""}`}
                />
              )}

              {/* Multi-associate % détention du capital */}
              {s.key === "pct_detention_capital" && (
                <AssocieCapitalField s={s} answer={answer} setAnswer={setAnswer} theme={theme} />
              )}

              {/* One repeating field group per vehicle in the fleet */}
              {s.key === "flotte_immatriculations" && (
                <FlotteVehiculesField s={s} answer={answer} setAnswer={setAnswer} wizardSteps={wizardSteps} answers={answers} errors={errors} />
              )}

              {/* One repeating Mode d'achat / Usage pair per W Garage vehicle */}
              {s.key === "w_garage_vehicules" && (
                <WGarageVehiculesField s={s} answer={answer} setAnswer={setAnswer} wizardSteps={wizardSteps} answers={answers} errors={errors} labelClass={t.label} />
              )}

              {/* Text / number / email / tel */}
              {s.type === "input" && s.key !== "pct_detention_capital" && s.key !== "flotte_immatriculations" && s.key !== "w_garage_vehicules" && !["date", "month", "year", "textarea"].includes(s.inputType) && (() => {
                const inputEl = (
                  <Input
                    id={`field-${s.id}`}
                    type={s.inputType}
                    inputMode={s.inputType === "tel" ? "tel" : s.inputType === "number" ? "decimal" : undefined}
                    min={s.inputType === "number" ? 0 : undefined}
                    placeholder={s.placeholder}
                    value={answer}
                    onChange={e => {
                      let v = e.target.value;
                      if (s.inputType === "tel") v = v.replace(/[^\d\s+]/g, "");
                      if (s.inputType === "number" && v !== "" && parseFloat(v) < 0) v = "0";
                      if (s.uppercase) v = v.toUpperCase();
                      setAnswer(s.id, v);
                    }}
                    className={`bg-white h-[50px] ${errors[s.id] ? "border-[var(--color-error)] hover:border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_rgba(242,105,61,0.15)]" : ""}`}
                  />
                );
                return inputEl;
              })()}

              {errors[s.id] && <p className="text-xs text-[var(--color-error)] mt-0.5">{errors[s.id]}</p>}
      </div>
    );
  }

  // Gate screen — shown once, before the step-by-step wizard, when the
  // catalog defines any `gate: true` questions. Not one of the section tabs.
  if (!gatePassed) {
    return (
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 bg-gray-100 p-6">
          {gateFields.map((s, i) => renderFieldCard(s, { index: i }))}
        </div>
        <div className="flex items-center justify-end pt-2">
          <Button onClick={handleGateNext} className={`h-12 px-5 gap-1 ${t.nextBtn}`}>
            Suivant
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  // The booking panel replaces the whole wizard (tabs included) once
  // submitted — it isn't one more tab in the section bar, just its own
  // dedicated screen.
  if (submitted) {
    return <BookingPanel t={t} leadId={createdLeadId} bookingDocs={bookingDocs} />;
  }

  return (
    <>
    <div className="flex flex-col gap-10">

      {/* Section tabs — full icon+label tabs on tablet/desktop; on mobile,
          icon-only tabs (so all sections always fit in one row with no
          side-scrolling) plus a caption naming the current section. */}
      {sections.length > 1 && (
        <>
          <div
            className="hidden sm:grid gap-0.5 sticky top-16 z-30 bg-white pt-3 pb-3"
            style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
          >
            {sections.map((section, i) => {
              const Icon = SECTION_ICONS[section] || Circle;
              const isActive = i === stepIdx;
              return (
                <div
                  key={section}
                  className={`flex items-center justify-center gap-1 px-1 lg:px-3 py-3.5 text-[11px] font-semibold uppercase tracking-normal transition-colors ${
                    isActive ? "bg-[var(--color-brand)] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="text-center leading-snug whitespace-nowrap">{section}</span>
                </div>
              );
            })}
          </div>

          <div className="sm:hidden flex flex-col gap-2 sticky top-16 z-30 bg-white pt-3 pb-3">
            <div
              className="grid gap-0.5"
              style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
            >
              {sections.map((section, i) => {
                const Icon = SECTION_ICONS[section] || Circle;
                const isActive = i === stepIdx;
                return (
                  <div
                    key={section}
                    className={`flex items-center justify-center py-3 transition-colors ${
                      isActive ? "bg-[var(--color-brand)] text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                );
              })}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 text-center">
              Étape {stepIdx + 1}/{sections.length} · {currentSection}
            </p>
          </div>
        </>
      )}

      {/* Already-captured answers (e.g. from an identity form redirect) —
          plain text recap, not editable fields, just so the user sees we
          kept what they already gave us. */}
      {prefilledFields.length > 0 && (
        <table key={`${currentSection}-prefilled`} className="border-separate border-spacing-y-1.5 pb-1 text-[16px]">
          <tbody>
            {prefilledFields.map(s => (
              <tr key={s.id}>
                <td className="pr-6 text-gray-400 align-top whitespace-nowrap">{s.question}</td>
                <td className="font-medium text-[var(--color-text)] align-top">{formatAnswerValue(s, answers[s.id])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* All questions of the current section — generic ones in their own
          grid, then one grid per selected product under its own header.
          Each block gets its own grid, and fields are pre-packed in JS
          (packFieldsAvoidingGaps) rather than via CSS grid-flow-dense, so a
          gap-filling field never gets pulled ahead of a question it depends
          on (e.g. "Statut immobilier" needing "...dispose-t-il d'un local").
          Each block also stays scoped to its own group either way. */}
      <div key={currentSection} className={`flex flex-col gap-16 ${direction === "next" ? "slide-in-right" : "slide-in-left"}`}>
        {genericFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 bg-gray-100 p-6">
            {packFieldsAvoidingGaps(genericFields).map((s, i) => renderFieldCard(s, { index: i }))}
          </div>
        )}
        {productGroups.map(({ product, fields }) => (
          <div key={product} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-5 bg-[var(--color-brand)] shrink-0" />
              <span className="text-base font-bold text-[var(--color-text)] whitespace-nowrap">{productLabel(product)}</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-col gap-6 bg-gray-100 p-6">
              {groupFieldsByEyebrow(fields).map((run, ri) => (
                <div key={ri} className="flex flex-col gap-6">
                  {run.eyebrow && (
                    <div className={`-mx-6 bg-[var(--color-brand)]/10 px-4 py-2.5 text-sm font-bold tracking-wide text-[var(--color-brand)] uppercase ${ri === 0 ? "-mt-6" : ""}`}>
                      {run.eyebrow}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                    {packFieldsAvoidingGaps(run.fields.filter(s => !isEmbeddedParentField(s))).map((s, i) => renderFieldCard(s, { index: i }))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {(() => {
        const navButtons = (
          <ButtonGroup>
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={findVisibleSectionIndex(sections, wizardSteps, stepIdx - 1, -1, answers, selectedProducts) < 0 && gateFields.length === 0}
              className="h-12 px-5 gap-1"
            >
              <ChevronLeft size={16} />
              Retour
            </Button>

            <Button
              onClick={handleNext}
              className={`h-12 px-5 gap-1 ${t.nextBtn}`}
            >
              {isLastStep
                ? (selectedProducts?.length
                    ? `Envoyer la demande projet ${selectedProducts.map(productLabel).join(", ")}`
                    : "Envoyer la demande projet")
                : "Suivant"}
              {!isLastStep && <ChevronRight size={16} />}
            </Button>
          </ButtonGroup>
        );

        if (!footerContent) {
          return <div className="flex items-center justify-end pt-2">{navButtons}</div>;
        }

        return (
          <div className="fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-100 pl-24 pr-4 lg:pl-24 lg:pr-12 py-4 flex items-center justify-between">
            {footerContent}
            {navButtons}
          </div>
        );
      })()}

    </div>
    </>
  );
}
