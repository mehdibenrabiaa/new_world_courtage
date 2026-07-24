import { Card, CardContent } from "@/components/ui/card";

// Reusable section — a 1 or 2-col grid of cards with a colored accent
// strip on top. Purely a visual pattern: each item is just a heading +
// body, so this works for any short-form card content, not just FAQs.
export default function AccentCardGrid({ title = "", items = [], cols = 2 }) {
  return (
    <section className="flex flex-col gap-4">
      {title && <h2 className="text-xl font-bold text-[#131212]">{title}</h2>}
      <div className={`grid grid-cols-1 ${cols === 1 ? "" : "lg:grid-cols-2"} gap-4`}>
        {items.map(({ heading, body }, i) => (
          <Card key={i} className="bg-[var(--color-light)] border-0 shadow-none overflow-hidden rounded-t-none rounded-b-[var(--radius)]">
            <div className="h-2 bg-[var(--color-brand)]" />
            <CardContent className="p-6 flex flex-col gap-3">
              <h3 className="text-[15px] font-semibold text-[#131212] leading-snug">{heading}</h3>
              {body && <div className="text-[15px] text-gray-600 leading-relaxed">{body}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
