import { useState, useCallback } from "react";
import { surahName, surahArabic } from "../data/surahs";
import { exploreAyat } from "../api/quranApi";
import AyatExploreSection from "./AyatExploreSection";

export default function AyatCard({ ayat, index }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [exploreLoading, setExploreLoading] = useState(false);
  const [exploreData, setExploreData] = useState(null);
  const [exploreError, setExploreError] = useState(null);

  const copy = async () => {
    const text = `${surahName(ayat.surahNo)} ${ayat.surahNo}:${ayat.ayatNo}\n\n${ayat.translation}${
      ayat.translationUrdu ? `\n\n${ayat.translationUrdu}` : ""
    }`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const fetchExplore = useCallback(async () => {
    setExploreLoading(true);
    setExploreError(null);
    try {
      const res = await exploreAyat({
        surahNo: ayat.surahNo,
        ayatNo: ayat.ayatNo,
        translation: ayat.translation,
        translationUrdu: ayat.translationUrdu,
      });
      setExploreData(res);
    } catch (err) {
      setExploreError(err.message || "Failed to load explanation. Please check backend connection.");
    } finally {
      setExploreLoading(false);
    }
  }, [ayat.surahNo, ayat.ayatNo, ayat.translation, ayat.translationUrdu]);

  const handleToggleExplore = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
      if (!exploreData && !exploreLoading) {
        fetchExplore();
      }
    }
  };

  return (
    <article className={`ayat-card ${expanded ? "is-expanded" : ""}`} style={{ animationDelay: `${index * 70}ms` }}>
      <div className="ayat-head">
        <div className="ayat-ref">
          <span className="ref-badge">
            {ayat.surahNo}:{ayat.ayatNo}
          </span>
          <div className="ref-names">
            <span className="ref-en">{surahName(ayat.surahNo)}</span>
            <span className="ref-ar">{surahArabic(ayat.surahNo)}</span>
          </div>
        </div>

        <div className="ayat-actions">
          <button
            className={`explore-btn ${expanded ? "active" : ""} ${exploreLoading ? "loading" : ""}`}
            onClick={handleToggleExplore}
            aria-label="Explore more Tafsir and Hadith"
          >
            <span className="btn-icon">
              {exploreLoading ? (
                <svg className="spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              )}
            </span>
            <span>{exploreLoading ? "Exploring..." : (expanded ? "Hide Tafsir" : "Explore More")}</span>
          </button>

          <button className="copy-btn" onClick={copy} aria-label="Copy verse">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>

      <p className="ayat-en">{ayat.translation}</p>

      {ayat.translationUrdu && (
        <div className="ayat-ur-wrap">
          <span className="ur-label">اردو ترجمہ</span>
          <p className="ayat-ur" dir="rtl" lang="ur">
            {ayat.translationUrdu}
          </p>
        </div>
      )}

      {ayat.matchedConcepts?.length > 0 && (
        <div className="ayat-foot">
          <div className="concepts">
            {ayat.matchedConcepts.map((c) => (
              <span key={c} className="concept-tag">
                {c}
              </span>
            ))}
          </div>
          {typeof ayat.relevanceScore === "number" && (
            <span className="score" title="Relevance score">
              {ayat.relevanceScore.toFixed(1)}
            </span>
          )}
        </div>
      )}

      {expanded && (
        <AyatExploreSection
          data={exploreData}
          loading={exploreLoading}
          error={exploreError}
          onRetry={fetchExplore}
        />
      )}
    </article>
  );
}