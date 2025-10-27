import React from 'react';

function SearchBar({ query, onQueryChange }) {
  const handleChange = (event) => {
    onQueryChange(event.target.value);
  };

  // Controlled input for immediate feedback, debounce handled in App.jsx
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a book title (e.g., 'Harry Potter', 'Dune')..."
        value={query}
        onChange={handleChange}
        aria-label="Book Title Search"
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;