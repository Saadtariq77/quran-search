export default function ReflectionCard({ text }) {
  return (
    <section className="reflection">
      <div className="reflection-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="2.6" fill="currentColor" />
        </svg>
      </div>
      <div>
        <span className="reflection-label">Reflection</span>
        <p className="reflection-text">{text}</p>
      </div>
    </section>
  );
}