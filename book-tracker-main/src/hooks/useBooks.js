import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState(null);

  // Listen to auth changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch books whenever user logs in
  const fetchBooks = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .order("inserted_at", { ascending: false });

    if (error) {
      console.error("Error fetching books:", error);
      return;
    }

    setBooks(data);
    extractTags(data);
  }, [user]);

  useEffect(() => {
    if (user) fetchBooks();
    else {
      setBooks([]);
      setTags([]);
    }
  }, [user, fetchBooks]);

  const extractTags = (booksList) => {
    const usedTags = new Set();
    booksList.forEach((book) => {
      if (book.tags?.length > 0) {
        book.tags.forEach((tag) => usedTags.add(tag));
      }
    });
    setTags(Array.from(usedTags).sort());
  };

  const addBook = async (newBook) => {
    if (!user) return false;
    if (!newBook.title.trim() || !newBook.author.trim()) {
      alert("Title and author are required!");
      return false;
    }

    // Check for duplicates
    const { data: dupCheck } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .eq("title", newBook.title)
      .eq("author", newBook.author);

    if (dupCheck?.length > 0) {
      alert("This book already exists in your library!");
      return false;
    }

    const bookToInsert = {
      user_id: user.id,
      title: newBook.title,
      author: newBook.author,
      pages: newBook.pages ? Number(newBook.pages) : null,
      rating: newBook.rating ? Number(newBook.rating) : null,
      spiceRating: newBook.spiceRating ? Number(newBook.spiceRating) : null,
      form: newBook.form || "ebook",
      shelf: newBook.shelf || "to-read",
      note: newBook.note || "",
      tags: newBook.tags?.length > 0 ? newBook.tags : [],
      readingDates: newBook.readingDates && newBook.readingDates.length > 0
        ? newBook.readingDates
        : []
    };

    const { data, error } = await supabase
      .from("books")
      .insert([bookToInsert])
      .select();

    if (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Check console for details.");
      return false;
    }

    setBooks((prev) => [data[0], ...prev]);
    extractTags([data[0], ...books]);
    return true;
  };

  const updateBook = async (updatedBook) => {
    if (!user) return false;

    const { data, error } = await supabase
      .from("books")
      .update({
        title: updatedBook.title,
        author: updatedBook.author,
        pages: updatedBook.pages ? Number(updatedBook.pages) : null,
        rating: updatedBook.rating ? Number(updatedBook.rating) : null,
        spiceRating: updatedBook.spiceRating ? Number(updatedBook.spiceRating) : null,
        form: updatedBook.form || "ebook",
        shelf: updatedBook.shelf || "to-read",
        note: updatedBook.note || "",
        tags: updatedBook.tags?.length > 0 ? updatedBook.tags : [],
        readingDates: updatedBook.readingDates && updatedBook.readingDates.length > 0
          ? updatedBook.readingDates
          : []

      })
      .eq("id", updatedBook.id)
      .eq("user_id", user.id)
      .select();

    if (error) {
      console.error("Error updating book:", error);
      return false;
    }

    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? data[0] : b))
    );
    extractTags([...books.map((b) => (b.id === updatedBook.id ? data[0] : b))]);
    return true;
  };

  const deleteBook = async (bookId) => {
    if (!user) return;

    if (!window.confirm("Are you sure you want to delete this book?")) return;

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", bookId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting book:", error);
      return;
    }

    const updatedBooks = books.filter((b) => b.id !== bookId);
    setBooks(updatedBooks);
    extractTags(updatedBooks);
  };

  const moveToShelf = async (bookId, newShelf) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("books")
      .update({ shelf: newShelf })
      .eq("id", bookId)
      .eq("user_id", user.id)
      .select();

    if (error) {
      console.error("Error moving book:", error);
      return;
    }

    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? data[0] : b))
    );
  };

  return {
    user,
    books,
    tags,
    addBook,
    updateBook,
    deleteBook,
    moveToShelf,
    fetchBooks,
  };
};
