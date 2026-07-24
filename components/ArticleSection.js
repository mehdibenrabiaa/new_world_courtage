// Shared numbered/titled section wrapper for article pages (used inside
// ArticleHero-based guides). Kept separate from ArticleHero itself since
// it wraps arbitrary body content, not just the header.
export default function ArticleSection({ title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-[#131212]">{title}</h2>
      <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}
