import React from 'react';
import { getBookCoverUrl } from '../utils/api';

function FavoritesList({ favorites, toggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <section className="favorites-section">
        <h2>★ My Reading List</h2>
        <p className="empty-state-message">Your reading list is empty. Start searching and save a book!</p>
      </section>
    );
  }

  return (
    <section className="favorites-section">
      <h2>★ My Reading List ({favorites.length})</h2>
      <div className="favorites-list">
        {favorites.map(book => (
          <div key={book.id} className="favorite-item">
            <div className="favorite-cover">
                <img 
                    src={getBookCoverUrl(book.coverId, 'S')} 
                    alt={`Cover of ${book.title}`} 
                    // Using small cover for the list
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://openlibrary.org/images/icons/avatar_book-sm.png'; }}
                />
            </div>
            <div className="favorite-details">
                <h4 className="favorite-title">{book.title}</h4>
                <p className="favorite-author">{book.authors?.join(', ')}</p>
                <div className="favorite-actions">
                    <a 
                        href={`https://openlibrary.org${book.key}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button button-view-sm"
                    >
                        View
                    </a>
                    <button 
                        onClick={() => toggleFavorite(book)} 
                        className="button button-remove"
                        aria-label={`Remove ${book.title} from favorites`}
                    >
                        Remove
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FavoritesList;