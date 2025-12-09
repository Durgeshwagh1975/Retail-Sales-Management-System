
export const initialQueryState = {
  search: "",
  filters: {
    regions: [],
    genders: [],
    productCategories: [],
    tags: [],
    paymentMethods: [],
    minAge: "",
    maxAge: "",
    dateFrom: "",
    dateTo: "",
  },
  sorting: {
    sortBy: "date",
    sortOrder: "asc",
  },
  page: 1,
  pageSize: 10,
};
