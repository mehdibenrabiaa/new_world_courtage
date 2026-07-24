const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
