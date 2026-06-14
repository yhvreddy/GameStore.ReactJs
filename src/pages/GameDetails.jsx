import { Link, useParams } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { catalogApi } from '../services/gameStoreApi.js';
import { formatCurrency, formatDate, readGameName, readGamePrice, readGenreName } from '../utils/formatters.js';

export default function GameDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { data: game, loading, error } = useAsync(() => catalogApi.getGame(id), [id]);

  useDocumentTitle(game ? readGameName(game) : 'Game Details');

  if (loading) return <StatusMessage>Loading game...</StatusMessage>;
  if (error) return <StatusMessage type="error">{error}</StatusMessage>;
  if (!game) return null;

  return (
    <section className="details-layout">
      <div className="game-cover cover-large cover-b" aria-hidden="true">
        <span>{readGameName(game).slice(0, 2).toUpperCase()}</span>
      </div>
      <div>
        <p className="eyebrow">{readGenreName(game)}</p>
        <h1>{readGameName(game)}</h1>
        <p className="lead">{game.description ?? 'A GameStore catalog item loaded from the ASP.NET Core API.'}</p>
        <dl className="meta-list">
          <div><dt>Price</dt><dd>{formatCurrency(readGamePrice(game))}</dd></div>
          <div><dt>Release</dt><dd>{formatDate(game.releaseDate)}</dd></div>
          <div><dt>Game Id</dt><dd>{game.id}</dd></div>
        </dl>
        <div className="hero-actions">
          <button type="button" className="button primary" disabled={!isAuthenticated} onClick={() => addToCart(game.id, 1)}>
            Add to Cart
          </button>
          <Link className="button ghost" to="/games">Back</Link>
        </div>
      </div>
    </section>
  );
}
