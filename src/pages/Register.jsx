import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { translations } from "../utils/translations";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const lang = localStorage.getItem("app-lang") || "id";
  const t = (key) => translations[lang]?.[key] || translations["id"]?.[key] || key;

  const register = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert(t("valAllFieldsRequired"));
      return;
    }
    if (!form.email.toLowerCase().endsWith("@gmail.com")) {
      alert(t("valEmailGmailRequired"));
      return;
    }
    if (form.password.length < 6) {
      alert(t("valPasswordMinLength"));
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/register", form);

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

      alert(t("valRegisterSuccess"));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || t("valRegisterFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-violet-50 to-pink-100 p-4 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-300/30 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/40 transition-all hover:shadow-2xl z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-3xl font-bold shadow-lg shadow-indigo-200/50 mb-4">
            R
          </div>
          <h1 className="text-3xl font-extrabold text-gray-955 tracking-tight">
            {t("registerTitle")}
          </h1>
          <p className="text-gray-505 mt-2 text-sm font-semibold">
            {t("registerSub")}
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={register} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              {t("registerNameLabel")}
            </label>
            <input
              type="text"
              placeholder={t("registerNamePlaceholder")}
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-200 p-3.5 rounded-2xl bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              {t("loginEmailLabel")}
            </label>
            <input
              type="email"
              placeholder={t("registerEmailPlaceholder")}
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-200 p-3.5 rounded-2xl bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              {t("loginPasswordLabel")}
            </label>
            <input
              type="password"
              placeholder={t("loginPasswordPlaceholder")}
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
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
              t("registerBtn")
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-550">
            {t("registerFooterText")}{" "}
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition duration-200"
            >
              {t("registerFooterLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;