import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import CtaButton from "@/components/CtaButton";
import { Plus, Minus } from "lucide-react";

const STORAGE_KEY = "nwc_business_form";

const STATUT_JURIDIQUE = [
  { label: "Auto-Entrepreneur", value: "auto_entrepreneur" },
  { label: "Association", value: "association" },
  { label: "Coopératives", value: "cooperatives" },
  { label: "EURL / EIRL", value: "eurl_eirl" },
  { label: "SA", value: "sa" },
  { label: "SARL", value: "sarl" },
  { label: "SAS", value: "sas" },
  { label: "SASU", value: "sasu" },
  { label: "SCS / SCA", value: "scs_sca" },
  { label: "SNC", value: "snc" },
  { label: "Particulier", value: "particulier" },
];

// Formats digits into XXX-XXX-XXX as the user types.
function formatSiren(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  return digits.replace(/(\d{3})(?=\d)/g, "$1-");
}

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

export default function BusinessIdentityForm({ redirectTo = "/assurance-transport/devis/" }) {
  const router = useRouter();

  const [name,            setName]            = useState("");
  const [phone,           setPhone]           = useState("");
  const [statutJuridique, setStatutJuridique] = useState("");
  const [siren,           setSiren]           = useState("");
  const [effectif,        setEffectif]        = useState("");
  const [chiffreAffaires, setChiffreAffaires] = useState("");
  const [errors,          setErrors]          = useState({});
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
    const { name: qName, phone: qPhone, statutJuridique: qStatut, siren: qSiren, effectif: qEffectif, chiffreAffaires: qCA } = router.query;
    setName(qName || saved.name || "");
    setPhone(qPhone || saved.phone || "");
    setStatutJuridique(qStatut || saved.statutJuridique || "");
    setSiren(qSiren || saved.siren || "");
    setEffectif(qEffectif || saved.effectif || "");
    setChiffreAffaires(qCA || saved.chiffreAffaires || "");
  }, [router.isReady]);

  useEffect(() => {
    writeStorage({ name, phone, statutJuridique, siren, effectif, chiffreAffaires });
  }, [name, phone, statutJuridique, siren, effectif, chiffreAffaires]);

  function updateQuery(patch) {
    const merged = { name, phone, statutJuridique, siren, effectif, chiffreAffaires, ...patch };
    const nextQuery = Object.fromEntries(Object.entries(merged).filter(([, v]) => v !== ""));
    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true, scroll: false });
  }

  function clearError(field) {
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!name)            newErrors.name            = "Ce champ est requis.";
    if (!phone)           newErrors.phone           = "Ce champ est requis.";
    if (!statutJuridique) newErrors.statutJuridique = "Ce champ est requis.";
    if (!siren)           newErrors.siren           = "Ce champ est requis.";
    else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/.test(siren)) newErrors.siren = "Le format attendu est XXX-XXX-XXX.";
    if (!effectif)        newErrors.effectif        = "Ce champ est requis.";
    else if (Number(effectif) < 1 || Number(effectif) > 999999) newErrors.effectif = "Entre 1 et 999 999.";
    if (!chiffreAffaires) newErrors.chiffreAffaires = "Ce champ est requis.";
    else if (Number(chiffreAffaires) < 1 || Number(chiffreAffaires) > 999999999) newErrors.chiffreAffaires = "Entre 1 et 999 999 999.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    clearStorage();
    const q = new URLSearchParams({ name, phone, statutJuridique, siren, effectif, chiffreAffaires });
    router.push(`${redirectTo}?${q.toString()}`);
  }

  const triggerCls = (field) =>
    `w-full bg-white h-[50px] data-[size=default]:h-[50px] ${errors[field] ? "border-2 border-[var(--color-error)]" : ""}`;

  const inputCls = (field) =>
    `bg-white h-[50px] ${errors[field] ? "border-[var(--color-error)] focus:border-[var(--color-error)]" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

        {/* Nom de l'entreprise */}
        <Field className="border-0 p-0" data-invalid={!!errors.name}>
          <FieldLabel htmlFor="field-name" className="flex w-auto! text-white text-[15px] font-semibold">
            Nom de l&apos;entreprise <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-name"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); clearError("name"); updateQuery({ name: e.target.value }); }}
            placeholder="Ex : Ambulances Dupont"
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

        {/* Statut juridique */}
        <Field className="border-0 p-0" data-invalid={!!errors.statutJuridique}>
          <FieldLabel className="flex w-auto! text-white text-[15px] font-semibold">
            Statut juridique <span className="ml-0.5">*</span>
          </FieldLabel>
          <Select value={statutJuridique} onValueChange={v => { setStatutJuridique(v); clearError("statutJuridique"); updateQuery({ statutJuridique: v }); }}>
            <SelectTrigger className={triggerCls("statutJuridique")}>
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              {STATUT_JURIDIQUE.map(({ label, value }) => (
                <SelectItem key={value} value={value} className="text-base py-2.5">{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.statutJuridique && <FieldError errors={[{ message: errors.statutJuridique }]} className="text-[#F2693D]" />}
        </Field>

        {/* SIREN */}
        <Field className="border-0 p-0" data-invalid={!!errors.siren}>
          <FieldLabel htmlFor="field-siren" className="flex w-auto! text-white text-[15px] font-semibold">
            Numéro SIREN <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-siren"
            type="text"
            inputMode="numeric"
            maxLength={11}
            value={siren}
            onChange={e => { const v = formatSiren(e.target.value); setSiren(v); clearError("siren"); updateQuery({ siren: v }); }}
            placeholder="Ex : 123-456-789"
            className={inputCls("siren")}
          />
          {errors.siren && <FieldError errors={[{ message: errors.siren }]} className="text-[#F2693D]" />}
        </Field>

        {/* Effectif */}
        <Field className="border-0 p-0" data-invalid={!!errors.effectif}>
          <FieldLabel htmlFor="field-effectif" className="flex w-auto! text-white text-[15px] font-semibold">
            Effectif <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-effectif"
            type="number"
            min={1}
            max={999999}
            value={effectif}
            onChange={e => { setEffectif(e.target.value); clearError("effectif"); updateQuery({ effectif: e.target.value }); }}
            placeholder="Ex : 5"
            className={inputCls("effectif")}
          />
          {errors.effectif && <FieldError errors={[{ message: errors.effectif }]} className="text-[#F2693D]" />}
        </Field>

        {/* Chiffre d'affaires annuel */}
        <Field className="border-0 p-0" data-invalid={!!errors.chiffreAffaires}>
          <FieldLabel htmlFor="field-ca" className="flex w-auto! text-white text-[15px] font-semibold">
            Chiffre d&apos;affaires annuel (€) <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-ca"
            type="number"
            min={1}
            max={999999999}
            value={chiffreAffaires}
            onChange={e => { setChiffreAffaires(e.target.value); clearError("chiffreAffaires"); updateQuery({ chiffreAffaires: e.target.value }); }}
            placeholder="Ex : 150000"
            className={inputCls("chiffreAffaires")}
          />
          {errors.chiffreAffaires && <FieldError errors={[{ message: errors.chiffreAffaires }]} className="text-[#F2693D]" />}
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
            Nos estimations sont basées sur le profil de votre entreprise, son statut juridique et son activité. Les tarifs réels sont déterminés par les compagnies d&apos;assurance partenaires. Un conseiller agréé vous contactera avec des offres personnalisées.
          </p>
        </div>
      </div>

    </form>
  );
}
