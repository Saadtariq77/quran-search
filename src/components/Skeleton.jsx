export default function Skeleton() {
  return (
    <div className="skeleton-wrap">
      <div className="sk sk-insight" />
      {[0, 1, 2].map((i) => (
        <div className="sk sk-card" key={i} style={{ animationDelay: `${i * 120}ms` }}>
          <div className="sk-line sk-w30" />
          <div className="sk-line sk-w95" />
          <div className="sk-line sk-w85" />
          <div className="sk-line sk-w60" />
        </div>
      ))}
    </div>
  );
}