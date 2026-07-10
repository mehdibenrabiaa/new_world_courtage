import { libreCaslon } from "@/lib/fonts";

export default function TrustPilot({
  score = 4.8,
  className = "",
}) {
  return (
    <div className={`w-full px-4 lg:px-12 2xl:px-24 py-8 ${className}`}>
      <div className="max-w-3xl mx-auto py-5 flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-14">

        {/* Trustpilot */}
        <div className="flex flex-col items-start gap-1">
          <img
            src="/trustpilot.jpg"
            alt="Trustpilot"
            className="h-12 sm:h-16 w-auto object-contain"
          />
          <p className="text-[13px] sm:text-[14px] font-bold text-[var(--color-text)] leading-tight">
            TrustScore {score} sur 5
          </p>
        </div>

        <div className="h-16 sm:h-24 w-px bg-gray-200 hidden sm:block" />

        {/* ORIAS */}
        <img
          src="/ORIAS.jpg"
          alt="Immatriculé ORIAS n° 25006506"
          className="h-16 sm:h-[86px] w-auto object-contain"
        />

        <div className="h-16 sm:h-24 w-px bg-gray-200 hidden sm:block" />

        {/* Sans frais */}
        <div className="flex flex-col items-start gap-0">
          <p className={`text-[26px] sm:text-[32px] italic text-[#4b4b4b] leading-tight ${libreCaslon.className}`}>Sans frais</p>
          <p className="text-[14px] sm:text-[16px] text-[#4b4b4b] leading-tight">Sans engagement</p>
          <p className="text-[11px] sm:text-[12px] font-normal text-[#4b4b4b] leading-snug">Même prix que chez l&apos;assureur</p>
        </div>

      </div>
    </div>
  );
}
