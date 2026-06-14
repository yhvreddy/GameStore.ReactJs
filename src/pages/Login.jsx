import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Login() {
  useDocumentTitle('Login');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form);
      navigate(location.state?.from ?? '/games');
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-page">
      <form className="form-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
        <StatusMessage type="error">{error}</StatusMessage>
        <button className="button primary full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="muted">New here? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
}
