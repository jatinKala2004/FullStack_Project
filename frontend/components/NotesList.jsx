import NoteCard from "./NoteCard";

export default function NotesList({ notes }) {
  return (
    <>
      {notes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center shadow">

          <h3 className="text-2xl font-semibold text-gray-700">
            No Notes Yet
          </h3>

          <p className="text-gray-500 mt-3">
            Create your first note using the form above.
          </p>

        </div>
      ) : (
        <div className="space-y-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </>
  );
}