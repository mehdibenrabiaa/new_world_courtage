export function LegalBody({ children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-14 flex flex-col gap-12">
      {children}
    </div>
  );
}

export function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-[#131212]">{title}</h2>
      <div className="flex flex-col gap-3 text-[15px] text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
