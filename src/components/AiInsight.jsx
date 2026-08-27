import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiInsight({ markdown }) {
  return (
    <section className="insight">
      <div className="insight-header">
        <span className="insight-badge">AI Reflection</span>
        <span className="insight-note">Grounded only in the verses retrieved below</span>
      </div>
      <div className="insight-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </section>
  );
}