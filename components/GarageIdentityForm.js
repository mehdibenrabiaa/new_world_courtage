import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import CtaButton from "@/components/CtaButton";
import { DatePickerInput } from "@/components/DatePickerInput";

const STORAGE_KEY = "nwc_garage_form";
const CURRENT_YEAR = new Date().getFullYear();

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

// Business-identity counterpart to VehicleIdentityForm — same redirect-with-
// query-params pattern, but the fields match what a garage subscription
// actually needs (see app/question_catalog.py's "garage" catalog on the
// backend, "Coordonnées" section).
export default function GarageIdentityForm({ redirectTo = "/assurance-pro-auto/garagiste/devis/" }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [siret, setSiret] = useState("");
  const [communeNaissance, setCommuneNaissance] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    const saved = readStorage();
    const {
      name: qName, phone: qPhone, email: qEmail, siret: qSiret,
      communeNaissance: qCommuneNaissance, dateNaissance: qDateNaissance,
    } = router.query;
    setName(qName || saved.name || "");
    setPhone(qPhone || saved.phone || "");
    setEmail(qEmail || saved.email || "");
    setSiret(qSiret || saved.siret || "");
    setCommuneNaissance(qCommuneNaissance || saved.communeNaissance || "");
    setDateNaissance(qDateNaissance || saved.dateNaissance || "");
  }, [router.isReady]);

  useEffect(() => {
    writeStorage({ name, phone, email, siret, communeNaissance, dateNaissance });
  }, [name, phone, email, siret, communeNaissance, dateNaissance]);

  function updateQuery(patch) {
    const merged = { name, phone, email, siret, communeNaissance, dateNaissance, ...patch };
    const nextQuery = Object.fromEntries(Object.entries(merged).filter(([, v]) => v !== ""));
    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true, scroll: false });
  }

  function clearError(field) {
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = "Ce champ est requis.";
    if (!phone) newErrors.phone = "Ce champ est requis.";
    if (!email) newErrors.email = "Ce champ est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Adresse e-mail invalide.";
    if (!siret) newErrors.siret = "Ce champ est requis.";
    if (!communeNaissance) newErrors.communeNaissance = "Ce champ est requis.";
    if (!dateNaissance) newErrors.dateNaissance = "Ce champ est requis.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    clearStorage();
    const q = new URLSearchParams({
      name, phone, email, siret, communeNaissance, dateNaissance,
    });
    router.push(`${redirectTo}?${q.toString()}`);
  }

  const inputCls = (field) =>
    `bg-white h-[50px] ${errors[field] ? "border-[var(--color-error)] focus:border-[var(--color-error)]" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

        <Field className="border-0 p-0" data-invalid={!!errors.name}>
          <FieldLabel htmlFor="field-name" className="flex w-auto! text-white text-[15px] font-semibold">
            Nom complet <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); clearError("name"); updateQuery({ name: e.target.value }); }}
            placeholder="Ex : Jean Dupont"
            className={inputCls("name")}
          />
          {errors.name && <FieldError errors={[{ message: errors.name }]} className="text-[#F2693D]" />}
        </Field>

        <Field className="border-0 p-0" data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="field-phone" className="flex w-auto! text-white text-[15px] font-semibold">
            Téléphone <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
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

        <Field className="border-0 p-0" data-invalid={!!errors.email}>
          <FieldLabel htmlFor="field-email" className="flex w-auto! text-white text-[15px] font-semibold">
            Email <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError("email"); updateQuery({ email: e.target.value }); }}
            placeholder="exemple@email.com"
            className={inputCls("email")}
          />
          {errors.email && <FieldError errors={[{ message: errors.email }]} className="text-[#F2693D]" />}
        </Field>

        <Field className="border-0 p-0" data-invalid={!!errors.siret}>
          <FieldLabel htmlFor="field-siret" className="flex w-auto! text-white text-[15px] font-semibold">
            SIRET <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-siret"
            type="text"
            inputMode="numeric"
            value={siret}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d\s]/g, "");
              setSiret(v);
              clearError("siret");
              updateQuery({ siret: v });
            }}
            placeholder="Ex : 123 456 789 00012"
            className={inputCls("siret")}
          />
          {errors.siret && <FieldError errors={[{ message: errors.siret }]} className="text-[#F2693D]" />}
        </Field>

        <Field className="border-0 p-0" data-invalid={!!errors.communeNaissance}>
          <FieldLabel htmlFor="field-commune-naissance" className="flex w-auto! text-white text-[15px] font-semibold">
            Commune de naissance <span className="ml-0.5">*</span>
          </FieldLabel>
          <Input
            id="field-commune-naissance"
            type="text"
            value={communeNaissance}
            onChange={(e) => { setCommuneNaissance(e.target.value); clearError("communeNaissance"); updateQuery({ communeNaissance: e.target.value }); }}
            placeholder="Ex : Lyon"
            className={inputCls("communeNaissance")}
          />
          {errors.communeNaissance && <FieldError errors={[{ message: errors.communeNaissance }]} className="text-[#F2693D]" />}
        </Field>

        <Field className="border-0 p-0" data-invalid={!!errors.dateNaissance}>
          <FieldLabel htmlFor="field-date-naissance" className="flex w-auto! text-white text-[15px] font-semibold">
            Date de naissance <span className="ml-0.5">*</span>
          </FieldLabel>
          <div className="md:hidden relative">
            <Input
              id="field-date-naissance"
              type="date"
              value={dateNaissance}
              max={`${CURRENT_YEAR - 16}-12-31`}
              onChange={(e) => { setDateNaissance(e.target.value); clearError("dateNaissance"); updateQuery({ dateNaissance: e.target.value }); }}
              className={`${inputCls("dateNaissance")} ${dateNaissance ? "" : "text-transparent"}`}
            />
            {/* Native date inputs don't reliably support `placeholder` (iOS
                Safari shows nothing when empty) — hide the native rendering
                via text-transparent above and overlay our own hint instead,
                so it looks the same as every other empty field. */}
            {!dateNaissance && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">
                jj/mm/aaaa
              </span>
            )}
          </div>
          <div className="hidden md:block w-full">
            <DatePickerInput
              value={dateNaissance}
              onChange={(v) => { setDateNaissance(v); clearError("dateNaissance"); updateQuery({ dateNaissance: v }); }}
              placeholder="__/__/____"
              theme="light"
              error={!!errors.dateNaissance}
              className="h-[50px] bg-white border-gray-200 text-[var(--color-text)] hover:bg-gray-50"
            />
          </div>
          {errors.dateNaissance && <FieldError errors={[{ message: errors.dateNaissance }]} className="text-[#F2693D]" />}
        </Field>

      </div>

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
    </form>
  );
}
