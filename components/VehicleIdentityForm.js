import { useState } from "react";
import { useRouter } from "next/router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CAR_BRANDS = [
  "Audi", "BMW", "Citroën", "Dacia", "DS Automobiles", "Fiat", "Ford", "Honda",
  "Hyundai", "Kia", "Mazda", "Mercedes-Benz", "Nissan", "Opel", "Peugeot",
  "Renault", "Seat", "Skoda", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo",
];

const MOTO_BRANDS = [
  "Aprilia", "BMW", "Ducati", "Harley-Davidson", "Honda", "Kawasaki", "KTM",
  "Piaggio", "Royal Enfield", "Suzuki", "Triumph", "Vespa", "Yamaha",
];

const YEARS = Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => String(new Date().getFullYear() - i));

function Field({ label, optional, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-white flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-[11px] font-normal text-white/75 border border-white/40 rounded-full px-2 py-0.5">
            optionnel
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function VehicleIdentityForm() {
  const router = useRouter();
  const [type, setType]       = useState("");
  const [brand, setBrand]     = useState("");
  const [model, setModel]     = useState("");
  const [version, setVersion] = useState("");
  const [year, setYear]       = useState("");
  const [usage, setUsage]     = useState("");

  const brands = type === "voiture" ? CAR_BRANDS : MOTO_BRANDS;
  const canSubmit = type && brand && model;

  function handleSubmit(e) {
    e.preventDefault();
    const q = new URLSearchParams({ type, brand, model });
    if (version) q.set("version", version);
    if (year)    q.set("year", year);
    if (usage)   q.set("usage", usage);
    router.push(`/auto-insurance/car-insurance-calculator/devis/?${q.toString()}`);
  }

  const inputCls = "h-14 w-full rounded-[var(--radius)] border border-gray-200 bg-white px-4 text-base text-[#131212] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow";
  const triggerCls = "h-14 text-base bg-white text-[#131212]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Row 1 */}
        <Field label="Type de véhicule">
          <Select value={type} onValueChange={v => { setType(v); setBrand(""); }}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Voiture, moto…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voiture" className="text-base py-2.5">Voiture</SelectItem>
              <SelectItem value="moto"    className="text-base py-2.5">Moto</SelectItem>
              <SelectItem value="scooter" className="text-base py-2.5">Scooter</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Marque">
          <Select value={brand} onValueChange={setBrand} disabled={!type}>
            <SelectTrigger className={`${triggerCls} disabled:opacity-60`}>
              <SelectValue placeholder={type ? "Sélectionnez une marque" : "Choisissez un type d'abord"} />
            </SelectTrigger>
            <SelectContent>
              {brands.map(b => (
                <SelectItem key={b} value={b} className="text-base py-2.5">{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Row 2 */}
        <Field label="Modèle">
          <input
            type="text"
            value={model}
            onChange={e => setModel(e.target.value)}
            placeholder="Ex : Clio, Série 3, CB500…"
            className={inputCls}
          />
        </Field>

        <Field label="Version / finition" optional>
          <input
            type="text"
            value={version}
            onChange={e => setVersion(e.target.value)}
            placeholder="Ex : Sport, Confort, 1.5 dCi…"
            className={inputCls}
          />
        </Field>

        {/* Row 3 */}
        <Field label="Année de mise en circulation">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Sélectionnez une année" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(y => (
                <SelectItem key={y} value={y} className="text-base py-2.5">{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Usage principal">
          <Select value={usage} onValueChange={setUsage}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Comment utilisez-vous ce véhicule ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="commute"      className="text-base py-2.5">Domicile – travail</SelectItem>
              <SelectItem value="leisure"      className="text-base py-2.5">Loisirs</SelectItem>
              <SelectItem value="professional" className="text-base py-2.5">Professionnel</SelectItem>
            </SelectContent>
          </Select>
        </Field>

      </div>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="bg-white text-[#131212] hover:bg-white/90 text-base font-semibold py-[25px] px-[15px] self-start"
      >
        Commencer
        <ChevronRight size={18} />
      </Button>

    </form>
  );
}
