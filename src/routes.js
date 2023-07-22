import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from './components/common/Loading';
import MainAppRoutes from './routes/MainAppRoutes';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';

function RouteApp() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <MainAppRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default RouteApp;
