// Trust strip: two equal square tiles (Trustpilot, ORIAS),
// styled like the partner-logo tiles.
export default function TrustPilot({ score = 4.8, className = "" }) {
  return (
    <section className={`w-full px-4 lg:px-12 2xl:px-24 py-8 ${className}`} aria-label="Pourquoi nous faire confiance">
      <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <li className="flex min-h-40 flex-col items-center justify-center gap-3 border border-gray-200 bg-white px-6 py-8 text-center">
          <img src="/logos/trustpilot.svg" alt="Trustpilot" loading="lazy" className="h-12 w-auto object-contain" />
          <p className="text-[15px] font-semibold text-[var(--color-text)]">
            TrustScore <span className="text-[#00593a]">{score}</span> sur 5
          </p>
        </li>

        <li className="flex min-h-40 flex-col items-center justify-center gap-3 border border-gray-200 bg-white px-6 py-8 text-center">
          <img src="/logos/orias.svg" alt="ORIAS" loading="lazy" className="h-12 w-auto object-contain" />
          <p className="text-[15px] font-semibold text-[var(--color-text)]">Courtier immatriculé à l&apos;ORIAS</p>
        </li>

      </ul>
    </section>
  );
}
