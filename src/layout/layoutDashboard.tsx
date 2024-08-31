import { Outlet } from 'react-router-dom';
import { HeaderDashboard } from '../components/headerDashboard';
import { Wrapper } from '../components/wrapper';

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
