export default function AyatExploreSection({ data, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="explore-panel loading">
        <div className="explore-header">
          <div className="explore-title-wrap">
            <span className="explore-badge">Tafsir & Hadith Exploration</span>
            <span className="explore-sub">Connecting to authentic sources...</span>
          </div>
        </div>
        <div className="explore-skeleton">
          <div className="explore-skel-line wide"></div>
          <div className="explore-skel-line med"></div>
          <div className="explore-skel-box"></div>
          <div className="explore-skel-box"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="explore-panel error">
        <div className="explore-error-msg">
          <p>⚠️ {error}</p>
          {onRetry && (
            <button className="explore-retry-btn" onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { explanation, historicalContext, relatedHadiths, authenticSources, degraded } = data;

  return (
    <div className="explore-panel">
      <div className="explore-header">
        <div className="explore-title-wrap">
          <span className="explore-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />
            </svg>
            Tafsir, Historical Context & Hadith
          </span>
          <span className="explore-sub">
            Verified classical references • Anti-hallucination grounded
          </span>
        </div>
      </div>

      {degraded && (
        <div className="explore-degraded-note">
          <span>Notice: AI service was running in fallback mode; detailed insights may be brief.</span>
        </div>
      )}

      {/* 1. Core AI Explanation */}
      {explanation && (
        <div className="explore-section">
          <h4 className="explore-section-title">
            <span className="title-icon">📖</span>
            Explanation & Practical Lessons
          </h4>
          <div className="explore-text">
            {explanation.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      )}

      {/* 2. Historical Context & Asbab al-Nuzul */}
      {historicalContext && (
        <div className="explore-section">
          <div className="explore-section-header">
            <h4 className="explore-section-title">
              <span className="title-icon">📜</span>
              Historical Context & Asbab al-Nuzul
            </h4>
            {historicalContext.tafsirSource && (
              <span className="source-citation-badge">
                Source: {historicalContext.tafsirSource}
              </span>
            )}
          </div>
          <div className="history-card">
            {historicalContext.event && (
              <div className="history-event-title">{historicalContext.event}</div>
            )}
            <p className="history-details">{historicalContext.details}</p>
          </div>
        </div>
      )}

      {/* 3. Related Ahadees */}
      {relatedHadiths && relatedHadiths.length > 0 && (
        <div className="explore-section">
          <h4 className="explore-section-title">
            <span className="title-icon">📚</span>
            Related Ahadees
          </h4>
          <div className="hadith-list">
            {relatedHadiths.map((h, i) => (
              <div key={i} className="hadith-card">
                <div className="hadith-header">
                  {h.narrator && <span className="hadith-narrator">{h.narrator}</span>}
                  {h.sourceBook && <span className="hadith-source-badge">{h.sourceBook}</span>}
                </div>
                <blockquote className="hadith-text">
                  "{h.hadithText}"
                </blockquote>
                {h.connection && (
                  <div className="hadith-connection">
                    <strong>Connection to Verse:</strong> {h.connection}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Authentic Sources Referenced */}
      {authenticSources && authenticSources.length > 0 && (
        <div className="explore-sources">
          <span className="sources-label">Referenced Classical Books:</span>
          <div className="sources-pills">
            {authenticSources.map((source, i) => (
              <span key={i} className="source-pill">
                ✓ {source}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}