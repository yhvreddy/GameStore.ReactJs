import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="GameStore home">
          <span className="brand-mark">GS</span>
          <span>GameStore</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/games">Catalog</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          {isAuthenticated && <NavLink to="/cart">Cart ({itemCount})</NavLink>}
          {isAuthenticated && <NavLink to="/orders">Orders</NavLink>}
          {isAuthenticated && <NavLink to="/logs">Logs</NavLink>}
          {isAuthenticated && <NavLink to="/admin/games">Admin</NavLink>}
        </nav>

        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <span className="user-chip">{user?.email}</span>
              <button type="button" className="button ghost" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="button ghost" to="/login">Login</NavLink>
              <NavLink className="button primary" to="/register">Register</NavLink>
            </>
          )}
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
