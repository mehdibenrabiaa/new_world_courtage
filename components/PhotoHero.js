import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { headingFont } from "@/lib/fonts";

const ROTATE_INTERVAL_MS = 4000;

// Breadcrumb trail shown inside the hero: [{ label, href }], the last item is the current page.
function HeroBreadcrumb({ items, className = "" }) {
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-white/80">
        {items.map(({ label, href }, i) => {
          const last = i === items.length - 1;
          return (
            <li key={label} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-white">{label}</span>
              ) : href ? (
                <Link href={href} className="hover:text-white hover:underline">{label}</Link>
              ) : (
                <span>{label}</span>
              )}
              {!last && <ChevronRight size={14} aria-hidden="true" className="text-white/60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Colour of the gradient and mobile text panel: brand blue for commercial pages,
// near-black for informational ones (legal pages, guide articles).
const TONES = {
  brand: {
    fade: "from-[var(--color-brand)]",
    gradient: "lg:from-[var(--color-brand)]/90 lg:via-[var(--color-brand)]/50",
    panel: "bg-[var(--color-brand)]",
  },
  neutral: {
    fade: "from-[#111111]",
    gradient: "lg:from-black/85 lg:via-black/45",
    panel: "bg-[#111111]",
  },
};

// Heights: "large" for the home page, "compact" (default) for inner pages so their
// content starts within the first screen. The large hero never exceeds the screen
// below the 87px desktop header, so its buttons stay visible on short laptop screens.
const SIZES = {
  large: {
    section: "lg:min-h-[min(640px,calc(100svh-87px))]",
    photo: "h-[300px] sm:h-[400px]",
    panel: "lg:min-h-[min(640px,calc(100svh-87px))] lg:py-10",
    title: "text-[48px] sm:text-[58px] md:text-[64px] lg:text-[72px] xl:text-[78px] 2xl:text-[94px]",
  },
  compact: {
    section: "lg:min-h-[460px]",
    photo: "h-[220px] sm:h-[300px]",
    panel: "lg:min-h-[460px] lg:pt-20 lg:pb-14",
    title: "text-[40px] sm:text-[50px] md:text-[56px] lg:text-[58px] xl:text-[64px] 2xl:text-[76px]",
  },
};

// The site's page hero (home page included).
// Desktop: full-bleed photo under a brand-blue gradient, white text vertically centred on the left.
// Mobile: the photo stays clear on top and the text sits in a solid brand-blue panel below it.
// `title` may contain an <em> for the italic emphasis; `children` holds the buttons.
// Pass `images` (array of { image, mobileImage, title }) instead of `image` to crossfade
// between several photos; a slide's own `title` replaces the shared one while it shows.
export default function PhotoHero({
  title,
  subtitle,
  children,
  image,
  mobileImage,
  images,
  imageAlt = "",
  initialIndex = 0,
  autoRotate = true,
  as: Heading = "h1",
  breadcrumb,
  tone = "brand",
  size = "compact",
}) {
  const colors = TONES[tone] ?? TONES.brand;
  const sizing = SIZES[size] ?? SIZES.compact;
  const slides = images && images.length > 0 ? images : [{ image, mobileImage }];
  const [active, setActive] = useState(initialIndex);
  const currentTitle = slides[active]?.title ?? title;

  // A client-side query-string change (e.g. the garagiste ?activite= links) keeps this
  // component mounted, so follow initialIndex explicitly.
  useEffect(() => {
    setActive(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!autoRotate || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length, autoRotate]);

  return (
    <section className={`relative w-full lg:overflow-hidden ${sizing.section}`}>
      <div className={`relative lg:absolute lg:inset-0 lg:h-full ${sizing.photo}`}>
        {slides.map((slide, i) => (
          <picture
            key={slide.image}
            className="absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {slide.mobileImage && <source media="(max-width: 1023px)" srcSet={slide.mobileImage} />}
            <img
              src={slide.image}
              alt={i === active ? imageAlt : ""}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              fetchpriority={i === 0 ? "high" : undefined}
              className="h-full w-full object-cover object-top"
            />
          </picture>
        ))}
        {/* Mobile: short fade into the blue panel below. Desktop: gradient behind the text. */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${colors.fade} to-transparent lg:inset-0 lg:h-auto lg:bg-gradient-to-r ${colors.gradient} lg:to-transparent`}
        />
        {breadcrumb && (
          <HeroBreadcrumb items={breadcrumb} className="absolute top-6 left-12 z-10 hidden lg:block 2xl:left-24" />
        )}
        {slides.length > 1 && (
          <div className="absolute top-4 right-4 z-20 flex gap-2 sm:top-6 sm:right-6">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Afficher l'image ${i + 1} sur ${slides.length}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-2.5 transition-all ${i === active ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={`relative ${colors.panel} px-4 pt-4 pb-10 sm:px-8 lg:flex lg:items-center lg:bg-transparent lg:px-12 2xl:px-24 ${sizing.panel}`}>
        <div className="text-white lg:w-4/5">
          {breadcrumb && <HeroBreadcrumb items={breadcrumb} className="mb-5 lg:hidden" />}
          <Heading className={`${sizing.title} leading-[1] tracking-[-0.02em] [&_em]:italic ${headingFont.className}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={slides.length > 1 ? active : "title"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="block"
              >
                {currentTitle}
              </motion.span>
            </AnimatePresence>
          </Heading>
          {subtitle && (
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/85 lg:mt-5 lg:text-[17px]">{subtitle}</p>
          )}
          {children && <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
