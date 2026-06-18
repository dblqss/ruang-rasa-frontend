import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { translations } from "../utils/translations";

export default function Sidebar() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "id");

  useEffect(() => {
    const loadUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    };
    loadUser();

    const handleStorage = () => {
      loadUser();
      setLang(localStorage.getItem("app-lang") || "id");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const t = (key) => translations[lang][key] || key;

  const menus = [
    { name: t("menuDashboard"), path: "/dashboard", icon: "🏠" },
    { name: t("menuMood"), path: "/mood", icon: "😊" },
    { name: t("menuStatistics"), path: "/statistics", icon: "📈" },
    { name: t("menuChat"), path: "/chat", icon: "💬" },
    { name: t("menuActivities"), path: "/activities", icon: "🎯" },
    { name: t("menuEducation"), path: "/education", icon: "📚" },
    { name: t("menuProfile"), path: "/profile", icon: "👤" },
  ];

  const getInitials = (userName) => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="hidden lg:flex w-72 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
      <div>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none">☁️</span>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 dark:from-indigo-400 dark:via-indigo-300 dark:to-indigo-200 bg-clip-text text-transparent tracking-tight text-glow-rose/20 select-none">
              {t("logoTitle")}
            </h1>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1.5 font-bold tracking-widest uppercase">
            {t("logoSub")}
          </p>
        </div>

        <nav className="px-4 mt-2">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl mb-1.5 transition duration-200 text-sm font-semibold ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50/90 to-indigo-100/50 dark:from-indigo-950/50 dark:to-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-l-4 border-indigo-500/80 shadow-sm shadow-indigo-100/30 dark:shadow-none"
                    : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900/60 hover:text-gray-800 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-lg select-none">{menu.icon}</span>
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {user && (
        <div className="p-4 border-t border-gray-100 dark:border-slate-900 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-sm font-bold flex items-center justify-center shadow-sm select-none">
            {getInitials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-800 dark:text-slate-200 truncate">{user.name}</h4>
            <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
      )}
    </aside>
  );
}