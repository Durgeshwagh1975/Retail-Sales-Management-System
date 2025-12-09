
import React from "react";

function PaginationControls({ page, totalPages, onPageChange }) {
  if (!totalPages) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="pagination">
      <button
        className="btn"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>
      <button
        className="btn"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
