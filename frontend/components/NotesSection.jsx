"use client";

import { useState } from "react";
import CreateNoteForm from "./CreateNoteForm";
import NotesList from "./NotesList";

export default function NotesSection({ notes }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="max-w-5xl mx-auto px-4">

      {/* Heading */}
      <div className="mb-10">

        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
          📋 Your Notes
        </h2>

        <p className="text-center text-gray-500 mt-3">
          All your saved notes appear below.
        </p>

        {!showForm && (
          <div className="flex justify-center md:justify-end mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
            >
              + Add Note
            </button>
          </div>
        )}

      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-10">
          <CreateNoteForm
            onSuccess={() => setShowForm(false)}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Notes */}
      <NotesList notes={notes} />

    </section>
  );
}