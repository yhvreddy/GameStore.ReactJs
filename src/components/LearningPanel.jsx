export default function LearningPanel({ title, concept, children }) {
  return (
    <section className="learning-panel">
      <p className="eyebrow">{concept}</p>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
