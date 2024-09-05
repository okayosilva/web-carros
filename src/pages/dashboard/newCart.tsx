import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Trash2, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { addDoc, collection } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useAuthenticate } from '../../context/useAuthenticate';
import { db, storage } from '../../services/firebaseConection';
import { formatCurrency } from '../../utils/format';
import { notifyWithToastify } from '../../utils/notifyWithToastify';

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
    .refine(yearValidation, {
      message: `O ano deve ser um número válido entre 1900 e ${currentYear}`,
    }),
  km: z
    .string()
    .min(1, { message: 'O KM é obrigatório' })
    .refine((value) => {
      return !isNaN(parseFloat(value.replace(/[^\d]/g, '')));
    }),
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
type ImageProps = {
  uuid: string;
  name: string;
  preview: string;
  url: string;
};

export function NewCart() {
  const [imageCar, setImageCar] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthenticate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  function onSubmit(data: FormData) {
    if (imageCar.length === 0) {
      notifyWithToastify('error', 'Envie pelo menos uma imagem');
      return;
    }

    const carListImages = imageCar.map((car) => ({
      uid: car.uuid,
      name: car.name,
      url: car.url,
    }));

    addDoc(collection(db, 'cars'), {
      name: data.name.toLowerCase(),
      model: data.model,
      year: data.year,
      km: parseFloat(data.km.replace(/[^\d]/g, '')),
      price: parseFloat(data.price.replace(/[^\d]/g, '')),
      color: data.color,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages,
    })
      .then(() => {
        reset();
        setImageCar([]);
        notifyWithToastify('success', 'Carro cadastrado com sucesso');
      })
      .catch(() => {
        notifyWithToastify('error', 'Erro ao cadastrar carro');
      });
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        await handleUpload(image);
        return;
      } else {
        notifyWithToastify(
          'error',
          'Envie uma imagem em formato .jpeg ou .png',
        );
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const imageUuid = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${imageUuid}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const imageItem = {
          uuid: currentUid,
          name: imageUuid,
          preview: URL.createObjectURL(image),
          url,
        };

        setImageCar((oldImages) => [...oldImages, imageItem]);
      });
    });
  }

  async function handleDeleteImage(image: ImageProps) {
    const imagePath = `images/${image.uuid}/${image.name}`;
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      setImageCar((oldImages) =>
        oldImages.filter((oldImage) => oldImage.url !== image.url),
      );
    } catch (error) {
      notifyWithToastify('error', 'Erro ao deletar imagem');
    }
  }

  return (
    <section className="mt-9 flex flex-col">
      <div className="grid flex-wrap gap-4 rounded-lg bg-white px-4 py-3 shadow-sm md:grid-cols-6">
        <button className="group relative flex h-40 w-full items-center justify-center rounded-lg border-2 border-zinc-700 transition-all duration-200 hover:bg-zinc-400 md:max-w-56">
          <Upload
            size={32}
            className="text-zinc-700 duration-200 group-hover:text-zinc-50"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFile}
          />
        </button>

        {loading && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex h-40 w-full items-center justify-center"
              >
                <div className="flex h-40 w-full animate-pulse items-center justify-center rounded-lg bg-gray-200">
                  <LoaderCircle
                    className="animate-spin text-red-500"
                    size={32}
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {imageCar.map((image) => (
          <div className="group relative h-40 flex-1" key={image.name}>
            <button
              className="absolute right-2 top-2 z-10 cursor-pointer rounded-lg bg-red-500 p-2 transition-all group-hover:bg-red-600"
              onClick={() => handleDeleteImage(image)}
            >
              <Trash2 size={16} className="text-white transition-colors" />
            </button>
            <img
              src={image.preview}
              alt={image.name}
              className="h-full w-full rounded-lg object-cover brightness-75 transition-all duration-200 group-hover:brightness-100"
            />
          </div>
        ))}
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
                onChange={(e) => {
                  const formattedValue = formatCurrency(e.target.value);
                  setValue('price', formattedValue);
                }}
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
