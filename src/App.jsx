import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminGames from './pages/AdminGames.jsx';
import Cart from './pages/Cart.jsx';
import Catalog from './pages/Catalog.jsx';
import Checkout from './pages/Checkout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GameDetails from './pages/GameDetails.jsx';
import Learning from './pages/Learning.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Orders from './pages/Orders.jsx';
import Register from './pages/Register.jsx';

// App owns route composition. Each page stays focused on one workflow.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="games" element={<Catalog />} />
        <Route path="games/:id" element={<GameDetails />} />
        <Route path="learn" element={<Learning />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="admin/games" element={<AdminGames />} />
        </Route>

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
