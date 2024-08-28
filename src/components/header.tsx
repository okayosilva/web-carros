import { LoaderCircle, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuthenticate } from '../context/useAuthenticate';

export function Header() {
  const { isAuthenticated, loadingAuth } = useAuthenticate();

  return (
    <header className="flex h-16 w-full items-center justify-center bg-white drop-shadow">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        <Link to="/">
          <img src={logo} alt="web carros" />
        </Link>

        {loadingAuth && (
          <div className="text-gray-700">
            <div className="group rounded-full border-2 border-zinc-500 bg-zinc-700 p-2 transition-all duration-300">
              <LoaderCircle
                className="animate-spin text-zinc-50 transition-all duration-300"
                size={18}
              />
            </div>
          </div>
        )}

        {!isAuthenticated && !loadingAuth && (
          <Link to="/login" className="text-gray-700">
            <div className="group rounded-full border-2 border-zinc-300 p-2 transition-all duration-300 hover:bg-zinc-400">
              <User
                className="text-zinc-500 transition-all duration-300 group-hover:text-zinc-50"
                size={18}
              />
            </div>
          </Link>
        )}

        {isAuthenticated && !loadingAuth && (
          <Link to="/login" className="text-gray-700">
            <div className="group rounded-full border-2 border-zinc-300 p-2 transition-all duration-300 hover:bg-zinc-400">
              <LogOut
                className="text-zinc-500 transition-all duration-300 group-hover:text-zinc-50"
                size={18}
              />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
