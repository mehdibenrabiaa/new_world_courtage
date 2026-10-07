import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { headingFont } from "@/lib/fonts";
import PhotoHero from "@/components/PhotoHero";

function initials(name) {
  if (!name) return "";
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function BylineName({ label, name, href }) {
  if (!name) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-[var(--color-text)]">{label}</span>
      {href ? (
        <Link href={href} className="text-xs text-[var(--color-brand)] underline w-fit">
          {name}
        </Link>
      ) : (
        <span className="text-xs text-gray-600 underline">{name}</span>
      )}
    </div>
  );
}

// Hero photo for an article, picked from the product it belongs to.
function defaultImages(categoryHref = "") {
  if (categoryHref.includes("taxi")) return { image: "/heroes/taxi-desktop.webp", mobileImage: "/heroes/taxi-mobile.webp" };
  if (categoryHref.includes("pro-auto") || categoryHref.includes("garag")) return { image: "/heroes/garage-desktop.webp", mobileImage: "/heroes/garage-mobile.webp" };
  return { image: "/pages/driving-car.jpg" };
}

// Header for articles & guides (informational pages): the shared photo hero in its
// neutral (black) tone with the title and breadcrumb, then the byline card
// (author/editor/reviewer, updated date, reading time, expert-reviewed badge,
// editorial-standards disclaimer) and the intro paragraph.
export default function ArticleHero({
  category,
  categoryHref,
  title,
  intro,
  author,       // { name, href, avatar }
  editor,       // { name, href }
  reviewer,     // { name, href }
  updatedDate,
  readingTime,
  expertReviewed = true,
  maxWidth = "52rem",
  image,
  mobileImage,
  breadcrumb,
}) {
  const images = image ? { image, mobileImage } : defaultImages(categoryHref);
  const trail = breadcrumb ?? [
    { label: "Accueil", href: "/" },
    ...(category ? [{ label: category, href: categoryHref }] : []),
    { label: title },
  ];

  return (
    <header className="w-full">
      <PhotoHero tone="neutral" breadcrumb={trail} title={title} {...images} />

      <div className="mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-8 flex flex-col gap-5" style={{ maxWidth }}>

        {/* Byline card */}
        <div className="bg-[var(--color-light)] p-6 flex flex-col gap-5">

          {/* Row 1 — author (avatar + name), edited, reviewed */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {author?.name && (
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{initials(author.name)}</AvatarFallback>
                </Avatar>
                <BylineName label="Auteur" name={author.name} href={author.href} />
              </div>
            )}
            {editor?.name && <BylineName label="Édité par" name={editor.name} href={editor.href} />}
            {reviewer?.name && <BylineName label="Vérifié par" name={reviewer.name} href={reviewer.href} />}
          </div>

          {/* Row 2 — updated date, (empty), reading time */}
          {(updatedDate || readingTime) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {updatedDate && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[var(--color-text)]">Mis à jour</span>
                  <span className="text-xs text-gray-600">{updatedDate}</span>
                </div>
              )}
              <div className="hidden sm:block" aria-hidden="true" />
              {readingTime && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[var(--color-text)]">Temps de lecture</span>
                  <span className="text-xs text-gray-600">{readingTime}</span>
                </div>
              )}
            </div>
          )}

          {/* Row 3 — expert-reviewed badge */}
          {expertReviewed && (
            <div className="inline-flex w-fit items-center gap-1.5 bg-[var(--color-brand)] text-white text-xs font-bold px-3 py-1.5">
              <CheckCircle2 size={14} aria-hidden="true" />
              Vérifié par un expert
            </div>
          )}

          {/* Row 4 — disclaimer */}
          <p className="text-xs font-normal text-gray-500 leading-relaxed">
            Le contenu publié par New World Courtage respecte des règles strictes d&apos;exactitude, de fiabilité et d&apos;intégrité éditoriale. Chaque information est vérifiée et mise à jour afin de fournir des contenus clairs, objectifs et conformes aux réglementations en vigueur.
          </p>
        </div>

        {/* Intro paragraph — sits after the byline card */}
        {intro && (
          <p className={`text-2xl sm:text-[28px] leading-[1.2] text-[var(--color-text)] my-6 ${headingFont.className}`}>
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
