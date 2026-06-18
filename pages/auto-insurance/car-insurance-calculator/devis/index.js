import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Phone } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";

export default function DevisPage() {
  const { query } = useRouter();
  const [progress, setProgress] = useState(Math.round((1 / 6) * 100));

  // Rebuild initial answers from query params
  const initialAnswers = {
    1:  query.type    || "",
    2:  query.brand   || "",
    3:  query.model   || "",
    4:  query.version || "",
    9:  query.year  ? `${query.year}-01` : "",
    11: query.usage   || "",
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
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="flex items-center justify-between px-4 lg:px-12 h-16">
          <Link href="/">
            <Image src="/nwc_logo.svg" alt="New World Courtage" width={160} height={44} className="h-10 w-auto" />
          </Link>
          <a href="tel:+33800000000" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Phone size={22} className="shrink-0 text-[#131212]" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-[#131212]">Parlez à un expert agréé</span>
              <span className="text-sm font-semibold text-[#131212]">+33 800 000 000</span>
            </div>
          </a>
        </div>
        {/* Progress bar */}
        <div className="w-full h-[5px] bg-gray-100">
          <div
            className="h-full bg-[var(--color-brand)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
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

          <CarInsuranceForm initialAnswers={initialAnswers} theme="light" onProgress={setProgress} />

        </div>
      </main>
    </>
  );
}
