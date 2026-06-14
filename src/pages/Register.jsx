import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { roleApi } from '../services/gameStoreApi.js';

export default function Register() {
  useDocumentTitle('Register');

  const navigate = useNavigate();
  const { register } = useAuth();
  const rolesRequest = useAsync(roleApi.getRoles, []);
  const roles = Array.isArray(rolesRequest.data) ? rolesRequest.data : [];
  const customerRole = roles.find((role) => role.slug === 'customer' || role.name === 'Customer') ?? roles[0];
  const [form, setForm] = useState({ fullName: '', email: '', password: '', roleId: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const roleId = Number(form.roleId || customerRole?.id);
    if (!roleId) {
      setError('Role data is still loading. Please try again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register({ ...form, roleId });
      navigate('/games');
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-page">
      <form className="form-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">Create account</p>
        <h1>Register</h1>
        <label>Full Name<input name="fullName" value={form.fullName} onChange={updateField} required /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
        <label>Role
          <select name="roleId" value={form.roleId || customerRole?.id || ''} onChange={updateField}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </label>
        <StatusMessage type="error">{rolesRequest.error}</StatusMessage>
        <StatusMessage type="error">{error}</StatusMessage>
        <button className="button primary full" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        <p className="muted">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
