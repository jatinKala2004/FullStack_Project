import NotesSection from "@/components/NotesSection";

async function getNotes() {
  const res = await fetch("http://localhost:5000/api/notes", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const notes = await getNotes();

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-10 md:py-14">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-700">
            📝 Quick Notes
          </h1>

          <p className="text-center text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Capture your ideas, tasks and reminders in one place.
          </p>

        </div>

      </section>

      {/* Notes Section */}
      <section className="bg-[#FFF8E7] min-h-screen px-4 py-10 md:py-14">

        <NotesSection notes={notes} />

      </section>

    </main>
  );
}