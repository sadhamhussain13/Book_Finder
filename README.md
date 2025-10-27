# 📚 Book Finder App

A minimal and responsive Book Finder web application built as a take-home challenge for a UI/Frontend internship. It allows users to search for books via the Open Library API, view details, and save favorites persistently.

## 🎯 Features

* **Search with Debounce:** Efficient book title search with a 500ms delay.
* **Detailed Results:** Displays book cover, title, author(s), publish year, publisher, and subjects.
* **Pagination:** Navigate through results using Next/Previous buttons.
* **Favorites (Reading List):** Add or remove books from a persistent favorites list using `localStorage`.
* **Responsive UI:** Clean, modern, and adaptive layout (1-3 columns).
* **State Handling:** Graceful management of loading, error, and empty result states.

## ⚙️ Tech Stack

* **Frontend Framework:** React (latest, functional components with Hooks)
* **Language:** JavaScript (ES6+)
* **Styling:** Plain CSS (minimal and responsive)
* **API:** Open Library Search API
* **State Management:** `useState`, `useEffect`, `useCallback`
* **Data Storage:** `localStorage` for favorites
* **Build Tool:** Vite

## Preview

<img width="1857" height="907" alt="image" src="https://github.com/user-attachments/assets/624d0097-ed7f-4318-a56d-ab602b1ac064" />


## 🚀 Project Setup & How to Run Locally

This project is structured for a standard Vite React (JavaScript) setup.

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Steps

1.  **Clone the repository (or set up files):**
    ```bash
    git clone [YOUR-REPO-URL]
    cd book-finder-app
    ```
    *If you are copying the code directly, ensure you have the `src/` directory with all components, `src/App.css`, and `src/utils/api.js`.*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **View the app:**
    Open your browser and navigate to `http://localhost:5173/` (or the address shown in your terminal).

## ☁️ Deployment Instructions

The application is a purely frontend-based project and can be easily deployed to services like **GitHub Pages**, **Vercel**, **Netlify**, or used directly in online IDEs like **CodeSandbox** or **StackBlitz**.

### For GitHub Pages / Vercel / Netlify:

1.  **Build the project:**
    ```bash
    npm run build
    # or
    yarn build
    ```
2.  The static files for the production build will be placed in the `dist` folder.
3.  Deploy the contents of the `dist` folder to your hosting provider.
