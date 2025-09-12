import React from "react";
import { X, Plus } from "lucide-react";

const ReadingDatesSection = ({ book, onChange }) => {
  const readingDates = book.readingDates || [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Reading Dates
      </label>
      <div className="space-y-2">
        {readingDates.map((dateRange, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg"
          >
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.dateStarted || ""}
                  onChange={(e) => {
                    const updatedDates = [...readingDates];
                    updatedDates[index].dateStarted = e.target.value;
                    onChange({ ...book, readingDates: updatedDates });
                  }}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">End Date</label>
                <input
                  type="date"
                  value={dateRange.dateFinished || ""}
                  onChange={(e) => {
                    const updatedDates = [...readingDates];
                    updatedDates[index].dateFinished = e.target.value;
                    onChange({ ...book, readingDates: updatedDates });
                  }}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const updatedDates = readingDates.filter((_, i) => i !== index);
                onChange({ ...book, readingDates: updatedDates });
              }}
              className="text-red-600 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            onChange({
              ...book,
              readingDates: [
                ...readingDates,
                { dateStarted: "", dateFinished: "" },
              ],
            });
          }}
          className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border border-dashed border-blue-300 rounded-lg hover:border-blue-400"
        >
          <Plus size={16} />
          <span>Add Reading Period</span>
        </button>
      </div>
    </div>
  );
};

export default ReadingDatesSection;
