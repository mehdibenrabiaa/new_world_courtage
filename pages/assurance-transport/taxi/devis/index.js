import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Phone, ChevronRight, Mail } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";
import { Spinner } from "@/components/ui/spinner";
import { fetchQuestionnaire, createLead } from "@/lib/api";

function bucketBonusMalus(raw) {
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return "";
  if (n <= 0.50) return "0.50";
  if (n <= 0.79) return "0.51-0.79";
  if (n <= 0.99) return "0.80-0.99";
  if (n <= 1.00) return "1.00";
  if (n <= 1.25) return "1.01-1.25";
  if (n <= 2.00) return "1.26-2.00";
  return "2.01-3.50";
}

function buildInitialAnswers(steps, query) {
  const byKey = Object.fromEntries(steps.map((s) => [s.key, s]));
  const answers = {};
  if (query.permis && byKey.permis_date) {
    answers[byKey.permis_date.id] = `${query.permis}-01`;
  }
  if (query.bonusMalus && byKey.bonus_malus) {
    answers[byKey.bonus_malus.id] = bucketBonusMalus(query.bonusMalus);
  }
  return answers;
}

export default function TaxiDevisPage() {
  const router = useRouter();
  const [steps, setSteps] = useState(null);
  const [initialAnswers, setInitialAnswers] = useState({});
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null); // "sent" | "error" | "skipped-no-identity"

  useEffect(() => {
    if (!router.isReady) return;
    fetchQuestionnaire("taxi")
      .then((fetchedSteps) => {
        setSteps(fetchedSteps);
        setInitialAnswers(buildInitialAnswers(fetchedSteps, router.query));
      })
      .catch((err) => setError(err.message));
  }, [router.isReady]);

  // Identity fields (name, phone, permis, naissance, immat) arrive via the
  // query string from VehicleIdentityForm's redirect, not through the
  // questionnaire itself — merge them with whatever the questionnaire
  // collected (email, if asked) to create the lead.
  function handleSubmit(answers) {
    const { name, phone, permis, naissance, immat } = router.query;
    if (!name || !phone) {
      console.warn(
        "[taxi devis] Lead not submitted: missing name/phone in the URL query.",
        "This page expects to be reached via the vehicle-identity form's redirect " +
          "(?name=...&phone=...&...) — loading /devis directly skips that step.",
        router.query
      );
      setSubmitStatus("skipped-no-identity");
      return;
    }

    const byId = Object.fromEntries((steps || []).map((s) => [s.id, s]));
    const emailStep = (steps || []).find((s) => s.key === "email");
    const email = emailStep ? answers[emailStep.id] : undefined;

    // Each questionnaire answer becomes its own LeadAnswer row (not a single
    // freeform notes blob) so answers stay individually queryable in the DB.
    const leadAnswers = Object.entries(answers)
      .filter(([id]) => byId[id] && byId[id].key !== "email")
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
      type: "Assurance Taxi",
      name: String(name),
      phone: String(phone),
      email: email || undefined,
      permis: permis ? String(permis) : undefined,
      naissance: naissance ? String(naissance) : undefined,
      immat: immat ? String(immat) : undefined,
      source: router.pathname,
      answers: leadAnswers,
    };
    console.info("[taxi devis] Submitting lead:", payload);

    createLead(payload)
      .then((lead) => {
        console.info("[taxi devis] Lead created:", lead);
        setSubmitStatus("sent");
      })
      .catch((err) => {
        console.error("[taxi devis] Failed to submit lead:", err);
        setSubmitStatus("error");
      });
  }

  return (
    <>
      <Head>
        <title>Votre devis assurance taxi — New World Courtage</title>
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
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-10 lg:py-16 pb-28">
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
              La demande n&apos;a pas été enregistrée : nom/téléphone manquants dans l&apos;URL. Voir la console pour le détail.
            </p>
          )}
          {steps && steps.length > 0 && (
            <CarInsuranceForm
              steps={steps}
              initialAnswers={initialAnswers}
              onSubmit={handleSubmit}
              theme="light"
              storageKey="taxi"
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
