"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function NoteCard({ note }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  async function deleteNote() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes${note.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setShowModal(false);
      router.refresh();
    } else {
      alert("Failed to delete note.");
    }
  }

  return (
    <>
      {/* Note Card */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-5 sm:p-6">

        <div className="flex flex-col gap-5">

          {/* Title + Delete */}
          <div className="flex justify-between items-start gap-4">

            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                {note.title}
              </h3>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => setShowModal(true)}
              className="transition"
            >
              {/* Mobile */}
              <span className="sm:hidden text-red-500 hover:text-red-600">
                <Trash2 size={22} strokeWidth={2.5} />
              </span>

              {/* Tablet/Desktop */}
              <span className="hidden sm:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                <Trash2 size={18} />
                Delete
              </span>
            </button>

          </div>

          {/* Content */}
          <p className="text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
            {note.content}
          </p>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
              Delete Note
            </h2>

            <p className="text-gray-700">
              Are you sure you want to delete this note?
            </p>

            <p className="text-sm text-gray-500 mt-2 mb-6">
              You can't recover this note.
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteNote}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 transition"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}