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
}: CarProps) {
  return (
    <section className="flex w-full flex-col overflow-hidden rounded-lg bg-white drop-shadow-md">
      <img
        src={url}
        alt={nameImage}
        className="h-72 w-full cursor-pointer rounded-lg object-cover transition-all duration-300 hover:scale-105"
        style={{
          display: imagesLoaded.includes(id) ? 'block' : 'none',
        }}
        onLoad={() => handleImageLoaded(id)}
      />
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
