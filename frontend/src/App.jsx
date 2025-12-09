import React, { useMemo } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import SortingDropdown from "./components/SortingDropdown.jsx";
import TransactionTable from "./components/TransactionTable.jsx";
import PaginationControls from "./components/PaginationControls.jsx";
import useSalesQuery from "./hooks/useSalesQuery.js";

function App() {
  const {
    state,
    meta,
    data,
    loading,
    error,
    total,
    totalPages,
    page,
    setSearch,
    setFilters,
    setSorting,
    setPage,
  } = useSalesQuery();

  const summary = useMemo(() => {
    let qty = 0;
    let totalAmt = 0;
    let discountAmt = 0;

    (data || []).forEach((r) => {
      qty += Number(r.quantity || 0);
      const ta = Number(r.totalAmount || 0);
      const fa = Number(r.finalAmount || ta);

      totalAmt += ta;
      discountAmt += ta - fa;
    });

    return {
      qty,
      totalAmt,
      discountAmt,
      srCount: (data || []).length,
    };
  }, [data]);

  const formatCurrency = (v) =>
    typeof v === "number"
      ? v.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        })
      : v;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-icon">₹</div>
          <div>
            <h1 className="app-title">Retail Sales Management System</h1>
            <p className="app-subtitle">
              Search, filter and analyze retail transactions
            </p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <aside className="side-placeholder" />

        <section className="content-panel">
          <div className="top-row">
            <div className="search-wrapper">
              <SearchBar value={state.search} onChange={setSearch} />
            </div>
          </div>

          <div className="filters-container">
            <FilterPanel
              filters={state.filters}
              meta={meta}
              onChange={setFilters}
            />
          </div>

          {!loading && !error && data && data.length > 0 && (
            <div className="summary-row">
              <div className="summary-card">
                <div className="summary-card-header">
                  <span className="summary-label">Total Units Sold</span>
                  <span className="info-dot">i</span>
                </div>
                <div className="summary-value-line">
                  <span className="summary-value">{summary.qty}</span>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-card-header">
                  <span className="summary-label">Total Amount</span>
                  <span className="info-dot">i</span>
                </div>
                <div className="summary-value-line">
                  <span className="summary-value">
                    {formatCurrency(summary.totalAmt)}
                  </span>
                  <span className="summary-extra">
                    ({summary.srCount} SRs)
                  </span>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-card-header">
                  <span className="summary-label">Total Discount</span>
                  <span className="info-dot">i</span>
                </div>
                <div className="summary-value-line">
                  <span className="summary-value">
                    {formatCurrency(summary.discountAmt)}
                  </span>
                  <span className="summary-extra">
                    ({summary.srCount} SRs)
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="toolbar">
            <SortingDropdown sorting={state.sorting} onChange={setSorting} />
          </div>

          {loading && <div className="status">Loading...</div>}
          {error && <div className="status status-error">{error}</div>}

          {!loading && !error && (
            <>
              <TransactionTable records={data} />
              {total === 0 && <div className="status">No results found.</div>}
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
