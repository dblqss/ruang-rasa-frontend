import { useState, useEffect } from "react";
import { articlesId, articlesEn } from "../data/articles";
import { translations } from "../utils/translations";

export default function Education() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "id");
  const [selectedCategory, setSelectedCategory] = useState(lang === "en" ? "All" : "Semua");
  const [sortBy, setSortBy] = useState("default");

  const t = (key) => translations[lang]?.[key] || translations["id"]?.[key] || key;

  useEffect(() => {
    const handleStorage = () => {
      setLang(localStorage.getItem("app-lang") || "id");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    setSelectedCategory(lang === "en" ? "All" : "Semua");
  }, [lang]);

  const articles = lang === "en" ? articlesEn : articlesId;
  const allLabel = lang === "en" ? "All" : "Semua";

  const categories = [allLabel, ...new Set(articles.map((art) => art.category))];

  const filteredArticles = articles
    .filter((art) => {
      const matchesCategory = selectedCategory === allLabel || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.intro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "time-asc") {
        const timeA = parseInt(a.time) || 0;
        const timeB = parseInt(b.time) || 0;
        return timeA - timeB;
      }
      if (sortBy === "time-desc") {
        const timeA = parseInt(a.time) || 0;
        const timeB = parseInt(b.time) || 0;
        return timeB - timeA;
      }
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-slate-800/80">
        <div className="text-left space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <span className="text-4xl select-none">📖</span> {t("eduHeaderTitle")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl">
            {t("eduHeaderSub")}
          </p>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-slate-800/60 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 select-none">🔍</span>
            <input
              type="text"
              placeholder={t("eduSearchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 text-sm transition-all placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
              {t("eduSortLabel")}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 dark:border-slate-800 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 text-sm cursor-pointer"
            >
              <option value="default">{t("eduSortRecommend")}</option>
              <option value="title-asc">{t("eduSortTitleAsc")}</option>
              <option value="title-desc">{t("eduSortTitleDesc")}</option>
              <option value="time-asc">{t("eduSortTimeAsc")}</option>
              <option value="time-desc">{t("eduSortTimeDesc")}</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
            {t("eduCategoryLabel")}
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-650 shadow-md shadow-indigo-150/10 dark:shadow-none"
                    : "bg-white dark:bg-slate-900 text-gray-655 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-3xl border border-gray-100 dark:border-slate-850/80">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-sm font-bold text-gray-500 dark:text-slate-400">
            {t("eduNoArticles")}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-indigo-100"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${item.color}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
                    ⏰ {item.time}
                  </span>
                </div>

                <div className="flex gap-3 items-start mb-3">
                  <span className="text-3xl select-none">{item.icon}</span>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 leading-snug hover:text-indigo-650 transition">
                    {item.title}
                  </h2>
                </div>

                <p className="text-gray-550 dark:text-slate-455 text-sm leading-relaxed mb-6 font-normal">
                  {item.intro}
                </p>
              </div>

              <button
                onClick={() => setSelectedArticle(item)}
                className="w-full bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold py-3 px-4 rounded-xl transition duration-200 cursor-pointer text-center text-sm"
              >
                {t("eduReadMore")}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-slate-800 relative p-8 transition-colors duration-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl font-bold bg-gray-100 dark:bg-slate-900 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-xl border mb-3 ${selectedArticle.color}`}>
                {selectedArticle.category}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100 leading-snug flex items-center gap-2.5">
                <span className="text-3xl select-none">{selectedArticle.icon}</span>
                {selectedArticle.title}
              </h2>
              <div className="flex gap-4 items-center mt-3 text-xs text-gray-400 dark:text-slate-500 font-medium border-b border-gray-100 dark:border-slate-900 pb-4">
                <span>⏰ {t("eduDuration").replace("{time}", selectedArticle.time)}</span>
                <span>•</span>
                <span>{t("eduTopic")}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="text-gray-650 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {selectedArticle.content}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-900 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 cursor-pointer text-sm shadow-md"
              >
                {t("eduFinishRead")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}