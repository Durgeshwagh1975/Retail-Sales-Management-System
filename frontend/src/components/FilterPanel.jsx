import React from "react";

function MultiSelectDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="filter-dropdown" onBlur={handleBlur}>
      <button
        type="button"
        className="filter-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          {label}
          {value.length ? ` (${value.length})` : ""}
        </span>
        <span className="filter-caret">▼</span>
      </button>

      {open && (
        <div className="filter-dropdown-menu">
          {options.length === 0 && (
            <div className="filter-empty">No options</div>
          )}
          {options.map((opt) => (
            <label key={opt} className="filter-option">
              <input
                type="checkbox"
                checked={value.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function AgeRangeDropdown({
  minAgeMeta,
  maxAgeMeta,
  minAgeValue,
  maxAgeValue,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="filter-dropdown" onBlur={handleBlur}>
      <button
        type="button"
        className="filter-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          Age Range
          {minAgeValue || maxAgeValue
            ? ` (${minAgeValue || "min"} - ${maxAgeValue || "max"})`
            : minAgeMeta != null && maxAgeMeta != null
            ? ` (${minAgeMeta} - ${maxAgeMeta})`
            : ""}
        </span>
        <span className="filter-caret">▼</span>
      </button>

      {open && (
        <div className="filter-dropdown-menu">
          <div className="filter-group inline-filter">
            <span className="filter-label">
              Age Range
              {minAgeMeta != null && maxAgeMeta != null
                ? ` (${minAgeMeta} - ${maxAgeMeta})`
                : ""}
            </span>
            <div className="age-range">
              <input
                type="number"
                placeholder="Min"
                value={minAgeValue}
                onChange={(e) => onChange({ minAge: e.target.value })}
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxAgeValue}
                onChange={(e) => onChange({ maxAge: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DateRangeDropdown({ dateFrom, dateTo, onChange }) {
  const [open, setOpen] = React.useState(false);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="filter-dropdown" onBlur={handleBlur}>
      <button
        type="button"
        className="filter-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          Date Range
          {dateFrom || dateTo
            ? ` (${dateFrom || "start"} — ${dateTo || "end"})`
            : ""}
        </span>
        <span className="filter-caret">▼</span>
      </button>

      {open && (
        <div className="filter-dropdown-menu">
          <div className="filter-group inline-filter">
            <span className="filter-label">Date Range</span>
            <div className="date-range">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => onChange({ dateFrom: e.target.value })}
              />
              <span>–</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => onChange({ dateTo: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({ filters, meta, onChange }) {
  if (!meta) return null;

  const update = (patch) => {
    onChange({ ...filters, ...patch });
  };

  
  const handleClearFilters = () => {
    update({
      regions: [],
      genders: [],
      productCategories: [],
      tags: [],
      paymentMethods: [],
      minAge: "",
      maxAge: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const regionOptions =
    meta.regions && meta.regions.length
      ? meta.regions
      : ["North", "South", "East", "West"];

  const genderOptions =
    meta.genders && meta.genders.length ? meta.genders : ["Male", "Female"];

  const productCategoryOptions =
    meta.productCategories && meta.productCategories.length
      ? meta.productCategories
      : ["Clothing", "Electronics", "Grocery"];

  const paymentMethodOptions =
    meta.paymentMethods && meta.paymentMethods.length
      ? meta.paymentMethods
      : ["Cash", "Card", "UPI"];

  const tagOptions =
    meta.tags && meta.tags.length ? meta.tags : ["New", "Discount", "Sale"];

  const minAgeMeta = meta.ageRange?.min ?? null;
  const maxAgeMeta = meta.ageRange?.max ?? null;

  return (
    <div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.45rem",
        }}
      >
        <h3 className="filters-title" style={{ margin: 0 }}>
          Filters
        </h3>
        <button
          type="button"
          className="filters-clear-btn"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>

      
      <div className="filters-row">
        <MultiSelectDropdown
          label="Customer Region"
          options={regionOptions}
          value={filters.regions}
          onChange={(regions) => update({ regions })}
        />

        <MultiSelectDropdown
          label="Gender"
          options={genderOptions}
          value={filters.genders}
          onChange={(genders) => update({ genders })}
        />

        <AgeRangeDropdown
          minAgeMeta={minAgeMeta}
          maxAgeMeta={maxAgeMeta}
          minAgeValue={filters.minAge}
          maxAgeValue={filters.maxAge}
          onChange={(patch) => update(patch)}
        />

        <MultiSelectDropdown
          label="Product Category"
          options={productCategoryOptions}
          value={filters.productCategories}
          onChange={(productCategories) => update({ productCategories })}
        />

        <MultiSelectDropdown
          label="Tags"
          options={tagOptions}
          value={filters.tags}
          onChange={(tags) => update({ tags })}
        />

        <MultiSelectDropdown
          label="Payment Method"
          options={paymentMethodOptions}
          value={filters.paymentMethods}
          onChange={(paymentMethods) => update({ paymentMethods })}
        />

        <DateRangeDropdown
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          onChange={(patch) => update(patch)}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
