import { BrowserRouter, Routes, Route } from "react-router-dom";

import ROUTES from "@constants/routes";
import { AuthProvider } from "@contexts/AuthContext";
import { DashboardProvider } from "@contexts/DashboardContext";
import { AdminFormsProvider } from "@contexts/AdminFormsContext";

import ProtectedRoute from "@components/ProtectedRoute";
import AdminRoute from "@components/AdminRoute";
import SidebarLayout from "@layouts/SidebarLayout";

import Login from "@pages/Login";
import Form from "@pages/Form";
import Dashboard from "@pages/Dashboard";

import AdminDashboard from "@pages/AdminDashboard";
import AdminUsers from "@pages/AdminUsers";
import AdminForms from "@pages/AdminForms";
import Residues from "@pages/resource-pages/Residues";
import Containers from "@pages/resource-pages/Containers";
import Areas from "@pages/resource-pages/Areas";
import ProcessingStages from "@pages/resource-pages/ProcessingStages";
import Providers1 from "@pages/resource-pages/Providers1";
import SctCodes from "@pages/resource-pages/SctCodes";
import Providers2 from "@pages/resource-pages/Providers2";
import Managers from "@pages/resource-pages/Managers";

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

                <Route element={<AdminFormsProvider />}>
                  <Route path={ROUTES.ADMIN_FORMS} element={<AdminForms />} />
                </Route>                

                <Route path={ROUTES.ADMIN_RESIDUES} element={<Residues />} />
                <Route path={ROUTES.ADMIN_CONTAINERS} element={<Containers />} />
                <Route path={ROUTES.ADMIN_AREAS} element={<Areas />} />
                <Route path={ROUTES.ADMIN_PROCESSING_STAGES} element={<ProcessingStages />} />
                <Route path={ROUTES.ADMIN_PROVIDERS1} element={<Providers1 />} />
                <Route path={ROUTES.ADMIN_SCT_CODES} element={<SctCodes />} />
                <Route path={ROUTES.ADMIN_PROVIDERS2} element={<Providers2 />} />
                <Route path={ROUTES.ADMIN_MANAGERS} element={<Managers />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
