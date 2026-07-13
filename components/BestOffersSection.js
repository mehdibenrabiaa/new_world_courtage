import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { libreCaslon } from "@/lib/fonts";

export default function BestOffersSection({
  title = "Trouvez les meilleures offres avec New World Courtage",
  titleItalic = "New World Courtage",
  subtitle = "Comparez les offres et trouvez la couverture la plus adaptée à votre activité.",
  items = [],
}) {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-xl bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14">

          {/* Header */}
          <div className="flex flex-col gap-4 mb-10 lg:mb-14 max-w-3xl mx-auto text-center">
            <h2 className={`text-[8vw] sm:text-[36px] lg:text-[48px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}>
              {title.replace(titleItalic, "").trim()}{" "}
              <em className={`italic ${libreCaslon.className}`}>{titleItalic}</em>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{subtitle}</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1140px] mx-auto">
            {items.map(({ image, imageAlt = "", title: cardTitle, description, href }) => (
              <Link key={href} href={href} className="group">
                <Card className="w-full overflow-hidden h-full transition-shadow duration-200 hover:shadow-md">
                  <div className="w-full h-36 lg:h-44 relative overflow-hidden">
                    <img
                      src={image}
                      alt={imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col gap-4">
                    <h3 className={`text-[20px] leading-snug text-[var(--color-text)] ${libreCaslon.className}`}>
                      {cardTitle}
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed flex-1">
                      {description}
                    </p>
                    <div className="flex items-center gap-1 text-[14px] font-semibold text-[var(--color-brand)] group-hover:underline">
                      Lire la suite <ChevronRight size={15} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
