# Architecture

## Architecture

## Backend Architecture
Backend is built with Node.js, Express, and SQLite. All sales data is stored in the database `truestate.sqlite`, and the API exposes search, multi-select filters, sorting, and pagination using dynamic SQL queries.

The main server file `index.js` initializes Express and the SQLite connection. Database access is handled through `utils/db.js`. Business logic is implemented in `services/salesService.js`, which constructs SQL queries for search, filters, sorting, and pagination. Controllers in `controllers/` handle incoming requests and return JSON responses. Routes in `routes/` expose `/api/sales` and `/api/meta` endpoints.

Data flow: query parameters → controller → SQL-building service → SQLite → results returned with pagination.

## Frontend Architecture
Frontend is a React (Vite) app that provides an interactive UI for search, multi-select filters, sorting, summary cards, and paginated results. State management and API calls are handled in `useSalesQuery.js`. It communicates with the backend through Axios functions defined in `services/api.js`.

`App.jsx` organizes the interface: header, search bar, filters, sorting controls, results table, and pagination. UI components like FilterPanel, SortingDropdown, SearchBar, TransactionTable, and PaginationControls are inside `components/`. Styling is handled through `styles/global.css`.

Data flow: load metadata → user interacts with search/filters/sorting → state updates → API call to backend → updated table and summary cards rendered.
e is re-rendered with fresh data and pagination info.

## Folder Structure Summary

- `backend/`
  - `src/`
    - `controllers/` – HTTP adapters for incoming requests.
    - `services/` – SQL logic for search, filters, sorting, pagination.
    - `routes/` – API routes.
    - `models/` – Placeholder for future persistence layer or schema definitions.
    - `index.js` – Application entry point.
  - `data/truestate.sqlite/` – SQLite database file.

- `frontend/`
  - `src/`
    - `components/` – Reusable UI components (search, filters, table, pagination).
    - `services/` – API client functions.
    - `utils/` – Frontend-specific helpers and initial state.
    - `hooks/` – Custom hooks for stateful logic (`useSalesQuery`).
    - `styles/` – CSS styles.
    - `App.jsx`, `main.jsx` – App shell and bootstrapping.
  - `public/` – Static assets.

---


