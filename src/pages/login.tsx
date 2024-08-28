import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Button } from '../components/button';
import { Input } from '../components/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { auth } from '../services/firebaseConection';
import { notifyWithToastify } from '../utils/notifyWithToastify';

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, insira um e-mail válido.' })
    .min(1, { message: 'O e-mail é obrigatório.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula.',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'A senha deve conter pelo menos um caractere especial.',
    })
    .regex(/\d/, { message: 'A senha deve conter pelo menos um número.' }),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  function onSubmit({ email, password }: FormData) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard', { replace: true });
      })
      .catch(() => {
        notifyWithToastify('error', 'E-mail ou senha inválidos.');
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link to="/">
        <img
          src={logo}
          alt="login"
          className="h-24 w-72 object-contain md:w-96"
        />
      </Link>

      <form
        action=""
        className="mt-11 flex w-full max-w-[680px] flex-col gap-4 rounded-lg bg-white px-4 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          name="email"
          placeholder="webcar@mail.com"
          className="h-10"
          error={errors?.email?.message}
          register={register}
        />
        <Input
          type="password"
          name="password"
          placeholder="**********"
          className="h-10"
          error={errors?.password?.message}
          register={register}
        />

        <Button type="submit" color="black" fullWidth>
          Acessar
        </Button>
      </form>

      <Link
        to="/register"
        className="mt-4 text-center font-poppins text-zinc-900"
      >
        Ainda não possui uma conta? <br /> Cadastre-se
      </Link>
    </section>
  );
}
