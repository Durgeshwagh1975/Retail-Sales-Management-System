# Overview
Retail Sales Management backend providing search, multi-select filtering, sorting, and pagination over a structured sales dataset.  
Data is stored in SQLite and queried using dynamic SQL for accurate and performant results.  
Designed with a clean controller–service architecture suitable for production-grade systems.

## Tech Stack
- Node.js
- Express.js
- SQLite (sqlite3)


## Search Implementation Summary
Full-text search is executed in SQL using case-insensitive `LIKE` matching on:
- `customer_name`
- `phone_number`

Search works seamlessly with all filters, sorting, and pagination.

## Filter Implementation Summary
All filters are applied through SQL `WHERE` clauses.  
Supported multi-select filters:
- customer_region  
- gender  
- product_category  
- tags  
- payment_method  

Supported range filters:
- age range  
- date range  

Multiple filters can be combined simultaneously.

## Sorting Implementation Summary
Sorting is performed directly in SQL using:
- date (newest first)
- quantity
- customer_name (A–Z)

Configured via dynamic `ORDER BY`.

## Pagination Implementation Summary
Pagination uses SQL `LIMIT` + `OFFSET` with:
- page size: 10
- total pages and count returned with each response

Ensures efficient handling of large datasets.

## Setup Instructions
1. Place the SQLite database at `backend/data/truestate.sqlite`.
2. Run `npm install` inside the `backend` folder.
3. Start the server with:
   - `npm run dev` (development)
   - `npm start` (production)
4. The backend will run at `http://localhost:4000` with main endpoints:
   - `/api/sales`
   - `/api/meta`
