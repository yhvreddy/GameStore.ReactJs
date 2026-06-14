import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { orderApi } from '../services/gameStoreApi.js';
import { formatCurrency } from '../utils/formatters.js';

export default function Checkout() {
  useDocumentTitle('Checkout');

  const { items, total, clearCart } = useCart();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await orderApi.checkout();
      await clearCart();
      setMessage('Order placed successfully.');
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-panel">
        <p className="eyebrow">Confirm order</p>
        <h1>Checkout</h1>
        <p className="lead">{items.length} item(s), total {formatCurrency(total)}</p>
        <StatusMessage type="success">{message}</StatusMessage>
        <StatusMessage type="error">{error}</StatusMessage>
        <button type="button" className="button primary full" disabled={loading || items.length === 0} onClick={handleCheckout}>
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
        <Link className="button ghost full" to="/orders">View My Orders</Link>
      </div>
    </section>
  );
}
