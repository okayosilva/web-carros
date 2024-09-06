import { Outlet } from 'react-router-dom';
import { HeaderDashboard } from '../components/headerDashboard';

export function LayoutDashboard() {
  return (
    <div>
      <HeaderDashboard />
      <>
        <Outlet />
      </>
    </div>
  );
}
