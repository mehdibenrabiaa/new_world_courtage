import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Phone, ChevronRight, Mail, FileText, Camera, ClipboardCheck } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";
import { Spinner } from "@/components/ui/spinner";
import { fetchQuestionnaire, createLead } from "@/lib/api";

// Mirrors AssocieCapitalField/FlotteVehiculesField's own option labels in
// CarInsuranceForm.js, so the lead's submitted answer reads the same way the
// form did — not the raw "comptant"/"mixte" values.
const FLOTTE_MODE_LABELS = { comptant: "Comptant", credit: "Crédit", leasing: "Leasing" };
const FLOTTE_USAGE_LABELS = { professionnel: "Professionnel", mixte: "Mixte (pro et personnel)" };

// "flotte_immatriculations" stores one object per vehicle (not a scalar or a
// list of scalars like every other question), so it needs its own
// stringification instead of falling into the generic values.map() below,
// which would otherwise call .toString() on each row object. Stored as a
// JSON array of {label, value} pairs (still just text in the LeadAnswer.value
// column — no schema change) so the CRM can render each vehicle's fields as
// their own labeled bullet instead of one flattened dash-joined line.
function formatFlotteRow(row) {
  const fields = [];
  if (row.vehicule) fields.push({ label: "Véhicule", value: row.vehicule });
  if (row.immatriculation) fields.push({ label: "Immatriculation", value: row.immatriculation });
  if (row.modeAchat) fields.push({ label: "Mode d'achat", value: FLOTTE_MODE_LABELS[row.modeAchat] || row.modeAchat });
  if (row.usage) fields.push({ label: "Usage", value: FLOTTE_USAGE_LABELS[row.usage] || row.usage });
  return fields;
}

// Mirrors WGarageVehiculesField's own option labels in CarInsuranceForm.js.
const W_GARAGE_MODE_ACHAT_LABELS = { comptant: "Comptant", loa: "LOA", lld: "LLD", credit_bancaire: "Crédit bancaire" };
const W_GARAGE_USAGE_LABELS = { courtoisie: "Courtoisie", vehicule_societe: "Véhicule de société", location: "Location", gerant: "Gérant" };

// Same shape/reasoning as formatFlotteRow above — one object per W Garage
// vehicle instead of the raw "comptant"/"courtoisie" values.
function formatWGarageRow(row) {
  const fields = [];
  if (row.modeAchat) fields.push({ label: "Mode d'achat", value: W_GARAGE_MODE_ACHAT_LABELS[row.modeAchat] || row.modeAchat });
  if (row.usage) fields.push({ label: "Usage", value: W_GARAGE_USAGE_LABELS[row.usage] || row.usage });
  return fields;
}

// Mirrors AssocieCapitalField's own option labels in CarInsuranceForm.js.
const ASSOCIE_CIVILITE_LABELS = { m: "Monsieur", mme: "Madame" };

// The nested {label, value} fields below render as-is in the CRM (no
// per-field date awareness like the top-level answer list has), so dates
// need converting to French display format here at submission time instead.
function toFrenchDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
}

// Same shape/reasoning as formatFlotteRow above — one object per associé
// instead of just the raw percentage.
function formatAssocieRow(row) {
  const fields = [];
  if (row.pct) fields.push({ label: "% détention du capital", value: `${row.pct}%` });
  if (row.civilite) fields.push({ label: "Civilité", value: ASSOCIE_CIVILITE_LABELS[row.civilite] || row.civilite });
  if (row.naissance) fields.push({ label: "Date de naissance", value: toFrenchDate(row.naissance) });
  if (row.commune) fields.push({ label: "Commune de naissance", value: row.commune });
  return fields;
}

// Prefill map: GarageIdentityForm's query params -> catalog keys of the
// matching questionnaire questions, so answering them again isn't required.
const PREFILL_KEYS = {
  name: "representant_legal",
  phone: "mobile",
  email: "email_principal",
  siret: "siret",
  communeNaissance: "commune_naissance",
  dateNaissance: "date_naissance",
};

