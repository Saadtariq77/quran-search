import { useState } from "react";
import { surahName, surahArabic } from "../data/surahs";

export default function AyatCard({ ayat, index }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = `${surahName(ayat.surahNo)} ${ayat.surahNo}:${ayat.ayatNo}\n\n${ayat.translation}${
      ayat.translationUrdu ? `\n\n${ayat.translationUrdu}` : ""
    }`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="ayat-card" style={{ animationDelay: `${index * 70}ms` }}>
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

        <button className="copy-btn" onClick={copy} aria-label="Copy verse">
          {copied ? "✓ Copied" : "Copy"}
        </button>
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
    </article>
  );
}