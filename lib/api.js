const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
// Server-side only — used in getServerSideProps / getStaticProps
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8001";

export async function fetchGuides(pageSlug) {
  const res = await fetch(`${API_URL}/guides/${pageSlug}`);
  if (!res.ok) throw new Error(`Failed to load guides for "${pageSlug}" (${res.status})`);
  const guides = await res.json();
  return guides.map(mapGuideToCard);
}

function mapGuideToCard(g) {
  return {
    image: g.image,
    imageAlt: g.image_alt || undefined,
    title: g.title,
    description: g.description,
    href: g.href,
  };
}

// Fetch published guides by category from the new backend (runs server-side).
// Returns raw API objects: { id, title, slug, intro, ... }
export async function fetchGuideCardsByCategory(category) {
  const url = new URL(`${BACKEND_URL}/api/guides/`);
  url.searchParams.set("category", category);
  url.searchParams.set("status", "Publié");
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchGuideCardsByCategory failed (${res.status})`);
  return await res.json();
}

export async function fetchQuestionnaire(slug) {
  const res = await fetch(`${API_URL}/questionnaires/${slug}/questions`);
  if (!res.ok) throw new Error(`Failed to load questionnaire "${slug}" (${res.status})`);
  const questions = await res.json();
  return questions.map(mapQuestionToStep);
}

function mapQuestionToStep(q) {
  return {
    id: q.id,
    key: q.key,
    section: q.section || undefined,
    type: q.type,
    card: q.card,
    uppercase: q.uppercase,
    eyebrow: q.eyebrow || undefined,
    question: q.question,
    inputType: q.input_type || undefined,
    placeholder: q.placeholder || undefined,
    hint: q.hint || undefined,
    optional: !q.required,
    options: q.options.map((o) => o.label),
    values: q.options.map((o) => o.value),
    rules: q.rules || [],
  };
}
