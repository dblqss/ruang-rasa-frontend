import { useEffect, useState } from "react";
import axios from "../api/axios";

function Mood() {
  const [moods, setMoods] = useState([]);
  const [moodId, setMoodId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMoods();
  }, []);

  const getMoods = async () => {
    try {
      const res = await axios.get("/moods");
      setMoods(res.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil daftar mood:", err);
      setMoods([]);
    }
  };

  const saveMood = async () => {
    if (!moodId) {
      alert("Silakan pilih salah satu suasana hatimu terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/mood-logs", {
        mood_id: moodId,
        notes,
        log_date: new Date().toISOString().split("T")[0],
      });

      alert("Mood harianmu berhasil disimpan! 🎉");
      setMoodId("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan catatan mood. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const getEmoji = (name) => {
    const mood = name.toLowerCase();
    if (mood.includes("sangat bahagia")) return "😄";
    if (mood.includes("bahagia")) return "😊";
    if (mood.includes("tenang")) return "😌";
    if (mood.includes("bersyukur")) return "🥰";
    if (mood.includes("stres")) return "😰";
    if (mood.includes("sedih")) return "😔";
    if (mood.includes("marah")) return "😡";
    if (mood.includes("cemas")) return "😟";
    if (mood.includes("bingung")) return "🤔";
    if (mood.includes("produktif") || mood.includes("semangat")) return "🚀";
    return "🙂";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
          😊 Mood Hari Ini
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">
          Bagaimana kondisi pikiran dan perasaanmu saat ini? Pilih yang paling mendekati.
        </p>
      </div>

      {/* Grid Mood Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {moods.map((mood) => {
          const isSelected = String(moodId) === String(mood.id);
          return (
            <div
              key={mood.id}
              onClick={() => setMoodId(mood.id)}
              className={`cursor-pointer rounded-3xl p-6 bg-white dark:bg-slate-950 transition-all duration-200 hover:shadow-md border ${
                isSelected
                  ? "border-4 border-indigo-600 dark:border-indigo-400 scale-[1.03]"
                  : "border-gray-100 dark:border-slate-850 hover:border-indigo-100/60"
              }`}
            >
              <div className="text-4xl select-none mb-3">
                {getEmoji(mood.name)}
              </div>
              <h3 className="font-extrabold text-gray-800 dark:text-slate-200 text-sm">
                {mood.name}
              </h3>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1 leading-relaxed">
                {mood.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Notes Section */}
      <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
          <span>📝</span> Ceritakan Lebih Detail (Opsional)
        </h2>

        <textarea
          rows="5"
          placeholder="Apa yang membuatmu merasa seperti itu hari ini? Tuliskan pikiran atau kejadian penting yang kamu alami secara santai..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-200 dark:border-slate-850 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 dark:bg-slate-900 dark:text-slate-200 text-sm placeholder:text-gray-450 resize-none leading-relaxed transition"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveMood}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-450 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer text-sm flex items-center justify-center min-w-[150px]"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Simpan Mood Harian"
        )}
      </button>
    </div>
  );
}

export default Mood;