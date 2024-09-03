import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';

type CarProps = {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string;
  city: string;
  km: string;
  url: string;
  nameImage: string;
  idImage: string;
  handleImageLoaded: (id: string) => void;
  imagesLoaded: string[];
  deleteCar?: (id: string) => void;
};

export function CardItem({
  name,
  idImage,
  nameImage,
  url,
  city,
  id,
  km,
  price,
  uid,
  year,
  imagesLoaded,
  handleImageLoaded,
  deleteCar,
}: CarProps) {
  return (
    <section className="relative flex w-full flex-col overflow-hidden rounded-lg bg-white drop-shadow-md">
      <img
        src={url}
        alt={nameImage}
        className="h-72 max-h-72 w-full cursor-pointer rounded-lg object-cover transition-all duration-300 hover:scale-105"
        style={{
          display: imagesLoaded.includes(id) ? 'block' : 'none',
        }}
        onLoad={() => handleImageLoaded(id)}
      />
      {deleteCar!! && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteCar(id);
          }}
          className="absolute right-3 top-3 z-50 rounded-lg bg-red-500 p-2 text-zinc-50 transition-all hover:bg-red-700"
        >
          <Trash2 size={22} />
        </button>
      )}
      <article className="flex flex-1 flex-col justify-between gap-8 px-3 py-4">
        <div>
          <h2 className="font-bold text-zinc-900">{name}</h2>
          <p className="text-zinc-800">
            {year} | {km}km
          </p>
        </div>

        <div className="mx-0 w-full">
          <p className="mb-2 text-2xl font-bold text-zinc-900">
            {formatCurrency(String(price))}
          </p>
          <div className="-mx-3 h-px bg-zinc-300"></div>
          <p className="mt-2 text-zinc-800">{city}</p>
        </div>
      </article>
    </section>
  );
}
