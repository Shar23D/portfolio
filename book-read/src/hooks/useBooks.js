import { useState, useEffect } from "react";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem("bookTracker_books");
    const savedTags = localStorage.getItem("bookTracker_tags");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, []);

  // Save to localStorage whenever books or tags change
  useEffect(() => {
    localStorage.setItem("bookTracker_books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("bookTracker_tags", JSON.stringify(tags));
  }, [tags]);

  // Clean up unused tags whenever books change
  useEffect(() => {
    if (books.length === 0) {
      setTags([]);
      return;
    }

    // Get all tags currently used by books
    const usedTags = new Set();
    books.forEach((book) => {
      if (book.tags && book.tags.length > 0) {
        book.tags.forEach((tag) => usedTags.add(tag));
      }
    });

    // Filter out unused tags
    const activeTags = tags.filter((tag) => usedTags.has(tag));
    if (activeTags.length !== tags.length) {
      setTags(activeTags.sort());
    }
  }, [books]); // Only depend on books, not tags to avoid infinite loops

  const addBook = (newBook) => {
    if (!newBook.title.trim() || !newBook.author.trim()) {
      alert("Title and author are required!");
      return false;
    }

    // Check for duplicates
    const duplicate = books.find(
      (book) =>
        book.title.toLowerCase() === newBook.title.toLowerCase() &&
        book.author.toLowerCase() === newBook.author.toLowerCase()
    );

    if (duplicate) {
      alert("This book already exists in your library!");
      return false;
    }

    const bookToAdd = {
      ...newBook,
      id: Date.now(),
      pages: newBook.pages ? parseInt(newBook.pages) : 0,
      rating: newBook.rating ? parseFloat(newBook.rating) : 0,
      spiceRating: newBook.spiceRating ? parseFloat(newBook.spiceRating) : 0,
      dateAdded: new Date().toISOString(),
      readingDates: newBook.readingDates || [],
    };

    setBooks((prevBooks) => [...prevBooks, bookToAdd]);

    // Add new tags to the tags list
    const newTags = newBook.tags.filter((tag) => !tags.includes(tag));
    if (newTags.length > 0) {
      setTags((prevTags) => [...prevTags, ...newTags].sort());
    }

    return true;
  };

  const updateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );

    // Add any new tags
    const newTags = updatedBook.tags.filter((tag) => !tags.includes(tag));
    if (newTags.length > 0) {
      setTags((prevTags) => [...prevTags, ...newTags].sort());
    }
  };

  const deleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    }
  };

  const moveToShelf = (bookId, newShelf) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, shelf: newShelf } : book
      )
    );
  };

  return {
    books,
    tags,
    addBook,
    updateBook,
    deleteBook,
    moveToShelf,
  };
};
