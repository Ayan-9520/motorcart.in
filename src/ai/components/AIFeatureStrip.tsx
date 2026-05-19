import { AI_HUB_FEATURES } from "../data/ai-hub-data";

export function AIFeatureStrip() {
  return (
    <section className="container pb-8">
      <h2 className="ai-hub-section-title text-center">Intelligence layer</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Multi-agent mesh · workflows · hybrid GPT · live telemetry
      </p>
      <ul className="ai-features-grid">
        {AI_HUB_FEATURES.map((f) => (
          <li key={f.id}>
            <div className="ai-feature-item group">
              <span className="ai-feature-icon">
                <f.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </span>
              <span className="ai-feature-label">{f.label}</span>
              <span className="ai-feature-desc">{f.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
