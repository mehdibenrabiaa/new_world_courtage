import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Car, Route, UserRound, History, ShieldCheck, ContactRound, ChevronLeft, ChevronRight, Cctv, Fence, ParkingMeter, SquareParking, Warehouse, Building2, Venus, Mars, IdCard, UsersRound, Euro, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CAR_MODELS } from "@/lib/car-models";
import { validateVehicle } from "@/lib/auto-validation";
import { DatePickerInput } from "@/components/DatePickerInput";
import { MonthYearInput } from "@/components/MonthYearInput";
import FirstRegistrationQuestion from "@/components/FirstRegistrationQuestion";
import CarBrandPicker from "@/components/CarBrandPicker";
import ResponsiveFormSteps from "@/components/ResponsiveFormSteps";
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

const PROFESSIONAL_CATEGORIES = [
  { value: "employee_executive", label: "Salarié cadre" },
  { value: "employee_non_executive", label: "Salarié non cadre" },
  { value: "teacher", label: "Enseignant" },
  { value: "civil_servant", label: "Fonctionnaire" },
  { value: "business_owner", label: "Chef d'entreprise" },
  { value: "merchant", label: "Commerçant" },
  { value: "craftsperson", label: "Artisan" },
  { value: "farmer", label: "Agriculteur" },
  { value: "liberal_profession", label: "Profession libérale" },
  { value: "sales_representative", label: "VRP" },
  { value: "entertainment_professional", label: "Professionnel du spectacle" },
  { value: "fairground_worker", label: "Forain" },
  { value: "student", label: "Étudiant" },
  { value: "retired", label: "Retraité" },
  { value: "job_seeker", label: "Recherche d'emploi" },
  { value: "homemaker", label: "Au foyer" },
  { value: "no_profession", label: "Sans profession" },
];

const VEHICLE_USAGE_OPTIONS = [
  { value: "private_commute", label: "Privé et trajet travail" },
  { value: "private", label: "Privé" },
  { value: "private_occasional_business", label: "Privé et professionnel occasionnel" },
  { value: "private_regular_rounds", label: "Privé et tournées régulières" },
];

const NIGHT_PARKING_OPTIONS = [
  { value: "secure_parking", label: "Parking sécurisé", Icon: Cctv },
  { value: "private_enclosed_garden", label: "Jardin clos privé", Icon: Fence },
  { value: "public_road", label: "Voie publique", Icon: ParkingMeter },
  { value: "open_air_shared_parking", label: "Parking collectif en plein air", Icon: SquareParking },
  { value: "closed_garage", label: "Garage fermé", Icon: Warehouse },
  { value: "closed_shared_parking", label: "Parking collectif fermé", Icon: Building2 },
];

// 1 000 km, then every 10 000 km up to 40 000 km, then "Plus de 40 000 km".
const ANNUAL_MILEAGE_OPTIONS = [
  ...[1000, 10000, 20000, 30000, 40000].map((km) => ({ value: String(km), label: `${km.toLocaleString("fr-FR")} km` })),
  { value: "over_40000", label: "Plus de 40 000 km" },
];

const USAGE_FREQUENCY_OPTIONS = [
  { value: "3_4_days_per_week", label: "3 à 4 jours par semaine" },
  { value: "less_than_weekly", label: "Moins d'une fois par semaine" },
  { value: "weekends_holidays", label: "Le week-end et les vacances" },
];

const PREVIOUS_CAR_DURATION_OPTIONS = [
  { value: "less_than_1", label: "Moins d'un an" },
  { value: "1", label: "1 an" },
  { value: "2", label: "2 ans" },
  { value: "3", label: "3 ans" },
  { value: "4", label: "4 ans" },
  { value: "5_or_more", label: "5 ans ou plus" },
];

const REGISTRATION_HOLDER_OPTIONS = [
  { value: "me", label: "Moi (le conducteur principal)" },
  { value: "me_and_partner", label: "Moi et mon conjoint" },
  { value: "partner", label: "Mon conjoint" },
  { value: "my_parents", label: "Mes parents" },
  { value: "partner_parents", label: "Les parents de mon conjoint" },
  { value: "company", label: "Une société" },
];

const CIVILITY_OPTIONS = [
  { value: "madame", label: "Madame", Icon: Venus },
  { value: "monsieur", label: "Monsieur", Icon: Mars },
];

const HOUSING_OPTIONS = [
  { value: "tenant_apartment", label: "Locataire en appartement" },
  { value: "tenant_house", label: "Locataire en maison" },
  { value: "owner_apartment", label: "Propriétaire en appartement" },
  { value: "owner_house", label: "Propriétaire en maison" },
  { value: "free_occupant_apartment", label: "Occupant à titre gratuit en appartement" },
  { value: "free_occupant_house", label: "Occupant à titre gratuit en maison" },
];

const HOME_INSURANCE_OFFER_OPTIONS = [
  { value: "remind_later", label: "Oui, me le rappeler plus tard" },
  { value: "no", label: "Non, merci" },
];

