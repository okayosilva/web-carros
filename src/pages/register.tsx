import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { auth } from '../services/firebaseConection';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifyWithToastify } from '../utils/notifyWithToastify';

const schema = z.object({
  name: z.string().min(3, { message: 'O nome é obrigatório.' }),
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

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  async function onSubmit({ email, name, password }: FormData) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        notifyWithToastify('success', 'Cadastro realizado com sucesso.', 2000);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2500);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return notifyWithToastify('error', 'E-mail já cadastrado.');
        }
        return notifyWithToastify('error', 'Erro ao cadastrar.');
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center px-4">
        <Link to="/">
          <img
            src={logo}
            alt="login"
            className="h-24 w-72 object-contain md:w-96"
          />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-11 flex w-full max-w-[680px] flex-col gap-4 rounded-lg bg-white px-4 py-8"
        >
          <Input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            register={register}
            error={errors?.name?.message}
          />

          <Input
            name="email"
            type="email"
            placeholder="webcar@mail.com"
            register={register}
            error={errors?.email?.message}
          />

          <Input
            name="password"
            type="password"
            placeholder="**********"
            register={register}
            error={errors?.password?.message}
          />

          <Button type="submit" color="black" fullWidth>
            Cadastrar
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-4 text-center font-poppins text-zinc-900"
        >
          Já possui uma conta? <br /> Faça login
        </Link>
      </section>
    </>
  );
}
