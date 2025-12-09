# Overview
Frontend for the Retail Sales Management System providing an interactive UI for search, multi-select filters, sorting, and pagination on retail sales data.  
Built with a modular component-based structure and integrates with the backend through REST APIs.

## Tech Stack
- React (Vite)
- Axios
- Modern CSS (custom styles)
- React Hooks for state management

## Search Implementation Summary
Client-side state drives search queries.  
Search triggers backend filtering on:
- customer_name  
- phone_number  

Search is case-insensitive and works together with filters and sorting.

## Filter Implementation Summary
Filters are fully controlled components with multi-select dropdowns.  
Supports:
- customer region  
- gender  
- product category  
- tags  
- payment method  
- age range  
- date range  

All filters work independently and in combination, updating URL params sent to backend.

## Sorting Implementation Summary
Sorting dropdown updates:
- date (newest first)  
- quantity  
- customer_name  

Sorting state is preserved while changing search or filters.

## Pagination Implementation Summary
Pagination is handled by backend.  
Frontend renders:
- next / previous
- current page
- total pages

Page state is preserved across interactions.

## Setup Instructions
1. Run `npm install` inside the `frontend` folder.
2. Set `VITE_API_BASE_URL` in a `.env` file if the backend is not at `http://localhost:4000`.
3. Start the dev server with `npm run dev`.
4. Open the provided URL in your browser to access the UI.
