import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultsGrid from './components/ResultsGrid';
import Pagination from './components/Pagination';
import FavoritesList from './components/FavoritesList';
import Footer from './components/Footer';
import { getBookCoverUrl } from './utils/api';
import './App.css'; // Main styles


// Constants
const BOOKS_PER_PAGE = 10;
const API_BASE_URL = 'https://openlibrary.org/search.json';
const FAVORITES_STORAGE_KEY = 'bookFinderFavorites';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error('Could not load favorites from localStorage:', e);
      return {};
    }
  });

  // Effect to save favorites to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Could not save favorites to localStorage:', e);
    }
  }, [favorites]);

  // Main API fetch function, debounced via the useEffect below
  const fetchBooks = useCallback(async (searchQuery, pageNum) => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);

    const url = `${API_BASE_URL}?title=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      const processedBooks = data.docs.map(doc => ({
        // Create a stable ID for the book (ISBN, OLID, or title/author combo)
        id: doc.key || doc.isbn?.[0] || `${doc.title}-${doc.author_name?.[0] || 'unknown'}`, 
        coverId: doc.cover_i,
        title: doc.title,
        authors: doc.author_name, // Array of authors
        firstPublishYear: doc.first_publish_year,
        publisher: doc.publisher?.[0], // First publisher available
        subjects: doc.subject?.slice(0, 3) || [], // Up to 3 subjects
        key: doc.key, // Used for Open Library book page link
      }));

      setBooks(processedBooks);
      setTotalResults(data.numFound);
    } catch (e) {
      console.error("API Fetch Error:", e);
      setError('Failed to fetch books. Please check your connection or try again.');
      setBooks([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect for debounced search and pagination
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only fetch if there's a non-empty query
      if (query.trim()) {
        fetchBooks(query, page);
      } else {
        // Clear results when query is empty
        setBooks([]);
        setTotalResults(0);
      }
    }, 500); // Debounce delay of 500ms

    // Cleanup function: clears the timeout when 'query' or 'page' changes
    return () => {
      clearTimeout(handler);
    };
  }, [query, page, fetchBooks]);

  // Handle page change
  const handlePageChange = (newPage) => {
    // Only allow navigation to a valid page
    if (newPage > 0 && newPage <= Math.ceil(totalResults / BOOKS_PER_PAGE)) {
      setPage(newPage);
      // Scroll to top of results on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle search input change (resets to page 1)
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Always reset to page 1 on a new search query
  };

  // Toggle favorite status
  const toggleFavorite = (book) => {
    const bookKey = book.id; // Use the stable ID as the key
    setFavorites(prevFavorites => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[bookKey]) {
        delete newFavorites[bookKey]; // Remove from favorites
      } else {
        // Add to favorites, keeping essential display data
        newFavorites[bookKey] = {
          id: book.id,
          title: book.title,
          authors: book.authors,
          coverId: book.coverId,
          key: book.key,
        };
      }
      return newFavorites;
    });
  };

  // Determine message for empty state
  const getResultsMessage = () => {
    if (loading) return 'Loading books...';
    if (error) return error;
    if (query.trim() === '') return 'Start typing a book title to search.';
    if (totalResults === 0 && query.trim()) return `No results found for "${query}". Try a different title.`;
    
    return null; // Results are available
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <SearchBar query={query} onQueryChange={handleQueryChange} />
        
        <section className="search-results-section">
          <h2>Search Results</h2>
          <p className="search-info">
            {query.trim() && totalResults > 0 ? 
              `Showing results for "${query}": ${totalResults} total books found.` :
              null
            }
          </p>

          <div className="status-message">
            {getResultsMessage() && <p>{getResultsMessage()}</p>}
          </div>

          <ResultsGrid 
            books={books} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
            loading={loading}
          />

          {/* Only show pagination if there are results and it's not loading */}
          {totalResults > 0 && !loading && (
            <Pagination 
              currentPage={page}
              totalPages={Math.ceil(totalResults / BOOKS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          )}
        </section>

        <FavoritesList 
          favorites={Object.values(favorites)} 
          toggleFavorite={toggleFavorite} 
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;