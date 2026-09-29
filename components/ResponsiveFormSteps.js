import { useEffect, useRef, useState } from "react";

// Collapse the most distant steps first. At equal distance, preserve the
// upcoming step's label before a completed step's label.
export function fitStepLabels(widths, availableWidth, currentStep, iconWidth = 40, gap = 2) {
  const visible = new Set(widths.map((_, index) => index));
  let total = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, widths.length - 1) * gap;
  const collapseOrder = widths.map((_, index) => index)
    .filter((index) => index !== currentStep)
    .sort((a, b) => Math.abs(b - currentStep) - Math.abs(a - currentStep) || a - b);
  for (const index of collapseOrder) {
    if (total <= availableWidth) break;
    visible.delete(index);
    total -= widths[index] - iconWidth;
  }
  return [...visible];
}

export default function ResponsiveFormSteps({ sections, currentStep }) {
  const containerRef = useRef(null);
  const measurementRef = useRef(null);
  const [visibleLabels, setVisibleLabels] = useState([currentStep]);

  useEffect(() => {
    const container = containerRef.current;
    const measurement = measurementRef.current;
    if (!container || !measurement) return;
    const update = () => {
      const widths = [...measurement.children].map((item) => item.getBoundingClientRect().width);
      const next = fitStepLabels(widths, container.clientWidth, currentStep);
      setVisibleLabels((previous) => previous.join(",") === next.join(",") ? previous : next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    for (const item of measurement.children) observer.observe(item);
    return () => observer.disconnect();
  }, [sections, currentStep]);

  return (
    <nav ref={containerRef} aria-label="Étapes du devis assurance auto" className="sticky top-16 z-30 mb-8 bg-white py-3">
      <div aria-hidden="true" className="pointer-events-none invisible absolute inset-0 overflow-hidden">
        <ol ref={measurementRef} className="flex w-max gap-0.5">
          {sections.map(({ label, Icon }) => (
            <li key={label} className="flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-3.5 text-[11px] font-semibold uppercase tracking-normal">
              <Icon size={16} className="shrink-0" /><span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
      <ol id="auto-form-steps" className="grid w-full grid-cols-6 gap-0.5 sm:flex">
        {sections.map(({ label, Icon }, index) => {
          const isCurrent = index === currentStep;
          const showLabel = isCurrent || visibleLabels.includes(index);
          return (
            <li
              key={label}
              title={label}
              aria-current={isCurrent ? "step" : undefined}
              className={`flex min-w-0 items-center justify-center gap-2 px-1 py-3 text-[11px] font-semibold uppercase tracking-normal sm:py-3.5 ${
                showLabel ? "sm:flex-[1_0_auto] sm:px-3" : "sm:w-10 sm:flex-none sm:px-0"
              } ${isCurrent ? "bg-[var(--color-brand)] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              <Icon size={18} aria-hidden="true" className="shrink-0 sm:size-4" />
              <span className={showLabel ? "sr-only sm:not-sr-only sm:whitespace-nowrap" : "sr-only"}>{label}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 sm:hidden">
        Étape {currentStep + 1}/{sections.length} · {sections[currentStep].label}
      </p>
    </nav>
  );
}