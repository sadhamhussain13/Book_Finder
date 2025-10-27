import React from 'react';
import BookCard from './BookCard';

function ResultsGrid({ books, favorites, toggleFavorite, loading }) {
  if (loading) {
    // Simple spinner/loading state
    return (
      <div className="loading-spinner" aria-live="polite">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  // books.length check for empty state is handled in App.jsx's getResultsMessage
  // This component only displays the grid of cards.
  return (
    <div className="results-grid">
      {books.map(book => (
        <BookCard 
          key={book.id} 
          book={book} 
          isFavorite={!!favorites[book.id]}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default ResultsGrid;