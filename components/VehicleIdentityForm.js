import { useState } from "react";
import { useRouter } from "next/router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const PROVINCES = [
  "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
  "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
  "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie",
  "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
];

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-white leading-none">
        {label}
        {required && <span className="text-white ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function VehicleIdentityForm() {
  const router = useRouter();
  const [province, setProvince]       = useState("");
  const [age, setAge]                 = useState("");
  const [gender, setGender]           = useState("");
  const [drivingRecord, setDriving]   = useState("");
  const [creditScore, setCredit]      = useState("");
  const [ownsHome, setOwnsHome]       = useState("");

  const canSubmit = province && age && drivingRecord;

  function handleSubmit(e) {
    e.preventDefault();
    const q = new URLSearchParams({ province, age });
    if (gender)      q.set("gender", gender);
    if (drivingRecord) q.set("driving", drivingRecord);
    if (creditScore) q.set("credit", creditScore);
    if (ownsHome)    q.set("home", ownsHome);
    router.push(`/auto-insurance/car-insurance-calculator/devis/?${q.toString()}`);
  }

  const triggerCls = "h-14 text-base bg-white text-[#131212]";
  const inputCls   = "h-14 w-full rounded-[var(--radius)] border border-gray-200 bg-white px-4 text-base text-[#131212] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

        {/* Province */}
        <Field label="Province" required hint="Votre région de résidence influence les tarifs en raison des différences de densité de trafic et de sinistralité locale.">
          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Sélectionnez une région" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map(p => (
                <SelectItem key={p} value={p} className="text-base py-2.5">{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Age */}
        <Field label="Âge" required hint="L'âge est l'un des principaux facteurs de tarification. Les conducteurs jeunes et seniors peuvent avoir des tarifs différents.">
          <input
            type="number"
            min="16"
            max="99"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Votre âge"
            className={inputCls}
          />
        </Field>

        {/* Gender */}
        <Field label="Genre" hint="Certains assureurs utilisent le genre comme facteur statistique de risque. Cette information reste facultative.">
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="homme"      className="text-base py-2.5">Homme</SelectItem>
              <SelectItem value="femme"      className="text-base py-2.5">Femme</SelectItem>
              <SelectItem value="non-binaire" className="text-base py-2.5">Non-binaire</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Driving record */}
        <Field label="Historique de conduite" required hint="Votre historique de sinistres et d'infractions impacte directement votre prime. Un bon dossier peut vous faire économiser jusqu'à 30 %.">
          <Select value={drivingRecord} onValueChange={setDriving}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Votre profil conducteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent"   className="text-base py-2.5">Excellent — aucun incident</SelectItem>
              <SelectItem value="bon"         className="text-base py-2.5">Bon — infractions mineures</SelectItem>
              <SelectItem value="moyen"       className="text-base py-2.5">Moyen — accidents ou infractions</SelectItem>
              <SelectItem value="mauvais"     className="text-base py-2.5">Mauvais — plusieurs incidents</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Credit score */}
        <Field label="Cote de crédit" hint="Une bonne cote de crédit peut réduire votre prime. Les assureurs l'utilisent comme indicateur de fiabilité financière.">
          <Select value={creditScore} onValueChange={setCredit}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Estimez votre cote" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent" className="text-base py-2.5">Excellent (750+)</SelectItem>
              <SelectItem value="bon"       className="text-base py-2.5">Bon (700 – 749)</SelectItem>
              <SelectItem value="moyen"     className="text-base py-2.5">Moyen (650 – 699)</SelectItem>
              <SelectItem value="faible"    className="text-base py-2.5">Faible (moins de 650)</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Own a home */}
        <Field label="Propriétaire de votre logement ?" hint="Les propriétaires bénéficient souvent de tarifs préférentiels et peuvent regrouper leur assurance auto et habitation pour plus d'économies.">
          <Select value={ownsHome} onValueChange={setOwnsHome}>
            <SelectTrigger className={triggerCls}>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oui" className="text-base py-2.5">Oui</SelectItem>
              <SelectItem value="non" className="text-base py-2.5">Non</SelectItem>
            </SelectContent>
          </Select>
        </Field>

      </div>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="bg-white text-[#131212] hover:bg-white/90 text-base font-semibold py-[25px] px-[15px] self-start"
      >
        Calculer mon tarif
        <ChevronRight size={18} />
      </Button>

    </form>
  );
}
