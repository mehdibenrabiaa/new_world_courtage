const LOGOS = [
  { id: "axa", name: "AXA", src: "/insurances_logos/AXA_Versicherungen_Logo.svg" },
  { id: "maif", name: "MAIF", src: "/insurances_logos/Logo_Maif_2019.svg" },
  { id: "allianz", name: "Allianz", src: "/insurances_logos/Allianz.svg" },
  { id: "groupama", name: "Groupama", src: "/insurances_logos/Logo_Groupama_2024.svg" },
  { id: "generali", name: "Generali", src: "/insurances_logos/Assicurazioni_Generali.svg" },
  { id: "swisslife", name: "Swiss Life", src: "/insurances_logos/SLHN.SW_BIG.svg" },
  { id: "gmf", name: "GMF", src: "/insurances_logos/GMF_logo.svg" },
];

export default function Partners() {
  return (
    <section className="w-full py-10 lg:py-14">
      <div className="px-4 lg:px-12 2xl:px-24">

        <p className="text-center text-[16px] font-normal text-gray-500 mb-8 max-w-lg mx-auto">
          Nous collaborons avec plus de 100 compagnies pour trouver la meilleure offre pour vous !
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {LOGOS.map(({ id, name, src }) => (
            <div key={id} className="shrink-0 h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <img
                src={src}
                alt={name}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
