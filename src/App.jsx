import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Language Detection
    if (!localStorage.getItem("app-lang") || localStorage.getItem("app-auto-lang") === "true") {
      const browserLang = navigator.language || navigator.userLanguage || "id";
      const defaultLang = browserLang.toLowerCase().startsWith("id") ? "id" : "en";
      localStorage.setItem("app-lang", defaultLang);
    }
  }, []);

  return <AppRoutes />;
}

export default App;