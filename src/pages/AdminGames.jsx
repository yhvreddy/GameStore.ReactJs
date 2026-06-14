import { useEffect, useState } from 'react';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { catalogApi } from '../services/gameStoreApi.js';
import { formatCurrency, readGameName } from '../utils/formatters.js';

const emptyForm = {
  name: '',
  genreId: '',
  price: '',
  releaseDate: '',
};

export default function AdminGames() {
  useDocumentTitle('Admin Games');

  const gamesRequest = useAsync(catalogApi.getGames, []);
  const genresRequest = useAsync(catalogApi.getGenres, []);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const games = Array.isArray(gamesRequest.data) ? gamesRequest.data : [];
  const genres = Array.isArray(genresRequest.data) ? genresRequest.data : [];

  useEffect(() => {
    if (!form.genreId && genres[0]?.id) {
      setForm((current) => ({ ...current, genreId: String(genres[0].id) }));
    }
  }, [form.genreId, genres]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function editGame(game) {
    setEditingId(game.id);
    setForm({
      name: readGameName(game),
      genreId: String(game.genreId ?? game.genre?.id ?? ''),
      price: String(game.price ?? ''),
      releaseDate: game.releaseDate?.slice(0, 10) ?? '',
    });
  }

  async function saveGame(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      name: form.name,
      genreId: Number(form.genreId),
      price: Number(form.price),
      releaseDate: form.releaseDate || null,
    };

    try {
      if (editingId) {
        await catalogApi.updateGame(editingId, payload);
        setMessage('Game updated.');
      } else {
        await catalogApi.createGame(payload);
        setMessage('Game created.');
      }

      setEditingId(null);
      setForm(emptyForm);
      await gamesRequest.execute();
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  async function deleteGame(id) {
    setError('');
    setMessage('');

    try {
      await catalogApi.deleteGame(id);
      setMessage('Game deleted.');
      await gamesRequest.execute();
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  return (
    <div className="admin-layout">
      <form className="form-panel" onSubmit={saveGame}>
        <p className="eyebrow">Admin</p>
        <h1>{editingId ? 'Edit Game' : 'Create Game'}</h1>
        <label>Name<input name="name" value={form.name} onChange={updateField} required /></label>
        <label>Genre
          <select name="genreId" value={form.genreId} onChange={updateField} required>
            <option value="">Choose genre</option>
            {genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </label>
        <label>Price<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} required /></label>
        <label>Release Date<input name="releaseDate" type="date" value={form.releaseDate} onChange={updateField} required /></label>
        <StatusMessage type="success">{message}</StatusMessage>
        <StatusMessage type="error">{error}</StatusMessage>
        <button className="button primary full" type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <section className="table-panel">
        <h2>Existing Games</h2>
        {games.map((game) => (
          <div className="cart-row" key={game.id}>
            <div><strong>{readGameName(game)}</strong><p className="muted">{formatCurrency(game.price)}</p></div>
            <button type="button" className="button ghost" onClick={() => editGame(game)}>Edit</button>
            <button type="button" className="button danger" onClick={() => deleteGame(game.id)}>Delete</button>
          </div>
        ))}
        {gamesRequest.loading && <StatusMessage>Loading games...</StatusMessage>}
      </section>
    </div>
  );
}
