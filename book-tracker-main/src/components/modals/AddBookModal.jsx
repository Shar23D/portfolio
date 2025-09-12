import React, { useState } from "react";
import { X } from "lucide-react";
import BookForm from "../forms/BookForm";

const AddBookModal = ({ onClose, onAdd, tags }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    pages: "",
    rating: "",
    spiceRating: "",
    tags: [],
    note: "",
    form: "ebook",
    shelf: "to-read",
    readingDates: [],
  });

  const handleSubmit = () => {
    const success = onAdd(newBook);
    if (success) {
      setNewBook({
        title: "",
        author: "",
        pages: "",
        rating: "",
        spiceRating: "",
        tags: [],
        note: "",
        form: "ebook",
        shelf: "to-read",
        readingDates: [],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Book</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <BookForm
            book={newBook}
            onChange={setNewBook}
            tags={tags}
            onSubmit={handleSubmit}
            onCancel={onClose}
            submitText="Add Book"
          />
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
