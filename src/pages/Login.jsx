import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { translations } from "../utils/translations";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const lang = localStorage.getItem("app-lang") || "id";
  const t = (key) => translations[lang]?.[key] || translations["id"]?.[key] || key;

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert(t("valEmailPasswordRequired"));
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Save to saved accounts list
      const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
      let accounts = JSON.parse(accountsStr);
      accounts = accounts.filter(acc => acc.email !== response.data.user.email);
      accounts.push({
        email: response.data.user.email,
        name: response.data.user.name,
        token: response.data.token
      });
      localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || t("valLoginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-violet-50 to-pink-100 p-4 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-300/30 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/40 transition-all hover:shadow-2xl z-10">
        
        {/* Logo and Greeting */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-3xl font-bold shadow-lg shadow-indigo-200/50 mb-4">
            R
          </div>
          <h1 className="text-3xl font-extrabold text-gray-955 tracking-tight">
            Ruang Rasa
          </h1>
          <p className="text-gray-505 mt-2 text-sm font-semibold">
            {t("loginSub")}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              {t("loginEmailLabel")}
            </label>
            <input
              type="email"
              placeholder={t("loginEmailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 p-3.5 rounded-2xl bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm placeholder:text-gray-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-sm font-semibold text-gray-700">
                {t("loginPasswordLabel")}
              </label>
            </div>
            <input
              type="password"
              placeholder={t("loginPasswordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 p-3.5 rounded-2xl bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer flex justify-center items-center mt-6"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              t("loginBtn")
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-550">
            {t("loginFooterText")}{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition duration-200"
            >
              {t("loginFooterLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;