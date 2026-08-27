import { useMemo, useRef, useState } from "react";
import { searchQuran } from "./api/quranApi";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SuggestionChips from "./components/SuggestionChips";
import ReflectionCard from "./components/ReflectionCard";
import AyatCard from "./components/AyatCard";
import ResultsMeta from "./components/ResultsMeta";
import StatusBanner from "./components/StatusBanner";
import Skeleton from "./components/Skeleton";
import EmptyState from "./components/EmptyState";
import "./style.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  const run = async (q) => {
    const term = (q ?? query).trim();
    if (!term) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await searchQuran(term, { signal: controller.signal });
      setData(result);
    } catch (e) {
      if (e.name !== "AbortError") {
        setError(e.message || "Something went wrong. Please try again.");
        setData(null);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  const pick = (s) => {
    setQuery(s);
    run(s);
  };

  const hasSearched = Boolean(data || error || loading);

  // Split into AI-chosen verses and the rest.
  // If the AI didn't run (degraded), everything falls into "primary".
  const { primary, secondary, aiRan } = useMemo(() => {
    if (!data?.ayats?.length) return { primary: [], secondary: [], aiRan: false };

    const selected = data.ayats.filter((a) => a.aiSelected);
    const others = data.ayats.filter((a) => !a.aiSelected);

    return selected.length > 0
      ? { primary: selected, secondary: others, aiRan: true }
      : { primary: data.ayats, secondary: [], aiRan: false };
  }, [data]);

  return (
    <div className="app">
      <Header />

      <main className={`hero ${hasSearched ? "hero-compact" : ""}`}>
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-content">
          {!hasSearched && (
            <>
              <p className="bismillah" dir="rtl" lang="ar">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <h1 className="hero-title">
                Find guidance in the <span>Qur'an</span>
              </h1>
              <p className="hero-sub">
                Describe what's on your mind. We'll surface the verses that speak to it —
                in English and Urdu.
              </p>
            </>
          )}

          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={() => run()}
            loading={loading}
          />

          {!hasSearched && <SuggestionChips onPick={pick} disabled={loading} />}
        </div>
      </main>

      <section className="results">
        {loading && <Skeleton />}

        {!loading && error && (
          <StatusBanner type="error">
            {error} — please check that the backend is running on port 8081.
          </StatusBanner>
        )}

        {!loading && data && (
          <>
            {data.degraded && (
              <StatusBanner type="warn">
                The AI service is busy right now, so explanations may be missing. The verses
                below come directly from our verified database.
              </StatusBanner>
            )}

            {data.ayats.length === 0 ? (
              <EmptyState query={data.userQuery} />
            ) : (
              <>
                <ResultsMeta data={data} />

                {data.reflection && <ReflectionCard text={data.reflection} />}

                <h2 className="section-title">
                  <span>{aiRan ? "Most Relevant" : "Matched Verses"}</span>
                </h2>

                <div className="ayat-list">
                  {primary.map((a, i) => (
                    <AyatCard
                      key={a.id ?? `${a.surahNo}:${a.ayatNo}`}
                      ayat={a}
                      index={i}
                    />
                  ))}
                </div>

                {secondary.length > 0 && (
                  <details className="other-matches">
                    <summary>
                      {secondary.length} other verse{secondary.length === 1 ? "" : "s"} matched
                      your keywords
                    </summary>
                    <div className="ayat-list">
                      {secondary.map((a, i) => (
                        <AyatCard
                          key={a.id ?? `${a.surahNo}:${a.ayatNo}`}
                          ayat={a}
                          index={i}
                        />
                      ))}
                    </div>
                  </details>
                )}
              </>
            )}
          </>
        )}
      </section>

      <footer className="site-footer" id="about">
        <div className="footer-inner">
          <p className="footer-lead">
            Verses are retrieved from a verified translation database. AI is used only to
            interpret your question and to explain relevance — never to generate scripture.
          </p>
          <p className="footer-meta">
            Built for <strong>Baitussalam</strong> · Not a source of religious rulings
          </p>
        </div>
      </footer>
    </div>
  );
}