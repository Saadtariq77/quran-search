export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 3 L34 11 V29 L20 37 L6 29 V11 Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 9 L29 14 V24 L20 29 L11 24 V14 Z" stroke="currentColor" strokeWidth="1.2" opacity=".65" />
              <circle cx="20" cy="19" r="3.2" fill="currentColor" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Baitussalam</span>
            <span className="brand-sub">Quran Search</span>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#about">About</a>
          <a href="https://baitussalam.org" target="_blank" rel="noreferrer" className="nav-cta">
            Baitussalam
          </a>
        </nav>
      </div>
    </header>
  );
}