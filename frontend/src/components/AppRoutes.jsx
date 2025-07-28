import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "@components/AppLayout";
import ProtectedRoute from "@components/ProtectedRoute";

import { AuthProvider } from "@context/AuthContext";

import Login from "@pages/Login";
import Signup from "@pages/Signup";
import StartNewWorkflow from "@pages/StartNewWorkflow";
import NewRequest from "@pages/NewRequest";
import Dashboard from "@pages/Dashboard";
import Settings from "@pages/Settings";
import MyWorkflows from "@pages/MyWorkflows";
import RequestsInbox from "@pages/RequestsInbox";
import Requests from "@pages/Requests";

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
            <Route path="my-workflows" element={<MyWorkflows />} />
            <Route
              path=":workflowId/instances/:instanceId"
              element={<NewRequest />}
            />
          </Route>
          <Route path="requests">
            <Route path="inbox" element={<RequestsInbox />} />
            <Route path="submitted" element={<Requests filter="submitted" />} />
            <Route path="drafts" element={<Requests filter="draft" />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<h1>Page Not Fount</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
