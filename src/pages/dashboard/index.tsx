import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardItem } from '../../components/cardItem';
import { useAuthenticate } from '../../context/useAuthenticate';
import { db } from '../../services/firebaseConection';
import { CarProps } from '../home';

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const { user } = useAuthenticate();

  useEffect(() => {
    const loadCars = async () => {
      if (!user?.uid) return;

      const carsRef = collection(db, 'cars');
      const queryRef = query(carsRef, where('uid', '==', user?.uid));

      const carItem = await getDocs(queryRef);
      console.log('carItem', carItem);
      const carsList: CarProps[] = carItem.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        uid: doc.data().uid,
        price: doc.data().price,
        city: doc.data().city,
        km: doc.data().km,
        images: doc.data().images,
      }));
      console.log(carsList);
      setCars(carsList);
    };

    loadCars();
  }, []);

  function handleImageLoaded(id: string) {
    setImagesLoaded((oldState) => [...oldState, id]);
  }
  return (
    <main className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {cars.map((car) => (
        <>
          <div
            className="h-72 w-full animate-pulse rounded-lg bg-gray-400"
            style={{
              display: imagesLoaded.includes(car.id) ? 'none' : 'block',
            }}
          ></div>
          <Link to={`/car/${car.id}`} key={car.id}>
            <CardItem
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
              handleImageLoaded={handleImageLoaded}
              imagesLoaded={imagesLoaded}
              deleteCar
            />
          </Link>
        </>
      ))}
    </main>
  );
}
