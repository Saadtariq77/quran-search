const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function searchQuran(query, { signal, maxAyats } = {}) {
  const res = await fetch(`${BASE_URL}/api/quran/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, maxAyats }),
    signal,
  });

  if (!res.ok) {
    let detail = `Server responded ${res.status}`;
    try {
      const body = await res.json();
      detail = body.message || body.error || detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail);
  }
  return res.json();
}
export async function exploreAyat({ surahNo, ayatNo, translation, translationUrdu }, { signal } = {}) {
  const res = await fetch(`${BASE_URL}/api/quran/explore`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ surahNo, ayatNo, translation, translationUrdu }),
    signal,
  });

  if (!res.ok) {
    let detail = `Server responded ${res.status}`;
    try {
      const body = await res.json();
      detail = body.message || body.error || detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail);
  }
  return res.json();
}
