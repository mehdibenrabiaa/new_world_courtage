import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import CtaButton from "@/components/CtaButton";
import { DatePickerInput } from "@/components/DatePickerInput";
import { Plus, Minus } from "lucide-react";

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

export default function VehicleIdentityForm({ redirectTo = "/assurance-transport/devis/" }) {
  const router = useRouter();

  const [name,       setName]       = useState("");
  const [phone,      setPhone]      = useState("");
  const [permis,     setPermis]     = useState("");
  const [bonusMalus, setBonusMalus] = useState("");
  const [naissance,  setNaissance]  = useState("");
  const [immat,      setImmat]      = useState("");
  const [errors,     setErrors]     = useState({});
  const [faqOpen, setFaqOpen] = useState(false);
  const faqRef = useRef(null);
  const [faqHeight, setFaqHeight] = useState(0);

  function toggleFaq() {
    if (!faqOpen && faqRef.current) {
      setFaqHeight(faqRef.current.scrollHeight);
    }
    setFaqOpen(o => !o);
  }

  // Restore values from the URL (so browser back/forward keeps the fill), falling back to sessionStorage
  useEffect(() => {
    if (!router.isReady) return;
    const saved = readStorage();
    const { name: qName, phone: qPhone, permis: qPermis, bonusMalus: qBonusMalus, naissance: qNaissance, immat: qImmat } = router.query;
    setName(qName || saved.name || "");
    setPhone(qPhone || saved.phone || "");
    setPermis(qPermis || saved.permis || "");
    setBonusMalus(qBonusMalus || saved.bonusMalus || "");
    setNaissance(qNaissance || saved.naissance || "");
    setImmat(qImmat || saved.immat || "");
  }, [router.isReady]);

  useEffect(() => {
    writeStorage({ name, phone, permis, bonusMalus, naissance, immat });
  }, [name, phone, permis, bonusMalus, naissance, immat]);

  function updateQuery(patch) {
    const merged = { name, phone, permis, bonusMalus, naissance, immat, ...patch };
    const nextQuery = Object.fromEntries(Object.entries(merged).filter(([, v]) => v !== ""));
    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true, scroll: false });
  }

  function clearError(field) {
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!name)       newErrors.name       = "Ce champ est requis.";
    if (!phone)      newErrors.phone      = "Ce champ est requis.";
    if (!permis)     newErrors.permis     = "Ce champ est requis.";
    if (!bonusMalus) newErrors.bonusMalus = "Ce champ est requis.";
    if (!naissance)  newErrors.naissance  = "Ce champ est requis.";
    if (!immat)      newErrors.immat      = "Ce champ est requis.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    clearStorage();
    const q = new URLSearchParams({ name, phone, permis, bonusMalus, naissance, immat });
    router.push(`${redirectTo}?${q.toString()}`);
  }

  const triggerCls = (field) =>
    `w-full bg-white h-[50px] data-[size=default]:h-[50px] ${errors[field] ? "border-2 border-[var(--color-error)]" : ""}`;

  const inputCls = (field) =>
    `bg-white h-[50px] ${errors[field] ? "border-[var(--color-error)] focus:border-[var(--color-error)]" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

        {/* Nom complet */}
        <Field className="border-0 p-0" data-invalid={!!errors.name}>
          <FieldLabel htmlFor="field-name" className="flex w-auto! text-white text-[15px] font-semibold">
            Nom complet <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-name"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); clearError("name"); updateQuery({ name: e.target.value }); }}
            placeholder="Ex : Jean Dupont"
            className={inputCls("name")}
          />
          {errors.name && <FieldError errors={[{ message: errors.name }]} className="text-[#F2693D]" />}
        </Field>

        {/* Téléphone */}
        <Field className="border-0 p-0" data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="field-phone" className="flex w-auto! text-white text-[15px] font-semibold">
            Téléphone <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={e => {
              const v = e.target.value.replace(/[^\d\s+]/g, "");
              setPhone(v);
              clearError("phone");
              updateQuery({ phone: v });
            }}
            placeholder="Ex : 06 12 34 56 78"
            className={inputCls("phone")}
          />
          {errors.phone && <FieldError errors={[{ message: errors.phone }]} className="text-[#F2693D]" />}
        </Field>

        {/* Année d'obtention du permis */}
        <Field className="border-0 p-0" data-invalid={!!errors.permis}>
          <FieldLabel className="flex w-auto! text-white text-[15px] font-semibold">
            Année d&apos;obtention du permis <span className="ml-0.5">*</span>
          </FieldLabel>
          <Select value={permis} onValueChange={v => { setPermis(v); clearError("permis"); updateQuery({ permis: v }); }}>
            <SelectTrigger className={triggerCls("permis")}>
              <SelectValue placeholder="Sélectionnez une année" />
            </SelectTrigger>
            <SelectContent>
              {PERMIS_YEARS.map(y => (
                <SelectItem key={y} value={y} className="text-base py-2.5">{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.permis && <FieldError errors={[{ message: errors.permis }]} className="text-[#F2693D]" />}
        </Field>

        {/* Bonus malus */}
        <Field className="border-0 p-0" data-invalid={!!errors.bonusMalus}>
          <FieldLabel className="flex w-auto! text-white text-[15px] font-semibold">
            Coefficient bonus-malus <span className="ml-0.5">*</span>
          </FieldLabel>
          <Select value={bonusMalus} onValueChange={v => { setBonusMalus(v); clearError("bonusMalus"); updateQuery({ bonusMalus: v }); }}>
            <SelectTrigger className={triggerCls("bonusMalus")}>
              <SelectValue placeholder="Votre coefficient" />
            </SelectTrigger>
            <SelectContent>
              {BONUS_MALUS.map(({ label, value }) => (
                <SelectItem key={value} value={value} className="text-base py-2.5">{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bonusMalus && <FieldError errors={[{ message: errors.bonusMalus }]} className="text-[#F2693D]" />}
        </Field>

        {/* Date de naissance */}
        <Field className="border-0 p-0" data-invalid={!!errors.naissance}>
          <FieldLabel htmlFor="field-naissance" className="flex w-auto! text-white text-[15px] font-semibold">
            Date de naissance <span className="ml-0.5">*</span>
          </FieldLabel>
          {/* Native picker on mobile */}
          <Input
            id="field-naissance"
            type="date"
            value={naissance}
            max={`${CURRENT_YEAR - 16}-12-31`}
            onChange={e => { setNaissance(e.target.value); clearError("naissance"); updateQuery({ naissance: e.target.value }); }}
            className={`md:hidden ${inputCls("naissance")}`}
          />
          {/* Custom calendar on desktop */}
          <div className="hidden md:block w-full">
            <DatePickerInput
              value={naissance}
              onChange={v => { setNaissance(v); clearError("naissance"); updateQuery({ naissance: v }); }}
              placeholder="Votre date de naissance"
              theme="light"
              error={!!errors.naissance}
              className="h-[50px] bg-white border-gray-200 text-[var(--color-text)] hover:bg-gray-50"
            />
          </div>
          {errors.naissance && <FieldError errors={[{ message: errors.naissance }]} className="text-[#F2693D]" />}
        </Field>

        {/* Immatriculation */}
        <Field className="border-0 p-0" data-invalid={!!errors.immat}>
          <FieldLabel htmlFor="field-immat" className="flex w-auto! text-white text-[15px] font-semibold">
            Immatriculation du véhicule <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-immat"
            type="text"
            value={immat}
            onChange={e => { const v = e.target.value.toUpperCase(); setImmat(v); clearError("immat"); updateQuery({ immat: v }); }}
            placeholder="Ex : AB-123-CD"
            className={inputCls("immat")}
          />
          {errors.immat && <FieldError errors={[{ message: errors.immat }]} className="text-[#F2693D]" />}
        </Field>

      </div>

      {/* Submit */}
      <div className="flex flex-col gap-3">
        <CtaButton
          type="submit"
          label="Obtenir un devis"
          className="self-start h-[50px] bg-white hover:bg-gray-100 text-black"
        />
        <div className="flex items-center gap-2 mt-5">
          <img src="/icons/lock.svg" alt="" aria-hidden="true" className="w-4 h-4 shrink-0 brightness-0 invert" />
          <p className="text-xs font-medium text-white">La sécurité de vos données est notre priorité.</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-white/15 pt-4 -mt-8">
        <button
          type="button"
          onClick={toggleFaq}
          className="flex w-full items-center justify-between gap-4 cursor-pointer"
        >
          <span className="text-sm font-semibold text-white">Comment calculons-nous vos estimations ?</span>
          <span className="shrink-0 text-white/60">
            {faqOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>
        <div
          style={{
            height: faqOpen ? faqHeight : 0,
            overflow: "hidden",
            transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <p ref={faqRef} className="pt-3 text-sm text-white/60 leading-relaxed">
            Nos estimations sont basées sur votre profil conducteur, votre coefficient bonus-malus et les caractéristiques de votre véhicule. Les tarifs réels sont déterminés par les compagnies d'assurance partenaires. Un conseiller agréé vous contactera avec des offres personnalisées.
          </p>
        </div>
      </div>

    </form>
  );
}

