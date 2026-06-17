import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CtaButton({ href = "/devis", label = "Obtenir un devis", className = "" }) {
  return (
    <Button
      size="lg"
      asChild
      className={cn("cta-btn text-white text-base font-semibold py-[25px] px-[15px]", className)}
    >
      <Link href={href} className="flex items-center gap-2">
        {label}
        <img src="/chevron-right.svg" alt="" width={9} height={15} aria-hidden="true" className="brightness-0 invert" />
      </Link>
    </Button>
  );
}
