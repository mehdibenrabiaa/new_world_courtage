import { libreCaslon } from "@/lib/fonts";

export default function TrustPilot({ score = 4.8, className = "" }) {
  return (
    <div className={`w-full px-4 lg:px-12 2xl:px-24 py-8 ${className}`}>
      <div className="max-w-4xl mx-auto py-12 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 sm:gap-10 lg:gap-14">

        {/* Trustpilot existing design */}
        <div className="flex flex-col items-start gap-2">
          <img src="/logos/trustpilot.svg" alt="Trustpilot" loading="lazy" className="h-20 sm:h-14 w-auto object-contain" />
          <p className="text-[16px] sm:text-[13px] font-semibold text-[var(--color-text)] leading-tight">
            TrustScore <span className="text-[#00593a]">{score}</span> sur 5
          </p>
        </div>

        <div className="h-16 sm:h-20 w-px bg-gray-200 hidden sm:block" />

        {/* ORIAS */}
        <div className="flex flex-col items-center gap-1.5">
          <img src="/logos/orias.svg" alt="ORIAS" loading="lazy" className="h-20 sm:h-14 w-auto object-contain" />
        </div>

        <div className="h-16 sm:h-20 w-px bg-gray-200 hidden sm:block" />

        {/* Sans frais */}
        <div className="flex flex-col items-center sm:items-start gap-0">
          <p className={`text-[36px] sm:text-[32px] italic text-[#4b4b4b] leading-tight ${libreCaslon.className}`}>Sans frais</p>
          <p className="text-[18px] sm:text-[16px] text-[#4b4b4b] leading-tight">Sans engagement</p>
          <p className="text-[14px] sm:text-[12px] font-normal text-[#4b4b4b] leading-snug">Même prix que chez l&apos;assureur</p>
        </div>

      </div>


    </div>
  );
}
