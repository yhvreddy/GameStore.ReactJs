import { Link, useParams } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { orderApi } from '../services/gameStoreApi.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

function readOrderItems(order) {
  return order?.items ?? order?.orderItems ?? [];
}

// This page demonstrates route params: the :id segment from App.jsx becomes id here.
export default function OrderDetails() {
  const { id } = useParams();
  const { data: order, loading, error } = useAsync(() => orderApi.getMyOrder(id), [id]);
  const items = readOrderItems(order);

  useDocumentTitle(order ? `Order #${order.id}` : 'Order Details');

  if (loading) return <StatusMessage>Loading order details...</StatusMessage>;
  if (error) return <StatusMessage type="error">{error}</StatusMessage>;
  if (!order) return null;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Order details</p>
          <h1>Order #{order.id}</h1>
          <p className="muted">Placed on {formatDate(order.orderedAt ?? order.createdAt ?? order.orderDate)}</p>
        </div>
        <Link className="button ghost" to="/orders">Back to Orders</Link>
      </section>

      <section className="summary-bar">
        <strong>Total: {formatCurrency(order.totalAmount ?? order.total ?? 0)}</strong>
        <span className="muted">{items.length} item(s)</span>
      </section>

      <section className="table-panel">
        {items.map((item) => {
          const gameId = item.gameId ?? item.game?.id;
          const name = item.gameName ?? item.game?.name ?? `Game #${gameId}`;
          const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
          const quantity = Number(item.quantity ?? 1);
          const lineTotal = Number(item.lineTotal ?? unitPrice * quantity);

          return (
            <article className="order-item-row" key={`${gameId}-${name}`}>
              <div>
                <strong>{name}</strong>
                <p className="muted">Game ID: {gameId}</p>
              </div>
              <span>{formatCurrency(unitPrice)}</span>
              <span>Qty {quantity}</span>
              <strong>{formatCurrency(lineTotal)}</strong>
            </article>
          );
        })}

        {items.length === 0 && <StatusMessage>No items were found for this order.</StatusMessage>}
      </section>
    </div>
  );
}
