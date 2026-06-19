import { useEffect, useState } from "react";
import axios from "../api/axios";
import { translations, translateMoodName, translateActivityText } from "../utils/translations";

export default function Activities() {
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "id");
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  });

  const [mood, setMood] = useState(null);
  const [activities, setActivities] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showReview, setShowReview] = useState(false);
  const [moodAfter, setMoodAfter] = useState("");
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const t = (key) => translations[lang]?.[key] || translations["id"]?.[key] || key;

  // State untuk rutinitas self-care harian
  const [habits, setHabits] = useState({
    habit_1: false,
    habit_2: false,
    habit_3: false,
    habit_4: false,
  });

  // Sinkronisasi rutinitas self-care spesifik untuk setiap user dan tanggal hari ini
  useEffect(() => {
    const todayStr = new Date().toDateString();
    const prefix = user?.id ? `user_${user.id}_` : "";
    const savedDate = localStorage.getItem(`${prefix}habits_date`);

    if (savedDate !== todayStr) {
      localStorage.setItem(`${prefix}habits_date`, todayStr);
      localStorage.setItem(`${prefix}habit_1`, "false");
      localStorage.setItem(`${prefix}habit_2`, "false");
      localStorage.setItem(`${prefix}habit_3`, "false");
      localStorage.setItem(`${prefix}habit_4`, "false");
      setHabits({
        habit_1: false,
        habit_2: false,
        habit_3: false,
        habit_4: false,
      });
    } else {
      setHabits({
        habit_1: localStorage.getItem(`${prefix}habit_1`) === "true",
        habit_2: localStorage.getItem(`${prefix}habit_2`) === "true",
        habit_3: localStorage.getItem(`${prefix}habit_3`) === "true",
        habit_4: localStorage.getItem(`${prefix}habit_4`) === "true",
      });
    }
  }, [user]);

  const completedHabitsCount = Object.values(habits).filter(Boolean).length;

  // Hanya hitung aktivitas selesai yang termasuk dalam rekomendasi mood saat ini
  const completedRecommended = completed.filter(id => 
    activities.some(act => String(act.id) === String(id))
  );

  const toggleHabit = (habitId) => {
    const prefix = user?.id ? `user_${user.id}_` : "";
    setHabits((prev) => {
      const newVal = !prev[habitId];
      localStorage.setItem(`${prefix}${habitId}`, newVal ? "true" : "false");
      const updatedHabits = { ...prev, [habitId]: newVal };
      const updatedHabitsCount = Object.values(updatedHabits).filter(Boolean).length;

      // Trigger review if ALL recommended activities AND ALL self-care habits are completed
      if (updatedHabitsCount === 4) {
        if (completedRecommended.length < activities.length && activities.length > 0) {
          alert(t("alertReminderMoodTherapy"));
        } else if (completedRecommended.length === activities.length && activities.length > 0) {
          setShowReview(true);
        }
      }

      return updatedHabits;
    });
  };

  useEffect(() => {
    loadData();

    const handleStorage = () => {
      setLang(localStorage.getItem("app-lang") || "id");
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          console.error(e);
        }
      } else {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/activities-today");

      if (res.data && res.data.mood) {
        setMood(res.data.mood);
        setActivities(res.data.activities || []);
        setCompleted(res.data.completed || []);
      } else {
        setMood(null);
        setActivities([]);
        setCompleted([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data aktivitas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (activityId) => {
    const isCompleted = completed.some(id => String(id) === String(activityId));
    const updated = isCompleted
      ? completed.filter((id) => String(id) !== String(activityId))
      : [...completed, activityId];

    // Optimistic UI update
    setCompleted(updated);

    // Hitung ulang rekomendasi aktif setelah update
    const updatedRecommended = updated.filter(id => 
      activities.some(act => String(act.id) === String(id))
    );

    // Check validation:
    if (
      updatedRecommended.length === activities.length &&
      activities.length > 0
    ) {
      if (completedHabitsCount < 4) {
        alert(t("alertReminderSelfCare"));
      } else {
        setShowReview(true);
      }
    }

    try {
      await axios.post("/activity-complete", {
        activity_id: activityId,
      });
    } catch (err) {
      console.error("Gagal mengubah status aktivitas:", err);
      alert(t("alertCompleteFail"));
      // Revert state on failure
      setCompleted(completed);
    }
  };

  const submitReview = async () => {
    if (!moodAfter) {
      alert(t("alertSelectMoodAfter"));
      return;
    }

    try {
      setSubmittingReview(true);
      await axios.post("/activity-review", {
        mood_before: mood.name,
        mood_after: moodAfter,
        effectiveness: rating,
        notes: notes,
      });

      alert(t("alertReviewSuccess"));
      setShowReview(false);

      // Reset review form
      setMoodAfter("");
      setRating(5);
      setNotes("");
    } catch (err) {
      console.error("Gagal menyimpan review:", err);
      alert(t("alertReviewFail"));
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 dark:text-slate-400 font-medium">{t("loadingActivities")}</p>
      </div>
    );
  }

  if (!mood) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 max-w-xl mx-auto text-center mt-10 transition-colors">
        <div className="text-5xl mb-4 select-none">✨</div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-slate-200">{t("noMoodTitle")}</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
          {t("noMoodDesc")}
        </p>
        <button
          onClick={() => window.location.href = "/mood"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3.5 rounded-2xl transition duration-200 cursor-pointer"
        >
          {t("noMoodBtn")}
        </button>
      </div>
    );
  }

  const totalItemsCount = activities.length + 4;
  const totalCompletedCount = completedRecommended.length + completedHabitsCount;
  const progressPercent = totalItemsCount
    ? Math.round((totalCompletedCount / totalItemsCount) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
            🎯 {t("activitiesTitle")}
          </h1>
          <p className="text-gray-550 dark:text-slate-400 mt-1 text-sm">{t("activitiesSub")}</p>
        </div>
        <div className="bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/30 px-4 py-2 rounded-2xl flex items-center gap-2">
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">{t("currentMood")}</span>
          <span className="text-indigo-850 dark:text-indigo-200 font-extrabold bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-lg text-xs shadow-sm border border-gray-50 dark:border-slate-800">{translateMoodName(mood.name, lang)}</span>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800/60 transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2">
            🚀 {t("progressTitle")}
          </span>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 rounded-full">
            {totalCompletedCount} / {totalItemsCount} {t("selesaiLabel")}
          </span>
        </div>

        <div className="w-full bg-gray-100 dark:bg-slate-850 rounded-full h-3 mb-1 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
          {progressPercent === 100
            ? t("progressSubSuccess")
            : t("progressSubNormal")}
        </p>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column: Recommended Activities */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2 mb-1">
                🌱 {t("recommendationTitle")}
              </h2>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                {t("recommendationDesc")}
              </p>
            </div>

            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-slate-500 italic">{t("noRecommendation")}</p>
              ) : (
                activities.map((activity) => {
                  const isDone = completed.some(id => String(id) === String(activity.id));
                  return (
                    <div
                      key={activity.id}
                      onClick={() => handleComplete(activity.id)}
                      className={`rounded-3xl p-5 border transition-all duration-200 cursor-pointer ${isDone
                        ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-gray-100/80 dark:border-slate-800/60 shadow-sm hover:shadow hover:border-indigo-100 dark:hover:border-indigo-900/65"
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleComplete(activity.id);
                            }}
                            className="w-5 h-5 rounded border-gray-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl select-none">{activity.icon || "✨"}</span>
                            <h3 className={`text-base font-extrabold ${isDone ? "text-gray-450 dark:text-slate-500 line-through" : "text-gray-800 dark:text-slate-200"}`}>
                              {translateActivityText(activity.title, lang)}
                            </h3>
                          </div>

                          <p className={`mt-2 text-xs leading-relaxed font-normal ${isDone ? "text-gray-400 dark:text-slate-500" : "text-gray-600 dark:text-slate-400"}`}>
                            {translateActivityText(activity.description, lang)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Custom Self-Care Corner & Habit Tracker */}
          <div className="lg:col-span-1 space-y-6">

            {/* Quick Habits Checker */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 transition-colors">
              <h3 className="font-bold text-sm text-gray-800 dark:text-slate-100 mb-1 flex items-center gap-2">
                💧 {t("selfCareTitle")}
              </h3>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 mb-4">
                {t("selfCareDesc")}
              </p>

              <div className="space-y-3">
                {[
                  { id: "habit_1", label: t("habit1"), icon: "💧" },
                  { id: "habit_2", label: t("habit2"), icon: "📵" },
                  { id: "habit_3", label: t("habit3"), icon: "🧘" },
                  { id: "habit_4", label: t("habit4"), icon: "🌳" },
                ].map((habit) => {
                  const checked = habits[habit.id];
                  return (
                    <label key={habit.id} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-50 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base select-none">{habit.icon}</span>
                        <span className="text-xs text-gray-700 dark:text-slate-350 font-semibold">{habit.label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleHabit(habit.id)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Daily Counselor Note */}
            <div className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-900/20 rounded-3xl p-6 shadow-sm">
              <span className="text-2xl select-none">🕊️</span>
              <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mt-2 mb-1">
                {t("counselorNoteTitle")}
              </h4>
              <p className="text-indigo-850 dark:text-slate-350 text-xs leading-relaxed font-normal">
                {t("counselorNoteText")}
              </p>
            </div>

            {/* Habit Streak Calendar */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 transition-colors">
              <h3 className="font-bold text-sm text-gray-800 dark:text-slate-100 mb-1">
                🗓️ {t("consistencyTitle")}
              </h3>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 mb-4">
                {t("consistencyDesc")}
              </p>
              <div className="grid grid-cols-7 gap-2">
                {(Array.isArray(t("daysOfWeek")) ? t("daysOfWeek") : ["Se", "Se", "Ra", "Ka", "Ju", "Sa", "Mi"]).map((day, idx) => {
                  const isActive = idx < new Date().getDay();
                  const isToday = idx === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
                  return (
                    <div key={idx} className="space-y-1">
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold block">{day}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs mx-auto ${isToday
                        ? "bg-indigo-600 text-white font-bold ring-2 ring-indigo-200 dark:ring-indigo-900/80"
                        : isActive
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold"
                          : "bg-gray-50 dark:bg-slate-800/40 text-gray-300 dark:text-slate-600"
                        }`}>
                        {isActive ? "✓" : "•"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 dark:border-slate-800 relative animate-in fade-in zoom-in-95 duration-200 transition-colors">
            <button
              onClick={() => setShowReview(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold bg-gray-100 dark:bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <span className="text-4xl select-none">🎉</span>
              <h2 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100 mt-2">
                {t("reviewModalTitle")}
              </h2>
              <p className="text-gray-550 dark:text-slate-400 text-xs mt-1">{t("reviewModalDesc")}</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-350 mb-2">
                  {t("reviewMoodAfterLabel")}
                </label>
                <select
                  value={moodAfter}
                  onChange={(e) => setMoodAfter(e.target.value)}
                  className="w-full border border-gray-200 dark:border-slate-800 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 dark:text-slate-200 text-sm"
                >
                  <option value="">{t("reviewSelectPlaceholder")}</option>
                  <option value={lang === "en" ? "😄 Very Happy" : "😄 Sangat Bahagia"}>{lang === "en" ? "😄 Very Happy" : "😄 Sangat Bahagia"}</option>
                  <option value={lang === "en" ? "😊 Happy" : "😊 Bahagia"}>{lang === "en" ? "😊 Happy" : "😊 Bahagia"}</option>
                  <option value={lang === "en" ? "😌 Calm" : "😌 Tenang"}>{lang === "en" ? "😌 Calm" : "😌 Tenang"}</option>
                  <option value={lang === "en" ? "😐 Neutral" : "😐 Biasa Saja"}>{lang === "en" ? "😐 Neutral" : "😐 Biasa Saja"}</option>
                  <option value={lang === "en" ? "😔 Still Sad" : "😔 Masih Sedih"}>{lang === "en" ? "😔 Still Sad" : "😔 Masih Sedih"}</option>
                  <option value={lang === "en" ? "😰 Still Stressed" : "😰 Masih Stres"}>{lang === "en" ? "😰 Still Stressed" : "😰 Masih Stres"}</option>
                  <option value={lang === "en" ? "😟 Still Anxious" : "😟 Masih Cemas"}>{lang === "en" ? "😟 Still Anxious" : "😟 Masih Cemas"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-350 mb-2">
                  {t("reviewHelpfulnessLabel")}
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full border border-gray-200 dark:border-slate-800 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 dark:text-slate-200 text-sm font-medium"
                >
                  <option value="5">{lang === "en" ? "⭐⭐⭐⭐⭐ (Very Helpful)" : "⭐⭐⭐⭐⭐ (Sangat Membantu)"}</option>
                  <option value="4">{lang === "en" ? "⭐⭐⭐⭐ (Helpful)" : "⭐⭐⭐⭐ (Cukup Membantu)"}</option>
                  <option value="3">{lang === "en" ? "⭐⭐⭐ (Neutral)" : "⭐⭐⭐ (Biasa Saja)"}</option>
                  <option value="2">{lang === "en" ? "⭐⭐ (Less Helpful)" : "⭐⭐ (Kurang Membantu)"}</option>
                  <option value="1">{lang === "en" ? "⭐ (Not Helpful)" : "⭐ (Tidak Membantu)"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-350 mb-2">
                  {t("reviewReflectionsLabel")}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("reviewReflectionsPlaceholder")}
                  className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-xl h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 dark:text-slate-200 text-sm resize-none placeholder:text-gray-400"
                />
              </div>

              <button
                onClick={submitReview}
                disabled={submittingReview}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-5 rounded-xl transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer flex justify-center items-center"
              >
                {submittingReview ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  t("reviewSaveBtn")
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
