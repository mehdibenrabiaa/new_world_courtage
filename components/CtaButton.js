import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CtaButton({ href = "/devis", label = "Devis gratuit", className = "" }) {
  return (
    <Button
      size="lg"
      asChild
      className={cn("cta-btn text-white text-base font-normal py-[25px] px-[15px]", className)}
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
}
