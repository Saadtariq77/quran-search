const SUGGESTIONS = [
  "patience in hardship",
  "forgiveness",
  "kindness to parents",
  "charity and giving",
  "seeking knowledge",
  "justice",
  "trust in Allah",
];

export default function SuggestionChips({ onPick, disabled }) {
  return (
    <div className="chips">
      <span className="chips-label">Try</span>
      {SUGGESTIONS.map((s) => (
        <button key={s} className="chip" onClick={() => onPick(s)} disabled={disabled}>
          {s}
        </button>
      ))}
    </div>
  );
}