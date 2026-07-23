"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { libreCaslon } from "@/lib/fonts";
import CtaButton from "@/components/CtaButton";

function CardItem({ item, index, showSteps, showLink, titleFont, cardStyle, imageVariant }) {
  const titleClass = `leading-[1.2] text-[var(--color-text)] ${titleFont === "serif" ? libreCaslon.className : "font-bold"}`;

  if (cardStyle === "style2") {
    const { image, imageAlt = "", title, description, href } = item;

    const { Icon } = item;
    const imgHeader =
      imageVariant === "icon" && Icon ? (
        <div className="w-full h-36 lg:h-44 bg-[var(--color-light)] flex items-center justify-center shrink-0">
          <Icon size={64} strokeWidth={1.2} className="text-[var(--color-brand)]" />
        </div>
      ) : imageVariant === "contain" ? (
        <div className="w-full h-36 lg:h-44 bg-[var(--color-light)] flex items-center justify-center p-6 shrink-0">
          <img src={image} alt={imageAlt} className="max-w-[90px] lg:max-w-[110px] max-h-full object-contain" />
        </div>
      ) : (
        <div className="w-full h-36 lg:h-44 relative overflow-hidden shrink-0">
          <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      );

    const inner = (
      <Card className="w-full max-w-[280px] mx-auto overflow-hidden h-full rounded-[5px] transition-shadow duration-200 hover:shadow-md group flex flex-col">
        {imgHeader}
        <CardContent className="p-5 flex flex-col gap-4 flex-1">
          {showSteps && (
            <Badge className="w-8 h-8 p-0 flex items-center justify-center rounded-full bg-[var(--color-text)] border-transparent text-white text-sm">
              {index + 1}
            </Badge>
          )}
          <h3 className={`text-[20px] ${titleClass}`}>{title}</h3>
          <p className="text-[15px] text-gray-600 leading-relaxed flex-1">{description}</p>
          {showLink && (
            <div className="mt-8 flex items-center gap-1 text-[14px] font-semibold text-[var(--color-brand)] group-hover:underline">
              En savoir plus <ChevronRight size={15} />
            </div>
          )}
        </CardContent>
      </Card>
    );
    return href ? <Link href={href} className="flex flex-col h-full w-full">{inner}</Link> : inner;
  }

  // style1
  const { Icon, title, description, href } = item;
  const inner = (
    <div className="group flex flex-col bg-[#f5f5f3] rounded-[5px] overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] h-full">
      <div className="w-full flex items-center justify-center pt-8 pb-4">
        <Icon size={120} strokeWidth={1} className="text-[var(--color-brand)]" />
      </div>
      <div className="flex flex-col flex-1 p-8">
        {showSteps && (
          <Badge className="w-8 h-8 p-0 flex items-center justify-center rounded-full bg-[var(--color-text)] border-transparent text-white text-sm mb-4">
            {index + 1}
          </Badge>
        )}
        <h3 className={`text-[22px] sm:text-[26px] mb-4 ${titleClass}`}>{title}</h3>
        <p className="text-[15px] text-gray-600 leading-relaxed flex-1">{description}</p>
        {showLink && (
          <div className="mt-12 flex items-center gap-1 text-[15px] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">
            En savoir plus <ChevronRight size={16} />
          </div>
        )}
      </div>
    </div>
  );
  return href ? <Link href={href} className="flex flex-col h-full">{inner}</Link> : inner;
}

function colsClass(cols) {
  if (cols === 4) return "lg:grid-cols-4";
  if (cols === 2) return "lg:grid-cols-2";
  if (cols === 1) return "lg:grid-cols-1";
  return "lg:grid-cols-3";
}

function GridLayout({ items, cols, maxWidth, ...rest }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass(cols)} gap-6 sm:gap-4 lg:gap-6 mx-auto w-full`} style={maxWidth ? { maxWidth } : undefined}>
      {items.map((item, i) => <CardItem key={i} item={item} index={i} {...rest} />)}
    </div>
  );
}

function ScrollLayout({ items, ...rest }) {
  return (
    <div className="flex overflow-x-auto gap-4 pb-3 snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full -mx-4 px-4 lg:-mx-14 lg:px-14">
      {items.map((item, i) => (
        <div key={i} className="flex-shrink-0 w-[300px] snap-start">
          <CardItem item={item} index={i} {...rest} />
        </div>
      ))}
    </div>
  );
}

function CarouselLayout({ items, perPage, ...rest }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState("next");
  const totalPages = Math.ceil(items.length / perPage);
  const visible = items.slice(page * perPage, (page + 1) * perPage);

  const prev = () => { setDir("prev"); setPage(p => Math.max(0, p - 1)); };
  const next = () => { setDir("next"); setPage(p => Math.min(totalPages - 1, p + 1)); };

  return (
    <div>
      <div className="flex items-center justify-end gap-3 mb-4">
        <button onClick={prev} disabled={page === 0} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Précédent">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} disabled={page === totalPages - 1} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Suivant">
          <ChevronRight size={18} />
        </button>
      </div>
      <div key={page} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${dir === "next" ? "slide-in-right" : "slide-in-left"}`}>
        {visible.map((item, i) => <CardItem key={i} item={item} index={page * perPage + i} {...rest} />)}
      </div>
    </div>
  );
}

export default function InfoCardsSection({
  title = "",
  titleItalic = "",
  subtitle = "",
  items = [],
  cardStyle = "style1",
  imageVariant = "cover",
  showSteps = false,
  showLink = false,
  withContainer = false,
  titleFont = "serif",
  layout = "grid",
  perPage = 3,
  cols = 3,
  ctaLabel = "",
  ctaHref = "/devis",
  maxWidth = "1140px",
}) {
  const cardProps = { cardStyle, showSteps, showLink, titleFont, imageVariant };

  const header = (title || titleItalic || subtitle) ? (
    <div className="text-center mb-12 flex flex-col gap-3 max-w-3xl mx-auto">
      {(title || titleItalic) && (
        <h2 className={`text-[40px] sm:text-[55px] leading-[1.15] text-[var(--color-text)] ${libreCaslon.className}`}>
          {title && <>{title} </>}
          {titleItalic && <em className={`italic ${libreCaslon.className}`}>{titleItalic}</em>}
        </h2>
      )}
      {subtitle && <p className="text-[16px] text-gray-500">{subtitle}</p>}
    </div>
  ) : null;

  const cards =
    layout === "scroll" ? <ScrollLayout items={items} {...cardProps} /> :
    layout === "carousel" ? <CarouselLayout items={items} perPage={perPage} {...cardProps} /> :
    <GridLayout items={items} cols={cols} maxWidth={maxWidth} {...cardProps} />;

  const cta = ctaLabel ? (
    <div className="flex justify-center mt-10">
      <CtaButton label={ctaLabel} href={ctaHref} />
    </div>
  ) : null;

  if (withContainer) {
    return (
      <section className="w-full py-4">
        <div className="px-4 lg:px-12 2xl:px-24">
          <div className="rounded-xl bg-[var(--color-light)] px-4 py-10 sm:px-8 lg:px-14 lg:py-14 overflow-hidden">
            {header}
            {cards}
            {cta}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-16 2xl:px-24 overflow-hidden">
      {header}
      {cards}
      {cta}
    </section>
  );
}
