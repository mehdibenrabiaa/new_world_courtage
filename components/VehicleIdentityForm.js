import { useState } from "react";
import { useRouter } from "next/router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, Minus } from "lucide-react";

const PROVINCES = [
  "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
  "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
  "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie",
  "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
];

function Field({ label, required, htmlFor, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-base font-medium text-white leading-none">
        {label}
        {required && <span className="text-white ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[var(--color-error)] mt-0.5">{error}</p>
      )}
    </div>
  );
}

export default function VehicleIdentityForm() {
  const router = useRouter();
  const [province, setProvince]     = useState("");
  const [age, setAge]               = useState("");
  const [gender, setGender]         = useState("");
  const [drivingRecord, setDriving] = useState("");
  const [creditScore, setCredit]    = useState("");
  const [ownsHome, setOwnsHome]     = useState("");
  const [errors, setErrors]         = useState({});

  const hasEstimates = !!(province && age && drivingRecord);

  function getEstimates() {
    const a = parseInt(age) || 30;
    const ageSurcharge = a < 25 ? 22 : a > 60 ? 10 : 0;
    const recordDelta = { excellent: -8, bon: 0, moyen: 18, mauvais: 35 }[drivingRecord] ?? 0;
    return [28, 52, 87].map(b => Math.round(b + ageSurcharge + recordDelta));
  }

  function clearError(field) {
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!province)     newErrors.province = "Ce champ est requis.";
    if (!age)          newErrors.age      = "Ce champ est requis.";
    if (!drivingRecord) newErrors.driving = "Ce champ est requis.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const q = new URLSearchParams({ province, age });
    if (gender)        q.set("gender",  gender);
    if (drivingRecord) q.set("driving", drivingRecord);
    if (creditScore)   q.set("credit",  creditScore);
    if (ownsHome)      q.set("home",    ownsHome);
    router.push(`/assurance-auto/calculateur/devis/?${q.toString()}`);
  }

  const triggerCls = (field) =>
    `h-14 text-base bg-white text-[var(--color-text)] ${errors[field] ? "border-2 border-[var(--color-error)] focus:ring-[var(--color-error)]" : ""}`;

  const inputCls = (field) =>
    `h-14 w-full rounded-[var(--radius)] border bg-white px-4 text-base text-[var(--color-text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
      errors[field]
        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]"
        : "border-gray-200 focus:ring-[var(--color-brand)]"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

        {/* Province */}
        <Field label="Province" required error={errors.province}>
          <Select value={province} onValueChange={v => { setProvince(v); clearError("province"); }}>
            <SelectTrigger className={triggerCls("province")}>
              <SelectValue placeholder="Sélectionnez une région" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map(p => (
                <SelectItem key={p} value={p} className="text-base py-2.5">{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Age */}
        <Field label="Âge" required error={errors.age}>
          <Select value={age} onValueChange={v => { setAge(v); clearError("age"); }}>
            <SelectTrigger className={triggerCls("age")}>
              <SelectValue placeholder="Votre tranche d'âge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16-24" className="text-base py-2.5">16 – 24 ans</SelectItem>
              <SelectItem value="25-35" className="text-base py-2.5">25 – 35 ans</SelectItem>
              <SelectItem value="36-45" className="text-base py-2.5">36 – 45 ans</SelectItem>
              <SelectItem value="46-55" className="text-base py-2.5">46 – 55 ans</SelectItem>
              <SelectItem value="56-65" className="text-base py-2.5">56 – 65 ans</SelectItem>
              <SelectItem value="66+"   className="text-base py-2.5">66 ans et plus</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Gender */}
        <Field label="Genre">
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className={triggerCls()}>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="homme"       className="text-base py-2.5">Homme</SelectItem>
              <SelectItem value="femme"       className="text-base py-2.5">Femme</SelectItem>
              <SelectItem value="non-binaire" className="text-base py-2.5">Non-binaire</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Driving record */}
        <Field label="Historique de conduite" required error={errors.driving}>
          <Select value={drivingRecord} onValueChange={v => { setDriving(v); clearError("driving"); }}>
            <SelectTrigger className={triggerCls("driving")}>
              <SelectValue placeholder="Votre profil conducteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent" className="text-base py-2.5">Excellent — aucun incident</SelectItem>
              <SelectItem value="bon"       className="text-base py-2.5">Bon — infractions mineures</SelectItem>
              <SelectItem value="moyen"     className="text-base py-2.5">Moyen — accidents ou infractions</SelectItem>
              <SelectItem value="mauvais"   className="text-base py-2.5">Mauvais — plusieurs incidents</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Credit score */}
        <Field label="Cote de crédit">
          <Select value={creditScore} onValueChange={setCredit}>
            <SelectTrigger className={triggerCls()}>
              <SelectValue placeholder="Estimez votre cote" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent" className="text-base py-2.5">Excellent (750+)</SelectItem>
              <SelectItem value="bon"       className="text-base py-2.5">Bon (700 – 749)</SelectItem>
              <SelectItem value="moyen"     className="text-base py-2.5">Moyen (650 – 699)</SelectItem>
              <SelectItem value="faible"    className="text-base py-2.5">Faible (moins de 650)</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Own a home */}
        <Field label="Propriétaire de votre logement ?">
          <Select value={ownsHome} onValueChange={setOwnsHome}>
            <SelectTrigger className={triggerCls()}>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oui" className="text-base py-2.5">Oui</SelectItem>
              <SelectItem value="non" className="text-base py-2.5">Non</SelectItem>
            </SelectContent>
          </Select>
        </Field>

      </div>

      {/* Monthly estimates */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-medium text-white leading-none">Estimations mensuelles</p>
        <div className="rounded-xl bg-white overflow-hidden shadow-sm">
          {(() => {
            const estimates = hasEstimates ? getEstimates() : null;
            return [
              { label: "Couverture budget",   opacity: 0.4 },
              { label: "Couverture moyenne",  opacity: 0.7 },
              { label: "Couverture complète", opacity: 1   },
            ].map(({ label, opacity }, i) => (
              <div key={i} className="grid items-center gap-x-3 py-2.5 px-3" style={{ gridTemplateColumns: "12px 1fr auto" }}>
                <div className="w-3 h-8" style={{ backgroundColor: `rgba(19, 110, 183, ${opacity})` }} />
                <span className="text-base text-gray-600">{label}</span>
                <span className={`text-[20px] font-semibold transition-all duration-300 ${estimates ? "text-[var(--color-text)]" : "text-gray-300"}`}>
                  {estimates ? `${estimates[i]} €` : "— —"}
                </span>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Submit block */}
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          className="bg-white text-[var(--color-text)] hover:bg-white/90 text-base font-semibold py-[25px] px-[15px] self-start"
        >
          Calculer mon tarif
          <ChevronRight size={18} />
        </Button>
        <div className="flex items-center gap-2 my-5">
          <img src="/icons/lock.svg" alt="" aria-hidden="true" className="w-4 h-4 shrink-0 brightness-0 invert" />
          <p className="text-xs font-medium text-white">La sécurité de vos données est notre priorité.</p>
        </div>
      </div>

      {/* FAQ item */}
      <details className="group border-t border-white/15 pt-4">
        <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="text-sm font-semibold text-white">Comment calculons-nous vos tarifs ?</span>
          <span className="shrink-0 text-white/60">
            <Plus size={16} className="group-open:hidden" />
            <Minus size={16} className="hidden group-open:block" />
          </span>
        </summary>
        <p className="mt-3 text-sm text-white/60 leading-relaxed">
          Nos estimations sont basées sur votre province, votre âge, votre historique de conduite et d'autres facteurs de risque. Les tarifs réels peuvent varier selon l'assureur et votre profil complet. Un conseiller agréé vous contactera avec des offres personnalisées.
        </p>
      </details>

    </form>
  );
}
