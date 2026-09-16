import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { libreCaslon } from "@/lib/fonts";

// When `images` (an array of {image, mobileImage, title}) is passed instead
// of a single `image`, the hero background auto-rotates between them with a
// crossfade — used e.g. by the garagiste page's carousel. A slide's own
// `title` (if set) swaps in alongside its image; slides without one fall
// back to the top-level `title` prop.
const ROTATE_INTERVAL_MS = 4000;

export default function PageHero({ title, image = "/about-pic.jpg", mobileImage, images, imageAlt = "", titlePosition = "top", titleClassName = "", titleWidth = "lg:w-[80%]" }) {
  const slides = images && images.length > 0 ? images : [{ image, mobileImage }];
  const [active, setActive] = useState(0);
  const currentTitle = slides[active].title ?? title;

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full min-h-[340px] lg:min-h-[750px] overflow-hidden rounded-none lg:rounded-xl">

          {slides.map((slide, i) => (
            <picture
              key={slide.image}
              className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              {slide.mobileImage && <source media="(max-width: 1023px)" srcSet={slide.mobileImage} />}
              <img
                src={slide.image}
                alt={imageAlt}
                className="w-full h-full object-cover object-center"
              />
            </picture>
          ))}

          {slides.length > 1 && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Afficher l'image ${i + 1} sur ${slides.length}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`size-2.5 rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          )}

          <div className={`relative z-10 h-full min-h-[340px] lg:min-h-[750px] flex flex-col ${titlePosition === "bottom" ? "justify-end" : ""}`}>
            <div className={`bg-white pl-4 sm:pl-6 pr-4 sm:pr-12 py-4 sm:py-6 w-full sm:w-[90%] ${titleWidth} ${titlePosition === "bottom" ? "rounded-tr-none sm:rounded-tr-[9999px]" : "rounded-br-none sm:rounded-br-[9999px]"}`}>
              <h1 className={`text-[8vw] sm:text-[36px] lg:text-[48px] text-[var(--color-text)] leading-[1.1] ${libreCaslon.className} ${titleClassName}`}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block"
                  >
                    {currentTitle}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
