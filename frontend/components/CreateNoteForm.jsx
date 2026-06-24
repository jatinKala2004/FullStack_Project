"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNoteForm({ onSuccess, onClose }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      onSuccess();
      router.refresh();
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 md:p-8 mb-10">

      {/* Close Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-2xl font-bold text-gray-500 hover:text-red-600 transition"
        >
          ✕
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
        Add New Note
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-8 text-sm sm:text-base">
        Keep your thoughts organized by creating a new note.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 sm:p-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Content
          </label>

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full rounded-xl border border-gray-300 p-3 sm:p-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-md transition"
          >
            + Add Note
          </button>
        </div>

      </form>

    </div>
  );
}