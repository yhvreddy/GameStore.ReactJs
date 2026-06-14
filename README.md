# GameStore ReactJS Practice App

Minimal React frontend for the ASP.NET Core GameStore API. It is built as a practical learning project for beginners up to roughly 2 years of experience.

## What You Will Practice

- Components, props, state, events, conditional rendering, and lists
- Forms, validation, controlled inputs, and submit handling
- React Router navigation, route params, and protected routes
- Context API for auth and cart state
- Custom hooks for async work, local storage, debounce, and document title
- API integration with JWT bearer tokens
- Derived data with `useMemo` and stable handlers with `useCallback`
- Basic admin CRUD patterns for games
- Real workflows: register/login, browse games, cart, checkout, my orders, logout

## Prerequisites

1. Install Node.js LTS from `https://nodejs.org`.
2. Start the ASP.NET Core GameStore backend.
3. Confirm the backend responds at `http://localhost:5137/health` or `http://localhost:5137/swagger`.

## Setup

```powershell
copy .env.example .env
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Backend API Expected By This App

The app expects these ASP.NET Core routes:

- `GET /games`, `GET /games/{id}`, `POST /games`, `PUT /games/{id}`, `DELETE /games/{id}`
- `GET /genres`, `GET /roles`
- `POST /users/register`, `POST /users/login`, `POST /users/logout`
- `GET /cart`, `POST /cart/items`, `PUT /cart/items/{gameId}`, `DELETE /cart/items/{gameId}`, `DELETE /cart`
- `POST /checkout`
- `GET /orders/my`, `GET /orders/my/{id}`

If your backend DTO names differ slightly, update `src/services/gameStoreApi.js`.

## Project Structure

```text
src/
  components/        Reusable UI blocks
  context/           Auth and cart global state
  hooks/             Custom React hooks
  pages/             Route-level screens
  services/          API client and endpoint functions
  utils/             Small pure helper functions
docs/
  API_CONTRACT.md
  REACT_LEARNING_GUIDE.md
```

## Verification

```powershell
npm run build
```

Node.js is not installed in this current machine session, so the build could not be executed here. After installing Node, the command above is the first verification step.
