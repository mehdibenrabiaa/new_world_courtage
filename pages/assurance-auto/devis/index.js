import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Car, Route, UserRound, History, ShieldCheck, ContactRound, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CAR_MODELS } from "@/lib/car-models";
import FirstRegistrationQuestion from "@/components/FirstRegistrationQuestion";
import CarBrandPicker from "@/components/CarBrandPicker";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";

const FORM_SECTIONS = [
  { label: "Votre voiture", Icon: Car },
  { label: "Utilisation de votre voiture", Icon: Route },
  { label: "Vos informations - Conducteur principal", Icon: UserRound },
  { label: "Votre historique - Conducteur principal", Icon: History },
  { label: "Votre assurance", Icon: ShieldCheck },
  { label: "Vos coordonnées", Icon: ContactRound },
];

const STORAGE_KEY = "nwc-assurance-auto-vehicle-choice";
const SEARCH_STORAGE_KEY = "nwc-assurance-auto-search-method";
const SEARCH_OPTIONS = [
  { value: "registration", label: "Par plaque d'immatriculation" },
  { value: "make_model", label: "Par marque/modèle" },
];
const VEHICLE_OPTIONS = [
  { value: "current", label: "Ma voiture actuelle" },
  { value: "future", label: "Une voiture que je souhaite acheter" },
];

