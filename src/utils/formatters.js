export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value ?? 0));
}

export function formatDate(value) {
  if (!value) return 'Not set';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export function readGameName(game) {
  return game?.name ?? game?.title ?? `Game #${game?.id ?? 'new'}`;
}

export function readGamePrice(game) {
  return Number(game?.price ?? game?.unitPrice ?? 0);
}

export function readGenreName(game) {
  if (typeof game?.genre === 'string') return game.genre;
  return game?.genreName ?? game?.genre?.name ?? 'Unknown';
}
