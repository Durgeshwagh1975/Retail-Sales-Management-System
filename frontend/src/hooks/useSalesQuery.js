
import { useEffect, useState, useCallback } from "react";
import { fetchMeta, fetchSales } from "../services/api.js";
import { initialQueryState } from "../utils/queryState.js";

export default function useSalesQuery() {
  const [state, setState] = useState(initialQueryState);
  const [meta, setMeta] = useState(null);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load filter metadata
  useEffect(() => {
    async function loadMeta() {
      try {
        const m = await fetchMeta();
        setMeta(m);
      } catch {
        setError("Failed to load metadata");
      }
    }
    loadMeta();
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchSales(state);
      setData(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch {
      setError("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  }, [state]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setSearch = (search) =>
    setState((prev) => ({ ...prev, search, page: 1 }));

  const setFilters = (filters) =>
    setState((prev) => ({ ...prev, filters, page: 1 }));

  const setSorting = (sorting) =>
    setState((prev) => ({ ...prev, sorting, page: 1 }));

  const setPage = (page) =>
    setState((prev) => ({ ...prev, page }));

  return {
    state,
    meta,
    data,
    loading,
    error,
    total,
    totalPages,
    page: state.page,
    setSearch,
    setFilters,
    setSorting,
    setPage,
  };
}
