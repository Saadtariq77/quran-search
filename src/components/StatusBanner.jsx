export default function StatusBanner({ type = "warn", children }) {
  const icon = type === "error" ? "⚠" : "ⓘ";
  return (
    <div className={`banner banner-${type}`} role="status">
      <span className="banner-icon">{icon}</span>
      <span>{children}</span>
    </div>
  );
}