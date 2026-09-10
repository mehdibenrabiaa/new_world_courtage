
// Bare logo strip — no heading/paragraph/CTA, unlike Partners.js. For pages
// that just need the row of logos on its own (with an optional page-specific
// list instead of the site-wide PARTNERS).
export default function PartnerLogos({ partners, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16 border-t border-b border-gray-200 py-8 ${className}`}>
      {partners.map(({ id, name, src }) => (
        <div key={id} className="flex items-center h-14">
          <img src={src} alt={name} loading="lazy" className="h-9 lg:h-12 w-auto object-contain max-w-[95px] lg:max-w-[130px]" />
        </div>
      ))}
    </div>
  );
}
