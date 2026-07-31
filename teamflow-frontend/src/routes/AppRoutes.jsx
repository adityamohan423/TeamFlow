import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import TeamFlowLogin from "../pages/TeamFlowLogin.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />}></Route>
      </Route>
      <Route path="/login" element={<TeamFlowLogin />} />
    </Routes>
  );
};

export default AppRoutes;
