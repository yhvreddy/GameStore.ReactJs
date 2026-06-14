import { Link } from 'react-router-dom';
import { formatCurrency, readGameName, readGamePrice, readGenreName } from '../utils/formatters.js';

const coverThemes = ['cover-a', 'cover-b', 'cover-c', 'cover-d'];

export default function GameCard({ game, onAddToCart, disabled }) {
  const title = readGameName(game);
  const theme = coverThemes[Number(game.id ?? 0) % coverThemes.length];

  return (
    <article className="game-card">
      <div className={`game-cover ${theme}`} aria-hidden="true">
        <span>{title.slice(0, 2).toUpperCase()}</span>
      </div>

      <div className="game-card-body">
        <p className="eyebrow">{readGenreName(game)}</p>
        <h3>{title}</h3>
        <p className="muted">{game.description ?? 'Explore this title and add it to your learning cart.'}</p>

        <div className="card-footer">
          <strong>{formatCurrency(readGamePrice(game))}</strong>
          <div className="inline-actions">
            <Link className="button ghost" to={`/games/${game.id}`}>View</Link>
            <button type="button" className="button primary" disabled={disabled} onClick={() => onAddToCart(game.id)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
