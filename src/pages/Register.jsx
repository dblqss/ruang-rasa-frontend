import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [debugCode, setDebugCode] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Semua field harus diisi!");
      return;
    }
    if (!form.email.toLowerCase().endsWith("@gmail.com")) {
      alert("Email harus menggunakan alamat @gmail.com!");
      return;
    }
    if (form.password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/register/send-code", form);
      setShowVerification(true);
      if (response.data.debug_code) {
        setDebugCode(response.data.debug_code);
      }
      alert("Kode verifikasi telah dikirim ke email Gmail Anda. Silakan periksa kotak masuk/spam Anda.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal mengirim kode verifikasi, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      alert("Kode verifikasi wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/register", {
        ...form,
        code: verificationCode
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

      alert("Pendaftaran berhasil! Selamat datang di Ruang Rasa.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registrasi gagal, silakan periksa kode verifikasi Anda.");
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
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
            Buat Akun Baru
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Mulai langkah pertamamu menuju kesejahteraan emosional
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={showVerification ? register : handleSendCode} className="space-y-5">
          {!showVerification ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Nama Anda"
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
                  Email
                </label>
                <input
                  type="email"
                  placeholder="silahkan masukkan email Gmail Anda (contoh@gmail.com)"
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
                  Password
                </label>
                <input
                  type="password"
                  placeholder="silahkan masukkan password anda"
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
                  "Kirim Kode Verifikasi"
                )}
              </button>
            </>
          ) : (
            <>
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl text-xs text-indigo-850 space-y-1">
                <p><strong>Nama:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p className="mt-2 text-gray-500">Kode verifikasi dikirim ke email Gmail di atas.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Kode Verifikasi (OTP)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Masukkan 6 digit kode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-2xl bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm placeholder:text-gray-400 text-center tracking-widest font-mono text-lg font-bold"
                />
              </div>

              {debugCode && (
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl text-xs text-emerald-800 text-center font-semibold">
                  [Debug Mode] Kode verifikasi Anda: <span className="underline select-all font-mono text-sm">{debugCode}</span>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowVerification(false)}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl transition duration-300 focus:outline-none cursor-pointer flex justify-center items-center text-sm"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer flex justify-center items-center text-sm"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Verifikasi & Daftar"
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Sudah memiliki akun?{" "}
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition duration-200"
            >
              Masuk Disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;