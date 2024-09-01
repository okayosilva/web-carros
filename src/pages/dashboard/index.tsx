import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

const currentYear = new Date().getFullYear();
const yearValidation = (value: string) => {
  const year = Number(value);
  return !isNaN(year) && year >= 1900 && year <= currentYear;
};

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome é obrigatório' })
    .max(50, { message: 'O máximo de caracteres é 50' }),
  model: z
    .string()
    .min(3, { message: 'O modelo é obrigatório' })
    .max(50, { message: 'O máximo de caracteres é 50' }),
  year: z
    .string()
    .min(4, { message: 'O ano é obrigatório' })
    .max(4, { message: 'O ano é inválido' })
    .refine((value) => yearValidation, {
      message: 'O ano deve ser um número válido entre 1900 e o ano atual',
    }),
  km: z.string().min(1, { message: 'O KM é obrigatório' }),
  price: z
    .string()
    .min(1, { message: 'O preço é obrigatório' })
    .refine(
      (value) => {
        return !isNaN(parseFloat(value.replace(/[^\d]/g, '')));
      },
      { message: 'O preço deve ser um valor numérico válido' },
    ),
  color: z.string().min(3, { message: 'A cor é obrigatória' }),
  city: z.string().min(3, { message: 'A cidade é obrigatória' }),
  whatsapp: z
    .string()
    .min(1, { message: 'O telefone é obrigatório' })
    .refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/.test(value), {
      message: 'Número de telefone inválido',
    }),
  description: z.string().min(10, { message: 'A descrição é obrigatória' }),
});

type FormData = z.infer<typeof schema>;

export function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <section className="mt-9 flex flex-col">
      <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
        <button className="group relative flex h-40 w-full items-center justify-center rounded-lg border-2 border-zinc-700 transition-all duration-200 hover:bg-zinc-400 md:max-w-56">
          <Upload
            size={32}
            className="text-zinc-700 duration-200 group-hover:text-zinc-50"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </button>
      </div>

      <div className="mt-2 flex w-full flex-col items-center rounded-lg bg-white p-3 sm:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-3 pt-3"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium">
              Nome do carro
            </label>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Gol G4 1.0..."
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="model" className="font-medium">
              Modelo do carro
            </label>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: Gol G4 1.0 2008"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-full space-y-2 md:flex-1">
              <label htmlFor="year" className="font-medium">
                Ano do carro
              </label>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="2017"
              />
            </div>
            <div className="w-full space-y-2 md:w-auto">
              <label htmlFor="km" className="font-medium">
                Km rodados
              </label>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="100km"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-full space-y-2 md:flex-1">
              <label htmlFor="price" className="font-medium">
                Valor do carro
              </label>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="R$ 10.000,00"
              />
            </div>
            <div className="w-full space-y-2 md:w-auto">
              <label htmlFor="color" className="font-medium">
                Cor do carro
              </label>
              <Input
                type="text"
                register={register}
                name="color"
                error={errors.color?.message}
                placeholder="Azul"
              />
            </div>
          </div>

          <div className="w-full space-y-2 md:flex-1">
            <label htmlFor="city" className="font-medium">
              Cidade
            </label>
            <Input
              type="text"
              register={register}
              name="city"
              error={errors.city?.message}
              placeholder="São Paulo - SP"
            />
          </div>
          <div className="w-full space-y-2 md:w-96">
            <label htmlFor="whatsapp" className="font-medium">
              WhatsApp
            </label>
            <Input
              type="text"
              register={register}
              name="whatsapp"
              error={errors.whatsapp?.message}
              placeholder="(99) 99999-9999"
              mask="(99) 99999-9999"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">
              Descrição do carro
            </label>
            <textarea
              className="max-h-40 min-h-28 w-full rounded-lg border border-gray-400 p-4 outline-none focus:border-red-500/50"
              {...register('description')}
              name="description"
              id="description"
              placeholder="Digite uma descrição detalhada do carro..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message || 'Error'}
              </p>
            )}
          </div>

          <Button type="submit" fullWidth color="black">
            Cadastrar
          </Button>
        </form>
      </div>
    </section>
  );
}
