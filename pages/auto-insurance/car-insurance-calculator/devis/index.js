import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import CarInsuranceForm from "@/components/CarInsuranceForm";

// Steps 1–4 are answered on the calculator page (type, brand, model, version).
// This page starts from step index 4 (step id 5 — cylindrée).
const START_STEP = 4;

export default function DevisPage() {
  const { query } = useRouter();

  // Rebuild initial answers from query params
  const initialAnswers = {
    1: query.type    || "",
    2: query.brand   || "",
    3: query.model   || "",
    4: query.version || "",
  };

  // Summary pill shown at the top
  const vehicleLabel = [query.brand, query.model, query.version].filter(Boolean).join(" ");

  return (
    <>
      <Head>
        <title>Votre devis assurance — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* Minimal header — no navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
        <div className="flex items-center px-4 lg:px-12 h-14">
          <Link href="/">
            <Image src="/nwc_logo.svg" alt="New World Courtage" width={120} height={32} className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 py-10 lg:py-16">

          {/* Vehicle summary chip */}
          {vehicleLabel && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-light)] border border-gray-200 px-4 py-2">
              <span className="text-sm text-gray-500">Véhicule :</span>
              <span className="text-sm font-semibold text-[#131212] capitalize">{vehicleLabel}</span>
            </div>
          )}

          <CarInsuranceForm initialAnswers={initialAnswers} startStep={START_STEP} theme="light" />

        </div>
      </main>
    </>
  );
}
