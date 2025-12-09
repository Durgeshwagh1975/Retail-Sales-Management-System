import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchMeta() {
  const res = await api.get("/api/meta");
  return res.data;
}

export async function fetchSales(queryState) {
  const params = new URLSearchParams();
  const { search, filters, sorting, page, pageSize } = queryState;

  if (search) params.set("search", search);

  if (filters.regions.length)
    params.set("region", filters.regions.join(","));
  if (filters.genders.length)
    params.set("gender", filters.genders.join(","));
  if (filters.productCategories.length)
    params.set("productCategory", filters.productCategories.join(","));
  if (filters.tags.length)
    params.set("tag", filters.tags.join(","));
  if (filters.paymentMethods.length)
    params.set("paymentMethod", filters.paymentMethods.join(","));

  if (filters.minAge !== "" && filters.minAge != null)
    params.set("minAge", filters.minAge);
  if (filters.maxAge !== "" && filters.maxAge != null)
    params.set("maxAge", filters.maxAge);

  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);

  if (sorting.sortBy) {
    params.set("sortBy", sorting.sortBy);
    if (sorting.sortOrder) params.set("sortOrder", sorting.sortOrder);
  }

  params.set("page", page);
  params.set("pageSize", pageSize);

  const res = await api.get("/api/sales", { params });
  return res.data;
}
