import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { CardItem } from '../components/cardItem';
import { db } from '../services/firebaseConection';

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string;
  city: string;
  km: string;
  images: CarImageProps[];
}

export type CarImageProps = {
  url: string;
  name: string;
  uid: string;
};

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);

  function loadCars() {
    const carsRef = collection(db, 'cars');
    const queryRef = query(carsRef, orderBy('created', 'desc'));

    getDocs(queryRef).then((carItem) => {
      let carsList: CarProps[] = carItem.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          uid: doc.data().uid,
          price: doc.data().price,
          city: doc.data().city,
          km: doc.data().km,
          images: doc.data().images,
        };
      });
      setCars(carsList);
    });
  }

  useEffect(() => {
    loadCars();
  }, []);
  return (
    <section>
      <form
        action=""
        className="flex h-24 items-center gap-4 rounded-lg bg-white px-4 py-5"
      >
        <input
          placeholder="Encontre seu carro aqui"
          type="text"
          className="h-12 w-full rounded-lg border border-gray-400 px-4 outline-none placeholder:text-sm md:placeholder:text-base"
          name="search"
        />
        <Button type="submit">Buscar</Button>
      </form>

      <section className="mt-4 md:mt-16">
        <h1 className="text-center text-2xl font-bold text-zinc-900">
          Carros novos e usados em todo o Brasil
        </h1>
        <main className="mx-auto mt-4 grid w-full max-w-7xl grid-cols-1 gap-6 pb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <CardItem
              key={car.id}
              name={car.name}
              nameImage={car.images[0].name}
              url={car.images[0].url}
              city={car.city}
              id={car.id}
              km={car.km}
              price={car.price}
              uid={car.uid}
              year={car.year}
              idImage={car.images[0].uid}
            />
          ))}
        </main>
      </section>
    </section>
  );
}
