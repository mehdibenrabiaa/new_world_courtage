import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/DatePickerInput";
import { ChevronRight, Plus, Minus } from "lucide-react";

const STORAGE_KEY = "nwc_vehicle_form";

const CURRENT_YEAR = new Date().getFullYear();
const PERMIS_YEARS = Array.from({ length: CURRENT_YEAR - 1959 }, (_, i) => String(CURRENT_YEAR - i));

const BONUS_MALUS = [
  { label: "0,50 — Bonus maximum",       value: "0.50" },
  { label: "0,60",                          value: "0.60" },
  { label: "0,70",                          value: "0.70" },
  { label: "0,80",                          value: "0.80" },
  { label: "0,90",                          value: "0.90" },
  { label: "1,00 — Coefficient de base",  value: "1.00" },
  { label: "1,25",                          value: "1.25" },
  { label: "1,50",                          value: "1.50" },
  { label: "2,00",                          value: "2.00" },
  { label: "2,50",                          value: "2.50" },
  { label: "3,00",                          value: "3.00" },
  { label: "3,50 — Malus maximum",        value: "3.50" },
];

function readStorage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStorage(values) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {}
}

function clearStorage() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function Field({ label, required, htmlFor, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-base font-medium text-white leading-none">
        {label}
        {required && <span className="text-white ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[var(--color-error)] mt-0.5">{error}</p>}
    </div>
  );
}

export default function VehicleIdentityForm() {
  const router = useRouter();

  const [permis,     setPermis]     = useState("");
  const [bonusMalus, setBonusMalus] = useState("");
  const [naissance,  setNaissance]  = useState("");
  const [immat,      setImmat]      = useState("");
  const [errors,     setErrors]     = useState({});

  // Restore saved values after hydration, then keep in sync
  useEffect(() => {
    const saved = readStorage();
    if (saved.permis)     setPermis(saved.permis);
    if (saved.bonusMalus) setBonusMalus(saved.bonusMalus);
    if (saved.naissance)  setNaissance(saved.naissance);
    if (saved.immat)      setImmat(saved.immat);
  }, []);

  useEffect(() => {
    writeStorage({ permis, bonusMalus, naissance, immat });
  }, [permis, bonusMalus, naissance, immat]);

  function clearError(field) {
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!permis)     newErrors.permis     = "Ce champ est requis.";
    if (!bonusMalus) newErrors.bonusMalus = "Ce champ est requis.";
    if (!naissance)  newErrors.naissance  = "Ce champ est requis.";
    if (!immat)      newErrors.immat      = "Ce champ est requis.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    clearStorage();
    const q = new URLSearchParams({ permis, bonusMalus, naissance, immat });
    router.push(`/assurance-transport/calculateur/devis/?${q.toString()}`);
  }

  const triggerCls = (field) =>
    `h-11 text-sm bg-white text-[var(--color-text)] ${errors[field] ? "border-2 border-[var(--color-error)]" : ""}`;

  const inputCls = (field) =>
    `h-11 w-full rounded-lg border bg-white px-4 text-sm text-[var(--color-text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
      errors[field]
        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]"
        : "border-gray-200 focus:ring-[var(--color-brand)]"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

        {/* Année d'obtention du permis */}
        <Field label="Année d'obtention du permis" required error={errors.permis}>
          <Select value={permis} onValueChange={v => { setPermis(v); clearError("permis"); }}>
            <SelectTrigger className={triggerCls("permis")}>
              <SelectValue placeholder="Sélectionnez une année" />
            </SelectTrigger>
            <SelectContent>
              {PERMIS_YEARS.map(y => (
                <SelectItem key={y} value={y} className="text-base py-2.5">{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Bonus malus */}
        <Field label="Coefficient bonus-malus" required error={errors.bonusMalus}>
          <Select value={bonusMalus} onValueChange={v => { setBonusMalus(v); clearError("bonusMalus"); }}>
            <SelectTrigger className={triggerCls("bonusMalus")}>
              <SelectValue placeholder="Votre coefficient" />
            </SelectTrigger>
            <SelectContent>
              {BONUS_MALUS.map(({ label, value }) => (
                <SelectItem key={value} value={value} className="text-base py-2.5">{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Date de naissance */}
        <Field label="Date de naissance" required htmlFor="field-naissance" error={errors.naissance}>
          {/* Native picker on mobile */}
          <input
            id="field-naissance"
            type="date"
            value={naissance}
            max={`${CURRENT_YEAR - 16}-12-31`}
            onChange={e => { setNaissance(e.target.value); clearError("naissance"); }}
            className={`md:hidden ${inputCls("naissance")}`}
          />
          {/* Custom calendar on desktop */}
          <div className="hidden md:block w-full">
            <DatePickerInput
              value={naissance}
              onChange={v => { setNaissance(v); clearError("naissance"); }}
              placeholder="Votre date de naissance"
              theme="light"
              error={!!errors.naissance}
              className="h-11 bg-white border-gray-200 text-[var(--color-text)] hover:bg-gray-50"
            />
          </div>
        </Field>

        {/* Immatriculation */}
        <Field label="Immatriculation du véhicule" required htmlFor="field-immat" error={errors.immat}>
          <input
            id="field-immat"
            type="text"
            value={immat}
            onChange={e => { setImmat(e.target.value.toUpperCase()); clearError("immat"); }}
            placeholder="Ex : AB-123-CD"
            className={inputCls("immat")}
          />
        </Field>

      </div>

      {/* Monthly estimates */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-medium text-white leading-none">Estimations mensuelles</p>
        <div className="rounded-xl bg-white overflow-hidden shadow-sm">
          {[
            { label: "Couverture budget",   opacity: 0.4 },
            { label: "Couverture moyenne",  opacity: 0.7 },
            { label: "Couverture complète", opacity: 1   },
          ].map(({ label, opacity }, i) => (
            <div key={i} className="grid items-center gap-x-3 py-2.5 px-3" style={{ gridTemplateColumns: "12px 1fr auto" }}>
              <div className="w-3 h-8" style={{ backgroundColor: `rgba(25, 97, 174, ${opacity})` }} />
              <span className="text-base text-gray-600">{label}</span>
              <span className="text-[20px] font-semibold text-gray-300">— —</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          className="bg-white text-[var(--color-text)] hover:bg-white/90 text-base font-semibold py-[25px] px-[15px] self-start"
        >
          Obtenir un devis
          <ChevronRight size={18} />
        </Button>
        <div className="flex items-center gap-2 my-5">
          <img src="/icons/lock.svg" alt="" aria-hidden="true" className="w-4 h-4 shrink-0 brightness-0 invert" />
          <p className="text-xs font-medium text-white">La sécurité de vos données est notre priorité.</p>
        </div>
      </div>

      {/* FAQ */}
      <details className="group border-t border-white/15 pt-4">
        <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="text-sm font-semibold text-white">Comment calculons-nous vos estimations ?</span>
          <span className="shrink-0 text-white/60">
            <Plus size={16} className="group-open:hidden" />
            <Minus size={16} className="hidden group-open:block" />
          </span>
        </summary>
        <p className="mt-3 text-sm text-white/60 leading-relaxed">
          Nos estimations sont basées sur votre profil conducteur, votre coefficient bonus-malus et les caractéristiques de votre véhicule. Les tarifs réels sont déterminés par les compagnies d'assurance partenaires. Un conseiller agréé vous contactera avec des offres personnalisées.
        </p>
      </details>

    </form>
  );
}

