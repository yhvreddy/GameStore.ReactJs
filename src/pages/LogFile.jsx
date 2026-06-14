import { useMemo, useState } from 'react';
import StatusMessage from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { logApi } from '../services/gameStoreApi.js';
import { formatDate } from '../utils/formatters.js';

function formatDateTime(value) {
  if (!value) return 'Not set';

  return `${formatDate(value)} ${new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value))}`;
}

function levelClassName(level) {
  return `log-level log-level-${String(level).toLowerCase()}`;
}

// This page demonstrates read-only API data loading with filtering and manual refresh.
export default function LogFile() {
  useDocumentTitle('Log File');

  const [filter, setFilter] = useState('all');
  const logsRequest = useAsync(logApi.getLogs, []);
  const logs = Array.isArray(logsRequest.data) ? logsRequest.data : [];

  const filteredLogs = useMemo(() => {
    const sortedLogs = [...logs].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
    return filter === 'all' ? sortedLogs : sortedLogs.filter((log) => log.level === filter);
  }, [filter, logs]);

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Diagnostics</p>
          <h1>Log File</h1>
        </div>
        <div className="filters">
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">All levels</option>
            <option value="Information">Information</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
            <option value="Debug">Debug</option>
          </select>
          <button type="button" className="button ghost" onClick={logsRequest.execute}>
            Refresh
          </button>
        </div>
      </section>

      <StatusMessage type="error">{logsRequest.error}</StatusMessage>
      {logsRequest.loading && <StatusMessage>Loading logs...</StatusMessage>}

      <section className="table-panel">
        {filteredLogs.map((log) => (
          <article className="log-row" key={log.id}>
            <div>
              <span className={levelClassName(log.level)}>{log.level}</span>
              <strong>{log.message}</strong>
              <p className="muted">{log.source ?? 'Unknown source'} | {formatDateTime(log.createdAt)}</p>
              {log.exception && <pre>{log.exception}</pre>}
            </div>
            <span className="muted">User {log.userId ?? 'n/a'}</span>
          </article>
        ))}

        {!logsRequest.loading && filteredLogs.length === 0 && (
          <StatusMessage>No logs found.</StatusMessage>
        )}
      </section>
    </div>
  );
}
