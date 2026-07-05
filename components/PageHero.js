import { Libre_Caslon_Text } from "next/font/google";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function PageHero({ title, image = "/about-pic.jpg", mobileImage, imageAlt = "", titlePosition = "top", titleClassName = "" }) {
  return (
    <section className="w-full py-4">
      <div className="px-4 lg:px-12 2xl:px-24">
        <div className="relative w-full min-h-[340px] lg:min-h-[460px] overflow-hidden rounded-none lg:rounded-xl">

          <picture className="absolute inset-0 w-full h-full">
            {mobileImage && <source media="(max-width: 1023px)" srcSet={mobileImage} />}
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover object-center"
            />
          </picture>

          <div className={`relative z-10 h-full min-h-[340px] lg:min-h-[460px] flex flex-col ${titlePosition === "bottom" ? "justify-end" : ""}`}>
            <div className={`bg-white pl-4 sm:pl-6 pr-4 sm:pr-12 py-4 sm:py-6 w-full sm:w-[70%] ${titlePosition === "bottom" ? "rounded-tr-none sm:rounded-tr-[9999px]" : "rounded-br-none sm:rounded-br-[9999px]"}`}>
              <h1 className={`text-[8vw] sm:text-[36px] lg:text-[48px] text-[var(--color-text)] leading-[1.1] ${libreCaslon.className} ${titleClassName}`}>
                {title}
              </h1>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