export default function AssuranceAutoDevisPage() {
  const [vehicleChoice, setVehicleChoice] = useState("");
  const [searchMethod, setSearchMethod] = useState("");
  const [registration, setRegistration] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const selectedModel = brand === "other" || model === "other" ? customModel.trim() : model;
  const vehicleIdentified = vehicleChoice === "current" && (
    (searchMethod === "registration" && registration.trim().length > 0) ||
    (searchMethod === "make_model" && brand && (brand !== "other" || customBrand.trim()) && selectedModel)
  );
  const vehicleIdentityKey = searchMethod === "registration" ? "registration" : `${brand}:${model}`;
  const stepsRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const [stepScroll, setStepScroll] = useState({ left: false, right: false });

  useEffect(() => {
    const element = stepsRef.current;
    if (!element) return;
    const update = () => setStepScroll({
      left: element.scrollLeft > 1,
      right: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
      cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, []);

  function scrollSteps(direction) {
    const element = stepsRef.current;
    if (!element) return;
    cancelAnimationFrame(scrollAnimationRef.current);
    const start = element.scrollLeft;
    const target = Math.max(0, Math.min(
      element.scrollWidth - element.clientWidth,
      start + direction * element.clientWidth * 0.75,
    ));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.scrollLeft = target;
      return;
    }
    const startedAt = performance.now();
    function animate(now) {
      const progress = Math.min((now - startedAt) / 350, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.scrollLeft = start + (target - start) * eased;
      scrollAnimationRef.current = progress < 1 ? requestAnimationFrame(animate) : null;
    }
    scrollAnimationRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (VEHICLE_OPTIONS.some((option) => option.value === saved)) {
        setVehicleChoice(saved);
        if (saved === "current") {
          const savedMethod = localStorage.getItem(SEARCH_STORAGE_KEY);
          if (SEARCH_OPTIONS.some((option) => option.value === savedMethod)) {
            setSearchMethod(savedMethod);
          }
        }
      }
    } catch {
      // The form remains usable when browser storage is unavailable.
    }
  }, []);

  function selectVehicle(value) {
    setVehicleChoice(value);
    if (value !== "current") {
      setSearchMethod("");
      resetVehicleModel();
      setRegistration("");
    }
    try {
      localStorage.setItem(STORAGE_KEY, value);
      if (value !== "current") localStorage.removeItem(SEARCH_STORAGE_KEY);
    } catch {
      // Keeping the answer in component state is enough for this visit.
    }
  }

  function resetVehicleModel() {
    setBrand("");
    setModel("");
    setCustomBrand("");
    setCustomModel("");
  }

  function selectBrand(value) {
    setBrand(value);
    setModel("");
    setCustomBrand("");
    setCustomModel("");
  }

  function selectSearchMethod(value) {
    setSearchMethod(value);
    if (value !== "make_model") resetVehicleModel();
    if (value !== "registration") setRegistration("");
    try {
      localStorage.setItem(SEARCH_STORAGE_KEY, value);
    } catch {
      // The selection still works when browser storage is unavailable.
    }
  }

  return (
    <>
      <Head>
        <title>Votre devis assurance auto — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>
      <QuestionnaireHeader />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 pt-10 lg:pt-16 pb-40">
          <p className="mb-3 text-sm font-semibold text-[var(--color-brand)]">Assurance Auto</p>
          <nav aria-label="Étapes du devis assurance auto" className="sticky top-16 z-30 mb-8 bg-white py-3">
            <div className="flex items-stretch gap-2">
              <button type="button" aria-label="Faire défiler les étapes vers la gauche" aria-controls="auto-form-steps" disabled={!stepScroll.left} onClick={() => scrollSteps(-1)} className="flex w-9 shrink-0 items-center justify-center rounded-none border border-gray-200 bg-white text-[var(--color-brand)] transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[var(--color-brand)] disabled:cursor-default disabled:opacity-30">
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <div id="auto-form-steps" ref={stepsRef} onWheel={() => cancelAnimationFrame(scrollAnimationRef.current)} onTouchStart={() => cancelAnimationFrame(scrollAnimationRef.current)} onKeyDown={() => cancelAnimationFrame(scrollAnimationRef.current)} tabIndex={0} role="region" aria-label="Liste des étapes" className="steps-scroll min-w-0 flex-1 overflow-x-auto focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]">
                <ol className="flex w-max min-w-full gap-0.5">
                  {FORM_SECTIONS.map(({ label, Icon }, index) => (
                    <li
                      key={label}
                      aria-current={index === 0 ? "step" : undefined}
                      className={`flex shrink-0 items-center justify-center gap-2 whitespace-nowrap px-4 py-3.5 text-[11px] font-semibold uppercase tracking-normal ${
                        index === 0 ? "bg-[var(--color-brand)] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" className="shrink-0" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <button type="button" aria-label="Faire défiler les étapes vers la droite" aria-controls="auto-form-steps" disabled={!stepScroll.right} onClick={() => scrollSteps(1)} className="flex w-9 shrink-0 items-center justify-center rounded-none border border-gray-200 bg-white text-[var(--color-brand)] transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[var(--color-brand)] disabled:cursor-default disabled:opacity-30">
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 sm:hidden">
              Étape 1/{FORM_SECTIONS.length} · {FORM_SECTIONS[0].label}
            </p>
          </nav>
          <form onSubmit={(event) => event.preventDefault()}>
            <fieldset className="min-w-0 bg-gray-100 p-6">
              <legend className="sr-only">Votre voiture</legend>
              <p id="vehicle-choice-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                Quelle voiture souhaitez-vous assurer ?
              </p>
              <div role="radiogroup" aria-labelledby="vehicle-choice-question" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {VEHICLE_OPTIONS.map((option) => (
                  <FieldLabel
                    key={option.value}
                    htmlFor={`auto-vehicle-${option.value}`}
                    className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                      vehicleChoice === option.value
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                        : "bg-white hover:border-[var(--color-brand)]"
                    }`}
                  >
                    <Field orientation="horizontal" className="min-h-20">
                      <FieldContent>
                        <FieldTitle>{option.label}</FieldTitle>
                      </FieldContent>
                      <input
                        id={`auto-vehicle-${option.value}`}
                        type="radio"
                        name="vehicle_choice"
                        value={option.value}
                        checked={vehicleChoice === option.value}
                        onChange={() => selectVehicle(option.value)}
                        className="size-5 shrink-0 accent-[var(--color-brand)]"
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </div>
            </fieldset>
            {vehicleChoice === "current" && (
              <fieldset className="question-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Recherche de votre voiture</legend>
                <p id="vehicle-search-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Recherchez votre voiture...
                </p>
                <p id="vehicle-search-description" className="mb-4 text-sm text-gray-600">
                  Recherchez par plaque d’immatriculation pour gagner du temps et répondre plus facilement.
                </p>
                <div role="radiogroup" aria-labelledby="vehicle-search-question" aria-describedby="vehicle-search-description" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SEARCH_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`auto-search-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        searchMethod === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20">
                        <FieldContent>
                          <FieldTitle>{option.label}</FieldTitle>
                        </FieldContent>
                        <input
                          id={`auto-search-${option.value}`}
                          type="radio"
                          name="vehicle_search_method"
                          value={option.value}
                          checked={searchMethod === option.value}
                          onChange={() => selectSearchMethod(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
              </fieldset>
            )}
            {vehicleChoice === "current" && searchMethod === "registration" && (
              <div className="question-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="auto-registration" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Quel est son numéro d'immatriculation ?
                </label>
                <p id="auto-registration-description" className="mb-4 text-sm text-gray-600">
                  Gagner du temps en entrant votre plaque d’immatriculation
                </p>
                <div className="flex w-full items-stretch sm:max-w-sm">
                  <div aria-hidden="true" className="flex w-8 shrink-0 items-center justify-center overflow-hidden rounded-l-md bg-[#0755B7]">
                    <img src="/icons/french_eu_plate.svg" alt="" width={23} height={50} className="h-[50px] w-auto" />
                  </div>
                  <Input
                  id="auto-registration"
                  name="registration"
                  type="text"
                  value={registration}
                  onChange={(event) => setRegistration(event.target.value.toUpperCase())}
                  placeholder="AA254CA"
                  aria-describedby="auto-registration-description"
                  autoCapitalize="characters"
                  spellCheck={false}
                  className="h-[50px] rounded-l-none bg-white"
                />
                </div>
              </div>
            )}
            {vehicleChoice === "current" && searchMethod === "make_model" && (
              <div className="question-reveal mt-6 bg-gray-100 p-6">
                <p id="auto-brand-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                  Quelle est la marque de votre voiture ?
                </p>
                <CarBrandPicker value={brand} onChange={selectBrand} />
                {brand === "other" && (
                  <div className="question-reveal mt-4">
                    <label htmlFor="auto-custom-brand" className="mb-2 block text-sm font-medium">Précisez la marque</label>
                    <Input id="auto-custom-brand" name="custom_brand" value={customBrand} onChange={(event) => { setCustomBrand(event.target.value); setCustomModel(""); }} placeholder="Marque de votre voiture" className="h-[50px] bg-white sm:max-w-sm" />
                  </div>
                )}
              </div>
            )}
            {vehicleChoice === "current" && searchMethod === "make_model" && brand && (brand !== "other" || customBrand.trim()) && (
              <div key={brand} className="question-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor={brand === "other" ? "auto-custom-model" : "auto-model"} className="mb-4 block text-base font-semibold text-[var(--color-text)]">
                  Quel est le modèle de votre voiture ?
                </label>
                {brand !== "other" && (
                  <Select name="model" value={model} onValueChange={(value) => { setModel(value); setCustomModel(""); }}>
                    <SelectTrigger id="auto-model" className="!h-[50px] w-full bg-white sm:max-w-sm">
                      <SelectValue placeholder="Sélectionnez un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAR_MODELS[brand].map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                      <SelectItem value="other">Autre modèle</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {(brand === "other" || model === "other") && (
                  <div className={brand === "other" ? "" : "question-reveal mt-4"}>
                    {brand !== "other" && <label htmlFor="auto-custom-model" className="mb-2 block text-sm font-medium">Précisez le modèle</label>}
                    <Input id="auto-custom-model" name="custom_model" value={customModel} onChange={(event) => setCustomModel(event.target.value)} placeholder="Modèle de votre voiture" className="h-[50px] bg-white sm:max-w-sm" />
                  </div>
                )}
              </div>
            )}
            {vehicleIdentified && (
              <div key={vehicleIdentityKey} className="question-reveal mt-6">
                <FirstRegistrationQuestion />
              </div>
            )}
          </form>
        </div>
      </main>
      <style jsx>{`
        .steps-scroll { scrollbar-width: none; }
        .steps-scroll::-webkit-scrollbar { display: none; }
        .question-reveal {
          animation: question-fade-in 250ms ease-out both;
        }
        @keyframes question-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .question-reveal { animation: none; }
        }
      `}</style>
    </>
  );
}