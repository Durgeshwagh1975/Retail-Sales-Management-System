
import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="field-label">Search</label>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍︎</span>
        <input
          type="text"
          placeholder="customer name or phone"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
