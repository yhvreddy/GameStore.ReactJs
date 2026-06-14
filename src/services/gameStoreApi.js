import { jsonRequest, request } from './httpClient.js';

export const authApi = {
  register: (form) => jsonRequest('/users/register', 'POST', form),
  login: (form) => jsonRequest('/users/login', 'POST', form),
  logout: () => request('/users/logout', { method: 'POST' }),
};

export const catalogApi = {
  getGames: () => request('/games'),
  getGame: (id) => request(`/games/${id}`),
  createGame: (game) => jsonRequest('/games', 'POST', game),
  updateGame: (id, game) => jsonRequest(`/games/${id}`, 'PUT', game),
  deleteGame: (id) => request(`/games/${id}`, { method: 'DELETE' }),
  getGenres: () => request('/genres'),
};

export const roleApi = {
  getRoles: () => request('/roles'),
};

export const cartApi = {
  getCart: () => request('/cart'),
  addItem: (gameId, quantity = 1) => jsonRequest('/cart/items', 'POST', { gameId, quantity }),
  updateItem: (gameId, quantity) => jsonRequest(`/cart/items/${gameId}`, 'PUT', { quantity }),
  removeItem: (gameId) => request(`/cart/items/${gameId}`, { method: 'DELETE' }),
  clear: () => request('/cart', { method: 'DELETE' }),
};

export const orderApi = {
  checkout: () => request('/checkout', { method: 'POST' }),
  getMyOrders: () => request('/orders/my'),
  getMyOrder: (id) => request(`/orders/my/${id}`),
};
