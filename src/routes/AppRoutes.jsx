import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Mood from "../pages/Mood";
import Statistics from "../pages/Statistics";
import Chat from "../pages/Chat";
import Education from "../pages/Education";
import Profile from "../pages/Profile";
import History from "../pages/History";
import Activities from "../pages/Activities";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* tanpa sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* pakai sidebar */}
        <Route element={<Layout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/mood"
            element={<Mood />}
          />

          <Route
            path="/statistics"
            element={<Statistics />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />

          <Route
            path="/education"
            element={<Education />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/activities"
            element={<Activities />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;