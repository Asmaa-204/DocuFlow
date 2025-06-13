import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import StartNewWorkflow from "@pages/StartNewWorkflow";
import AppLayout from "@components/AppLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workflows/new" element={<StartNewWorkflow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;