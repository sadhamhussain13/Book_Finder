import React from 'react';
import { getBookCoverUrl } from '../utils/api';

function BookCard({ book, isFavorite, toggleFavorite }) {
  const coverUrl = getBookCoverUrl(book.coverId, 'M');
  const fallbackCoverUrl = 'https://openlibrary.org/images/icons/avatar_book-sm.png'; // Open Library placeholder

  const handleFavoriteClick = () => {
    toggleFavorite(book);
  };

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img 
          src={coverUrl} 
          alt={`Cover of ${book.title}`} 
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackCoverUrl; }}
          className="book-cover"
        />
      </div>
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">
          <strong>Author(s):</strong> {book.authors?.join(', ') || 'Unknown'}
        </p>
        <p>
          <strong>Year:</strong> {book.firstPublishYear || 'N/A'}
        </p>
        <p>
          <strong>Publisher:</strong> {book.publisher || 'N/A'}
        </p>
        <p className="book-subjects">
          <strong>Subjects:</strong> {book.subjects?.join(', ') || 'N/A'}
        </p>
      </div>
      <div className="card-actions">
        {/* Link to the Open Library book page */}
        <a 
          href={`https://openlibrary.org${book.key}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="button button-view"
        >
          View ↗
        </a>
        <button 
          onClick={handleFavoriteClick} 
          className={`button button-favorite ${isFavorite ? 'favorite-active' : ''}`}
          aria-label={isFavorite ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
        >
          {isFavorite ? 'Saved ★' : 'Save ☆'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;