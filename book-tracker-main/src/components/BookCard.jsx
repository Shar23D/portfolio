import React from "react";
import { Star, Flame, StickyNote, X, Edit2, Trash2 } from "lucide-react";

const BookCard = ({
  book,
  isNoteExpanded,
  onToggleNote,
  onEdit,
  onDelete,
  onMoveToShelf,
}) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  const renderSpice = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        size={16}
        className={i < rating ? "text-red-500 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>

          {book.pages > 0 && (
            <p className="text-sm text-gray-500 mb-2">{book.pages} pages</p>
          )}

          <div className="flex items-center space-x-4 mb-2">
            {book.rating > 0 && (
              <div className="flex items-center space-x-1">
                {renderStars(book.rating)}
              </div>
            )}
            {book.spiceRating > 0 && (
              <div className="flex items-center space-x-1">
                {renderSpice(book.spiceRating)}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                book.form === "audiobook"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {book.form}
            </span>

            <div className="flex items-center space-x-2">
              {book.note && (
                <button
                  onClick={onToggleNote}
                  className="text-yellow-600 hover:text-yellow-700"
                >
                  <StickyNote size={18} />
                </button>
              )}
              <button
                onClick={onEdit}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Reading Dates */}
          {book.readingDates && book.readingDates.length > 0 && (
            <div className="text-xs text-gray-500 mb-2">
              {book.readingDates.map((dateRange, index) => (
                <div key={index} className="mb-1">
                  <strong>Read #{index + 1}:</strong>
                  {dateRange.dateStarted && (
                    <span className="ml-1">
                      Started:{" "}
                      {new Date(dateRange.dateStarted).toLocaleDateString()}
                    </span>
                  )}
                  {dateRange.dateFinished && (
                    <span className="ml-2">
                      Finished:{" "}
                      {new Date(dateRange.dateFinished).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Legacy single date support */}
          {(book.dateStarted || book.dateFinished) &&
            (!book.readingDates || book.readingDates.length === 0) && (
              <div className="text-xs text-gray-500 mb-2">
                {book.dateStarted && (
                  <div>
                    Started: {new Date(book.dateStarted).toLocaleDateString()}
                  </div>
                )}
                {book.dateFinished && (
                  <div>
                    Finished: {new Date(book.dateFinished).toLocaleDateString()}
                  </div>
                )}
              </div>
            )}

          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Collapsible Note */}
          {book.note && isNoteExpanded && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg relative">
              <button
                onClick={onToggleNote}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
              <p className="text-sm text-gray-700 pr-6">{book.note}</p>
            </div>
          )}

          {/* Shelf Selector */}
          <select
            value={book.shelf}
            onChange={(e) => onMoveToShelf(book.id, e.target.value)}
            className="w-full mt-3 px-3 py-2 border rounded-lg text-sm"
          >
            <option value="to-read">To Read</option>
            <option value="reading">Currently Reading</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
