import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { translations } from "../utils/translations";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");

  // State fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [joinedDate, setJoinedDate] = useState("");

  // Add Account fields
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [showAddVerification, setShowAddVerification] = useState(false);
  const [addVerificationCode, setAddVerificationCode] = useState("");
  const [addDebugCode, setAddDebugCode] = useState("");

  // Security variables
  const [oldPassword, setOldPassword] = useState("");
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [tfaEnabled, setTfaEnabled] = useState(localStorage.getItem("app-2fa") === "true");

  // Account switching fields
  const [switchEmail, setSwitchEmail] = useState("");
  const [switchPassword, setSwitchPassword] = useState("");
  const [savedAccounts, setSavedAccounts] = useState(() => {
    return JSON.parse(localStorage.getItem("app-saved-accounts") || "[]");
  });

  // App preferences
  const [theme, setTheme] = useState(localStorage.getItem("app-theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("app-lang") || "id");
  const [autoLangDetect, setAutoLangDetect] = useState(
    localStorage.getItem("app-auto-lang") === "true"
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem("app-notif") !== "false"
  );

  const t = (key) => translations[language]?.[key] || translations["id"]?.[key] || key;

  // FAQ accordion state
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setName(user.name || "");
      setEmail(user.email || "");
      if (user.created_at) {
        const date = new Date(user.created_at);
        setJoinedDate(
          date.toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    }
  }, [language]);

  useEffect(() => {
    const handleStorage = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setName(user.name || "");
        setEmail(user.email || "");
      }
      setLanguage(localStorage.getItem("app-lang") || "id");
      setAutoLangDetect(localStorage.getItem("app-auto-lang") === "true");
      setTheme(localStorage.getItem("app-theme") || "light");
      setNotifications(localStorage.getItem("app-notif") !== "false");
      setTfaEnabled(localStorage.getItem("app-2fa") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert(t("valNameEmailReq"));
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/profile", {
        name,
        email,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update in saved accounts list
      const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
      let accounts = JSON.parse(accountsStr);
      const currentToken = localStorage.getItem("token");
      accounts = accounts.map(acc => {
        if (acc.token === currentToken) {
          return { ...acc, name: res.data.user.name, email: res.data.user.email };
        }
        return acc;
      });
      localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));

      window.dispatchEvent(new Event("storage"));
      alert(t("alertUpdateSuccess"));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || (language === "en" ? "Failed to update profile." : "Gagal memperbarui profil."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "security") {
      fetchSessions();
    }
  }, [activeTab]);

  const fetchSessions = async () => {
    try {
      setSessionsLoading(true);
      const res = await api.get("/sessions");
      setSessions(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat sesi aktif:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleLogoutOthers = async () => {
    const confirmMsg = language === "en"
      ? "Are you sure you want to sign out of all other devices?"
      : "Apakah Anda yakin ingin keluar dari semua perangkat lain?";
    if (!window.confirm(confirmMsg)) {
      return;
    }

    try {
      setSessionsLoading(true);
      await api.post("/logout-others");
      alert(language === "en" ? "Successfully signed out of all other devices! 🔒" : "Berhasil keluar dari semua perangkat lain! 🔒");
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert(language === "en" ? "Failed to sign out other devices." : "Gagal mengeluarkan perangkat lain.");
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleTfaToggle = () => {
    const nextVal = !tfaEnabled;
    setTfaEnabled(nextVal);
    localStorage.setItem("app-2fa", nextVal ? "true" : "false");
    const activeMsg = language === "en"
      ? "Two-Step Verification (2FA) enabled! An additional security code will be sent to your registered email on login."
      : "Verifikasi Dua Langkah (2FA) diaktifkan! Kode keamanan tambahan akan dikirim ke email terdaftar saat login.";
    const inactiveMsg = language === "en"
      ? "Two-Step Verification disabled."
      : "Verifikasi Dua Langkah dinonaktifkan.";
    alert(nextVal ? activeMsg : inactiveMsg);
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (!oldPassword) {
      alert(t("valPwOldReq"));
      return;
    }
    if (!password) {
      alert(t("valPwNewReq"));
      return;
    }
    if (password.length < 6) {
      alert(t("valPwMinLength"));
      return;
    }
    if (password !== confirmPassword) {
      alert(t("valPwNotMatch"));
      return;
    }

    try {
      setLoading(true);
      await api.post("/profile", {
        name,
        email,
        password,
        old_password: oldPassword,
      });

      alert(t("alertPwSuccess"));
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal memperbarui password.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!addName || !addEmail || !addPassword) {
      alert(t("valAllFields"));
      return;
    }
    if (!addEmail.toLowerCase().endsWith("@gmail.com")) {
      alert(language === "en" ? "Email must use a @gmail.com address!" : "Email harus menggunakan alamat @gmail.com!");
      return;
    }
    if (addPassword.length < 6) {
      alert(t("valPwMinLength"));
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/register", {
        name: addName,
        email: addEmail,
        password: addPassword,
      });

      // Switch authentication tokens to switch account
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Save to saved accounts list
      const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
      let accounts = JSON.parse(accountsStr);
      accounts = accounts.filter(acc => acc.email !== res.data.user.email);
      accounts.push({
        email: res.data.user.email,
        name: res.data.user.name,
        token: res.data.token
      });
      localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));

      // Dispatch global storage event to update Sidebar profile card
      window.dispatchEvent(new Event("storage"));

      alert(t("alertAddSuccess"));
      setAddName("");
      setAddEmail("");
      setAddPassword("");
      setAddVerificationCode("");
      setShowAddVerification(false);
      setAddDebugCode("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || (language === "en" ? "Failed to register new account." : "Gagal mendaftarkan akun baru."));
    } finally {
      setLoading(false);
    }
  };

  const loadSavedAccounts = () => {
    const currentToken = localStorage.getItem("token");
    const currentUserStr = localStorage.getItem("user");
    const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
    let accounts = JSON.parse(accountsStr);

    if (currentUserStr && currentToken) {
      const currentUser = JSON.parse(currentUserStr);
      const exists = accounts.some(acc => acc.email === currentUser.email);
      if (!exists) {
        accounts.push({
          email: currentUser.email,
          name: currentUser.name,
          token: currentToken
        });
        localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));
      }
    }
    setSavedAccounts(accounts);
  };

  useEffect(() => {
    loadSavedAccounts();
  }, [activeTab]);

  const handleSwitchToAccount = async (acc) => {
    const promptMsg = language === "en"
      ? `Enter password for account "${acc.name}" (${acc.email}):`
      : `Masukkan password untuk akun "${acc.name}" (${acc.email}):`;
    const passwordInput = window.prompt(promptMsg);
    if (passwordInput === null) return; // User cancelled
    if (!passwordInput.trim()) {
      alert(t("valPasswordEmpty"));
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/login", {
        email: acc.email,
        password: passwordInput,
      });

      // Switch authentication tokens using the fresh login result
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update in saved accounts list to update the token
      const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
      let accounts = JSON.parse(accountsStr);
      accounts = accounts.map(item => {
        if (item.email === acc.email) {
          return { ...item, token: res.data.token, name: res.data.user.name };
        }
        return item;
      });
      localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));

      // Dispatch global storage event to update Sidebar
      window.dispatchEvent(new Event("storage"));

      alert(`${t("alertSwitchSuccess")} ${res.data.user.name}! 🎉`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || (language === "en" ? "Incorrect password. Failed to switch account." : "Password yang Anda masukkan salah. Gagal beralih akun."));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAccount = (email, e) => {
    e.stopPropagation(); // Prevent trigger switch
    const confirmMsg = language === "en"
      ? "Are you sure you want to remove this account from the quick switcher?"
      : "Apakah Anda yakin ingin menghapus akun ini dari daftar ganti cepat?";
    if (!window.confirm(confirmMsg)) {
      return;
    }
    const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
    let accounts = JSON.parse(accountsStr);
    accounts = accounts.filter(acc => acc.email !== email);
    localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));
    loadSavedAccounts();
  };

  const handleSwitchLogin = async (e) => {
    e.preventDefault();
    if (!switchEmail || !switchPassword) {
      alert(t("valAllFields"));
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/login", {
        email: switchEmail,
        password: switchPassword,
      });

      // Switch authentication tokens
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Save to saved accounts list
      const accountsStr = localStorage.getItem("app-saved-accounts") || "[]";
      let accounts = JSON.parse(accountsStr);
      accounts = accounts.filter(acc => acc.email !== res.data.user.email);
      accounts.push({
        email: res.data.user.email,
        name: res.data.user.name,
        token: res.data.token
      });
      localStorage.setItem("app-saved-accounts", JSON.stringify(accounts));

      // Dispatch global storage event
      window.dispatchEvent(new Event("storage"));

      alert(t("alertSwitchLoginSuccess").replace("{name}", res.data.user.name));
      setSwitchEmail("");
      setSwitchPassword("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || (language === "en" ? "Failed to sign in to new account. Please try again." : "Gagal masuk ke akun baru. Silakan coba lagi."));
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("app-theme", selectedTheme);
    
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleLangChange = (selectedLang) => {
    setLanguage(selectedLang);
    localStorage.setItem("app-lang", selectedLang);
    
    setAutoLangDetect(false);
    localStorage.setItem("app-auto-lang", "false");
    
    window.dispatchEvent(new Event("storage"));
    
    const successMsg = selectedLang === "en"
      ? "Language successfully updated to English! ✨"
      : "Bahasa berhasil diubah ke Bahasa Indonesia! ✨";
    alert(successMsg);
  };

  const handleAutoLangToggle = (checked) => {
    setAutoLangDetect(checked);
    localStorage.setItem("app-auto-lang", checked ? "true" : "false");
    
    if (checked) {
      const browserLang = navigator.language || navigator.userLanguage || "id";
      const detectedLang = browserLang.toLowerCase().startsWith("id") ? "id" : "en";
      setLanguage(detectedLang);
      localStorage.setItem("app-lang", detectedLang);
      window.dispatchEvent(new Event("storage"));
      
      const successMsg = detectedLang === "en"
        ? "Auto language detection enabled! Language set to English. 🌐"
        : "Deteksi bahasa otomatis diaktifkan! Bahasa diatur ke Bahasa Indonesia. 🌐";
      alert(successMsg);
    } else {
      window.dispatchEvent(new Event("storage"));
      const infoMsg = language === "en"
        ? "Auto language detection disabled."
        : "Deteksi bahasa otomatis dinonaktifkan.";
      alert(infoMsg);
    }
  };

  const handleNotifToggle = (checked) => {
    setNotifications(checked);
    localStorage.setItem("app-notif", checked ? "true" : "false");
    window.dispatchEvent(new Event("storage"));
  };

  const handleClearHistory = async () => {
    const confirmText = t("alertClearConfirm");
    const input = window.prompt(confirmText);
    
    const requiredConfirm = language === "en" ? "DELETE" : "HAPUS";
    if (input !== "HAPUS" && input !== "DELETE") {
      alert(t("alertClearCancel"));
      return;
    }

    try {
      setClearLoading(true);
      await api.post("/clear-history");
      alert(t("alertClearSuccess"));
    } catch (err) {
      console.error(err);
      alert(language === "en" ? "Failed to clear log history." : "Gagal menghapus riwayat catatan.");
    } finally {
      setClearLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!window.confirm(t("alertLogoutConfirm"))) {
      return;
    }

    try {
      setLogoutLoading(true);
      await api.post("/logout");
    } catch (err) {
      console.error("Logout API gagal, mengosongkan cache local:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }
  };

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getInitials = (userName) => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const tabs = [
    { id: "account", label: t("tabAccount"), icon: "👤" },
    { id: "security", label: t("tabSecurity"), icon: "🔒" },
    { id: "preferences", label: t("tabPreferences"), icon: "⚙️" },
    { id: "add_account", label: t("tabAddAccount"), icon: "➕" },
    { id: "switch_account", label: t("tabSwitchAccount"), icon: "🔄" },
    { id: "faq", label: t("tabFaq"), icon: "💬" },
    { id: "danger", label: t("tabDanger"), icon: "⚠️" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
            {t("profileTitle")}
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            {t("profileSub")}
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="bg-red-50 dark:bg-red-950/20 hover:bg-red-100/80 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold py-2.5 px-5 rounded-xl transition duration-200 shadow-sm cursor-pointer disabled:opacity-50 text-sm flex items-center gap-2 self-start"
        >
          {logoutLoading ? (
            <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            t("logoutBtn")
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        
        {/* Left Side: Sidebar Tabs & Profile Card */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Miniature Profile Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 flex flex-col items-center justify-center text-center transition-colors">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-2xl font-bold flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none mb-3 select-none">
              {getInitials(name)}
            </div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 truncate max-w-full px-2">{name || (language === "en" ? "User" : "Pengguna")}</h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 truncate max-w-full px-2">{email}</p>
            {joinedDate && (
              <span className="mt-4 text-[10px] text-gray-400 dark:text-slate-500 font-medium">{t("joinedLabel")} {joinedDate}</span>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 flex flex-col space-y-1 transition-colors">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition duration-150 flex items-center gap-3 cursor-pointer ${
                  activeTab === tab.id
                    ? tab.id === "danger"
                      ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100/55 dark:border-red-900/30"
                      : "bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/20"
                    : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900/60 hover:text-gray-800 dark:hover:text-slate-200"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Tab Panel */}
        <div className="md:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100/80 dark:border-slate-800/60 min-h-[400px] transition-colors">
          
          {/* TAB 1: ACCOUNT INFO */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3">
                  {t("accountHeader")}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t("accountSub")}</p>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                    {t("emailAddr")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm"
                >
                  {loading ? (language === "en" ? "Saving..." : "Menyimpan...") : t("saveChanges")}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Change Password Panel */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3">
                    {t("securityHeader")}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t("securitySub")}</p>
                </div>
                
                <form onSubmit={handleSecurityUpdate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                      {t("oldPassword")}
                    </label>
                    <input
                      type="password"
                      placeholder={language === "en" ? "Enter current password" : "Masukkan password saat ini"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                      {t("newPassword")}
                    </label>
                    <input
                      type="password"
                      placeholder={language === "en" ? "Minimum 6 characters" : "Minimal 6 karakter"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                      {t("confirmNewPassword")}
                    </label>
                    <input
                      type="password"
                      placeholder={language === "en" ? "Retype new password" : "Ketik ulang password baru"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm"
                  >
                    {loading ? (language === "en" ? "Updating..." : "Memperbarui...") : t("updatePasswordBtn")}
                  </button>
                </form>
              </div>

              {/* Two-Step Verification Section */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 pb-1">
                    {t("tfaHeader")}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500">{t("tfaSub")}</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-gray-100 dark:border-slate-800/80">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-slate-200">{t("tfaLabel")}</h4>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{t("tfaDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={tfaEnabled}
                    onChange={handleTfaToggle}
                    className="w-5 h-5 rounded border-gray-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Active Sessions Panel */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 pb-1">
                      {t("sessionsHeader")}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{t("sessionsSub")}</p>
                  </div>
                  {sessions.length > 1 && (
                    <button
                      onClick={handleLogoutOthers}
                      disabled={sessionsLoading}
                      className="bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900 text-red-650 dark:text-red-400 text-xs font-bold py-2 px-4 rounded-xl transition cursor-pointer"
                    >
                      {t("sessionsBtn")}
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {sessionsLoading ? (
                    <p className="text-xs text-gray-400 dark:text-slate-500 italic">{language === "en" ? "Loading device list..." : "Memuat daftar perangkat..."}</p>
                  ) : sessions.length === 0 ? (
                    <p className="text-xs text-gray-400 dark:text-slate-500 italic">{language === "en" ? "No active devices detected." : "Tidak ada perangkat aktif terdeteksi."}</p>
                  ) : (
                    sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex justify-between items-center p-4 rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/10"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl select-none">{session.is_current ? "💻" : "📱"}</span>
                          <div>
                            <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">
                              {session.name || (language === "en" ? "Web Application Session" : "Sesi Aplikasi Web")}
                              {session.is_current && (
                                <span className="ml-2 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md font-extrabold uppercase">{t("sessionsActive")}</span>
                              )}
                            </h4>
                            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">
                              {t("sessionsLastUsed")}: {session.last_used_at}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          {/* TAB 3: APP PREFERENCES */}
          {activeTab === "preferences" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3">
                  {t("prefHeader")}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t("prefSub")}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-2.5 ml-1">
                    {t("visualMode")}
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleThemeChange("light")}
                      className={`flex-1 py-3 px-4 rounded-2xl border font-bold text-sm transition duration-150 cursor-pointer ${
                        theme === "light"
                          ? "border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:text-indigo-400"
                          : "border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      ☀️ {t("lightMode")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleThemeChange("dark")}
                      className={`flex-1 py-3 px-4 rounded-2xl border font-bold text-sm transition duration-150 cursor-pointer ${
                        theme === "dark"
                          ? "border-indigo-500 bg-indigo-950/40 text-indigo-400"
                          : "border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      🌙 {t("darkMode")}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-2.5 ml-1">
                    {t("systemLang")}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => handleLangChange(e.target.value)}
                    disabled={autoLangDetect}
                    className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 text-sm disabled:opacity-60"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English (US)</option>
                  </select>
                </div>

                {/* Auto language detection toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-gray-100 dark:border-slate-900">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-slate-200">{t("autoLangLabel")}</h4>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{t("autoLangDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoLangDetect}
                    onChange={(e) => handleAutoLangToggle(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-gray-100 dark:border-slate-900">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-slate-200">{t("notifLabel")}</h4>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{t("notifDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => handleNotifToggle(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADD ACCOUNT */}
          {activeTab === "add_account" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3">
                  {t("addAccountHeader")}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t("addAccountSub")}</p>
              </div>

              <form onSubmit={handleAddAccount} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder={language === "en" ? "New account name" : "Nama akun baru"}
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                    {t("emailAddr")}
                  </label>
                  <input
                    type="email"
                    placeholder={language === "en" ? "new@email.com" : "email@baru.com"}
                    value={addEmail}
                    onChange={(e) => setAddEmail(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1.5 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder={language === "en" ? "Minimum 6 characters" : "Minimal 6 karakter"}
                    value={addPassword}
                    onChange={(e) => setAddPassword(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm"
                >
                  {loading ? (language === "en" ? "Adding..." : "Menambahkan...") : t("addAccountBtn")}
                </button>
              </form>
            </div>
          )}

          {/* TAB: SWITCH ACCOUNT */}
          {activeTab === "switch_account" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3">
                  {t("switchAccountHeader")}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t("switchAccountSub")}</p>
              </div>

              {/* Saved Accounts List */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-355">{t("savedAccountsTitle")}</h4>
                
                {savedAccounts.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-slate-500 italic">
                    {language === "en" ? "No other saved accounts. Your current account will be saved automatically when you sign in or register." : "Belum ada akun lain yang tersimpan. Akun Anda saat ini akan tersimpan otomatis saat masuk/mendaftar."}
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {savedAccounts.map((acc) => {
                      const isCurrent = acc.email === email;
                      return (
                        <div
                          key={acc.email}
                          onClick={() => !isCurrent && handleSwitchToAccount(acc)}
                          className={`p-5 rounded-3xl border transition-all duration-200 flex items-center justify-between ${
                            isCurrent
                              ? "bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-200 dark:border-indigo-900/40 cursor-default"
                              : "bg-white dark:bg-slate-900 border-gray-100/80 dark:border-slate-800/60 shadow-sm hover:shadow hover:border-indigo-150 cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-bold flex items-center justify-center shadow-sm select-none flex-shrink-0">
                              {getInitials(acc.name)}
                            </div>
                            <div className="min-w-0 font-normal">
                              <h5 className="text-xs font-bold text-gray-800 dark:text-slate-200 truncate pr-2">
                                {acc.name}
                                {isCurrent && (
                                  <span className="ml-2 text-[9px] text-emerald-655 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-extrabold uppercase">{t("sessionsActive")}</span>
                                )}
                              </h5>
                              <p className="text-[10px] text-gray-455 dark:text-slate-500 truncate pr-2">{acc.email}</p>
                            </div>
                          </div>
                          {!isCurrent && (
                            <button
                              onClick={(e) => handleRemoveAccount(acc.email, e)}
                              className="text-xs bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-650 dark:text-red-400 p-2 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center font-bold"
                              title={language === "en" ? "Remove account" : "Hapus akun"}
                            >
                              ❌
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Login/Add another existing account Form */}
              <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-slate-355">{t("connectAnotherHeader")}</h4>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t("connectAnotherSub")}</p>
                </div>

                <form onSubmit={handleSwitchLogin} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-gray-655 dark:text-slate-355 mb-1.5 ml-1">
                      {t("connectEmail")}
                    </label>
                    <input
                      type="email"
                      placeholder={language === "en" ? "name@email.com" : "nama@email.com"}
                      value={switchEmail}
                      onChange={(e) => setSwitchEmail(e.target.value)}
                      className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-655 dark:text-slate-355 mb-1.5 ml-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={switchPassword}
                      onChange={(e) => setSwitchPassword(e.target.value)}
                      className="w-full border border-gray-200 dark:border-slate-800 p-3.5 rounded-2xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 transition text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm"
                  >
                    {loading ? (language === "en" ? "Linking..." : "Menghubungkan...") : t("connectBtn")}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ & HELP ACCORDION */}
          {activeTab === "faq" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3">
                  {t("tabFaq")}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                  {language === "en" ? "Find answers to some common questions about the Ruang Rasa platform." : "Temukan jawaban atas beberapa pertanyaan umum seputar platform Ruang Rasa."}
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    q: language === "en" ? "Is my story and chat data secure?" : "Apakah data cerita dan curhat saya aman?",
                    a: language === "en" ? "Extremely secure. All chat messages in the 'Chat Room' and your mood logs are encrypted in our database and can only be accessed privately by your own account." : "Sangat aman. Semua pesan obrolan di menu 'Cerita Yuk' dan catatan mood kamu disimpan secara terenkripsi di database kami dan hanya dapat diakses oleh akun milikmu secara privat."
                  },
                  {
                    q: language === "en" ? "How are activity recommendations created?" : "Bagaimana rekomendasi aktivitas dibuat?",
                    a: language === "en" ? "Ruang Rasa integrates emotional logs with Gemini AI. When you log your mood today, the system finds scientifically recommended therapeutic activities to restore your mental stability." : "Ruang Rasa mengintegrasikan pencatatan emosi dengan Gemini AI. Ketika kamu memilih mood hari ini, sistem mencarikan aktivitas terapeutik yang direkomendasikan secara ilmiah untuk mengembalikan stabilitas mentalmu."
                  },
                  {
                    q: language === "en" ? "Why is the Gemini chatbot not responding?" : "Mengapa chatbot Gemini tidak merespon?",
                    a: language === "en" ? "If the chatbot does not reply, please check your internet connection or the status of your Gemini API key quota in the backend configuration file." : "Jika chatbot tidak membalas, periksalah sambungan internetmu atau status kuota API key Gemini di file konfigurasi backend. Kami juga telah menyediakan pesan pemberitahuan kegagalan jika terjadi kendala."
                  },
                  {
                    q: language === "en" ? "Can I delete all my history?" : "Dapatkah saya menghapus seluruh riwayat data?",
                    a: language === "en" ? "Certainly. You have full control over your data. Please go to the 'Danger Zone' menu to permanently delete all logs and chat history from our server." : "Tentu. Kamu memiliki kontrol penuh atas datamu. Silakan buka menu 'Area Bahaya' untuk menghapus seluruh riwayat logs dan chat secara permanen dari server kami."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-gray-100 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-4 font-bold text-sm text-gray-800 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <span>{faqOpen[idx] ? "−" : "+"}</span>
                    </button>
                    {faqOpen[idx] && (
                      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-gray-105 dark:border-slate-850 text-xs text-gray-600 dark:text-slate-400 leading-relaxed font-normal">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DANGER ZONE */}
          {activeTab === "danger" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-red-800 dark:text-red-400 border-b border-red-100 dark:border-red-950 pb-3">
                  {t("dangerHeader")}
                </h3>
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{t("dangerSub")}</p>
              </div>
              
              <div className="p-6 border border-red-200 dark:border-red-950 bg-red-50/40 dark:bg-red-950/10 rounded-3xl space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-red-800 dark:text-red-400">{t("dangerTitle")}</h4>
                  <p className="text-xs text-red-650 dark:text-red-400/80 mt-1.5 leading-relaxed font-normal">
                    {t("dangerDesc")}
                  </p>
                </div>

                <button
                  onClick={handleClearHistory}
                  disabled={clearLoading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3.5 px-6 rounded-2xl transition duration-200 cursor-pointer shadow-md self-start text-sm"
                >
                  {clearLoading ? (language === "en" ? "Deleting..." : "Menghapus...") : t("clearHistoryBtn")}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}