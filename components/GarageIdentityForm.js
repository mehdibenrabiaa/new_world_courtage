import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Wrench, Truck, Handshake } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldTitle, FieldDescription, FieldError } from "@/components/ui/field";
import CtaButton from "@/components/CtaButton";

const STORAGE_KEY = "nwc_garage_form";

// Mirrors the "produits_interesses" gate question in the backend's "garage"
// catalog (app/question_catalog.py) — asked here instead of on its own gate
// screen in CarInsuranceForm, so picking a product doesn't cost the prospect
// an extra step. `step=0` in the redirect (see handleSubmit) then tells that
// form its gate is already answered.
const PRODUCT_OPTIONS = [
  {
    label: "Protect Garage",
    value: "protect_garage",
    description: "Mécanicien, carrossier, centre d'entretien automobile.",
    Icon: Wrench,
  },
  {
    label: "Les Convoyeurs",
    value: "convoyeurs",
    description: "Convoyage de véhicules pour le compte de tiers.",
    Icon: Truck,
  },
  {
    label: "Les Négociants",
    value: "negociants",
    description: "Achat-revente de véhicules d'occasion.",
    Icon: Handshake,
  },
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

// Business-identity counterpart to VehicleIdentityForm — same redirect-with-
// query-params pattern, but the fields match what a garage subscription
// actually needs (see app/question_catalog.py's "garage" catalog on the
// backend, "Coordonnées" section).
export default function GarageIdentityForm({ redirectTo = "/assurance-pro-auto/garagiste/devis/" }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [produits, setProduits] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    const saved = readStorage();
    const { name: qName, phone: qPhone, email: qEmail, produits: qProduits } = router.query;
    setName(qName || saved.name || "");
    setPhone(qPhone || saved.phone || "");
    setEmail(qEmail || saved.email || "");
    setProduits(qProduits ? qProduits.split(",") : saved.produits || []);
  }, [router.isReady]);

  useEffect(() => {
    writeStorage({ name, phone, email, produits });
  }, [name, phone, email, produits]);

  function updateQuery(patch) {
    const merged = { name, phone, email, produits: produits.join(","), ...patch };
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
    if (produits.length === 0) newErrors.produits = "Ce champ est requis.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    clearStorage();
    const q = new URLSearchParams({
      name, phone, email, produits: produits.join(","),
      // Tells the devis questionnaire its product gate is already answered
      // (see PRODUCT_OPTIONS comment above), so it opens straight on step 0.
      step: "0",
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

        <Field className="border-0 p-0 sm:col-span-2" data-invalid={!!errors.produits}>
          <FieldLabel className="flex w-auto! text-white text-[15px] font-semibold">
            Quelles assurances vous intéressent ? <span className="ml-0.5">*</span>
          </FieldLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRODUCT_OPTIONS.map((opt) => {
              const isSelected = produits.includes(opt.value);
              return (
                <FieldLabel
                  key={opt.value}
                  htmlFor={`checkbox-produits-${opt.value}`}
                  className={`transition-colors ${
                    // Selected styling comes for free from FieldLabel's own
                    // has-data-[state=checked] rule once the Checkbox below is
                    // checked — only the unselected/error look needs to be said here.
                    errors.produits && !isSelected ? "border-[var(--color-error)] bg-white" : "hover:border-[var(--color-brand)] bg-white"
                  }`}
                >
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>
                        <opt.Icon className="size-4 shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
                        {opt.label}
                      </FieldTitle>
                      <FieldDescription>{opt.description}</FieldDescription>
                    </FieldContent>
                    <Checkbox
                      id={`checkbox-produits-${opt.value}`}
                      checked={isSelected}
                      onCheckedChange={() => {
                        const next = isSelected ? produits.filter((v) => v !== opt.value) : [...produits, opt.value];
                        setProduits(next);
                        clearError("produits");
                        updateQuery({ produits: next.join(",") });
                      }}
                    />
                  </Field>
                </FieldLabel>
              );
            })}
          </div>
          {errors.produits && <FieldError errors={[{ message: errors.produits }]} className="text-[#F2693D]" />}
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
