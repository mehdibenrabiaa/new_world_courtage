import Link from "next/link";
import { BookOpen, Clock, ArrowRight, MessageCircleQuestion } from "lucide-react";

// Sits beside a guide's content (see pages/assurance-pro-auto/[slug].js and
// pages/assurance-transport/[slug].js) — other published guides from the
// same category, so a reader never dead-ends at the bottom of one article.
// Sticky on desktop, a plain stacked block under the article on mobile.
export default function ArticleSidebar({ related = [] }) {
  return (
    <aside className="w-full shrink-0 lg:w-[300px] lg:sticky lg:top-24 flex flex-col gap-8">
      {related.length > 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-brand)] mb-4">
            À lire aussi
          </p>
          <div className="flex flex-col">
            {related.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-start gap-3 py-4 ${i > 0 ? "border-t border-gray-100" : ""}`}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[var(--color-light)]">
                  {item.image_url ? (
                    <img src={item.image_url} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-brand)]">
                      <BookOpen size={20} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
                  <p className="text-[14px] font-semibold leading-snug text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-brand)] transition-colors">
                    {item.title}
                  </p>
                  {item.reading_time && (
                    <p className="flex items-center gap-1 text-[12px] text-gray-500">
                      <Clock size={12} aria-hidden="true" />
                      {item.reading_time}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[var(--color-brand)] p-6 flex flex-col gap-3 text-white">
        <MessageCircleQuestion size={22} strokeWidth={1.75} aria-hidden="true" />
        <p className="text-[15px] font-semibold leading-snug">
          Une question sur votre assurance&nbsp;?
        </p>
        <p className="text-[13px] text-white/75 leading-relaxed">
          Nos conseillers répondent en moins de 24h, sans engagement.
        </p>
        <Link
          href="/contact/"
          className="group mt-1 inline-flex w-fit items-center gap-1.5 text-[13px] font-bold text-white underline underline-offset-2"
        >
          Contactez-nous
          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </aside>
  );
}
