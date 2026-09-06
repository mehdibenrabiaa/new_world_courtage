import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Phone, ChevronRight, Mail } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";
import { fetchQuestionnaire, createLead } from "@/lib/api";

// Prefill map: GarageIdentityForm's query params -> catalog keys of the
// matching questionnaire questions, so answering them again isn't required.
const PREFILL_KEYS = {
  name: "representant_legal",
  phone: "mobile",
  email: "email_principal",
  siret: "siret",
  raisonSociale: "raison_sociale",
  codeApe: "code_ape",
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
    const leadAnswers = Object.entries(answers)
      .filter(([id]) => byId[id] && !IDENTITY_KEYS.has(byId[id].key))
      .map(([id, value]) => {
        const step = byId[id];
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

    createLead(payload)
      .then((lead) => {
        console.info("[garagiste devis] Lead created:", lead);
        setSubmitStatus("sent");
      })
      .catch((err) => {
        console.error("[garagiste devis] Failed to submit lead:", err);
        setSubmitStatus("error");
      });
  }

  return (
    <>
      <Head>
        <title>Votre devis assurance garage — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>

      <header
        className="sticky top-0 z-40 w-full"
        style={{ background: "linear-gradient(90deg,rgba(232, 232, 232, 1) 0%, rgba(255, 255, 255, 1) 100%)" }}
      >
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
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-10 lg:py-16 pb-28">
          {error && (
            <p className="text-sm text-[var(--color-error)]">
              Impossible de charger le questionnaire ({error}).
            </p>
          )}
          {!error && !steps && (
            <p className="text-sm text-gray-400">Chargement du questionnaire…</p>
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
              footerContent={
                <a
                  href="mailto:contact@newworldcourtage.com"
                  className="flex items-center gap-2 text-black hover:text-[var(--color-brand)] transition-colors"
                >
                  <Mail size={20} className="shrink-0" />
                  <span className="text-base font-medium hidden sm:inline">contact@newworldcourtage.com</span>
                </a>
              }
            />
          )}
        </div>
      </main>
    </>
  );
}
