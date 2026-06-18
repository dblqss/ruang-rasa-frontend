import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Statistics() {
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const [monthlyRes, yearlyRes, distRes] = await Promise.all([
        axios.get("/statistics/monthly"),
        axios.get("/statistics/yearly"),
        axios.get("/statistics/mood-distribution"),
      ]);

      setMonthly(monthlyRes.data.data || []);
      setYearly(yearlyRes.data.data || []);
      setDistribution(distRes.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil data statistik:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (moodName) => {
    const name = moodName.toLowerCase();
    if (name.includes("sangat bahagia") || name.includes("bahagia")) {
      return "#846044"; // Terracotta Brown
    }
    if (name.includes("bersyukur") || name.includes("syukur")) {
      return "#98A086"; // Sage Green
    }
    if (name.includes("semangat") || name.includes("produktif")) {
      return "#C4A071"; // Golden Tan
    }
    if (name.includes("tenang") || name.includes("damai")) {
      return "#b1bc9e"; // Light Olive/Sage
    }
    if (name.includes("biasa")) {
      return "#dfccb1"; // Warm Beige
    }
    if (name.includes("cemas") || name.includes("khawatir") || name.includes("stres")) {
      return "#A76D5E"; // Dusty Rose
    }
    if (name.includes("marah") || name.includes("kesal")) {
      return "#bd4f3c"; // Brick Red/Muted Rust
    }
    if (name.includes("sedih") || name.includes("kecewa") || name.includes("sepi")) {
      return "#70594a"; // Muted Cocoa Brown
    }
    if (name.includes("lelah") || name.includes("ngantuk") || name.includes("bosan")) {
      return "#a4ac86"; // Muted Greenish Earth
    }

    // Dynamic hashed color fallback using our earth tone values
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ["#846044", "#98A086", "#C4A071", "#b1bc9e", "#dfccb1", "#A76D5E", "#bd4f3c", "#70594a", "#a4ac86"];
    return colors[Math.abs(hash) % colors.length];
  };

  const totalLogs = distribution.reduce((sum, item) => sum + item.total, 0);

  const getCounselorInsight = () => {
    if (distribution.length === 0) {
      return "Belum ada catatan emosi yang terekam di sistem. Silakan isi mood harianmu di menu 'Mood Hari Ini' agar konselor virtual kami dapat memetakan kestabilan emosi dan memberikan rangkuman analisis pola pikiranmu secara lengkap.";
    }

    const topMoodItem = [...distribution].sort((a, b) => b.total - a.total)[0];
    const topMoodName = topMoodItem.mood_name;
    const topMoodPercentage = Math.round((topMoodItem.total / totalLogs) * 100);

    const nameLower = topMoodName.toLowerCase();
    if (nameLower.includes("bahagia") || nameLower.includes("tenang") || nameLower.includes("syukur")) {
      return `Analisis menunjukkan bahwa emosi yang paling dominan kamu rasakan adalah ${topMoodName} dengan kontribusi sebesar ${topMoodPercentage}% dari keseluruhan catatanmu. Ini adalah tanda yang sangat baik, menunjukkan bahwa pikiranmu sedang berada dalam fase yang stabil, damai, dan penuh penerimaan diri. Untuk mempertahankan kondisi positif ini, cobalah untuk tetap konsisten menulis jurnal refleksi harian, membagikan energi positifmu ke lingkungan sosial, dan merayakan pencapaian-pencapaian kecil setiap hari sebagai apresiasi terhadap dirimu sendiri.`;
    }
    if (nameLower.includes("cemas") || nameLower.includes("khawatir") || nameLower.includes("stres")) {
      return `Berdasarkan rangkuman data, emosimu didominasi oleh perasaan ${topMoodName} sebesar ${topMoodPercentage}% dari total log. Seringkali kecemasan atau tekanan mental yang berlebih dipicu oleh kekhawatiran tentang hal-hal di masa depan yang belum terjadi, atau beban kerja yang menumpuk. Konselor menyarankanmu untuk melatih teknik pernapasan lambat diafragma (seperti sesi napas 4-7-8 di Dashboard) guna menstabilkan detak jantung, membatasi asupan kafein yang dapat memicu adrenalin, serta fokus menyelesaikan tugas kecil satu per satu untuk menghindari rasa tertekan.`;
    }
    if (nameLower.includes("sedih") || nameLower.includes("kecewa") || nameLower.includes("sepi")) {
      return `Data menunjukkan adanya kecenderungan perasaan ${topMoodName} yang cukup tinggi, yaitu sekitar ${topMoodPercentage}% dari total catatanmu. Merasa sedih, terluka, atau merasa terasing adalah bagian normal dari emosi manusia. Cobalah rilis kesedihan tersebut dengan menulis jurnal ekspresif secara jujur tanpa sensor di menu 'Cerita Yuk', hubungi teman dekat untuk sekadar mendengarkan keluh kesahmu, dan luangkan waktu 15 menit untuk jalan kaki santai menghirup udara segar guna membantu merangsang hormon kebahagiaan alami di dalam tubuhmu.`;
    }
    if (nameLower.includes("lelah") || nameLower.includes("ngantuk")) {
      return `Kamu cenderung merasa ${topMoodName} belakangan ini, yang menyumbang sekitar ${topMoodPercentage}% dari jurnal emosimu. Ini adalah cara tubuhmu berkomunikasi bahwa energi fisik dan mentalmu sudah berada di batas kapasitasnya. Konselor sangat menyarankanmu untuk merapikan jam tidur (sleep hygiene), menghindari paparan layar ponsel 30 menit sebelum tidur, serta menyempatkan waktu istirahat mikro selama 5 menit di tengah-tengah pekerjaan agar terhindar dari burnout berkepanjangan.`;
    }

    return `Mood utama yang kamu rasakan adalah ${topMoodName} dengan frekuensi ${topMoodPercentage}% dari keseluruhan jurnal emosimu. Tetap catat kondisimu setiap hari secara jujur untuk mendapatkan hasil pemetaan psikologis jangka panjang yang lebih akurat.`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 dark:text-slate-400 font-medium">Menganalisis statistik emosimu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
          📊 Analisis & Statistik Mood
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">
          Pantau grafik distribusi emosi dan dapatkan pemahaman mendalam tentang pola suasana hatimu.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* DONUT CHART: MOOD DISTRIBUTION */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 flex flex-col justify-between transition-colors">
          <div>
            <h2 className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-1">Penyebaran Emosi</h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-6">
              Grafik lingkaran ini memperlihatkan pembagian kategori mood yang pernah Anda isi. Gunakan diagram ini untuk melacak perasaan apa yang paling sering muncul dalam keseharian Anda.
            </p>
          </div>

          {distribution.length === 0 ? (
            <div className="flex items-center justify-center h-56 text-gray-400 dark:text-slate-500 text-sm italic">
              Belum ada data jurnaling emosi.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <div className="w-[180px] h-[180px] flex items-center justify-center relative flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribution}
                      dataKey="total"
                      nameKey="mood_name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {distribution.map((entry, index) => (
                        <Cell key={index} fill={getMoodColor(entry.mood_name)} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} kali`, name]}
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-800 dark:text-slate-200">{totalLogs}</span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Total Log</span>
                </div>
              </div>

              {/* Custom Legend */}
              <div className="flex-1 w-full space-y-2.5 max-h-[200px] overflow-y-auto pr-2">
                {distribution.map((item, index) => {
                  const pct = Math.round((item.total / totalLogs) * 100);
                  return (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getMoodColor(item.mood_name) }}
                        />
                        <span className="font-semibold text-gray-700 dark:text-slate-350">{item.mood_name}</span>
                      </div>
                      <span className="text-gray-400 dark:text-slate-500 font-bold">
                        {item.total}x ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* BAR CHART: MONTHLY FREQUENCY */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 flex flex-col justify-between transition-colors">
          <div>
            <h2 className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-1">Konsistensi Bulanan</h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-6">
              Grafik batang ini merekam tingkat keaktifan menulis jurnal emosi Anda setiap bulannya. Ini membantu memantau konsistensi pencatatan Anda demi hasil analisis psikologis jangka panjang.
            </p>
          </div>

          {monthly.length === 0 ? (
            <div className="flex items-center justify-center h-56 text-gray-400 dark:text-slate-500 text-sm italic">
              Belum ada data jurnaling bulanan.
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <XAxis dataKey="bulan" tickLine={false} axisLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <Tooltip 
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#846044"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Counselor Insight Panel */}
      <div className="bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100/40 dark:border-indigo-900/30 rounded-3xl p-8 shadow-sm flex items-start gap-4">
        <span className="text-3xl mt-0.5 select-none">🧠</span>
        <div className="flex-1">
          <h3 className="font-extrabold text-indigo-900 dark:text-indigo-300 text-lg mb-2">Analisis Pola Emosimu</h3>
          <p className="text-indigo-850 dark:text-slate-100 text-sm leading-relaxed font-normal">
            {getCounselorInsight()}
          </p>
        </div>
      </div>

      {/* Monthly Table Details */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 transition-colors">
        <h2 className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-2">Tabel Detail Frekuensi Bulanan</h2>
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-6">Berikut adalah rincian angka frekuensi pencatatan suasana hati yang Anda lakukan setiap bulannya.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 text-gray-400 dark:text-slate-500 font-semibold">
                <th className="p-3.5">Bulan</th>
                <th className="p-3.5 text-right">Frekuensi Pengisian</th>
              </tr>
            </thead>
            <tbody>
              {monthly.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-400 dark:text-slate-500 italic">Belum ada data bulanan</td>
                </tr>
              ) : (
                monthly.map((item, index) => (
                  <tr key={index} className="border-b border-gray-50 dark:border-slate-800/40 text-gray-600 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition duration-150">
                    <td className="p-3.5 font-medium text-gray-800 dark:text-slate-200">{item.bulan}</td>
                    <td className="p-3.5 text-right">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-xl text-xs inline-block">
                        {item.total} kali
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}