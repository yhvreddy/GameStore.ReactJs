# GameStore API Contract Used By The React App

This document explains how the frontend talks to the ASP.NET Core backend.

## Environment

The frontend reads `VITE_API_BASE_URL` from `.env`.

```text
VITE_API_BASE_URL=/api
```

During local development, `vite.config.js` forwards `/api` to `http://localhost:5137`.

## Auth

### Register

`POST /users/register`

The app sends:

```json
{
  "fullName": "Student User",
  "email": "student@example.com",
  "password": "Password@123",
  "roleId": 2
}
```

### Login

`POST /users/login`

The app sends:

```json
{
  "email": "student@example.com",
  "password": "Password@123"
}
```

The app accepts token fields named `token`, `accessToken`, or `jwtToken`.

### Logout

`POST /users/logout`

The current backend stores revoked JWT IDs during logout. The frontend calls the endpoint when possible, then removes the token from local storage.

## Catalog

`GET /games` returns the game list.

`GET /genres` returns genres for filters and admin forms.

`GET /roles` returns role IDs for registration.

The app normalizes common field names such as `name`, `title`, `genre`, `genreId`, `genreName`, `price`, and `releaseDate`.

## Cart

Authenticated users can use:

- `GET /cart`
- `POST /cart/items`
- `PUT /cart/items/{gameId}`
- `DELETE /cart/items/{gameId}`
- `DELETE /cart`

The app sends `gameId` and `quantity` when adding or updating cart items.

## Orders

Authenticated users can use:

- `POST /checkout`
- `GET /orders/my`
- `GET /orders/my/{id}`

Checkout creates an order from the current cart.

The order details page uses `GET /orders/my/{id}` and renders each returned item with `gameName`, `unitPrice`, `quantity`, and `lineTotal`.

## Logs

The Log File page expects:

- `GET /logs`

The response should be a list of `LogDto` rows with `id`, `level`, `message`, `source`, `userId`, `exception`, and `createdAt`.
