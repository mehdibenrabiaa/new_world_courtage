import { Button } from "@/components/ui/button";

function TpStarBox({ fill = 1 }) {
  const clip = Math.round((1 - fill) * 100);
  return (
    <div className="relative w-9 h-9 sm:w-11 sm:h-11 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-[#dcdce6]" />
      {fill > 0 && (
        <div
          className="absolute inset-0 bg-[#00b67a]"
          style={{ clipPath: `inset(0 ${clip}% 0 0)` }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 120 115" xmlns="http://www.w3.org/2000/svg" className="w-[58%] h-[58%]">
          <polygon
            fill="white"
            points="60,8.7 74.9,48.8 117.6,48.8 83.4,73.1 96.4,113.1 60,88.8 23.6,113.1 36.6,73.1 2.4,48.8 45.1,48.8"
          />
        </svg>
      </div>
    </div>
  );
}

export default function TrustPilot({
  score = 4.8,
  reviewCount = 247,
  starFills = [1, 1, 1, 1, 0.8],
  className = "",
}) {
  return (
    <div className={`w-full px-4 lg:px-12 2xl:px-24 py-8 ${className}`}>
      <div className="max-w-3xl mx-auto py-5 flex justify-center">
        <div className="w-fit flex flex-col items-start gap-0">
          <img
            src="/Trustpilot_Logo_(2022).svg"
            alt="Trustpilot"
            className="h-8 w-auto"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              {starFills.map((fill, i) => (
                <TpStarBox key={i} fill={fill} />
              ))}
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[16px] font-bold text-[#131212]">
                TrustScore {score} sur 5
              </p>
              <Button
                variant="link"
                asChild
                className="h-auto p-0 text-[16px] font-normal text-[var(--color-brand)] justify-start underline"
              >
                <a
                  href="https://www.trustpilot.com/review/newworldcourtage.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Basé sur {reviewCount} avis
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
