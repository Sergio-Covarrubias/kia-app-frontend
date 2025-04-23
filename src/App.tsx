import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthContext';

import SidebarLayout from '@layouts/SidebarLayout';
import Login from '@pages/Login';
import Form from '@pages/Form';
import Dashboard from '@pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <main>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />

            <Route element={<SidebarLayout />}>
              <Route path='/form' element={<Form />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
