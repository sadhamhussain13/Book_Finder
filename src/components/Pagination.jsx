import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Guard clause for when there's only one page
  if (totalPages <= 1) return null; 

  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-controls">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="button button-page"
        aria-label="Previous page of results"
      >
        &larr; Previous
      </button>
      <span className="page-info" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="button button-page"
        aria-label="Next page of results"
      >
        Next &rarr;
      </button>
    </div>
  );
}

export default Pagination;