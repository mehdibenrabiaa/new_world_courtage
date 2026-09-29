import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CAR_BRANDS } from "@/lib/car-models";
import CAR_LOGOS from "@/lib/car-logos.json";

const FEATURED_BRANDS = ["Renault", "Peugeot", "Citroën", "Volkswagen", "Toyota", "Dacia", "BMW", "Audi"];
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function CarBrandPicker({ value, onChange, required = false, error }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const search = normalize(query.trim());
  const compactBrands = value && value !== "other" && !FEATURED_BRANDS.includes(value)
    ? [...FEATURED_BRANDS.slice(0, -1), value]
    : FEATURED_BRANDS;
  const visibleBrands = search
    ? CAR_BRANDS.filter((brand) => normalize(brand).includes(search))
    : showAll ? CAR_BRANDS : compactBrands;
  const ToggleIcon = showAll ? ChevronUp : ChevronDown;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 p-4 sm:px-5">
        <label htmlFor="brand-search" className="sr-only">Rechercher une marque</label>
        <div className="relative">
          <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input id="brand-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une marque…" className="h-11 border-gray-200 bg-gray-50 pl-10 shadow-none" />
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
          <span>{search ? `${visibleBrands.length} marque${visibleBrands.length === 1 ? "" : "s"}` : showAll ? "Toutes les marques" : "Sélection de marques"}</span>
          {value && <span className="flex items-center gap-1 font-medium text-[var(--color-brand)]"><Check size={13} aria-hidden="true" />{value === "other" ? "Autre marque" : value}</span>}
        </div>
        <div id="brand-logo-grid" role="radiogroup" aria-required={required} aria-invalid={Boolean(error)} aria-describedby={error ? "brand-search-error" : undefined} aria-labelledby="auto-brand-question" className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {visibleBrands.map((name) => (
            <label key={name} className="relative min-w-0 cursor-pointer">
              <input required={required} type="radio" name="brand" value={name} checked={value === name} onChange={() => onChange(name)} className="peer sr-only" />
              <span className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-3 transition-[border-color,background-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-sm peer-checked:border-[var(--color-brand)] peer-checked:bg-[var(--color-brand)]/5 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand)] peer-focus-visible:ring-offset-2">
                <img src={CAR_LOGOS[name].src} alt="" width={80} height={40} loading="lazy" className="h-10 w-20 object-contain" />
                <span className="text-center text-xs font-medium text-[var(--color-text)]">{name}</span>
              </span>
              {value === name && <span aria-hidden="true" className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-white"><Check size={11} /></span>}
            </label>
          ))}
          <label className="col-span-full mt-2 flex w-fit cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input required={required} type="radio" name="brand" value="other" checked={value === "other"} onChange={() => onChange("other")} className="size-4 accent-[var(--color-brand)]" />
            Ma marque n’est pas dans la liste
          </label>
        </div>
        {search && visibleBrands.length === 0 && <p role="status" className="mt-3 text-sm text-gray-500">Aucune marque trouvée. Vous pouvez saisir votre marque avec l’option ci-dessus.</p>}
      </div>
      {!search && (
        <button type="button" aria-expanded={showAll} aria-controls="brand-logo-grid" onClick={() => setShowAll((current) => !current)} className="flex w-full items-center justify-center gap-2 border-t border-gray-100 py-3 text-sm font-medium text-[var(--color-brand)] transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]">
          {showAll ? "Voir moins de marques" : `Voir toutes les marques (${CAR_BRANDS.length})`}
          <ToggleIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
