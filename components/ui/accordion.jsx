import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

function Accordion({ className, ...props }) {
  return <div className={cn("divide-y divide-gray-200", className)} {...props} />;
}

function AccordionItem({ className, ...props }) {
  return <details className={cn("group", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <summary
      className={cn(
        "flex items-center justify-between gap-4 py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden",
        className
      )}
      {...props}
    >
      <span className="text-[15px] font-semibold text-[#131212] leading-snug">{children}</span>
      <span className="shrink-0 text-[var(--color-brand)]">
        <Plus size={18} className="group-open:hidden" />
        <Minus size={18} className="hidden group-open:block" />
      </span>
    </summary>
  );
}

function AccordionContent({ className, ...props }) {
  return (
    <div
      className={cn("pb-5 text-[14px] text-gray-600 leading-relaxed", className)}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
