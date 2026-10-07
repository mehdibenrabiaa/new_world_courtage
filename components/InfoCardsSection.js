"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ImageOffIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { libreCaslon } from "@/lib/fonts";
import CtaButton from "@/components/CtaButton";

// A missing `image` is already handled by the Icon fallback below — this is
// for the other case: a URL that's actually set but fails to load (the file
// was deleted from disk, a bad upload, a stale URL). Without this the
// browser just shows its own broken-image glyph instead of anything on-brand.
// `wrapperClassName` sizes the card slot itself (used either way, so the
// layout doesn't shift on failure); `imgClassName` only applies once the
// image has actually loaded.
function CardImage({ src, alt, wrapperClassName, imgClassName }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`bg-[var(--color-light)] flex items-center justify-center ${wrapperClassName}`}>
        <ImageOffIcon size={28} strokeWidth={1.2} className="text-gray-300" />
      </div>
    );
  }
  return (
    <div className={wrapperClassName}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={imgClassName} />
    </div>
  );
}

function CardItem({ item, index, showSteps, showLink, titleFont, cardStyle, imageVariant }) {
  const titleClass = `leading-[1.2] text-[var(--color-text)] ${titleFont === "serif" ? libreCaslon.className : "font-semibold"}`;

  if (cardStyle === "style2") {
    const { image, imageAlt = "", title, description, href } = item;

    const { Icon } = item;
    const imgHeader =
      imageVariant === "icon" && Icon ? (
        <div className="w-full h-52 bg-[var(--color-light)] flex items-center justify-center shrink-0">
          <Icon size={64} strokeWidth={1.2} className="text-[var(--color-brand)]" />
        </div>
      ) : imageVariant === "contain" ? (
        <CardImage
          src={image}
          alt={imageAlt}
          wrapperClassName="w-full h-52 flex items-center justify-center p-6 shrink-0"
          imgClassName="max-w-[90px] lg:max-w-[110px] max-h-full object-contain"
        />
      ) : Icon ? (
        <>
          <div className="lg:hidden w-full h-52 bg-[var(--color-light)] flex items-center justify-center shrink-0">
            <Icon size={64} strokeWidth={1.2} className="text-[var(--color-brand)]" />
          </div>
          {image ? (
            <div className="hidden lg:block w-full h-52 shrink-0">
              <CardImage
                src={image}
                alt={imageAlt}
                wrapperClassName="w-full h-52 relative overflow-hidden"
                imgClassName="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="hidden lg:flex w-full h-52 bg-[var(--color-light)] items-center justify-center shrink-0">
              <Icon size={64} strokeWidth={1.2} className="text-[var(--color-brand)]" />
            </div>
          )}
        </>
      ) : (
        <CardImage
          src={image}
          alt={imageAlt}
          wrapperClassName="w-full h-52 relative overflow-hidden shrink-0"
          imgClassName="absolute inset-0 w-full h-full object-cover"
        />
      );

    const inner = (
      <Card className="group flex h-full w-full flex-col gap-0 overflow-hidden border-0 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.14)] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)]">
        <div className="overflow-hidden">{imgHeader}</div>
        <CardContent className="flex flex-1 flex-col gap-3 px-4 pt-6 pb-3">
          {showSteps && (
            <Badge className="w-8 h-8 p-0 flex items-center justify-center rounded-none bg-[var(--color-brand)] border-transparent text-white text-sm font-bold">
              {index + 1}
            </Badge>
          )}
          <h3 className={`text-[22px] lg:text-[24px] ${titleClass}`}>{title}</h3>
          <p className="flex-1 text-[15px] leading-relaxed text-gray-700">{description}</p>
          {showLink && (
            <div className="mt-8 flex items-center gap-2 text-[15px] font-bold text-[var(--color-brand)]">
              <span className="group-hover:underline">Découvrir maintenant</span>
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
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
    <div className="group flex flex-col bg-[#f5f5f3] overflow-hidden transition-shadow duration-200 hover:shadow-md h-full">
      <div className="w-full flex items-center justify-center pt-8 pb-4">
        <Icon size={120} strokeWidth={1} className="text-[var(--color-brand)]" />
      </div>
      <div className="flex flex-col flex-1 p-8">
        {showSteps && (
          <Badge className="w-8 h-8 p-0 flex items-center justify-center rounded-none bg-[var(--color-brand)] border-transparent text-white text-sm font-bold mb-4">
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
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass(cols)} gap-6 mx-auto w-full`} style={maxWidth ? { maxWidth } : undefined}>
      {items.map((item, i) => <CardItem key={i} item={item} index={i} {...rest} />)}
    </div>
  );
}

function ScrollLayout({ items, ...rest }) {
  return (
    <div className="flex overflow-x-auto gap-6 py-2 pb-4 snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full -mx-4 px-4 lg:-mx-14 lg:px-14">
      {items.map((item, i) => (
        <div key={i} className="flex-shrink-0 w-[85%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] snap-start">
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
        <Button variant="outline" size="icon-lg" onClick={prev} disabled={page === 0} aria-label="Précédent">
          <ChevronLeft size={18} />
        </Button>
        <Button variant="outline" size="icon-lg" onClick={next} disabled={page === totalPages - 1} aria-label="Suivant">
          <ChevronRight size={18} />
        </Button>
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
  mobileLayout = null,
  perPage = 3,
  cols = 3,
  ctaLabel = "",
  ctaHref = "/devis",
  maxWidth = "1140px",
  id,
}) {
  const cardProps = { cardStyle, showSteps, showLink, titleFont, imageVariant };

  const header = (title || titleItalic || subtitle) ? (
    <div className="text-center mb-12 flex flex-col gap-3 max-w-3xl mx-auto">
      {(title || titleItalic) && (
        <h2 className={`text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.15] text-[var(--color-text)] ${libreCaslon.className}`}>
          {title && <>{title} </>}
          {titleItalic && <em className={`italic ${libreCaslon.className}`}>{titleItalic}</em>}
        </h2>
      )}
      {subtitle && <p className="text-[16px] text-gray-600">{subtitle}</p>}
    </div>
  ) : null;

  function renderLayout(layoutType) {
    if (layoutType === "scroll") return <ScrollLayout items={items} {...cardProps} />;
    if (layoutType === "carousel") return <CarouselLayout items={items} perPage={perPage} {...cardProps} />;
    return <GridLayout items={items} cols={cols} maxWidth={maxWidth} {...cardProps} />;
  }

  // mobileLayout lets a section use a different layout below lg: than at
  // lg:+ (e.g. carousel on mobile, horizontal scroll on desktop) — both
  // render (CSS-only visibility toggle) so there's no client-side media
  // query / hydration flash.
  const cards = mobileLayout ? (
    <>
      <div className="lg:hidden">{renderLayout(mobileLayout)}</div>
      <div className="hidden lg:block">{renderLayout(layout)}</div>
    </>
  ) : renderLayout(layout);

  const cta = ctaLabel ? (
    <div className="flex justify-center mt-10">
      <CtaButton label={ctaLabel} href={ctaHref} />
    </div>
  ) : null;

  if (withContainer) {
    return (
      <section id={id} className="w-full py-4">
        <div className="px-4 lg:px-12 2xl:px-24">
          <div className="bg-[var(--color-light)] px-4 py-10 sm:px-8 lg:px-14 lg:py-14 overflow-hidden">
            {header}
            {cards}
            {cta}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="w-full py-16 px-4 sm:px-8 lg:px-16 2xl:px-24 overflow-hidden">
      {header}
      {cards}
      {cta}
    </section>
  );
}
