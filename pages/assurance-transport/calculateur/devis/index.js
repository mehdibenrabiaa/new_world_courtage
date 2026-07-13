import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Phone, ChevronRight } from "lucide-react";
import CarInsuranceForm from "@/components/CarInsuranceForm";

export default function DevisPage() {
  const { query } = useRouter();
  const [progress, setProgress] = useState(Math.round((1 / 6) * 100));

  const initialAnswers = {
    1:  query.type    || "",
    2:  query.brand   || "",
    3:  query.model   || "",
    4:  query.version || "",
    9:  query.year  ? `${query.year}-01` : "",
    11: query.usage   || "",
  };

  const vehicleLabel = [query.brand, query.model, query.version].filter(Boolean).join(" ");

  return (
    <>
      <Head>
        <title>Votre devis assurance — New World Courtage</title>
        <meta name="robots" content="noindex" />
      </Head>

      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="flex items-center justify-between px-4 lg:px-12 h-16">
          <Image src="/nwc_logo.svg" alt="New World Courtage" width={160} height={44} className="h-10 w-auto" />
          <a
            href="tel:+33745891865"
            className="flex items-center gap-2.5 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white rounded-lg px-4 py-2.5 transition-colors"
          >
            <Phone size={18} className="shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] opacity-80">Parlez à un expert agréé</span>
              <span className="text-sm font-semibold">07 45 89 18 65</span>
            </div>
            <ChevronRight size={16} className="shrink-0 opacity-70" />
          </a>
        </div>
        <div className="w-full h-[5px] bg-gray-100">
          <div
            className="h-full bg-[var(--color-brand)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-10 lg:py-16">
          {vehicleLabel && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-light)] border border-gray-200 px-4 py-2">
              <span className="text-sm text-gray-500">Véhicule :</span>
              <span className="text-sm font-semibold text-[var(--color-text)] capitalize">{vehicleLabel}</span>
            </div>
          )}
          <CarInsuranceForm initialAnswers={initialAnswers} theme="light" onProgress={setProgress} />
        </div>
      </main>
    </>
  );
}
