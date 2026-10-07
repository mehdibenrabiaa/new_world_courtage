import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhotoHero from "@/components/PhotoHero";

// Home page hero (the page's <h1> is a visually hidden heading, so this title is an h2).
export default function Hero() {
  return (
    <PhotoHero
      as="h2"
      size="large"
      image="/heroes/home-desktop.webp"
      mobileImage="/heroes/home-mobile.webp"
      title={<>La meilleure assurance <br className="hidden lg:block" /><em>au meilleur prix.</em></>}
      subtitle="Nous comparons plus de 100 assureurs pour vous trouver la meilleure protection, gratuitement."
    >
      <Button size="lg" variant="outline" asChild className="w-full border-white/70 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white sm:w-auto">
        <Link href="/devis/">
          Devis gratuit
          <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </Button>
      <Button size="lg" asChild className="w-full bg-[#3b9bd8] text-white hover:bg-[#2c87c2] sm:w-auto">
        <Link href="/nos-assurances/">Nos assurances</Link>
      </Button>
    </PhotoHero>
  );
}
