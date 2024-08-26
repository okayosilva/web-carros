import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Button } from '../components/button';
import { Input } from '../components/input';

export function Login() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <Link to="/">
        <img src={logo} alt="login" className="h-24 w-96 object-cover" />
      </Link>

      <form
        action=""
        className="mt-11 flex w-full max-w-[680px] flex-col gap-4 rounded-lg bg-white px-4 py-8"
      >
        <Input type="email" placeholder="email@gmail.com" className="h-10" />
        <Input type="password" placeholder="**********" className="h-10" />

        <Button type="submit" color="black" fullWidth>
          Entrar
        </Button>
      </form>

      <Link to="/register" className="mt-4 font-poppins text-zinc-900">
        Ainda não possui uma conta? Cadastre-se
      </Link>
    </section>
  );
}
