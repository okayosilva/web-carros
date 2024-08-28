import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LayoutDefault } from '../layout/layoutDefault';

import { CarDetail } from '../pages/carDetail';
import { Dashboard } from '../pages/dashboard';
import { NewCart } from '../pages/dashboard/newCart';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { PrivateRoutes } from './privateRoutes';
import { NotFound } from '../pages/notfound';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/dashboard/new"
            element={
              <PrivateRoutes>
                <NewCart />
              </PrivateRoutes>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
