import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Phone, ChevronRight, Mail } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";
import { fetchQuestionnaire } from "@/lib/api";

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

  useEffect(() => {
    if (!router.isReady) return;
    fetchQuestionnaire("taxi")
      .then((fetchedSteps) => {
        setSteps(fetchedSteps);
        setInitialAnswers(buildInitialAnswers(fetchedSteps, router.query));
      })
      .catch((err) => setError(err.message));
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Votre devis assurance taxi — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>

      <header
        className="sticky top-0 z-40 w-full"
        style={{ background: "linear-gradient(90deg,rgba(232, 232, 232, 1) 0%, rgba(255, 255, 255, 1) 100%)" }}
      >
        <div className="flex items-center justify-between px-4 lg:px-12 h-16">
          <Image src="/nwc_logo.svg" alt="New World Courtage" width={120} height={33} className="h-7 w-auto" />
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
          {steps && (
            <CarInsuranceForm
              steps={steps}
              initialAnswers={initialAnswers}
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
