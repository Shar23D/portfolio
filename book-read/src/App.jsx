import React, { useState } from "react";
import { BookOpen, BarChart3, Plus } from "lucide-react";
import { useBooks } from "./hooks/useBooks";
import { filterBooks } from "./utils/bookUtils";
import Sidebar from "./components/Sidebar";
import BookGrid from "./components/BookGrid";
import AddBookModal from "./components/modals/AddBookModal";
import EditBookModal from "./components/modals/EditBookModal";
import StatisticsPage from "./components/StatisticsPage";

const App = () => {
  const { books, tags, addBook, updateBook, deleteBook, moveToShelf } =
    useBooks();

  const [currentShelf, setCurrentShelf] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    author: "",
    tags: [],
    minPages: "",
    maxPages: "",
    minRating: "",
    maxRating: "",
    minSpice: "",
    maxSpice: "",
    form: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState({});

  const shelves = [
    { id: "all", name: "All Books", icon: BookOpen },
    { id: "to-read", name: "To Read", icon: BookOpen },
    { id: "reading", name: "Currently Reading", icon: BookOpen },
    { id: "read", name: "Read", icon: BookOpen },
  ];

  const filteredBooks = filterBooks(books, currentShelf, searchTerm, filters);

  const toggleNote = (bookId) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleAddBook = (bookData) => {
    const success = addBook(bookData);
    if (success) {
      setShowAddForm(false);
    }
    return success;
  };

  const handleUpdateBook = (updatedBook) => {
    updateBook(updatedBook);
    setEditingBook(null);
  };

  const clearFilters = () => {
    setFilters({
      author: "",
      tags: [],
      minPages: "",
      maxPages: "",
      minRating: "",
      maxRating: "",
      minSpice: "",
      maxSpice: "",
      form: "",
    });
  };

  if (showStats) {
    return <StatisticsPage books={books} onBack={() => setShowStats(false)} />;
  }

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-500 text-white p-4">
  Tailwind is working!
</div>

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              My Book Library
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowStats(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <BarChart3 size={20} />
                <span>Statistics</span>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                <span>Add Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Sidebar
              shelves={shelves}
              currentShelf={currentShelf}
              setCurrentShelf={setCurrentShelf}
              books={books}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
              tags={tags}
              clearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {shelves.find((s) => s.id === currentShelf)?.name}
                <span className="ml-2 text-lg text-gray-500">
                  ({filteredBooks.length})
                </span>
              </h2>
            </div>

            <BookGrid
              books={filteredBooks}
              expandedNotes={expandedNotes}
              toggleNote={toggleNote}
              onEdit={setEditingBook}
              onDelete={deleteBook}
              onMoveToShelf={moveToShelf}
              currentShelf={currentShelf}
              shelves={shelves}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddForm && (
        <AddBookModal
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddBook}
          tags={tags}
        />
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdate={handleUpdateBook}
          tags={tags}
        />
      )}
    </div>
  );
};

export default App;
