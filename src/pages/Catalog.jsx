import { useMemo, useState } from 'react';
import GameCard from '../components/GameCard.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { catalogApi } from '../services/gameStoreApi.js';
import { readGameName, readGenreName } from '../utils/formatters.js';

export default function Catalog() {
  useDocumentTitle('Catalog');

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const debouncedSearch = useDebounce(search);

  const gamesRequest = useAsync(catalogApi.getGames, []);
  const genresRequest = useAsync(catalogApi.getGenres, []);

  const games = Array.isArray(gamesRequest.data) ? gamesRequest.data : [];
  const genres = Array.isArray(genresRequest.data) ? genresRequest.data : [];

  const filteredGames = useMemo(() => {
    const text = debouncedSearch.trim().toLowerCase();
    const selectedGenre = genres.find((item) => String(item.id) === genre);

    return games.filter((game) => {
      const matchesSearch = readGameName(game).toLowerCase().includes(text);
      const gameGenreName = readGenreName(game);
      const matchesGenre = genre === 'all'
        || String(game.genreId ?? game.genre?.id ?? gameGenreName) === genre
        || gameGenreName === selectedGenre?.name
        || gameGenreName === genre;
      return matchesSearch && matchesGenre;
    });
  }, [debouncedSearch, games, genre, genres]);

  async function handleAddToCart(gameId) {
    if (!isAuthenticated) return;
    await addToCart(gameId, 1);
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Games</h1>
        </div>
        <div className="filters">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search games" />
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="all">All genres</option>
            {genres.map((item) => (
              <option key={item.id ?? item.name} value={String(item.id ?? item.name)}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <StatusMessage type="error">{gamesRequest.error || genresRequest.error}</StatusMessage>
      {gamesRequest.loading && <StatusMessage>Loading games...</StatusMessage>}

      <section className="game-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} onAddToCart={handleAddToCart} disabled={!isAuthenticated} />
        ))}
      </section>

      {!gamesRequest.loading && filteredGames.length === 0 && (
        <StatusMessage>No games matched your filters.</StatusMessage>
      )}
    </div>
  );
}
