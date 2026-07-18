import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Companies from "../pages/Companies";
import Jobs from "../pages/Jobs";
import Applications from "../pages/Applications";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Company */}
      <Route path="/companies" element={<Companies />} />

      {/* Jobs */}
      <Route path="/jobs" element={<Jobs />} />

      {/* Applications */}
      <Route path="/applications" element={<Applications />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;