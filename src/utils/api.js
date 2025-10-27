// Utility file for reusable API-related functions

/**
 * Generates the Open Library book cover URL.
 * @param {number} coverId - The cover ID from the Open Library API response (cover_i).
 * @param {'S'|'M'|'L'} size - The desired size ('S' small, 'M' medium, 'L' large).
 * @returns {string} The complete URL for the book cover image.
 */
 export const getBookCoverUrl = (coverId, size = 'M') => {
  if (!coverId) {
      // Return a default placeholder if no cover ID is available
      return 'https://openlibrary.org/images/icons/avatar_book-sm.png';
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// More API utilities could go here, e.g., error handling wrappers.