const LICENSE_TYPE_OPTIONS = [
  { value: "b", label: "Permis B", Icon: IdCard },
  { value: "b_accompanied", label: "Permis B avec conduite accompagnée", Icon: UsersRound },
  { value: "foreign_eu", label: "Permis étranger obtenu en Union Européenne", Icon: Euro },
  { value: "foreign_non_eu", label: "Permis étranger obtenu hors Union Européenne", Icon: Globe },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Célibataire" },
  { value: "married", label: "Marié" },
  { value: "cohabiting", label: "Concubin" },
  { value: "pacs", label: "Pacsé" },
  { value: "separated", label: "Séparé" },
  { value: "divorced", label: "Divorcé" },
  { value: "widowed", label: "Veuf" },
];

// Statuses where the driver lives with a partner.
const PARTNER_STATUSES = ["married", "cohabiting", "pacs"];

const YES_NO_OPTIONS = [
  { value: "yes", label: "Oui" },
  { value: "no", label: "Non" },
];

// Last step that has questions so far — "Suivant" is hidden there.
const LAST_BUILT_STEP = 2;

const WORK_COUNTRIES = [
  { value: "FR", label: "France" },
  { value: "DE", label: "Allemagne" },
  { value: "AD", label: "Andorre" },
  { value: "BE", label: "Belgique" },
  { value: "ES", label: "Espagne" },
  { value: "IT", label: "Italie" },
  { value: "LU", label: "Luxembourg" },
  { value: "MC", label: "Monaco" },
  { value: "GB", label: "Royaume-Uni" },
  { value: "CH", label: "Suisse" },
  { value: "other", label: "Autre pays" },
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

function ValidationError({ id, message }) {
  return message ? <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-[var(--color-error)]">{message}</p> : null;
}

function formatRegistration(raw) {
  const characters = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let plate = "";
  for (const character of characters) {
    if (plate.length === 7) break;
    const expectsLetter = plate.length < 2 || plate.length >= 5;
    if ((expectsLetter ? /[A-Z]/ : /[0-9]/).test(character)) plate += character;
  }
  return [plate.slice(0, 2), plate.slice(2, 5), plate.slice(5, 7)].filter(Boolean).join("-");
}

// Same glide as the garage questionnaire (CarInsuranceForm) so both flows
// scroll to a blocking error identically.
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

export default function AssuranceAutoDevisPage() {
  const [vehicleChoice, setVehicleChoice] = useState("");
  const [searchMethod, setSearchMethod] = useState("");
  const [registration, setRegistration] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [firstRegistration, setFirstRegistration] = useState({ month: "", year: "" });
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const selectedModel = brand === "other" || model === "other" ? customModel.trim() : model;
  const vehicleIdentified = vehicleChoice === "current" && (
    (searchMethod === "registration" && registration.trim().length > 0) ||
    (searchMethod === "make_model" && brand && (brand !== "other" || customBrand.trim()) && selectedModel)
  );
  const vehicleIdentityKey = searchMethod === "registration" ? "registration" : `${brand}:${model}`;
  const router = useRouter();
  const vehicleErrors = validateVehicle({ vehicleChoice, searchMethod, registration, brand, model, customBrand, customModel, firstRegistration });
  const vehicleComplete = Object.keys(vehicleErrors).length === 0;
  const errors = validationAttempted ? vehicleErrors : {};
  const [professionalCategory, setProfessionalCategory] = useState("");
  const [profession, setProfession] = useState("");
  const [vehicleUsage, setVehicleUsage] = useState("");
  const [workCountry, setWorkCountry] = useState("");
  const [customWorkCountry, setCustomWorkCountry] = useState("");
  const [workCity, setWorkCity] = useState("");
  const [parkingCity, setParkingCity] = useState("");
  const [nightParking, setNightParking] = useState("");
  const [annualMileage, setAnnualMileage] = useState("");
  const [usageFrequency, setUsageFrequency] = useState("");
  const [previousCarDuration, setPreviousCarDuration] = useState("");
  const [registrationHolder, setRegistrationHolder] = useState("");
  const [step1Attempted, setStep1Attempted] = useState(false);
  const [civility, setCivility] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [housing, setHousing] = useState("");
  const [homeInsuranceOffer, setHomeInsuranceOffer] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [licenseDate, setLicenseDate] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [partnerHasLicense, setPartnerHasLicense] = useState("");
  const [direction, setDirection] = useState("next");
  const stepRankRef = useRef(null);
  const stepAnimation = direction === "next" ? "slide-in-right" : "slide-in-left";
  // Step 1 reveals one question at a time: each appears only once the
  // previous one is answered (text answers need at least 2 characters).
  const isFilled = (text) => text.trim().length >= 2;
  const showProfession = professionalCategory !== "";
  const showVehicleUsage = showProfession && isFilled(profession);
  const showWorkCountry = showVehicleUsage && vehicleUsage !== "";
  const showWorkCity = showWorkCountry && workCountry !== "" && (workCountry !== "other" || isFilled(customWorkCountry));
  const showParkingCity = showWorkCity && isFilled(workCity);
  const showNightParking = showParkingCity && isFilled(parkingCity);
  const showAnnualMileage = showNightParking && nightParking !== "";
  const showUsageFrequency = showAnnualMileage && annualMileage !== "";
  const showPreviousCarDuration = showUsageFrequency && usageFrequency !== "";
  const showRegistrationHolder = showPreviousCarDuration && previousCarDuration !== "";
  // First unanswered step-1 question (in reveal order) and the element to
  // focus for it; null once the whole step is answered.
  const step1Missing = [
    ["professional-category", professionalCategory !== "", "professional-category"],
    ["profession", isFilled(profession), "profession"],
    ["vehicle-usage", vehicleUsage !== "", `vehicle-usage-${VEHICLE_USAGE_OPTIONS[0].value}`],
    ["work-country", workCountry !== "" && (workCountry !== "other" || isFilled(customWorkCountry)), workCountry === "other" ? "custom-work-country" : "work-country"],
    ["work-city", isFilled(workCity), "work-city"],
    ["parking-city", isFilled(parkingCity), "parking-city"],
    ["night-parking", nightParking !== "", `night-parking-${NIGHT_PARKING_OPTIONS[0].value}`],
    ["annual-mileage", annualMileage !== "", "annual-mileage"],
    ["usage-frequency", usageFrequency !== "", `usage-frequency-${USAGE_FREQUENCY_OPTIONS[0].value}`],
    ["previous-car-duration", previousCarDuration !== "", "previous-car-duration"],
    ["registration-holder", registrationHolder !== "", `registration-holder-${REGISTRATION_HOLDER_OPTIONS[0].value}`],
  ].find(([, filled]) => !filled) ?? null;
  const step1Complete = step1Missing === null;
  const step1Error = (key) => step1Attempted && step1Missing?.[0] === key ? "Veuillez répondre à cette question pour continuer." : null;
  const showBirthDate = civility !== "";
  const showHousing = showBirthDate && /^\d{4}-\d{2}-\d{2}$/.test(birthDate);
  const showHomeInsuranceOffer = showHousing && housing !== "";
  const showPostalAddress = showHomeInsuranceOffer && homeInsuranceOffer !== "";
  const showLicenseDate = showPostalAddress && isFilled(postalAddress);
  const showLicenseType = showLicenseDate && licenseDate !== "";
  const showMaritalStatus = showLicenseType && licenseType !== "";
  const showPartnerHasLicense = showMaritalStatus && PARTNER_STATUSES.includes(maritalStatus);
  // A step can only be reached once every earlier step is complete.
  const maxStep = !vehicleComplete ? 0 : !step1Complete ? 1 : 2;
  const requestedStep = Math.min(Math.max(Number.parseInt(router.query.step, 10) || 0, 0), LAST_BUILT_STEP);
  const currentStep = hydrated ? Math.min(requestedStep, maxStep) : 0;

  function fieldProps(id) {
    return { required: true, "aria-required": true, "aria-invalid": Boolean(errors[id]), "aria-describedby": errors[id] ? `${id}-error` : undefined };
  }

  function focusField(id) {
    requestAnimationFrame(() => {
      const field = document.getElementById(id);
      if (!field) return;
      field.focus({ preventScroll: true });
      const rect = field.getBoundingClientRect();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      animateScrollTo(Math.max(0, Math.min(window.scrollY + rect.top - (window.innerHeight - rect.height) / 2, maxScroll)));
    });
  }

  function goToStep(step) {
    if (step > currentStep && currentStep === 0 && !vehicleComplete) {
      setValidationAttempted(true);
      focusField(Object.keys(vehicleErrors)[0]);
      return;
    }
    if (step > currentStep && currentStep === 1 && !step1Complete) {
      setStep1Attempted(true);
      focusField(step1Missing[2]);
      return;
    }
    router.push({ pathname: router.pathname, query: { ...router.query, step: String(step) } }, undefined, { shallow: true, scroll: false });
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  useEffect(() => {
    setStep1Attempted(false);
  }, [step1Missing?.[0]]);

  // Slide direction comes from comparing steps, so browser Back/Forward
  // animates the right way too.
  useEffect(() => {
    if (stepRankRef.current !== null && stepRankRef.current !== currentStep) {
      setDirection(currentStep > stepRankRef.current ? "next" : "prev");
    }
    stepRankRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    setFirstRegistration({ month: "", year: "" });
  }, [vehicleChoice, searchMethod, registration, brand, model, customBrand, customModel]);

  useEffect(() => {
    if (router.isReady && hydrated && requestedStep > maxStep) {
      if (maxStep === 0) setValidationAttempted(true);
      router.replace({ pathname: router.pathname, query: { ...router.query, step: String(maxStep) } }, undefined, { shallow: true, scroll: false });
    }
  }, [router.isReady, requestedStep, hydrated, maxStep]);

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
    } finally {
      setHydrated(true);
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
          <ResponsiveFormSteps sections={FORM_SECTIONS} currentStep={currentStep} />
          <form noValidate onSubmit={(event) => { event.preventDefault(); if (currentStep < LAST_BUILT_STEP) goToStep(currentStep + 1); }}>
            <div hidden={currentStep !== 0} className={currentStep === 0 ? stepAnimation : undefined}>
            <p className="mb-4 text-sm text-gray-500">Tous les champs affichés sont obligatoires.</p>
            <fieldset className="min-w-0 bg-gray-100 p-6">
              <legend className="sr-only">Votre voiture</legend>
              <p id="vehicle-choice-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                Quelle voiture souhaitez-vous assurer ?
              </p>
              <div role="radiogroup" aria-required="true" aria-invalid={Boolean(errors["auto-vehicle-current"])} aria-describedby={errors["auto-vehicle-current"] ? "auto-vehicle-current-error" : undefined} aria-labelledby="vehicle-choice-question" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {VEHICLE_OPTIONS.map((option) => (
                  <FieldLabel
                    key={option.value}
                    htmlFor={`auto-vehicle-${option.value}`}
                    className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                      vehicleChoice === option.value
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                        : errors["auto-vehicle-current"]
                          ? "border-[var(--color-error)] bg-white"
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
                        required
                        value={option.value}
                        checked={vehicleChoice === option.value}
                        onChange={() => selectVehicle(option.value)}
                        className="size-5 shrink-0 accent-[var(--color-brand)]"
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </div>
              <ValidationError id="auto-vehicle-current" message={errors["auto-vehicle-current"]} />
            </fieldset>
            {vehicleChoice === "current" && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Recherche de votre voiture</legend>
                <p id="vehicle-search-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Recherchez votre voiture...
                </p>
                <p id="vehicle-search-description" className="mb-4 text-sm text-gray-600">
                  Recherchez par plaque d’immatriculation pour gagner du temps et répondre plus facilement.
                </p>
                <div role="radiogroup" aria-required="true" aria-invalid={Boolean(errors["auto-search-registration"])} aria-labelledby="vehicle-search-question" aria-describedby={`vehicle-search-description${errors["auto-search-registration"] ? " auto-search-registration-error" : ""}`} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SEARCH_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`auto-search-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        searchMethod === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : errors["auto-search-registration"]
                            ? "border-[var(--color-error)] bg-white"
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
                          required
                          value={option.value}
                          checked={searchMethod === option.value}
                          onChange={() => selectSearchMethod(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
                <ValidationError id="auto-search-registration" message={errors["auto-search-registration"]} />
              </fieldset>
            )}
            {vehicleChoice === "current" && searchMethod === "registration" && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
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
                  onChange={(event) => setRegistration(formatRegistration(event.target.value))}
                  placeholder="AA-123-AA"
                  maxLength={9}
                  pattern="[A-Z]{2}-[0-9]{3}-[A-Z]{2}"
                  {...fieldProps("auto-registration")}
                  aria-describedby={`auto-registration-description${errors["auto-registration"] ? " auto-registration-error" : ""}`}
                  autoCapitalize="characters"
                  spellCheck={false}
                  className="h-[50px] rounded-l-none bg-white"
                />
                </div>
                <ValidationError id="auto-registration" message={errors["auto-registration"]} />
              </div>
            )}
            {vehicleChoice === "current" && searchMethod === "make_model" && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <p id="auto-brand-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                  Quelle est la marque de votre voiture ?
                </p>
                <CarBrandPicker value={brand} onChange={selectBrand} required error={errors["brand-search"]} />
                <ValidationError id="brand-search" message={errors["brand-search"]} />
                {brand === "other" && (
                  <div className="conditional-field-reveal mt-4">
                    <label htmlFor="auto-custom-brand" className="mb-2 block text-sm font-medium">Précisez la marque</label>
                    <Input id="auto-custom-brand" {...fieldProps("auto-custom-brand")} name="custom_brand" value={customBrand} onChange={(event) => { setCustomBrand(event.target.value); setCustomModel(""); }} placeholder="Marque de votre voiture" className="h-[50px] bg-white sm:max-w-sm" />
                    <ValidationError id="auto-custom-brand" message={errors["auto-custom-brand"]} />
                  </div>
                )}
              </div>
            )}
            {vehicleChoice === "current" && searchMethod === "make_model" && brand && (brand !== "other" || customBrand.trim()) && (
              <div key={brand} className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor={brand === "other" ? "auto-custom-model" : "auto-model"} className="mb-4 block text-base font-semibold text-[var(--color-text)]">
                  Quel est le modèle de votre voiture ?
                </label>
                {brand !== "other" && (
                  <Select required name="model" value={model} onValueChange={(value) => { setModel(value); setCustomModel(""); }}>
                    <SelectTrigger id="auto-model" {...fieldProps("auto-model")} className="!h-[50px] w-full bg-white sm:max-w-sm">
                      <SelectValue placeholder="Sélectionnez un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAR_MODELS[brand].map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                      <SelectItem value="other">Autre modèle</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <ValidationError id="auto-model" message={errors["auto-model"]} />
                {(brand === "other" || model === "other") && (
                  <div className={brand === "other" ? "" : "conditional-field-reveal mt-4"}>
                    {brand !== "other" && <label htmlFor="auto-custom-model" className="mb-2 block text-sm font-medium">Précisez le modèle</label>}
                    <Input id="auto-custom-model" {...fieldProps("auto-custom-model")} name="custom_model" value={customModel} onChange={(event) => setCustomModel(event.target.value)} placeholder="Modèle de votre voiture" className="h-[50px] bg-white sm:max-w-sm" />
                    <ValidationError id="auto-custom-model" message={errors["auto-custom-model"]} />
                  </div>
                )}
              </div>
            )}
            {vehicleIdentified && (
              <div key={vehicleIdentityKey} className="conditional-field-reveal mt-6">
                <FirstRegistrationQuestion value={firstRegistration} onChange={setFirstRegistration} errors={errors} />
              </div>
            )}
            </div>
            <div hidden={currentStep !== 1} className={currentStep === 1 ? stepAnimation : undefined}>
              <fieldset className="min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Utilisation de votre voiture</legend>
                <label htmlFor="professional-category" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Quelle est votre catégorie professionnelle ?
                </label>
                <p id="professional-category-description" className="mb-4 text-sm text-gray-600">
                  Pour la plupart des assureurs, la catégorie professionnelle joue sur le prix.
                </p>
                <Select name="professional_category" value={professionalCategory} onValueChange={setProfessionalCategory}>
                  <SelectTrigger id="professional-category" aria-describedby="professional-category-description" className="!h-[50px] w-full bg-white sm:max-w-sm">
                    <SelectValue placeholder="Sélectionnez votre catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROFESSIONAL_CATEGORIES.map(({ value, label }) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <ValidationError id="professional-category" message={step1Error("professional-category")} />
              </fieldset>
              {showProfession && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="profession" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Quelle est votre profession ?
                </label>
                <p id="profession-description" className="mb-4 text-sm text-gray-600">
                  En assurance tout est une question de statistiques ! Pour la plupart des assureurs, votre profession peut avoir un impact sur votre tarif.
                </p>
                <Input
                  id="profession"
                  name="profession"
                  type="text"
                  value={profession}
                  onChange={(event) => setProfession(event.target.value)}
                  placeholder="Votre profession"
                  aria-describedby="profession-description"
                  className="h-[50px] bg-white sm:max-w-sm"
                />
                <ValidationError id="profession" message={step1Error("profession")} />
              </div>
              )}
              {showVehicleUsage && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Utilisation de votre voiture</legend>
                <p id="vehicle-usage-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Dans quel cas utilisez-vous votre voiture ?
                </p>
                <p id="vehicle-usage-description" className="mb-4 text-sm text-gray-600">
                  Pour la plupart des assureurs, l'utilisation de votre voiture peut avoir un impact sur le tarif de votre assurance auto.
                </p>
                <div role="radiogroup" aria-labelledby="vehicle-usage-question" aria-describedby="vehicle-usage-description" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {VEHICLE_USAGE_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`vehicle-usage-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        vehicleUsage === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20">
                        <FieldContent><FieldTitle>{option.label}</FieldTitle></FieldContent>
                        <input
                          id={`vehicle-usage-${option.value}`}
                          type="radio"
                          name="vehicle_usage"
                          value={option.value}
                          checked={vehicleUsage === option.value}
                          onChange={() => setVehicleUsage(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
                <ValidationError id="vehicle-usage" message={step1Error("vehicle-usage")} />
              </fieldset>
              )}
              {showWorkCountry && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="work-country" className="mb-4 block text-base font-semibold text-[var(--color-text)]">
                  Dans quel pays travaillez-vous ?
                </label>
                <Select name="work_country" value={workCountry} onValueChange={(value) => { setWorkCountry(value); setCustomWorkCountry(""); }}>
                  <SelectTrigger id="work-country" className="!h-[50px] w-full bg-white sm:max-w-sm">
                    <SelectValue placeholder="Sélectionnez un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_COUNTRIES.map(({ value, label }) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {workCountry === "other" && (
                  <div className="conditional-field-reveal mt-4">
                    <label htmlFor="custom-work-country" className="mb-2 block text-sm font-medium">Précisez le pays</label>
                    <Input id="custom-work-country" name="custom_work_country" type="text" value={customWorkCountry} onChange={(event) => setCustomWorkCountry(event.target.value)} placeholder="Pays dans lequel vous travaillez" className="h-[50px] bg-white sm:max-w-sm" />
                  </div>
                )}
                <ValidationError id="work-country" message={step1Error("work-country")} />
              </div>
              )}
              {showWorkCity && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="work-city" className="mb-4 block text-base font-semibold text-[var(--color-text)]">
                  Dans quelle ville travaillez-vous ?
                </label>
                <Input
                  id="work-city"
                  name="work_city"
                  type="text"
                  value={workCity}
                  onChange={(event) => setWorkCity(event.target.value)}
                  placeholder="Ville ou code postal"
                  autoComplete="address-level2"
                  className="h-[50px] bg-white sm:max-w-sm"
                />
                <ValidationError id="work-city" message={step1Error("work-city")} />
              </div>
              )}
              {showParkingCity && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="parking-city" className="mb-4 block text-base font-semibold text-[var(--color-text)]">
                  Dans quelle ville garez-vous votre voiture la nuit ?
                </label>
                <Input
                  id="parking-city"
                  name="parking_city"
                  type="text"
                  value={parkingCity}
                  onChange={(event) => setParkingCity(event.target.value)}
                  placeholder="Ville ou code postal"
                  autoComplete="address-level2"
                  className="h-[50px] bg-white sm:max-w-sm"
                />
                <ValidationError id="parking-city" message={step1Error("parking-city")} />
              </div>
              )}
              {showNightParking && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Mode de stationnement la nuit</legend>
                <p id="night-parking-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Quel mode de stationnement utilisez-vous la nuit ?
                </p>
                <p id="night-parking-description" className="mb-4 text-sm text-gray-600">
                  Le type de stationnement peut aussi avoir un impact sur votre tarif !
                </p>
                <div role="radiogroup" aria-labelledby="night-parking-question" aria-describedby="night-parking-description" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {NIGHT_PARKING_OPTIONS.map(({ value, label, Icon }) => (
                    <FieldLabel
                      key={value}
                      htmlFor={`night-parking-${value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        nightParking === value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20 items-center">
                        <span
                          aria-hidden="true"
                          className={`flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            nightParking === value ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                          }`}
                        >
                          <Icon size={22} strokeWidth={1.75} />
                        </span>
                        <FieldContent>
                          <FieldTitle>{label}</FieldTitle>
                        </FieldContent>
                        <input
                          id={`night-parking-${value}`}
                          type="radio"
                          name="night_parking"
                          value={value}
                          checked={nightParking === value}
                          onChange={() => setNightParking(value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
                <ValidationError id="night-parking" message={step1Error("night-parking")} />
              </fieldset>
              )}
              {showAnnualMileage && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="annual-mileage" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Chaque année, vous roulez en moyenne...
                </label>
                <p id="annual-mileage-description" className="mb-4 text-sm text-gray-600">
                  Pour vous aider : un conducteur parcourt en moyenne 13 000 km/an.
                </p>
                <Select name="annual_mileage" value={annualMileage} onValueChange={setAnnualMileage}>
                  <SelectTrigger id="annual-mileage" aria-describedby="annual-mileage-description" className="!h-[50px] w-full bg-white sm:max-w-sm">
                    <SelectValue placeholder="Sélectionnez un kilométrage" />
                  </SelectTrigger>
                  <SelectContent>
                    {ANNUAL_MILEAGE_OPTIONS.map(({ value, label }) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <ValidationError id="annual-mileage" message={step1Error("annual-mileage")} />
              </div>
              )}
              {showUsageFrequency && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Fréquence d'utilisation du véhicule</legend>
                <p id="usage-frequency-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                  Le véhicule est utilisé
                </p>
                <div role="radiogroup" aria-labelledby="usage-frequency-question" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {USAGE_FREQUENCY_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`usage-frequency-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        usageFrequency === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20">
                        <FieldContent><FieldTitle>{option.label}</FieldTitle></FieldContent>
                        <input
                          id={`usage-frequency-${option.value}`}
                          type="radio"
                          name="usage_frequency"
                          value={option.value}
                          checked={usageFrequency === option.value}
                          onChange={() => setUsageFrequency(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
                <ValidationError id="usage-frequency" message={step1Error("usage-frequency")} />
              </fieldset>
              )}
              {showPreviousCarDuration && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="previous-car-duration" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Combien de temps avez-vous gardé votre dernière voiture ?
                </label>
                <p id="previous-car-duration-description" className="mb-4 text-sm text-gray-600">
                  S&apos;il s&apos;agit de votre 1ère voiture, indiquez depuis quand vous l&apos;avez.
                </p>
                <Select name="previous_car_duration" value={previousCarDuration} onValueChange={setPreviousCarDuration}>
                  <SelectTrigger id="previous-car-duration" aria-describedby="previous-car-duration-description" className="!h-[50px] w-full bg-white sm:max-w-sm">
                    <SelectValue placeholder="Sélectionnez une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREVIOUS_CAR_DURATION_OPTIONS.map(({ value, label }) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <ValidationError id="previous-car-duration" message={step1Error("previous-car-duration")} />
              </div>
              )}
              {showRegistrationHolder && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Titulaire de la carte grise</legend>
                <p id="registration-holder-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                  Qui est titulaire de la carte grise ?
                </p>
                <div role="radiogroup" aria-labelledby="registration-holder-question" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {REGISTRATION_HOLDER_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`registration-holder-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        registrationHolder === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20">
                        <FieldContent><FieldTitle>{option.label}</FieldTitle></FieldContent>
                        <input
                          id={`registration-holder-${option.value}`}
                          type="radio"
                          name="registration_holder"
                          value={option.value}
                          checked={registrationHolder === option.value}
                          onChange={() => setRegistrationHolder(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
                <ValidationError id="registration-holder" message={step1Error("registration-holder")} />
              </fieldset>
              )}
            </div>
            <div hidden={currentStep !== 2} className={currentStep === 2 ? stepAnimation : undefined}>
              <fieldset className="min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Civilité</legend>
                <p id="civility-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Civilité
                </p>
                <p id="civility-description" className="mb-4 text-sm text-gray-600">
                  Cette information est utilisée uniquement à des fins statistiques.
                </p>
                <div role="radiogroup" aria-labelledby="civility-question" aria-describedby="civility-description" className="grid grid-cols-2 gap-3 sm:max-w-sm">
                  {CIVILITY_OPTIONS.map(({ value, label, Icon }) => (
                    <FieldLabel
                      key={value}
                      htmlFor={`civility-${value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        civility === value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="vertical" className="items-center gap-3 py-5 text-center">
                        <span
                          aria-hidden="true"
                          className={`flex size-12 !w-12 shrink-0 items-center justify-center self-center rounded-full transition-colors ${
                            civility === value ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                          }`}
                        >
                          <Icon size={24} strokeWidth={1.75} />
                        </span>
                        <FieldTitle className="!w-auto self-center">{label}</FieldTitle>
                        <input
                          id={`civility-${value}`}
                          type="radio"
                          name="civility"
                          value={value}
                          checked={civility === value}
                          onChange={() => setCivility(value)}
                          className="size-5 !w-5 shrink-0 self-center accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
              </fieldset>
              {showBirthDate && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="birth-date" className="mb-4 block text-base font-semibold text-[var(--color-text)]">
                  Quelle est votre date de naissance ?
                </label>
                <div className="sm:max-w-sm">
                  <DatePickerInput id="birth-date" value={birthDate} onChange={setBirthDate} theme="light" className="h-[50px] w-full bg-white" />
                </div>
              </div>
              )}
              {showHousing && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="housing" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Vous êtes actuellement...
                </label>
                <div id="housing-description" className="mb-4 space-y-2 text-sm text-gray-600">
                  <p>Les assureurs se basent sur des statistiques par type de profil pour fixer leurs prix. Il s&apos;agit ici d&apos;indiquer votre résidence fiscale.</p>
                  <p>Si vous logez chez vos parents, vous indiquerez généralement leur situation.</p>
                </div>
                <Select name="housing" value={housing} onValueChange={setHousing}>
                  <SelectTrigger id="housing" aria-describedby="housing-description" className="!h-[50px] w-full bg-white sm:max-w-sm">
                    <SelectValue placeholder="Sélectionnez votre situation" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOUSING_OPTIONS.map(({ value, label }) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              )}
              {showHomeInsuranceOffer && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Économies sur l&apos;assurance habitation</legend>
                <p id="home-insurance-offer-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Souhaitez-vous économiser sur votre assurance habitation ?
                </p>
                <p id="home-insurance-offer-description" className="mb-4 text-sm text-gray-600">
                  Pssst ! lesfurets peuvent vous permettre d’économiser jusqu’à 119€/an* sur votre assurance habitation
                </p>
                <div role="radiogroup" aria-labelledby="home-insurance-offer-question" aria-describedby="home-insurance-offer-description" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {HOME_INSURANCE_OFFER_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`home-insurance-offer-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        homeInsuranceOffer === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20">
                        <FieldContent><FieldTitle>{option.label}</FieldTitle></FieldContent>
                        <input
                          id={`home-insurance-offer-${option.value}`}
                          type="radio"
                          name="home_insurance_offer"
                          value={option.value}
                          checked={homeInsuranceOffer === option.value}
                          onChange={() => setHomeInsuranceOffer(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
              </fieldset>
              )}
              {showPostalAddress && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <label htmlFor="postal-address" className="mb-2 block text-base font-semibold text-[var(--color-text)]">
                  Quelle est votre adresse postale ?
                </label>
                <p id="postal-address-description" className="mb-4 text-sm text-gray-600">
                  Votre adresse exacte peut avoir une influence sur votre tarif.
                </p>
                <Input
                  id="postal-address"
                  name="postal_address"
                  type="text"
                  value={postalAddress}
                  onChange={(event) => setPostalAddress(event.target.value)}
                  placeholder="Numéro, voie, code postal, ville"
                  autoComplete="street-address"
                  aria-describedby="postal-address-description"
                  className="h-[50px] bg-white"
                />
              </div>
              )}
              {showLicenseDate && (
              <div className="conditional-field-reveal mt-6 bg-gray-100 p-6">
                <p id="license-date-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Quand avez-vous eu votre permis de conduire ?
                </p>
                <p id="license-date-description" className="mb-4 text-sm text-gray-600">
                  Cette information apparaît sur votre permis de conduire.
                </p>
                <div role="group" aria-labelledby="license-date-question" aria-describedby="license-date-description" className="sm:max-w-sm">
                  {/* Same month + year dropdowns as the garage questionnaire; value is "YYYY-MM". */}
                  <MonthYearInput mode="month" value={licenseDate} onChange={setLicenseDate} className="w-full" />
                </div>
              </div>
              )}
              {showLicenseType && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Type de permis de conduire</legend>
                <p id="license-type-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                  Quel type de permis de conduire avez-vous ?
                </p>
                <div role="radiogroup" aria-labelledby="license-type-question" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {LICENSE_TYPE_OPTIONS.map(({ value, label, Icon }) => (
                    <FieldLabel
                      key={value}
                      htmlFor={`license-type-${value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        licenseType === value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20 items-center">
                        <span
                          aria-hidden="true"
                          className={`flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            licenseType === value ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                          }`}
                        >
                          <Icon size={22} strokeWidth={1.75} />
                        </span>
                        <FieldContent>
                          <FieldTitle>{label}</FieldTitle>
                        </FieldContent>
                        <input
                          id={`license-type-${value}`}
                          type="radio"
                          name="license_type"
                          value={value}
                          checked={licenseType === value}
                          onChange={() => setLicenseType(value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
              </fieldset>
              )}
              {showMaritalStatus && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Situation maritale</legend>
                <p id="marital-status-question" className="mb-2 text-base font-semibold text-[var(--color-text)]">
                  Quelle est votre situation maritale ?
                </p>
                <p id="marital-status-description" className="mb-4 text-sm text-gray-600">
                  Vous vivez en couple ? Certains assureurs estiment que votre conjoint peut être amené(e) à utiliser votre voiture, ce qui peut faire augmenter le prix de votre assurance.
                </p>
                <div role="radiogroup" aria-labelledby="marital-status-question" aria-describedby="marital-status-description" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {MARITAL_STATUS_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`marital-status-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        maritalStatus === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-20">
                        <FieldContent><FieldTitle>{option.label}</FieldTitle></FieldContent>
                        <input
                          id={`marital-status-${option.value}`}
                          type="radio"
                          name="marital_status"
                          value={option.value}
                          checked={maritalStatus === option.value}
                          onChange={() => setMaritalStatus(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
              </fieldset>
              )}
              {showPartnerHasLicense && (
              <fieldset className="conditional-field-reveal mt-6 min-w-0 bg-gray-100 p-6">
                <legend className="sr-only">Permis du conjoint</legend>
                <p id="partner-license-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
                  Votre conjoint(e) a-t-il/elle le permis ?
                </p>
                <div role="radiogroup" aria-labelledby="partner-license-question" className="grid grid-cols-2 gap-3 sm:max-w-sm">
                  {YES_NO_OPTIONS.map((option) => (
                    <FieldLabel
                      key={option.value}
                      htmlFor={`partner-license-${option.value}`}
                      className={`cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 ${
                        partnerHasLicense === option.value
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                          : "bg-white hover:border-[var(--color-brand)]"
                      }`}
                    >
                      <Field orientation="horizontal" className="min-h-14 items-center">
                        <FieldContent><FieldTitle>{option.label}</FieldTitle></FieldContent>
                        <input
                          id={`partner-license-${option.value}`}
                          type="radio"
                          name="partner_has_license"
                          value={option.value}
                          checked={partnerHasLicense === option.value}
                          onChange={() => setPartnerHasLicense(option.value)}
                          className="size-5 shrink-0 accent-[var(--color-brand)]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </div>
              </fieldset>
              )}
            </div>
            <div className="fixed bottom-0 right-0 lg:right-4 z-40 flex items-center p-4 bg-white">
              <ButtonGroup className="max-w-full rounded-tl-[var(--radius)]">
                <Button type="button" variant="outline" disabled={currentStep === 0} onClick={() => goToStep(currentStep - 1)} className="h-12 px-5 gap-1">
                  <ChevronLeft size={16} aria-hidden="true" />Retour
                </Button>
                {currentStep < LAST_BUILT_STEP && (
                  <Button type="button" onClick={() => goToStep(currentStep + 1)} className="min-h-12 h-auto max-w-full whitespace-normal px-5 py-3 leading-5 cta-btn text-white font-semibold">
                    Suivant<ChevronRight size={16} aria-hidden="true" />
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
