// Candidate designs for the "Vrais clients, vraies histoires." section. Previewed on
// /avis-variantes; keep the chosen one, delete the rest.
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { headingFont } from "@/lib/fonts";
import CtaButton from "@/components/CtaButton";
import { Marquee } from "@/components/Partners";
import { TESTIMONIALS, TRUSTPILOT_URL, Stars, VerifiedBadge, CardInner, CARD_CLASS } from "@/components/RealCustomers";

const TEXT = "New World Courtage vous aide à comparer les options d'assurance et à trouver la bonne protection rapidement grâce à des devis gratuits et un accompagnement d'experts.";

const external = { target: "_blank", rel: "noopener noreferrer" };
const reviewHref = (review) => review.href || TRUSTPILOT_URL;

function Title({ className = "" }) {
  return (
    <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] ${headingFont.className} ${className}`}>
      <em className={headingFont.className}>Vrais</em> clients, vraies histoires.
    </h2>
  );
}

function Shell({ children, className = "bg-[var(--color-light)]" }) {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className={`px-4 py-10 sm:px-8 lg:px-14 lg:py-14 ${className}`}>{children}</div>
      </div>
    </section>
  );
}

function TrustpilotMark({ light = false }) {
  return (
    <a href={TRUSTPILOT_URL} {...external} className={`inline-flex flex-wrap items-center gap-3 text-[14px] ${light ? "text-white/85" : "text-gray-600"} hover:underline`}>
      <img src="/logos/trustpilot.svg" alt="Trustpilot" loading="lazy" className={`h-6 w-auto ${light ? "brightness-0 invert" : ""}`} />
      <Stars />
      <span>Lire nos avis</span>
    </a>
  );
}

function ArrowButton({ dir, onClick, disabled, light = false }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Avis précédent" : "Avis suivant"}
      className={`flex size-11 items-center justify-center border transition-colors disabled:opacity-40 ${
        light ? "border-white/60 text-white hover:bg-white hover:text-[var(--color-brand)]" : "border-gray-300 bg-white text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
      }`}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}

function ReviewCard({ review, className = "" }) {
  return (
    <a
      href={reviewHref(review)}
      {...external}
      className={`${CARD_CLASS} rounded-none transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)] ${className}`}
    >
      <CardInner {...review} verified={Boolean(review.href)} />
    </a>
  );
}

function useCycle(length) {
  const [index, setIndex] = useState(0);
  return [index, setIndex, () => setIndex((i) => (i - 1 + length) % length), () => setIndex((i) => (i + 1) % length)];
}

// R1 — one featured review at a time beside the title, with arrows
export function ReviewsFeatured() {
  const [index, , prev, next] = useCycle(TESTIMONIALS.length);
  const review = TESTIMONIALS[index];
  return (
    <Shell>
      <div className="grid gap-10 text-[var(--color-text)] lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Title />
          <p className="text-base leading-relaxed text-gray-600">{TEXT}</p>
          <TrustpilotMark />
          <CtaButton href={TRUSTPILOT_URL} label="Voir plus d'avis" {...external} />
        </div>
        <figure className="flex flex-col gap-6 bg-white p-7 lg:p-10">
          <div key={index} className="slide-in-right flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="self-start"><Stars /></div>
              {review.href && <VerifiedBadge />}
            </div>
            <p className={`text-[24px] leading-[1.2] lg:text-[30px] ${headingFont.className}`}>« {review.title} »</p>
            <blockquote className="text-[16px] leading-relaxed text-gray-700">{review.quote}</blockquote>
            <figcaption className="mt-auto text-[15px] font-bold">{review.name}</figcaption>
          </div>
          <div className="flex items-center gap-3 border-t border-gray-200 pt-5">
            <span className="mr-auto text-[14px] text-gray-500" aria-live="polite">{index + 1} / {TESTIMONIALS.length}</span>
            <ArrowButton dir="prev" onClick={prev} />
            <ArrowButton dir="next" onClick={next} />
          </div>
        </figure>
      </div>
    </Shell>
  );
}

// R2 — all reviews at once in a masonry wall, no carousel
export function ReviewsWall() {
  return (
    <Shell>
      <div className="flex flex-col items-center gap-10 text-center text-[var(--color-text)]">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <Title />
          <p className="text-base leading-relaxed text-gray-600">{TEXT}</p>
        </div>
        <div className="w-full columns-1 gap-5 text-left md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((review) => (
            <ReviewCard key={review.name} review={review} className="mb-5 break-inside-avoid" />
          ))}
        </div>
        <CtaButton href={TRUSTPILOT_URL} label="Voir plus d'avis" {...external} />
      </div>
    </Shell>
  );
}

// R3 — review cards scrolling endlessly, like the partner logos
export function ReviewsMarquee() {
  return (
    <Shell>
      <div className="flex flex-col items-center gap-10 text-center text-[var(--color-text)]">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <Title />
          <TrustpilotMark />
        </div>
        <Marquee duration={70}>
          {TESTIMONIALS.map((review) => (
            <ReviewCard key={review.name} review={review} className="mr-5 w-[300px] shrink-0 text-left sm:w-[360px]" />
          ))}
        </Marquee>
        <CtaButton href={TRUSTPILOT_URL} label="Voir plus d'avis" {...external} />
      </div>
    </Shell>
  );
}

// R4 — brand-blue band: one large quote, the customers' names as tabs below
export function ReviewsBand() {
  const [index, setIndex] = useCycle(TESTIMONIALS.length);
  const review = TESTIMONIALS[index];
  return (
    <Shell className="bg-[var(--color-brand)] text-white">
      <div className="flex flex-col items-center gap-8 text-center">
        <Title className="text-white" />
        <figure key={index} className="slide-in-right flex max-w-3xl flex-col items-center gap-5">
          <img src="/logos/trustpilot-stars.svg" alt="5 étoiles Trustpilot" loading="lazy" className="h-6 w-auto" />
          <blockquote className={`text-[22px] leading-[1.3] sm:text-[26px] lg:text-[30px] ${headingFont.className}`}>
            « {review.quote} »
          </blockquote>
          <figcaption className="text-[15px] font-bold text-white/85">{review.name}</figcaption>
        </figure>
        <div role="group" aria-label="Choisir un avis" className="flex flex-wrap justify-center gap-2">
          {TESTIMONIALS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={`border px-4 py-2 text-[14px] font-semibold transition-colors ${
                i === index ? "border-white bg-white text-[var(--color-brand)]" : "border-white/40 text-white hover:border-white"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
        <TrustpilotMark light />
      </div>
    </Shell>
  );
}

