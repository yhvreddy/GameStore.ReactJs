import { Link } from 'react-router-dom';
import LearningPanel from '../components/LearningPanel.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Dashboard() {
  useDocumentTitle('Dashboard');

  return (
    <div className="page-stack">
      <section className="hero-section">
        <div>
          <p className="eyebrow">React + ASP.NET Core</p>
          <h1>Practice React with a real GameStore workflow.</h1>
          <p>
            Browse games, authenticate, manage a cart, checkout, view orders, and study the React concepts behind each screen.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/games">Open Catalog</Link>
            <Link className="button ghost" to="/learn">Study Guide</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="console-card">
            <span>GET /games</span>
            <strong>React renders API data</strong>
          </div>
          <div className="console-card offset">
            <span>POST /checkout</span>
            <strong>State becomes workflow</strong>
          </div>
        </div>
      </section>

      <div className="panel-grid">
        <LearningPanel title="Beginner" concept="Components">
          Learn JSX, props, events, lists, forms, and conditional rendering.
        </LearningPanel>
        <LearningPanel title="Intermediate" concept="Hooks">
          Practice effects, custom hooks, context, route params, and local storage.
        </LearningPanel>
        <LearningPanel title="Job Ready" concept="API Flow">
          Connect to JWT APIs, handle loading states, and build protected workflows.
        </LearningPanel>
      </div>
    </div>
  );
}
