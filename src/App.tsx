import { BrowserRouter, Routes, Route } from "react-router-dom";

import ROUTES from "@constants/routes";
import { AuthProvider } from "@contexts/AuthContext";
import { DashboardProvider } from "@contexts/DashboardContext";

import ProtectedRoute from "@components/ProtectedRoute";
import AdminRoute from "@components/AdminRoute";
import SidebarLayout from "@layouts/SidebarLayout";

import Login from "@pages/Login";
import Form from "@pages/Form";
import Dashboard from "@pages/Dashboard";

import AdminDashboard from "@pages/admin-pages/AdminDashboard";
import AdminUsers from "@pages/admin-pages/AdminUsers";
import AdminResidues from "@pages/admin-pages/AdminResidues";

function App() {
  return (
    <BrowserRouter>
      <main>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<SidebarLayout />}>
                <Route path={ROUTES.FORM} element={<Form />} />
                <Route element={<DashboardProvider />}>
                  <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                </Route>
              </Route>
            </Route>

            <Route element={<AdminRoute />}>
              <Route element={<SidebarLayout />}>
                <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />

                <Route path={ROUTES.ADMIN_USERS_BASE} element={<AdminUsers />} />
                <Route path={ROUTES.ADMIN_RESIDUES} element={<AdminResidues />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