// R5 — title on the left, a swipeable row of cards (scroll snap) with arrows
export function ReviewsSlider() {
  const rowRef = useRef(null);
  const scroll = (dir) => {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: dir * row.clientWidth * 0.9, behavior: "smooth" });
  };
  return (
    <Shell>
      <div className="flex flex-col gap-8 text-[var(--color-text)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <Title />
            <p className="text-base leading-relaxed text-gray-600">{TEXT}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <ArrowButton dir="prev" onClick={() => scroll(-1)} />
            <ArrowButton dir="next" onClick={() => scroll(1)} />
          </div>
        </div>
        <div ref={rowRef} className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-14 lg:scroll-px-14 lg:px-14">
          {TESTIMONIALS.map((review) => (
            <ReviewCard key={review.name} review={review} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]" />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <TrustpilotMark />
          <CtaButton href={TRUSTPILOT_URL} label="Voir plus d'avis" {...external} />
        </div>
      </div>
    </Shell>
  );
}

// R6 — minimal: grey panel, three quotes in columns with dividers, a text link
export function ReviewsMinimal() {
  return (
    <Shell>
      <div className="flex flex-col items-center gap-10 text-[var(--color-text)]">
        <Title className="text-center" />
        <div className="grid w-full divide-y divide-gray-300 border-y border-gray-300 md:grid-cols-3 md:divide-x md:divide-y-0">
          {TESTIMONIALS.slice(0, 3).map((review) => (
            <figure key={review.name} className="flex flex-col gap-4 py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <div className="self-start"><Stars /></div>
              <blockquote className={`text-[20px] leading-[1.35] ${headingFont.className}`}>« {review.quote} »</blockquote>
              <figcaption className="mt-auto text-[13px] uppercase tracking-widest text-gray-500">{review.name}</figcaption>
            </figure>
          ))}
        </div>
        <a href={TRUSTPILOT_URL} {...external} className="inline-flex items-center gap-1 text-[15px] font-bold text-[var(--color-brand)] hover:underline">
          Lire tous nos avis sur Trustpilot <ChevronRight size={18} aria-hidden="true" />
        </a>
      </div>
    </Shell>
  );
}
