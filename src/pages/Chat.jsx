import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { translations } from "../utils/translations";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [activeSessionTitle, setActiveSessionTitle] = useState("Percakapan Baru");
  const [loading, setLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "id");
  const chatEndRef = useRef(null);

  const t = (key) => translations[lang]?.[key] || translations["id"]?.[key] || key;

  useEffect(() => {
    loadSessions();
    startNewChat();

    const handleStorage = () => {
      setLang(localStorage.getItem("app-lang") || "id");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, loading]);

  const loadSessions = async () => {
    try {
      setSessionsLoading(true);
      const res = await axios.get("/chat-sessions");
      setSessions(res.data.sessions || []);
    } catch (err) {
      console.error("Gagal memuat daftar sesi chat:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const loadHistory = async (sessionId) => {
    if (!sessionId) return;
    try {
      setLoading(true);
      const res = await axios.get(`/chat-history?session_id=${sessionId}`);
      setHistory(res.data.data || []);
      setActiveSessionId(res.data.session_id);
      setActiveSessionTitle(res.data.session_title || "Percakapan");
    } catch (err) {
      console.error("Gagal memuat detail chat:", err);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setActiveSessionId(null);
    setActiveSessionTitle("Percakapan Baru");
    setHistory([]);
    setMessage("");
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message;
    const isFirstMessage = activeSessionId === null;

    const tempUserMsg = {
      id: Date.now(),
      sender: "user",
      message: currentMessage,
    };
    setHistory((prev) => [...prev, tempUserMsg]);

    setMessage("");
    setLoading(true);

    try {
      const payload = {
        message: currentMessage,
      };

      if (activeSessionId) {
        payload.session_id = activeSessionId;
        payload.session_title = activeSessionTitle;
      }

      const res = await axios.post("/chat", payload);

      if (isFirstMessage) {
        setActiveSessionId(res.data.session_id);
        setActiveSessionTitle(res.data.session_title || "Curhat Baru");
      }

      const tempBotMsg = {
        id: Date.now() + 1,
        sender: "bot",
        message: res.data.bot_response,
      };
      setHistory((prev) => [...prev, tempBotMsg]);

      loadSessions();
    } catch (err) {
      console.error("Gagal mengirim pesan chat:", err);
      setHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "system",
          message: t("chatNetworkError"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const date = new Date(timeStr);
    return date.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderedSessionTitle =
    activeSessionTitle === "Percakapan Baru"
      ? t("chatNewTitle")
      : activeSessionTitle === "Curhat Baru"
      ? t("chatNewTitleSaved")
      : activeSessionTitle;

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-7.5rem)] flex gap-6">
      
      {/* LEFT SIDEBAR: CHAT HISTORY */}
      <aside className="w-80 flex-shrink-0 flex flex-col bg-white dark:bg-slate-905 border border-gray-100/80 dark:border-slate-800/60 rounded-3xl p-4 shadow-sm transition-colors duration-300">
        <button
          onClick={startNewChat}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm shadow-indigo-100/50 dark:shadow-none mb-4"
        >
          <span>➕</span> {t("chatNewBtn")}
        </button>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 px-2.5 mb-2.5">
            {t("chatSidebarTitle")}
          </h3>

          {sessionsLoading && sessions.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-650 rounded-full animate-spin"></div>
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-xs text-gray-455 dark:text-slate-500 italic text-center py-8 px-4 leading-relaxed">
              {t("chatNoHistory")}
            </p>
          ) : (
            sessions.map((sess) => {
              const isActive = activeSessionId === sess.session_id;
              const renderedSessTitle =
                sess.session_title === "Curhat Baru"
                  ? t("chatNewTitleSaved")
                  : sess.session_title === "Percakapan Baru"
                  ? t("chatNewTitle")
                  : sess.session_title || (lang === "en" ? "Chat" : "Curhat");
              return (
                <button
                  key={sess.session_id}
                  onClick={() => loadHistory(sess.session_id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition duration-155 flex items-start gap-2.5 cursor-pointer border ${
                    isActive
                      ? "bg-indigo-50/70 border-indigo-100/50 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/30 dark:text-indigo-400 font-bold"
                      : "bg-transparent border-transparent text-gray-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <span className="text-base select-none mt-0.5">💬</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold truncate">
                      {renderedSessTitle}
                    </h4>
                    <span className="text-[9px] text-gray-400 dark:text-slate-500 mt-1 block">
                      {formatTime(sess.last_activity)}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* RIGHT SIDE: ACTIVE CHAT ROOM */}
      <section className="flex-1 flex flex-col justify-between h-full bg-white dark:bg-slate-900 border border-gray-100/80 dark:border-slate-800/60 rounded-3xl shadow-sm overflow-hidden transition-colors duration-300">
        
        {/* Chat Room Header */}
        <div className="p-5 border-b border-gray-50 dark:border-slate-800/60 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-955/20">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/30 dark:border-indigo-900/20 flex items-center justify-center text-xl select-none">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-extrabold text-gray-800 dark:text-slate-100 truncate">
              {renderedSessionTitle}
            </h2>
            <p className="text-[10px] text-gray-450 dark:text-slate-500 mt-0.5">
              {t("chatCounselorSubtitle")}
            </p>
          </div>
          {activeSessionId && (
            <button
              onClick={startNewChat}
              className="text-[11px] font-bold text-gray-400 hover:text-indigo-650 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              {t("chatNewBtn")}
            </button>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white dark:bg-slate-900 transition-colors duration-300">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto">
              <span className="text-4xl mb-3 select-none">✨</span>
              <h3 className="text-sm font-extrabold text-gray-800 dark:text-slate-200">
                {t("chatWelcomeTitle")}
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 leading-relaxed font-normal">
                {t("chatWelcomeText")}
              </p>
            </div>
          ) : (
            history.map((chat) => {
              const isUser = chat.sender === "user";
              const isSystem = chat.sender === "system";

              if (isSystem) {
                return (
                  <div key={chat.id} className="flex justify-center my-4">
                    <div className="bg-red-50 dark:bg-red-955/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 text-xs px-4 py-2.5 rounded-2xl max-w-[85%] text-center shadow-sm">
                      {chat.message}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={chat.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-end gap-2.5 max-w-[75%]">
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/30 dark:border-indigo-900/20 text-sm flex items-center justify-center select-none flex-shrink-0 mb-1">
                        🤖
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm border ${
                        isUser
                          ? "bg-indigo-650 text-white border-indigo-650 rounded-br-none"
                          : "bg-slate-50 dark:bg-slate-850 text-gray-800 dark:text-slate-200 border-gray-100 dark:border-slate-800/80 rounded-bl-none"
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {loading && history.length > 0 && history[history.length - 1].sender === "user" && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2.5 max-w-[75%]">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/30 dark:border-indigo-900/20 text-sm flex items-center justify-center select-none flex-shrink-0 mb-1">
                  🤖
                </div>
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-850 text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-slate-800/80 rounded-2xl rounded-bl-none text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="font-semibold">{t("chatListening")}</span>
                  <span className="flex gap-0.5 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-slate-550 rounded-full animate-bounce duration-500"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-slate-550 rounded-full animate-bounce duration-500 delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-slate-550 rounded-full animate-bounce duration-500 delay-300"></span>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border-t border-gray-50 dark:border-slate-800/60 flex items-center gap-3 transition-colors">
          <input
            type="text"
            placeholder={loading ? t("chatInputPlaceholderLoading") : t("chatInputPlaceholder")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            disabled={loading}
            className="flex-1 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/65 focus:bg-white dark:focus:bg-slate-900 border border-gray-150 dark:border-slate-800/60 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none p-3 rounded-xl text-xs transition placeholder:text-gray-400 dark:text-slate-200"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className={`font-bold py-3 px-5 rounded-xl transition duration-200 shadow-sm hover:shadow flex items-center justify-center cursor-pointer text-xs ${
              loading
                ? "bg-gray-100 dark:bg-slate-850 text-gray-400 dark:text-slate-600 cursor-not-allowed border border-gray-200 dark:border-slate-800"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {t("chatSendBtn")}
          </button>
        </div>

      </section>
    </div>
  );
}