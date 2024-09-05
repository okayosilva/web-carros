import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { CardItem } from '../components/cardItem';
import { db } from '../services/firebaseConection';

export interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string;
  city: string;
  km: string;
  quickPurchase?: boolean;
  images: CarImageProps[];
}

export type CarImageProps = {
  url: string;
  name: string;
  uid: string;
};

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [inputSearch, setInputSearch] = useState('');

  const loadCars = async () => {
    const carsRef = collection(db, 'cars');
    const queryRef = query(carsRef, orderBy('created', 'desc'));

    const carItem = await getDocs(queryRef);
    const carsList: CarProps[] = carItem.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      year: doc.data().year,
      uid: doc.data().uid,
      price: doc.data().price,
      city: doc.data().city,
      km: doc.data().km,
      images: doc.data().images,
      quickPurchase: doc.data().quickPurchase,
    }));
    setCars(carsList);
  };

  useEffect(() => {
    loadCars();
  }, []);

  function handleImageLoaded(id: string) {
    setImagesLoaded((oldState) => [...oldState, id]);
  }

  async function handleSearchCar(e: React.FormEvent) {
    e.preventDefault();
    if (!inputSearch) return loadCars();

    setCars([]);
    setImagesLoaded([]);
    const inputFormatted = inputSearch.toLowerCase();

    const q = query(
      collection(db, 'cars'),
      where('name', '>=', inputFormatted),
      where('name', '<=', inputFormatted + '\uf8ff'),
    );

    const querySnapshot = await getDocs(q);
    const carsList: CarProps[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      year: doc.data().year,
      uid: doc.data().uid,
      price: doc.data().price,
      city: doc.data().city,
      km: doc.data().km,
      images: doc.data().images,
      quickPurchase: doc.data().quickPurchase,
    }));

    setCars(carsList);
  }

  return (
    <section>
      <form
        action=""
        className="flex h-24 items-center gap-4 rounded-lg bg-white px-4 py-5"
        onSubmit={handleSearchCar}
      >
        <input
          placeholder="Encontre seu carro aqui"
          type="text"
          className="h-12 w-full rounded-lg border border-gray-400 px-4 outline-none placeholder:text-sm md:placeholder:text-base"
          name="search"
          id="search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Button type="submit">Buscar</Button>
      </form>

      <section className="mt-4 md:mt-16">
        {cars.length > 0 && (
          <h1 className="text-center text-2xl font-bold text-zinc-900">
            Carros novos e usados em todo o Brasil
          </h1>
        )}
        <main className="mx-auto mt-4 grid w-full max-w-7xl grid-cols-1 gap-6 pb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.length === 0 && (
            <div className="col-span-full flex w-full flex-col items-center gap-2 rounded-lg bg-gray-200 p-6 shadow-sm">
              <TriangleAlert size={30} className="text-zinc-900" />
              <h2 className="text-center text-lg font-bold text-zinc-900">
                Nenhum carro encontrado com este nome
              </h2>
            </div>
          )}
          {cars.map((car) => (
            <Link to={`/car/${car.id}`} key={car.id}>
              <div
                className="h-72 w-full animate-pulse rounded-lg bg-gray-400"
                style={{
                  display: imagesLoaded.includes(car.id) ? 'none' : 'block',
                }}
              ></div>
              <CardItem
                name={car.name}
                city={car.city}
                images={car.images}
                id={car.id}
                km={car.km}
                price={car.price}
                uid={car.uid}
                year={car.year}
                quickPurchase={car.quickPurchase}
                handleImageLoaded={handleImageLoaded}
                imagesLoaded={imagesLoaded}
              />
            </Link>
          ))}
        </main>
      </section>
    </section>
  );
}
