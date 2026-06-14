import LearningPanel from '../components/LearningPanel.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

const topics = [
  ['Components', 'Reusable UI', 'Read GameCard, StatusMessage, and LearningPanel to see props in action.'],
  ['State', 'useState', 'Catalog filters and forms store user input in component state.'],
  ['Effects', 'useEffect', 'useAsync loads API data and useDocumentTitle updates the browser tab.'],
  ['Context', 'Global state', 'AuthContext and CartContext share data across pages.'],
  ['Routing', 'React Router', 'App.jsx maps URLs to pages and protects private routes.'],
  ['Performance', 'useMemo/useCallback', 'Catalog filters and Cart totals show practical derived data.'],
];

export default function Learning() {
  useDocumentTitle('Learn React');

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Study path</p>
          <h1>React topics covered</h1>
        </div>
      </section>

      <div className="panel-grid">
        {topics.map(([title, concept, description]) => (
          <LearningPanel key={title} title={title} concept={concept}>{description}</LearningPanel>
        ))}
      </div>
    </div>
  );
}
