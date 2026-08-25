import Head from "next/head";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ArticleHero from "@/components/ArticleHero";
import ArticleSection from "@/components/ArticleSection";
import AccentCardGrid from "@/components/AccentCardGrid";
import ReadyCta from "@/components/ReadyCta";
import CtaButton from "@/components/CtaButton";
import { fetchGuideBySlug } from "@/lib/api";

export async function getServerSideProps({ params }) {
  const guide = await fetchGuideBySlug(params.slug).catch(() => null);
  if (!guide) return { notFound: true };
  return { props: { guide } };
}

function PageBreadcrumb({ category, categoryHref, title }) {
  return (
    <Breadcrumb className="px-4 sm:px-8 lg:px-16 2xl:px-24 pt-6 pb-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {categoryHref ? (
            <BreadcrumbLink href={categoryHref}>{category}</BreadcrumbLink>
          ) : (
            <span>{category}</span>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-[240px] truncate">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// A guide's CTA href is authored relative to the domain root (e.g. "assurance-transport/taxi"),
// with or without a leading slash — normalize to always resolve from root, never relative to the
// current page. Absolute URLs pass through untouched.
function toRootPath(href) {
  if (!href) return "#";
  if (/^https?:\/\//i.test(href) || href.startsWith("/")) return href;
  return `/${href}`;
}

function Block({ block }) {
  if (block.type === "section") {
    return (
      <ArticleSection title={block.title} titleFont={block.titleFont}>
        <p style={{ whiteSpace: "pre-line" }}>{block.content}</p>
      </ArticleSection>
    );
  }
  if (block.type === "accent-card") {
    return (
      <AccentCardGrid
        title={block.title}
        cols={block.cols}
        items={block.items.map(({ heading, body }) => ({
          heading,
          body: <p style={{ whiteSpace: "pre-line" }}>{body}</p>,
        }))}
      />
    );
  }
  if (block.type === "paragraph") {
    return (
      <p className="text-[15px] text-gray-600 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
        {block.content}
      </p>
    );
  }
  if (block.type === "cta") {
    return (
      <div className="py-6 flex flex-col items-center text-center gap-5">
        <p className="text-xl sm:text-2xl font-semibold text-[var(--color-text)]">
          {block.text}
        </p>
        <CtaButton href={toRootPath(block.href)} label={block.buttonLabel} className="shrink-0" />
      </div>
    );
  }
  if (block.type === "bullet-card") {
    return (
      <div className="overflow-hidden rounded-b-[var(--radius)]">
        {block.topLine !== false && <div className="h-2 bg-[var(--color-brand)]" />}
        <div className="bg-[var(--color-light)] p-6 flex flex-col gap-3">
          {block.title && <h3 className="text-[15px] font-semibold text-[#131212] leading-snug">{block.title}</h3>}
          <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] text-gray-600 leading-relaxed">
            {block.items.map((item) => <li key={item.id}>{item.text}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full border-collapse text-[15px]">
          <thead>
            <tr className="bg-[var(--color-brand)]">
              {block.headers.map((h, i) => (
                <th key={i} className="p-3 text-left font-semibold text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 odd:bg-white even:bg-[var(--color-light)]">
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`p-3 text-gray-600 tabular-nums ${i === 0 ? "font-medium text-[var(--color-text)]" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function GuidePage({ guide }) {
  const canonical = `https://www.newworldcourtage.fr/assurance-transport/${guide.slug}/`;

  return (
    <>
      <Head>
        <title>{`${guide.title} — New World Courtage`}</title>
        {guide.intro && <meta name="description" content={guide.intro} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
      </Head>

      <main className="bg-white">
        <PageBreadcrumb
          category={guide.category}
          categoryHref={guide.category_href}
          title={guide.title}
        />

        <ArticleHero
          category={guide.category}
          categoryHref={guide.category_href}
          title={guide.title}
          intro={guide.intro}
          author={{ name: guide.author_name, avatar: guide.author_avatar }}
          editor={{ name: guide.editor_name }}
          reviewer={{ name: guide.reviewer_name }}
          updatedDate={guide.updated_date}
          readingTime={guide.reading_time}
          expertReviewed={Boolean(guide.reviewer_name)}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 flex flex-col gap-10">
          {guide.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}

          <p className="text-[15px] text-gray-600 leading-relaxed">
            Vous voulez comparer les offres adaptées à votre situation ?{" "}
            <Link href="/contact/" className="text-[var(--color-brand)] hover:underline">Contactez nos conseillers</Link>{" "}
            ou{" "}
            <Link href="/assurance-transport/" className="text-[var(--color-brand)] hover:underline">obtenez votre devis gratuit</Link>.
          </p>
        </div>

        <ReadyCta />
      </main>
    </>
  );
}
