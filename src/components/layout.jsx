import { useEffect, useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { translations } from "../utils/translations";

export default function Layout() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "id");

  useEffect(() => {
    const handleStorage = () => {
      setLang(localStorage.getItem("app-lang") || "id");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const t = (key) => translations[lang][key] || key;

  const menus = [
    { name: t("menuDashboard"), path: "/dashboard", icon: "🏠" },
    { name: t("menuMood"), path: "/mood", icon: "😊" },
    { name: t("menuStatistics"), path: "/statistics", icon: "📊" },
    { name: t("menuChat"), path: "/chat", icon: "💬" },
    { name: t("menuActivities"), path: "/activities", icon: "🎯" },
    { name: t("menuEducation"), path: "/education", icon: "📚" },
    { name: t("menuProfile"), path: "/profile", icon: "👤" },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar untuk desktop */}
      <Sidebar />

      {/* Main content container */}
      <main className="flex-1 p-4 sm:p-8 pb-24 lg:pb-8 overflow-y-auto w-full">
        <Outlet />
      </main>

      {/* Sticky Bottom Nav untuk mobile/tablet */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200/80 dark:border-slate-800/60 py-2 px-2.5 flex justify-around items-center z-50 shadow-lg transition-colors">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition duration-150 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 font-extrabold"
                  : "text-gray-400 dark:text-slate-500 hover:text-gray-650 dark:hover:text-slate-300"
              }`}
            >
              <span className="text-lg select-none">{menu.icon}</span>
              <span className="text-[9px] mt-0.5 font-bold tracking-tight">{menu.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}