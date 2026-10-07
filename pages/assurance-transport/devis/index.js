import Head from "next/head";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";

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

export default function DevisPage() {
  const { query } = useRouter();

  const initialAnswers = {
    18: query.permis ? `${query.permis}-01` : "",
    24: query.bonusMalus ? bucketBonusMalus(query.bonusMalus) : "",
  };

  return (
    <>
      <Head>
        <title>Votre devis assurance — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-10 lg:py-16">
          <CarInsuranceForm initialAnswers={initialAnswers} theme="light" storageKey="general" />
        </div>
      </main>
    </>
  );
}
