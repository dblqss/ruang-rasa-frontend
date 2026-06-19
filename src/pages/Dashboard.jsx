import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { translations, translateMoodName, translateActivityText } from "../utils/translations";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "id");
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // Breathing states
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("idle"); // idle, inhale, hold, exhale, done

  const t = (key) => translations[lang]?.[key] || translations["id"]?.[key] || key;

  useEffect(() => {
    // Load user data
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // Pilih kutipan motivasi acak setiap kali membuka halaman/login
    const randomIdx = Math.floor(Math.random() * 10);
    setQuoteIndex(randomIdx);

    loadDashboardData();

    const handleStorage = () => {
      setLang(localStorage.getItem("app-lang") || "id");
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/dashboard");
      setStats(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const startBreathing = () => {
    if (breathActive) return;
    setBreathActive(true);
    
    // 4-7-8 Breathing Technique
    // 1. Inhale (4s)
    setBreathPhase("inhale");
    
    setTimeout(() => {
      // 2. Hold (7s)
      setBreathPhase("hold");
      
      setTimeout(() => {
        // 3. Exhale (8s)
        setBreathPhase("exhale");
        
        setTimeout(() => {
          // 4. Complete
          setBreathPhase("done");
          setBreathActive(false);
          
          setTimeout(() => {
            setBreathPhase("idle");
          }, 3000);
        }, 8000);
      }, 7000);
    }, 4000);
  };

  const quotesId = [
    "Setiap emosi adalah pesan berharga dari tubuhmu. Dengarkan dia dengan penuh rasa sayang, bukan penghakiman.",
    "Tidak apa-apa untuk merasa tidak baik-baik saja. Izinkan dirimu untuk beristirahat dan bernapas sejenak hari ini.",
    "Pikiranmu adalah taman. Siramilah dengan penerimaan, kasih sayang diri, dan ruang tenang untuk bertumbuh.",
    "Kamu tidak harus menyelesaikan semuanya hari ini. Cukup ambil satu langkah kecil yang membuat hatimu tenang.",
    "Ketenangan bukanlah ketiadaan badai, melainkan kedamaian di dalam hati di tengah-tengah badai tersebut.",
    "Bernapaslah dalam-dalam. Ingatlah bahwa kamu sudah berjuang dengan sangat baik sampai detik ini.",
    "Menghargai emosi sedih atau lelahmu adalah langkah pertama menuju penyembuhan diri yang tulus.",
    "Hari ini adalah hari baru. Lepaskan beban kemarin, dan sambutlah hari ini dengan penuh kelembutan pada dirimu.",
    "Self-care terbaik hari ini mungkin adalah mematikan ponselmu sejenak dan menikmati secangkir teh hangat.",
    "Jangan terlalu keras pada dirimu sendiri. Kamu sedang berproses, dan setiap proses membutuhkan waktu.",
  ];
  const quotesEn = [
    "Every emotion is a valuable message from your body. Listen to it with compassion, not judgment.",
    "It's okay not to be okay. Allow yourself to rest and take a breath for a moment today.",
    "Your mind is a garden. Water it with acceptance, self-compassion, and quiet space to grow.",
    "You don't have to solve everything today. Just take one small step that brings peace to your heart.",
    "Peace is not the absence of a storm, but peace within your heart in the midst of the storm.",
    "Breathe deeply. Remember that you have fought very well up to this point.",
    "Valuing your sad or tired emotions is the first step toward genuine self-healing.",
    "Today is a new day. Let go of yesterday's burdens, and greet today with gentleness toward yourself.",
    "The best self-care today might be turning off your phone for a moment and enjoying a warm cup of tea.",
    "Don't be too hard on yourself. You are in transition, and every process takes time.",
  ];
  const activeQuotes = lang === "en" ? quotesEn : quotesId;
  const quote = activeQuotes[quoteIndex] || activeQuotes[0];

  const moodValue = stats?.mood_hari_ini || "Belum Diisi";
  const hasFilledMood = moodValue !== "Belum Diisi";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Top Banner Greetings with Clouds & Plants */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden transition-colors">
        
        {/* Background Visual Elements */}
        <div className="absolute right-12 top-[-10px] text-7xl opacity-10 select-none pointer-events-none">☁️</div>
        <div className="absolute left-1/3 bottom-[-15px] text-5xl opacity-5 select-none pointer-events-none">🌿</div>
        
        <div className="z-10">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100/30">
            {lang === "en" ? "Journal Space" : "Ruang Jurnal"}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-slate-100 tracking-tight mt-3">
            {t("welcomeBack")} {user?.name || (lang === "en" ? "Friend" : "Teman")} 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
            {lang === "en"
              ? "Take a moment to monitor your emotions. A calm day begins with a peaceful mind."
              : "Luangkan waktu sejenak untuk memantau emosimu. Hari yang tenang dimulai dari pikiran yang damai."}
          </p>
        </div>

        {!hasFilledMood && (
          <Link
            to="/mood"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm z-10 whitespace-nowrap"
          >
            {lang === "en" ? "Log Today's Mood ☁️" : "Isi Mood Hari Ini ☁️"}
          </Link>
        )}
      </div>

      {/* Quote Banner */}
      <div className="text-center py-4 px-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100/80 dark:border-slate-800/60 rounded-3xl">
        <p className="text-sm italic text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
          &ldquo;{quote}&rdquo; 🌿✨
        </p>
      </div>

      {/* "Bagaimana Harimu?" Quick Link Card */}
      <div className="bg-gradient-sunset p-6 rounded-3xl border border-indigo-200/20 dark:border-indigo-900/10 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300 hover:scale-[1.01] shadow-glow-rose/10 hover:shadow-glow-rose/30">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="text-3xl select-none">💭</span>
          <div>
            <h3 className="font-extrabold text-white text-sm text-glow-rose">
              {lang === "en" ? "How was your day?" : "Bagaimana Harimu Hari Ini?"}
            </h3>
            <p className="text-xs text-white/90 mt-1 font-semibold">
              {lang === "en"
                ? "Express your feelings and log your mood today to view updated emotional analysis."
                : "Ekspresikan perasaanmu dan catat mood-mu hari ini untuk melihat analisis emosi terupdate."}
            </p>
          </div>
        </div>
        <Link
          to="/mood"
          className="bg-white hover:bg-slate-50 text-indigo-950 font-bold px-5 py-2.5 rounded-2xl text-xs transition duration-200 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
        >
          {lang === "en" ? "Log Mood Now →" : "Catat Mood Sekarang →"}
        </Link>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Mood Hari Ini */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition hover:shadow-md">
          <div>
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                {lang === "en" ? "Today's Mood" : "Mood Hari Ini"}
              </span>
              <span className="text-xl select-none">🌙</span>
            </div>
            <p className={`text-2xl font-bold mt-4 ${hasFilledMood ? "text-gray-800 dark:text-slate-100" : "text-gray-400 dark:text-slate-500 italic"}`}>
              {hasFilledMood ? translateMoodName(moodValue, lang) : (lang === "en" ? "Not Logged" : "Belum Diisi")}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-900 text-xs">
            {hasFilledMood ? (
              <span className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-lg border border-emerald-100/30">
                {lang === "en" ? "✓ Logged" : "✓ Tercatat"}
              </span>
            ) : (
              <Link to="/mood" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">
                {lang === "en" ? "Log mood now →" : "Isi mood sekarang →"}
              </Link>
            )}
          </div>
        </div>

        {/* Total Catatan */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition hover:shadow-md">
          <div>
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">{t("totalLogsLabel")}</span>
              <span className="text-xl select-none">📝</span>
            </div>
            <p className="text-3xl font-extrabold text-gray-800 dark:text-slate-100 mt-4">
              {stats?.total_catatan || 0}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-900 text-xs text-gray-400 dark:text-slate-500">
            {lang === "en" ? "Total emotional journal logs saved" : "Total jurnal emosional yang disimpan"}
          </div>
        </div>

        {/* Mood Dominan */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition hover:shadow-md">
          <div>
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">{t("dominantMoodLabel")}</span>
              <span className="text-xl select-none">👑</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-slate-100 mt-4">
              {stats?.mood_dominan ? translateMoodName(stats.mood_dominan, lang) : (lang === "en" ? "None Yet" : "Belum Ada")}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-900 text-xs text-gray-400 dark:text-slate-500">
            {lang === "en" ? "Most dominant emotional condition" : "Kondisi hati paling dominan"}
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 flex flex-col justify-between transition hover:shadow-md">
          <div>
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                {lang === "en" ? "Consistency" : "Konsistensi"}
              </span>
              <span className="text-xl select-none">🔥</span>
            </div>
            <p className="text-3xl font-extrabold text-gray-800 dark:text-slate-100 mt-4">
              {stats?.streak || 0} {lang === "en" ? "Days" : "Hari"}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800/40 text-xs text-gray-400 dark:text-slate-500">
            {lang === "en" ? "Consecutive days logging emotions" : "Hari beruntun mencatat emosi"}
          </div>
        </div>

      </div>

      {/* Main Sections Grid */}
      <div className="grid md:grid-cols-5 gap-8">
        
        {/* LEFT COLUMN: Dynamic Insights & Recent History */}
        <div className="md:col-span-3 space-y-8">
          
          {/* Dynamic Insights */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 transition-colors">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-2xl select-none">💡</span>
              <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                {t("insightsTitle")}
              </h2>
            </div>

            <ul className="space-y-4">
              {stats?.insights?.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-slate-355 leading-relaxed font-normal">
                  <span className="text-indigo-650 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-0.5 rounded-lg text-xs border border-indigo-100/25">✓</span>
                  <span>{translateActivityText(insight, lang)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Mood Logs */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl select-none">🕒</span>
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                  {t("recentLogsTitle")}
                </h2>
              </div>
              <Link to="/statistics" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                {lang === "en" ? "View Details →" : "Lihat Selengkapnya →"}
              </Link>
            </div>

            {(!stats?.recent_logs || stats.recent_logs.length === 0) ? (
              <p className="text-sm text-gray-450 dark:text-slate-500 italic p-4 text-center">
                {lang === "en" ? "No emotional logs recorded yet." : "Belum ada catatan emosi tersimpan."}
              </p>
            ) : (
              <div className="space-y-4">
                {stats.recent_logs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100/50 dark:border-slate-800 rounded-2xl flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-gray-400 dark:text-slate-500 font-semibold">{log.log_date}</span>
                      <p className="text-sm text-gray-750 dark:text-slate-300 font-normal leading-relaxed">{log.notes}</p>
                    </div>
                    <span className="bg-white dark:bg-slate-900 px-3 py-1 rounded-xl text-xs font-bold shadow-sm border border-gray-50 dark:border-slate-800 whitespace-nowrap">
                      {translateMoodName(log.mood_name, lang)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Breathing Space */}
        <div className="bg-gradient-to-tr from-indigo-900 to-violet-950 p-8 rounded-3xl shadow-xl text-white md:col-span-2 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
          
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-lg">
                  {lang === "en" ? "Quiet Space" : "Ruang Tenang"}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  {lang === "en" ? "4-7-8 Breathing Relaxation" : "Relaksasi Napas 4-7-8"}
                </h3>
              </div>
              <span className="text-2xl select-none">🍃</span>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed mt-2 font-normal">
              {lang === "en"
                ? "A deep breathing method that helps relax the nervous system, lower heart rate, and dissolve anxiety."
                : "Metode pernapasan dalam yang membantu melemaskan sistem saraf, meredakan detak jantung berlebih, dan melunturkan kecemasan."}
            </p>
          </div>

          {/* Interactive Visual Breathing Indicator */}
          <div className="my-8 flex flex-col items-center justify-center min-h-[160px]">
            <div 
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-1000 border-2 select-none ${
                breathPhase === "inhale" 
                  ? "bg-indigo-400/30 border-indigo-300 scale-125 duration-[4000ms] shadow-glow-rose" 
                  : breathPhase === "hold" 
                    ? "bg-violet-400/40 border-violet-300 scale-125 duration-1000 shadow-glow-tan" 
                    : breathPhase === "exhale" 
                      ? "bg-emerald-400/25 border-emerald-300 scale-95 duration-[8000ms] shadow-glow-secondary" 
                      : "bg-white/5 border-white/20 scale-100 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              }`}
            >
              <div className="text-center p-2">
                <span className="text-xs font-bold text-white tracking-wide block">
                  {breathPhase === "inhale" && (lang === "en" ? "INHALE" : "TARIK NAPAS")}
                  {breathPhase === "hold" && (lang === "en" ? "HOLD" : "TAHAN")}
                  {breathPhase === "exhale" && (lang === "en" ? "EXHALE" : "HEMBUSKAN")}
                  {breathPhase === "done" && (lang === "en" ? "DONE" : "SELESAI")}
                  {breathPhase === "idle" && (lang === "en" ? "START" : "MULAI")}
                </span>
                <span className="text-[10px] text-indigo-200 block mt-0.5">
                  {breathPhase === "inhale" && "4s"}
                  {breathPhase === "hold" && "7s"}
                  {breathPhase === "exhale" && "8s"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={startBreathing}
              disabled={breathActive}
              className={`w-full py-4 px-5 rounded-2xl font-bold transition duration-300 flex items-center justify-center cursor-pointer shadow ${
                breathActive
                  ? "bg-white/10 text-indigo-200 cursor-not-allowed"
                  : "bg-white text-indigo-900 hover:bg-indigo-50 hover:shadow-md"
              }`}
            >
              {breathActive
                ? (lang === "en" ? "Session in Progress..." : "Latihan Sedang Berjalan...")
                : (lang === "en" ? "Start Breathing Session" : "Mulai Sesi Bernapas")}
            </button>

            <div className="mt-4 text-center min-h-[40px] flex items-center justify-center">
              <p className="text-xs font-medium text-indigo-200 select-none">
                {breathPhase === "inhale" && (lang === "en" ? "Inhale slowly... 🌬️ (4 seconds)" : "Tarik napas perlahan... 🌬️ (4 detik)")}
                {breathPhase === "hold" && (lang === "en" ? "Hold your breath calmly... 🧘 (7 seconds)" : "Tahan napasmu dengan tenang... 🧘 (7 detik)")}
                {breathPhase === "exhale" && (lang === "en" ? "Exhale slowly... 🍃 (8 seconds)" : "Hembuskan napas perlahan... 🍃 (8 detik)")}
                {breathPhase === "done" && (lang === "en" ? "Done! Your body now feels more relaxed. ✨" : "Selesai! Tubuhmu kini terasa lebih rileks. ✨")}
                {breathPhase === "idle" && (lang === "en" ? "Tap the button above to start 🌬️" : "Ketuk tombol di atas untuk mulai 🌬️")}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}