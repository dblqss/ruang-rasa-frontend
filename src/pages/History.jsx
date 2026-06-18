export default function History() {
  const data = [
    {
      mood: "😊 Bahagia",
      date: "18 Juni 2026",
      notes: "Hari ini menyenangkan",
    },
    {
      mood: "😔 Sedih",
      date: "17 Juni 2026",
      notes: "Capek banyak tugas",
    },
    {
      mood: "😡 Marah",
      date: "16 Juni 2026",
      notes: "Deadline numpuk",
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        📜 Riwayat Mood
      </h1>

      <div className="space-y-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold">
              {item.mood}
            </h2>

            <p className="text-gray-500">
              {item.date}
            </p>

            <p className="mt-3">
              {item.notes}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}