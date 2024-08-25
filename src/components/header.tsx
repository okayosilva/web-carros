import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export function Header() {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [loginsAuth, setLoginsAuth] = useState(false);
  return (
    <header className="flex h-16 w-full items-center justify-center bg-white drop-shadow">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        <Link to="/">
          <img src={logo} alt="web carros" />
        </Link>

        {userIsLogged && !loginsAuth && (
          <Link to="/login" className="text-gray-700">
            <div className="group rounded-full border-2 border-zinc-300 p-2 transition-all duration-300 hover:bg-zinc-400">
              <User
                className="text-zinc-500 transition-all duration-300 group-hover:text-zinc-50"
                size={18}
              />
            </div>
          </Link>
        )}

        {!userIsLogged && !loginsAuth && (
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
