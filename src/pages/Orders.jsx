import StatusMessage from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { orderApi } from '../services/gameStoreApi.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

export default function Orders() {
  useDocumentTitle('Orders');

  const { data, loading, error } = useAsync(orderApi.getMyOrders, []);
  const orders = Array.isArray(data) ? data : [];

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>My Orders</h1>
        </div>
      </section>

      <StatusMessage type="error">{error}</StatusMessage>
      {loading && <StatusMessage>Loading orders...</StatusMessage>}

      <section className="table-panel">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div>
              <strong>Order #{order.id}</strong>
              <p className="muted">{formatDate(order.createdAt ?? order.orderDate)}</p>
            </div>
            <strong>{formatCurrency(order.totalAmount ?? order.total ?? 0)}</strong>
          </article>
        ))}
        {!loading && orders.length === 0 && <StatusMessage>No orders yet.</StatusMessage>}
      </section>
    </div>
  );
}
