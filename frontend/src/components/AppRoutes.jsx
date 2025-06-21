import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import StartNewWorkflow from "@pages/StartNewWorkflow";
import NewRequest from "@pages/NewRequest";
import AppLayout from "@components/AppLayout";
import ProtectedRoute from "@components/ProtectedRoute";
import { AuthProvider } from "@context/AuthContext";
import Login from "@pages/Login";
import Signup from "@pages/Signup";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AuthProvider>
                <AppLayout />
              </AuthProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workflows/new" element={<StartNewWorkflow />} />
          <Route
            path="/workflows/:workflowId/instances/:instanceId"
            element={<NewRequest />}
          />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
