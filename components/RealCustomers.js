import { Libre_Caslon_Text } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RealCustomers() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] bg-[var(--color-light)] px-4 py-10 lg:px-8 lg:py-14">

          {/* Header */}
          <div className="flex flex-col gap-5 max-w-4xl mx-auto text-center mb-10 lg:mb-14">
            <h2
              className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[var(--color-text)] ${libreCaslon.className}`}
            >
              <em className={`italic ${libreCaslon.className}`}>Vrais</em> clients, vraies histoires.
            </h2>
            <p className="text-base text-gray-600 leading-[26px] sm:leading-6">
              New World Courtage vous aide à comparer les options d&apos;assurance et à trouver la bonne protection rapidement grâce à des devis gratuits et un accompagnement d&apos;experts.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Row 1 — 1/4 · 1/4 · 2/4 */}
            <Card className="lg:col-span-1 rounded-[10px] overflow-hidden relative min-h-[280px] cursor-pointer"
              style={{ backgroundImage: "url(/driving_car.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-[10px]" />
              <CardContent className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-normal text-white leading-[26px] sm:leading-6">
                    Je me suis senti écouté et compris tout au long du processus.
                  </p>
                  <div className="flex flex-col gap-0.5 mt-3">
                    <p className={`text-[20px] lg:text-[26px] leading-snug text-white ${libreCaslon.className}`}>Paul</p>
                    <p className="text-[14px] font-bold text-white">Client New World Courtage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-1 rounded-[10px] bg-[var(--color-blue-sky)] min-h-[280px] cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-end">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-normal text-[var(--color-text)] leading-[26px] sm:leading-6">
                    &ldquo;C&apos;était un processus simple et sans stress. Toutes mes questions ont trouvé une réponse. Je me suis sentie écoutée et comprise. Si vous hésitez encore, ne le faites plus — vous ne regretterez pas d&apos;avoir choisi ce service.&rdquo;
                  </p>
                  <div className="flex flex-col gap-0.5 mt-3">
                    <p className={`text-[20px] lg:text-[26px] leading-snug text-[var(--color-text)] ${libreCaslon.className}`}>Karen</p>
                    <p className="text-[14px] font-bold text-[var(--color-text)]">Cliente New World Courtage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 rounded-[10px] bg-[var(--color-brand)] min-h-[280px] cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <p className={`text-[26px] lg:text-[30px] text-white leading-[1.3] ${libreCaslon.className}`}>
                  &ldquo;Le processus de demande était simple et l&apos;équipe était disponible à chaque étape du parcours.&rdquo;
                </p>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-[20px] lg:text-[26px] leading-snug text-white ${libreCaslon.className}`}>Mark</p>
                  <p className="text-[14px] font-bold text-white">Client New World Courtage</p>
                </div>
              </CardContent>
            </Card>

            {/* Row 2 — 1/4 · 2/4 · 1/4 */}
            <Card className="lg:col-span-1 rounded-[10px] bg-[var(--color-blue-sky)] min-h-[280px] cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <p className="text-base font-normal text-[var(--color-text)] leading-[26px] sm:leading-6">
                  &ldquo;Je n&apos;aurais jamais pensé trouver une meilleure offre aussi rapidement. L&apos;équipe a été d&apos;une grande aide du début à la fin.&rdquo;
                </p>
                <div className="flex flex-col gap-0.5 mt-3">
                  <p className={`text-[20px] lg:text-[26px] leading-snug text-[var(--color-text)] ${libreCaslon.className}`}>Sophie</p>
                  <p className="text-[14px] font-bold text-[var(--color-text)]">Cliente New World Courtage</p>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 rounded-[10px] bg-white min-h-[280px] cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <p className={`text-[26px] lg:text-[30px] text-[var(--color-text)] leading-[1.3] ${libreCaslon.className}`}>
                  &ldquo;Rapide, clair et sans mauvaise surprise. Exactement ce dont j&apos;avais besoin.&rdquo;
                </p>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-[20px] lg:text-[26px] leading-snug text-[var(--color-text)] ${libreCaslon.className}`}>Lucas</p>
                  <p className="text-[14px] font-bold text-[var(--color-text)]">Client New World Courtage</p>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-1 rounded-[10px] overflow-hidden relative min-h-[280px] cursor-pointer"
              style={{ backgroundImage: "url(/section2.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-[10px]" />
              <CardContent className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-normal text-white leading-[26px] sm:leading-6">
                    Un accompagnement humain et des conseils vraiment personnalisés.
                  </p>
                  <div className="flex flex-col gap-0.5 mt-3">
                    <p className={`text-[20px] lg:text-[26px] leading-snug text-white ${libreCaslon.className}`}>Marie</p>
                    <p className="text-[14px] font-bold text-white">Cliente New World Courtage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
