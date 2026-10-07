import { useEffect, useRef, useState } from "react";

// In-page navigation bar: overlaps the bottom of the hero, then sticks under the
// navbar while scrolling and underlines the section currently on screen.
// `items`: [{ id, label }] where `id` is the id of a section on the page.
export default function SectionTabs({ items, ariaLabel = "Sections de la page" }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function update() {
      // A section is current once its top passes just below the sticky bar.
      const line = (barRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom of the page the last section wins, even if short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1]?.id;
      }
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  // On mobile the bar scrolls sideways: keep the active tab visible.
  useEffect(() => {
    const tab = listRef.current?.querySelector(`[data-tab="${active}"]`);
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  function goTo(event, id) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = (barRef.current?.getBoundingClientRect().bottom ?? 0) + 8;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - offset, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      ref={barRef}
      aria-label={ariaLabel}
      className="sticky top-[65px] z-30 -mt-6 px-4 lg:top-[87px] lg:-mt-10 lg:px-12 2xl:px-24"
    >
      <ul
        ref={listRef}
        className="flex overflow-x-auto bg-white px-2 shadow-[0_4px_16px_rgba(0,0,0,0.12)] [scrollbar-width:none] lg:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                data-tab={id}
                onClick={(event) => goTo(event, id)}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex h-14 items-center whitespace-nowrap px-4 text-[15px] transition-colors lg:h-16 lg:px-5 ${
                  isActive ? "font-bold text-[var(--color-brand)]" : "text-[var(--color-text)] hover:text-[var(--color-brand)]"
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 bottom-0 h-1 bg-[var(--color-brand)] transition-transform duration-300 lg:inset-x-5 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
