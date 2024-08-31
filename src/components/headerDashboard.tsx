import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeaderDashboard() {
  return (
    <div className="flex h-11 items-center justify-between gap-6 rounded-lg bg-red-500 px-6 font-medium text-white">
      <div className="flex gap-6">
        <Link to="/dashboard">
          <p className="">Dashboard</p>
        </Link>
        <Link to="/dashboard/new">
          <p className="">Novo carro</p>
        </Link>
      </div>

      <Link to="/login">
        <LogOut
          className="text-zinc-50 transition-all duration-300 group-hover:text-zinc-50"
          size={18}
        />
      </Link>
    </div>
  );
}
