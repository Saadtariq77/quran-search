import { useEffect, useRef } from "react";

export default function SearchBar({ value, onChange, onSubmit, loading }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="search-shell">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Ask anything — patience, forgiveness, why do I feel lost…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
          aria-label="Search the Quran"
        />

        {value && !loading && (
          <button type="button" className="clear-btn" onClick={() => onChange("")} aria-label="Clear">
            ×
          </button>
        )}

        <button type="submit" className="search-btn" disabled={loading || !value.trim()}>
          {loading ? <span className="spinner" /> : "Search"}
        </button>
      </div>
      <p className="search-hint">
        Press <kbd>/</kbd> to focus · results are drawn from a verified translation database
      </p>
    </form>
  );
}