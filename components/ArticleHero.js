import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { libreCaslon } from "@/lib/fonts";

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

// Reusable header/hero for articles & guides pages — category tag, serif
// title, then a byline card (author/editor/reviewer, updated date, reading
// time, expert-reviewed badge, editorial-standards disclaimer).
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
}) {
  const categoryClass = "text-sm font-semibold text-gray-500";

  return (
    <header className="w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-8 flex flex-col gap-5" style={{ maxWidth }}>

        {/* Category tag */}
        {category && (
          <div className="flex justify-start">
            {categoryHref ? (
              <Link href={categoryHref} className={categoryClass}>{category}</Link>
            ) : (
              <span className={categoryClass}>{category}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className={`text-[45px] leading-[1.15] text-[var(--color-text)] ${libreCaslon.className}`}>
          {title}
        </h1>

        {/* Byline card */}
        <div className="bg-[var(--color-light)] rounded-xl p-6 flex flex-col gap-5">

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

          {/* Row 3 — filled expert-reviewed badge */}
          {expertReviewed && (
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold px-3 py-1.5">
              <CheckCircle2 size={14} />
              Vérifié par un expert
            </div>
          )}

          {/* Row 4 — disclaimer */}
          <p className="text-xs font-normal text-gray-500 leading-relaxed">
            Le contenu publié par New World Courtage respecte des règles strictes d&apos;exactitude, de fiabilité et d&apos;intégrité éditoriale. Chaque information est vérifiée et mise à jour afin de fournir des contenus clairs, objectifs et conformes aux réglementations en vigueur.
          </p>
        </div>

        {/* Intro paragraph — serif, sits after the byline card */}
        {intro && (
          <p className={`text-2xl sm:text-[28px] leading-[1.2] text-[var(--color-text)] my-6 text-center sm:text-left ${libreCaslon.className}`}>
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
