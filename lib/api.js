// Trailing slash stripped — a production env var set with one (e.g.
// "https://backend.newworldcourtage.fr/") would otherwise double up with the
// leading "/" on every call below ("...fr//questionnaires/...").
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");
// Server-side only — used in getServerSideProps / getStaticProps
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

// Published guides of one category, from the backend (runs server-side).
// Returns raw API objects: { id, title, slug, intro, ... }. Only that
// category's guides: a product page never shows another product's guides.
export async function fetchGuideCardsByCategory(category) {
  const url = new URL(`${BACKEND_URL}/api/guides/`);
  url.searchParams.set("category", category);
  url.searchParams.set("status", "Publié");
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchGuideCardsByCategory failed (${res.status})`);
  return res.json();
}

// Fetch a single published guide by slug from the backend (runs server-side).
// Returns null if the guide doesn't exist or isn't published.
export async function fetchGuideBySlug(slug) {
  const res = await fetch(`${BACKEND_URL}/api/guides/slug/${slug}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetchGuideBySlug failed (${res.status})`);
  const guide = await res.json();
  if (guide.status !== "Publié") return null;
  return guide;
}

// Which guide categories each site section serves, so a guide only opens
// under its own product's URL (a garage guide never at /assurance-transport/…).
const GUIDE_SECTION_CATEGORIES = {
  "assurance-transport": ["Assurance Taxi", "Assurance VTC"],
  "assurance-pro-auto": ["Assurance Garage"],
  "actualites": ["Actualités"],
};

// getServerSideProps for a section's guide page: 404 unless the guide exists,
// is published and belongs to that section. Also fetches up to 4 other
// published guides in the same category (for the article sidebar's "À lire
// aussi" list) — same category rather than the whole section, so a VTC
// article recommends other VTC reading, not taxi guides, inside a shared
// taxi+VTC section.
export async function guidePageProps(section, slug) {
  const guide = await fetchGuideBySlug(slug).catch(() => null);
  if (!guide || !GUIDE_SECTION_CATEGORIES[section]?.includes(guide.category)) return { notFound: true };

  const sameCategory = await fetchGuideCardsByCategory(guide.category).catch(() => []);
  const relatedGuides = sameCategory
    .filter((g) => g.id !== guide.id)
    .slice(0, 4)
    .map((g) => ({
      title: g.title,
      intro: g.intro,
      image_url: g.image_url,
      reading_time: g.reading_time,
      href: `/${section}/${g.slug}/`,
    }));

  return { props: { guide, relatedGuides } };
}

export async function fetchQuestionnaire(slug) {
  const res = await fetch(`${API_URL}/questionnaires/${slug}/questions`);
  if (!res.ok) throw new Error(`Failed to load questionnaire "${slug}" (${res.status})`);
  const questions = await res.json();
  return questions.map(mapQuestionToStep);
}

export async function createLead(payload) {
  const res = await fetch(`${API_URL}/api/leads/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create lead (${res.status})`);
  return res.json();
}

// XMLHttpRequest instead of fetch() — fetch has no cross-browser way to
// observe request-body (upload) progress, only response-body progress,
// so a per-file progress bar needs the older API's xhr.upload.onprogress.
export function uploadLeadDocument({ leadId, uploadToken, documentLabel, file, onProgress }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("document_label", documentLabel);
  formData.append("upload_token", uploadToken);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/api/leads/${leadId}/documents`);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total);
    };
    xhr.onload = () => {
      let body = null;
      try { body = JSON.parse(xhr.responseText); } catch {}
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(body);
      } else {
        reject(new Error(body?.detail || `Failed to upload document (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Failed to upload document (network error)"));
    xhr.send(formData);
  });
}

export async function fetchAvailability(date) {
  const res = await fetch(`${API_URL}/api/consultants/availability?date=${date}`);
  if (!res.ok) throw new Error(`Failed to load availability (${res.status})`);
  return res.json();
}

export async function bookConsultation({ date, time, leadId }) {
  const res = await fetch(`${API_URL}/api/consultants/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, lead_id: leadId ?? null }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || `Failed to book consultation (${res.status})`);
  }
  return res.json();
}

function mapQuestionToStep(q) {
  return {
    id: q.id,
    key: q.key,
    section: q.section || undefined,
    type: q.type,
    card: q.card,
    gate: q.gate,
    products: q.products || undefined,
    parentKey: q.parent_key || undefined,
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
