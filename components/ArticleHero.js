import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { headingFont } from "@/lib/fonts";
import PhotoHero from "@/components/PhotoHero";

function initials(name) {
  if (!name) return "";
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

// One item in the byline's meta bar — an uppercase brand-navy eyebrow label
// over a bold value, matching the eyebrow style used elsewhere on the site
// (ArticleSidebar's "À lire aussi", the mega-menu's section headings).
function MetaItem({ label, value, href }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-l border-gray-200 pl-6 first:border-l-0 first:pl-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand)]">{label}</span>
      {href ? (
        <Link href={href} className="w-fit text-[13px] font-semibold text-[var(--color-text)] hover:text-[var(--color-brand)] hover:underline">
          {value}
        </Link>
      ) : (
        <span className="text-[13px] font-semibold text-[var(--color-text)]">{value}</span>
      )}
    </div>
  );
}

// Hero photo for an article, picked from the product it belongs to.
function defaultImages(categoryHref = "") {
  if (categoryHref.includes("taxi")) return { image: "/heroes/taxi-desktop.webp", mobileImage: "/heroes/taxi-mobile.webp" };
  if (categoryHref.includes("pro-auto") || categoryHref.includes("garag")) return { image: "/heroes/garage-desktop.webp", mobileImage: "/heroes/garage-mobile.webp" };
  if (categoryHref.includes("actualites")) return { image: "/sections/who-we-are.webp" };
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
  subtitle,     // one line under the title, in the hero
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
      <PhotoHero tone="neutral" breadcrumb={trail} title={title} subtitle={subtitle} {...images} />

      <div className="mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-8 flex flex-col gap-5" style={{ maxWidth }}>

        {/* Byline card — thin brand-navy top bar over a white card, same
            motif as a guide's bullet-card blocks, instead of a flat gray
            box. Author/editor/reviewer/date/reading-time sit in one
            hairline-divided meta bar rather than a half-empty grid. */}
        <div className="border border-gray-200">
          <div className="h-1.5 bg-[var(--color-brand)]" aria-hidden="true" />
          <div className="flex flex-col gap-5 bg-white p-6">

            <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
              {author?.name && (
                <div className="flex items-center gap-3 border-l border-gray-200 pl-6 first:border-l-0 first:pl-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{initials(author.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand)]">Auteur</span>
                    {author.href ? (
                      <Link href={author.href} className="w-fit text-[13px] font-semibold text-[var(--color-text)] hover:text-[var(--color-brand)] hover:underline">
                        {author.name}
                      </Link>
                    ) : (
                      <span className="text-[13px] font-semibold text-[var(--color-text)]">{author.name}</span>
                    )}
                  </div>
                </div>
              )}
              <MetaItem label="Édité par" value={editor?.name} href={editor?.href} />
              <MetaItem label="Vérifié par" value={reviewer?.name} href={reviewer?.href} />
              <MetaItem label="Mis à jour" value={updatedDate} />
              <MetaItem label="Lecture" value={readingTime} />
            </div>

            {expertReviewed && (
              <div className="inline-flex w-fit items-center gap-1.5 bg-[var(--color-brand)] text-white text-xs font-bold px-3 py-1.5">
                <CheckCircle2 size={14} aria-hidden="true" />
                Vérifié par un expert
              </div>
            )}

            <p className="border-t border-gray-100 pt-4 text-xs font-normal text-gray-500 leading-relaxed">
              Le contenu publié par New World Courtage respecte des règles strictes d&apos;exactitude, de fiabilité et d&apos;intégrité éditoriale. Chaque information est vérifiée et mise à jour afin de fournir des contenus clairs, objectifs et conformes aux réglementations en vigueur.
            </p>
          </div>
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
