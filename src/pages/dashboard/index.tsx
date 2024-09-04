import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardItem } from '../../components/cardItem';
import { useAuthenticate } from '../../context/useAuthenticate';
import { db, storage } from '../../services/firebaseConection';
import { notifyWithToastify } from '../../utils/notifyWithToastify';
import { CarProps } from '../home';

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthenticate();

  function handleImageLoaded(id: string) {
    setImagesLoaded((oldState) => [...oldState, id]);
  }

  async function handleDeleteCar(car: CarProps) {
    car.images.map(async (image) => {
      const path = `images/${car.uid}/${image.name}`;
      const imageRef = ref(storage, path);

      try {
        await deleteObject(imageRef);
      } catch (error) {
        notifyWithToastify('error', 'Erro ao deletar imagem');
      }
    });

    const docRef = doc(db, 'cars', car.id);
    await deleteDoc(docRef)
      .then(() => notifyWithToastify('success', 'Carro deletado com sucesso'))
      .catch(() => notifyWithToastify('error', 'Erro ao deletar carro'));

    setCars((oldState) => oldState.filter((carItem) => carItem.id !== car.id));
  }

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      if (!user?.uid) return;

      const carsRef = collection(db, 'cars');
      const queryRef = query(carsRef, where('uid', '==', user?.uid));

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
      }));
      setCars(carsList);
      setLoading(false);
    };

    loadCars();
  }, [user?.uid]);
  return (
    <main className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.length === 0 && loading === false && (
        <div className="col-span-full flex w-full flex-col items-center gap-2 rounded-lg bg-gray-200 p-6 shadow-sm">
          <TriangleAlert size={30} className="text-zinc-700" />
          <h1 className="text-center text-lg font-bold text-zinc-700">
            Nenhum carro cadastrado
          </h1>
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
            images={car.images}
            city={car.city}
            id={car.id}
            km={car.km}
            price={car.price}
            uid={car.uid}
            year={car.year}
            handleImageLoaded={handleImageLoaded}
            imagesLoaded={imagesLoaded}
            deleteCar={handleDeleteCar}
          />
        </Link>
      ))}
    </main>
  );
}
