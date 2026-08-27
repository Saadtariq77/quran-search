export default function ResultsMeta({ data }) {
  return (
    <div className="results-meta">
      <div className="meta-left">
        <strong>{data.ayats.length}</strong> verse{data.ayats.length === 1 ? "" : "s"} for
        <em> “{data.userQuery}”</em>
      </div>
      {data.themes?.length > 0 && (
        <div className="theme-list">
          {data.themes.map((t) => (
            <span key={t} className="theme-pill">
              {t}
            </span>
          ))}
        </div>
      )}
      <span className="meta-time">{data.tookMs} ms</span>
    </div>
  );
}