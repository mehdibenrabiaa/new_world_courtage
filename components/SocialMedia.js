import { Libre_Caslon_Text } from "next/font/google";
import { Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const LINKS = [
  { label: "Instagram",  href: "https://instagram.com/newworldcourtage",  icon: Instagram },
  { label: "Facebook",   href: "https://facebook.com/newworldcourtage",   icon: Facebook },
  { label: "LinkedIn",   href: "https://linkedin.com/company/newworldcourtage", icon: Linkedin },
  { label: "YouTube",    href: "https://youtube.com/@newworldcourtage",   icon: Youtube },
  { label: "X / Twitter", href: "https://twitter.com/newworldcourtage",  icon: Twitter },
];

export default function SocialMedia() {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="rounded-[20px] overflow-hidden flex flex-col lg:flex-row min-h-[480px]">

          {/* Left — image */}
          <div className="order-1 lg:w-1/2 h-[260px] lg:h-auto">
            <img
              src="/finished_scrolling.jpg"
              alt="Suivez New World Courtage"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right — content */}
          <div className="order-2 lg:w-1/2 bg-[var(--color-light)] px-8 py-10 lg:px-14 lg:py-14 flex flex-col justify-between gap-10">

            <div className="flex flex-col gap-5">
              <h2 className={`text-[8vw] sm:text-[42px] lg:text-[55px] leading-[1.1] text-[#131212] ${libreCaslon.className}`}>
                <span className="block">Suivez-nous</span>
                <em className={`block italic ${libreCaslon.className}`}>sur les réseaux.</em>
              </h2>
              <p className="text-base text-gray-600 max-w-lg leading-[26px] sm:leading-6">
                Actualités, conseils et bons plans assurance — rejoignez notre communauté.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group w-fit"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-gray-400 group-hover:bg-[var(--color-brand)] transition-colors duration-150">
                    <Icon size={18} className="text-[#131212] group-hover:text-white transition-colors duration-150" />
                  </span>
                  <span className="text-base font-medium text-[#131212] group-hover:text-[var(--color-brand)] transition-colors duration-150">
                    {label}
                  </span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
