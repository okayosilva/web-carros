import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LayoutDefault } from '../layout/layoutDefault';

import { CarDetail } from '../pages/carDetail';
import { Dashboard } from '../pages/dashboard';
import { NewCart } from '../pages/dashboard/newCart';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Register } from '../pages/register';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/" element={<CarDetail />} />
          <Route path="/" element={<NewCart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
