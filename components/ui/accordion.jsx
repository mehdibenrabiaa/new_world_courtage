"use client";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

function Accordion({ className, ...props }) {
  return <div className={cn("divide-y divide-gray-200", className)} {...props} />;
}

function AccordionItem({ className, open, ...props }) {
  return (
    <div
      className={cn("group", className)}
      data-open={open || undefined}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="text-base font-semibold text-[var(--color-text)] leading-snug">{children}</span>
      <span className="shrink-0 text-[var(--color-brand)]">
        <Plus size={18} className="group-data-[open]:hidden" />
        <Minus size={18} className="hidden group-data-[open]:block" />
      </span>
    </button>
  );
}

function AccordionContent({ open, className, ...props }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      style={{
        height: open ? height : 0,
        overflow: "hidden",
        transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        ref={innerRef}
        className={cn("pb-5 text-base text-gray-600 leading-[26px] sm:leading-6", className)}
        {...props}
      />
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
