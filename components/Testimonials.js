import { Libre_Caslon_Text } from "next/font/google";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const STATS = [
  { number: "30M+", label: "personnes accompagnées" },
  { number: "98%", label: "taux de satisfaction" },
  { number: "24/7", label: "d'assistance humaine" },
];

export default function Testimonials() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row min-h-[480px] bg-[var(--color-jungle-green)]">

          {/* Left — image (1/3) */}
          <div className="lg:w-1/3 h-[260px] lg:h-auto">
            <img
              src="/section2.jpg"
              alt="Clients satisfaits"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right — content (2/3) */}
          <div className="lg:w-2/3 px-8 py-10 lg:px-14 lg:py-14 flex flex-col gap-8">

            <div className="flex flex-col gap-5">
              {/* Heading */}
              <h2
                className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[#131212] ${libreCaslon.className}`}
              >
                <span className="block">Une référence de</span>
                <span className="block"><em className={`italic ${libreCaslon.className}`}>confiance</em> en assurance.</span>
              </h2>

              {/* Paragraph */}
              <p className="text-base text-[#131212] max-w-lg leading-[26px] sm:leading-6">
                New World Courtage propose des devis gratuits adaptés à vos besoins, avec l&apos;accompagnement d&apos;agents agréés, pour vous aider à obtenir rapidement une couverture d&apos;assurance et vous permettre de reprendre le cours de votre vie.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mt-5">
              {STATS.map(({ number, label }) => (
                <div key={label}>
                  <p className={`text-[44px] lg:text-[72px] leading-none text-[#131212] ${libreCaslon.className}`}>
                    {number}
                  </p>
                  <p className="text-[13px] lg:text-[16px] text-[#131212] mt-2">{label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
