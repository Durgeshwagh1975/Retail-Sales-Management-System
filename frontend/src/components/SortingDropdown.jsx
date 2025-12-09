import React from "react";

function SortingDropdown({ sorting, onChange }) {
  const handleSortByChange = (e) => {
    onChange({ ...sorting, sortBy: e.target.value });
  };

  const handleOrderChange = (e) => {
    onChange({ ...sorting, sortOrder: e.target.value });
  };

  return (
    <div className="sorting-bar">
      <label className="field-label">Sort by</label>
      <select value={sorting.sortBy} onChange={handleSortByChange}>
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>
      <select value={sorting.sortOrder} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortingDropdown;
