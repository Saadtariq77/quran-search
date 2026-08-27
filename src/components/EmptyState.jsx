export default function EmptyState({ query }) {
  return (
    <div className="empty">
      <div className="empty-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 6 L54 18 V46 L32 58 L10 46 V18 Z" stroke="currentColor" strokeWidth="1.4" opacity=".5" />
          <path d="M32 16 L45 23 V37 L32 44 L19 37 V23 Z" stroke="currentColor" strokeWidth="1.4" opacity=".8" />
        </svg>
      </div>
      <h3>No verses matched “{query}”</h3>
      <p>
        Try describing the idea in different words — for example <em>“patience”</em> instead of
        <em> “how do I cope”</em>, or a single concept rather than a long sentence.
      </p>
    </div>
  );
}