function buildInitialAnswers(steps, query) {
  const byKey = Object.fromEntries(steps.map((s) => [s.key, s]));
  const answers = {};
  for (const [queryParam, catalogKey] of Object.entries(PREFILL_KEYS)) {
    if (query[queryParam] && byKey[catalogKey]) {
      answers[byKey[catalogKey].id] = query[queryParam];
    }
  }
  return answers;
}

// Docs to prepare before the callback, shown on the confirmation screen —
// "Relevé d'information" only makes sense if the questionnaire actually
// asked about prior insurance history (its Antécédents section).
function buildBookingDocs(steps) {
  const docs = [
    { icon: FileText, label: "Extrait KBIS", desc: "De moins de 3 mois" },
    { icon: Camera, label: "Photos du garage", desc: "Vue intérieure et extérieure des locaux" },
  ];
  if ((steps || []).some((s) => s.section === "Antécédents")) {
    docs.push({ icon: ClipboardCheck, label: "Relevé d'information", desc: "Édité par votre assureur actuel" });
  }
  return docs;
}

export default function GaragisteDevisPage() {
  const router = useRouter();
  const [steps, setSteps] = useState(null);
  const [initialAnswers, setInitialAnswers] = useState({});
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null); // "sent" | "error" | "skipped-no-identity"

  useEffect(() => {
    if (!router.isReady) return;
    fetchQuestionnaire("garage")
      .then((fetchedSteps) => {
        setSteps(fetchedSteps);
        setInitialAnswers(buildInitialAnswers(fetchedSteps, router.query));
      })
      .catch((err) => setError(err.message));
  }, [router.isReady]);

  // GarageIdentityForm (on the landing page) already collected identity and
  // redirected here with it as query params — same pattern as taxi's
  // VehicleIdentityForm. Fall back to the questionnaire's own answers for
  // name/phone (its Coordonnées section asks the same questions again) in
  // case someone lands here directly without going through that form.
  function handleSubmit(answers) {
    const byKey = Object.fromEntries((steps || []).map((s) => [s.key, s]));
    const byId = Object.fromEntries((steps || []).map((s) => [s.id, s]));

    const { name: qName, phone: qPhone, email: qEmail, siret: qSiret } = router.query;
    const name = qName || (byKey.representant_legal ? answers[byKey.representant_legal.id] : undefined);
    const phone = qPhone || (byKey.mobile ? answers[byKey.mobile.id] : undefined);
    const email = qEmail || (byKey.email_principal ? answers[byKey.email_principal.id] : undefined);
    const siret = qSiret || (byKey.siret ? answers[byKey.siret.id] : undefined);
    const activite = byKey.activite_principale ? answers[byKey.activite_principale.id] : undefined;

    if (!name || !phone) {
      console.warn(
        "[garagiste devis] Lead not submitted: missing name/phone (neither the URL query " +
          "from GarageIdentityForm nor the questionnaire's own representant_legal/mobile answers had them).",
        { query: router.query, answers }
      );
      setSubmitStatus("skipped-no-identity");
      return;
    }

    // Fields already mapped to a dedicated Lead column (name/phone/email/
    // siret/activite) are excluded here so they aren't duplicated as generic
    // LeadAnswer rows.
    const IDENTITY_KEYS = new Set(["representant_legal", "mobile", "email_principal", "siret", "activite_principale"]);
    // Iterate over `steps` (already in catalog/form order) rather than
    // Object.entries(answers) — object keys that look like integers (the
    // step ids) are always enumerated in ascending numeric order by the JS
    // spec, not insertion order, which silently scrambled the saved answer
    // order away from the order questions were actually asked in.
    const leadAnswers = (steps || [])
      .filter((step) => !IDENTITY_KEYS.has(step.key) && Object.prototype.hasOwnProperty.call(answers, step.id))
      .map((step) => {
        const value = answers[step.id];
        if (step.key === "flotte_immatriculations") {
          const rows = Array.isArray(value) ? value : [];
          const vehicles = rows.map((row) => ({ fields: formatFlotteRow(row) }));
          return { catalog_key: step.key, question: step.question, value: JSON.stringify(vehicles) };
        }
        if (step.key === "w_garage_vehicules") {
          const rows = Array.isArray(value) ? value : [];
          const vehicles = rows.map((row) => ({ fields: formatWGarageRow(row) }));
          return { catalog_key: step.key, question: step.question, value: JSON.stringify(vehicles) };
        }
        if (step.key === "pct_detention_capital") {
          const rows = Array.isArray(value) ? value : [];
          const associes = rows.map((row) => ({ fields: formatAssocieRow(row) }));
          return { catalog_key: step.key, question: step.question, value: JSON.stringify(associes) };
        }
        const values = Array.isArray(value) ? value : [value];
        const labels = values.map((v) => {
          const idx = step.values?.indexOf(v);
          return idx != null && idx >= 0 ? step.options[idx] : v;
        });
        return { catalog_key: step.key, question: step.question, value: labels.join(", ") };
      });

    const payload = {
      type: "Assurance Garage",
      name: String(name),
      phone: String(phone),
      email: email || undefined,
      siret: siret ? String(siret) : undefined,
      activite: activite ? String(activite) : undefined,
      source: router.pathname,
      answers: leadAnswers,
    };
    console.info("[garagiste devis] Submitting lead:", payload);

    // Returned (not just chained) so CarInsuranceForm can capture the
    // created lead's id and attach it to whichever booking the prospect
    // makes on the confirmation screen.
    return createLead(payload)
      .then((lead) => {
        console.info("[garagiste devis] Lead created:", lead);
        setSubmitStatus("sent");
        return lead;
      })
      .catch((err) => {
        console.error("[garagiste devis] Failed to submit lead:", err);
        setSubmitStatus("error");
        return null;
      });
  }

  return (
    <>
      <Head>
        <title>Votre devis assurance garage — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>

      <header className="sticky top-0 z-40 w-full bg-gray-200">
        <div className="flex items-center justify-between px-4 lg:px-12 h-16">
          <Image src="/logos/nwc-logo.svg" alt="New World Courtage" width={120} height={33} className="h-7 w-auto" />
          <a
            href="tel:+33745891865"
            className="flex items-center gap-2.5 border border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 text-[var(--color-brand)] rounded-lg px-4 py-2.5 transition-colors"
          >
            <Phone size={18} className="shrink-0" />
            <span className="text-sm font-semibold">07 45 89 18 65</span>
            <ChevronRight size={16} className="shrink-0 opacity-70" />
          </a>
        </div>
      </header>

      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 pt-10 lg:pt-16 pb-40">
          {error && (
            <p className="text-sm text-[var(--color-error)]">
              Impossible de charger le questionnaire ({error}).
            </p>
          )}
          {!error && !steps && (
            <div className="flex items-center gap-2 text-gray-400">
              <Spinner className="size-4" />
              <p className="text-sm">Chargement du questionnaire…</p>
            </div>
          )}
          {steps && steps.length === 0 && (
            <p className="text-sm text-gray-400">Ce questionnaire ne contient encore aucune question.</p>
          )}
          {submitStatus === "error" && (
            <p className="text-sm text-[var(--color-error)] mb-4">
              La demande n&apos;a pas pu être enregistrée (erreur réseau). Voir la console pour le détail.
            </p>
          )}
          {submitStatus === "skipped-no-identity" && (
            <p className="text-sm text-[var(--color-error)] mb-4">
              La demande n&apos;a pas été enregistrée : nom/mobile manquants. Voir la console pour le détail.
            </p>
          )}
          {steps && steps.length > 0 && (
            <CarInsuranceForm
              steps={steps}
              initialAnswers={initialAnswers}
              onSubmit={handleSubmit}
              theme="light"
              storageKey="garagiste"
              bookingDocs={buildBookingDocs(steps)}
              footerContent={
                <a
                  href="mailto:devis@newworldcourtage.com"
                  className="flex items-center gap-2 text-black hover:text-[var(--color-brand)] transition-colors"
                >
                  <Mail size={20} className="shrink-0" />
                  <span className="text-base font-medium hidden sm:inline">devis@newworldcourtage.com</span>
                </a>
              }
            />
          )}
        </div>
      </main>
    </>
  );
}
