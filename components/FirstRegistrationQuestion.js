import { ChevronDown, CircleHelp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

export default function FirstRegistrationQuestion({ helpImage, value, onChange, errors = {} }) {
  const { month, year } = value;
  const today = new Date();
  const futureDate = year.length === 4 && (Number(year) > today.getFullYear() || (Number(year) === today.getFullYear() && Number(month) > today.getMonth() + 1));
  const invalidYear = year.length === 4 && Number(year) < 1900;
  const error = futureDate ? "La date de première immatriculation ne peut pas être dans le futur." : invalidYear ? "Vérifiez l’année de première immatriculation." : null;
  const monthError = errors["first-registration-month"];
  const yearError = errors["first-registration-year"];
  const liveError = !monthError && !yearError ? error : null;

  return (
    <fieldset className="min-w-0 bg-gray-100 p-6">
      <legend className="sr-only">Date de première immatriculation</legend>
      <p id="first-registration-question" className="mb-4 text-base font-semibold text-[var(--color-text)]">
        Quelle est la date de 1ère immatriculation ?
      </p>
      <div role="group" aria-labelledby="first-registration-question" className="grid grid-cols-2 gap-3 sm:max-w-sm">
        <div className="min-w-0">
          <label htmlFor="first-registration-month" className="mb-2 block text-sm font-medium">Mois</label>
          <Select required name="first_registration_month" value={month} onValueChange={(month) => onChange({ ...value, month })}>
            <SelectTrigger id="first-registration-month" aria-required="true" aria-invalid={Boolean(monthError || liveError)} aria-describedby={monthError ? "first-registration-month-error" : liveError ? "first-registration-error" : undefined} className="!h-[50px] w-full bg-white">
              <SelectValue placeholder="Mois" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((label, index) => <SelectItem key={label} value={String(index + 1).padStart(2, "0")}>{label}</SelectItem>)}
            </SelectContent>
          </Select>
          {monthError && <p id="first-registration-month-error" role="alert" className="mt-2 text-sm text-[var(--color-error)]">{monthError}</p>}
        </div>
        <div className="min-w-0">
          <label htmlFor="first-registration-year" className="mb-2 block text-sm font-medium">Année</label>
          <Input required id="first-registration-year" name="first_registration_year" type="text" inputMode="numeric" maxLength={4} placeholder="AAAA" value={year} onChange={(event) => onChange({ ...value, year: event.target.value.replace(/\D/g, "").slice(0, 4) })} aria-invalid={Boolean(yearError || liveError)} aria-describedby={yearError ? "first-registration-year-error" : liveError ? "first-registration-error" : undefined} className="h-[50px] bg-white" />
          {yearError && <p id="first-registration-year-error" role="alert" className="mt-2 text-sm text-[var(--color-error)]">{yearError}</p>}
        </div>
      </div>
      {liveError && <p id="first-registration-error" role="status" className="mt-2 text-sm text-[var(--color-error)]">{liveError}</p>}
      <details className="group mt-5 border-t border-gray-200 pt-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)] [&::-webkit-details-marker]:hidden">
          <CircleHelp size={17} aria-hidden="true" className="shrink-0" />
          <span>Où trouver cette information ?</span>
          <ChevronDown size={18} aria-hidden="true" className="ml-auto shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="mt-3">
          <p className="text-sm text-gray-600">La date de 1re immatriculation figure sur la <strong>zone B</strong> de la carte grise.</p>
          {helpImage && <img src={helpImage} alt="Exemple de carte grise : la zone B indique la date de première immatriculation." width={1352} height={586} className="mt-4 h-auto w-full rounded-lg border border-gray-200" />}
        </div>
      </details>
    </fieldset>
  );
}
