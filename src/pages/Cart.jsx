import { Link } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { formatCurrency } from '../utils/formatters.js';

export default function Cart() {
  useDocumentTitle('Cart');

  const { items, total, loading, error, refreshCart, updateCartItem, removeCartItem, clearCart } = useCart();

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Checkout flow</p>
          <h1>Cart</h1>
        </div>
        <button type="button" className="button ghost" onClick={refreshCart}>Refresh</button>
      </section>

      <StatusMessage type="error">{error}</StatusMessage>
      {loading && <StatusMessage>Loading cart...</StatusMessage>}

      <section className="table-panel">
        {items.map((item) => {
          const gameId = item.gameId ?? item.game?.id;
          const name = item.gameName ?? item.game?.name ?? item.name ?? `Game #${gameId}`;
          const price = Number(item.unitPrice ?? item.price ?? item.game?.price ?? 0);
          const quantity = Number(item.quantity ?? 1);

          return (
            <div className="cart-row" key={gameId}>
              <div><strong>{name}</strong><p className="muted">{formatCurrency(price)} each</p></div>
              <input type="number" min="1" value={quantity} onChange={(event) => updateCartItem(gameId, Number(event.target.value))} />
              <strong>{formatCurrency(price * quantity)}</strong>
              <button type="button" className="button danger" onClick={() => removeCartItem(gameId)}>Remove</button>
            </div>
          );
        })}

        {items.length === 0 && <StatusMessage>Your cart is empty.</StatusMessage>}
      </section>

      <section className="summary-bar">
        <strong>Total: {formatCurrency(total)}</strong>
        <div className="inline-actions">
          <button type="button" className="button ghost" disabled={items.length === 0} onClick={clearCart}>Clear</button>
          <Link className="button primary" to="/checkout">Checkout</Link>
        </div>
      </section>
    </div>
  );
}
