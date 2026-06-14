# React Learning Guide For This Project

Use this guide while reading the code. The app intentionally keeps the UI minimal so the React ideas stay visible.

## 1. Component Basics

Start with `src/components/GameCard.jsx`.

- A component is a JavaScript function that returns JSX.
- Props are inputs passed from a parent component.
- Events such as button clicks call normal JavaScript functions.

## 2. State

Open `src/pages/Catalog.jsx`.

- `useState` stores UI state like the search box and selected genre.
- Changing state re-renders the component.
- Derived values are calculated from state and props.

## 3. Effects

Open `src/hooks/useAsync.js`.

- `useEffect` runs side effects such as API calls.
- Cleanup prevents stale requests from updating the screen after a component unmounts.

## 4. Forms

Open `src/pages/Login.jsx`, `src/pages/Register.jsx`, and `src/pages/AdminGames.jsx`.

- Inputs are controlled by React state.
- Submit handlers validate data before calling the API.
- Loading and error states make forms easier to use.

## 5. Routing

Open `src/App.jsx`.

- `BrowserRouter` enables client-side navigation.
- `Routes` and `Route` decide which page component renders.
- `useParams` reads URL values like `/games/:id`.
- `ProtectedRoute` blocks private pages when the user is not logged in.

## 6. Context

Open `src/context/AuthContext.jsx` and `src/context/CartContext.jsx`.

- Context shares state without passing props through every level.
- Auth context owns the current user and token.
- Cart context owns cart loading, mutations, and total calculations.

## 7. Custom Hooks

Open `src/hooks`.

- `useLocalStorage` persists state between refreshes.
- `useDebounce` waits before applying fast-changing values.
- `useDocumentTitle` updates the browser tab title.
- `useAsync` centralizes loading/error/success behavior.

## 8. Performance Basics

Open `src/pages/Catalog.jsx` and `src/context/CartContext.jsx`.

- `useMemo` avoids recalculating filtered lists unless inputs change.
- `useCallback` keeps function references stable for context consumers.

## 9. API Integration

Open `src/services/httpClient.js`.

- All API calls pass through one small client.
- The JWT token is added as an `Authorization: Bearer` header.
- Errors are normalized so pages can show readable messages.

## 10. Practice Tasks

1. Add a price range filter to the catalog.
2. Add optimistic cart updates.
3. Add an order details page using `GET /orders/my/{id}`.
4. Add admin genre management.
5. Replace the simple CSS with a component library after you understand the basics.
