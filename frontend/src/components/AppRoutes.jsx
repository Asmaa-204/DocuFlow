import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "@components/AppLayout";
import ProtectedRoute from "@components/ProtectedRoute";

import { AuthProvider } from "@context/AuthContext";

import Login from "@pages/Login";
import Signup from "@pages/Signup";
import StartNewWorkflow from "@pages/StartNewWorkflow";
import NewRequest from "@pages/NewRequest";
import SubmittedRequests from "@pages/SubmittedRequests";
import Dashboard from "@pages/Dashboard";
import Settings from "@pages/Settings";
import DraftRequests from "@pages/DraftRequests";

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
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="workflows">
            <Route path="new" element={<StartNewWorkflow />} />
            <Route
              path=":workflowId/instances/:instanceId"
              element={<NewRequest />}
            />
          </Route>
          <Route path="requests">
            <Route path="submitted" element={<SubmittedRequests />} />
            <Route path="drafts" element={<DraftRequests />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
