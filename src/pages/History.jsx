import { translations } from "../utils/translations";

export default function History() {
  const lang = localStorage.getItem("app-lang") || "id";

  const dataId = [
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

  const dataEn = [
    {
      mood: "😊 Happy",
      date: "June 18, 2026",
      notes: "Today was fun",
    },
    {
      mood: "😔 Sad",
      date: "June 17, 2026",
      notes: "Tired of so much homework",
    },
    {
      mood: "😡 Angry",
      date: "June 16, 2026",
      notes: "Deadlines are piling up",
    },
  ];

  const data = lang === "en" ? dataEn : dataId;
  const title = lang === "en" ? "📜 Mood History" : "📜 Riwayat Mood";

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        {title}
      </h1>

      <div className="space-y-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm transition-colors"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">
              {item.mood}
            </h2>

            <p className="text-gray-450 dark:text-slate-500 text-sm">
              {item.date}
            </p>

            <p className="mt-3 text-gray-600 dark:text-slate-400 font-normal">
              {item.notes}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}