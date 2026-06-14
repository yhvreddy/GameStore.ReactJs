import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Not Found');

  return (
    <section className="form-page">
      <div className="form-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <Link className="button primary full" to="/">Go Home</Link>
      </div>
    </section>
  );
}
