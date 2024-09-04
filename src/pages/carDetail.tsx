import { doc, getDoc } from 'firebase/firestore';
import { HandCoins, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/button';
import { db } from '../services/firebaseConection';
import { formatCurrency } from '../utils/format';
import { CarProps } from './home';

type CarDetailsProps = CarProps & {
  created: string;
  description: string;
  color: string;
  owner: string;
  whatsapp: string;
  model: string;
};

export function CarDetail() {
  const [car, setCar] = useState<CarDetailsProps>();
  const { id } = useParams();

  useEffect(() => {
    const loadCar = async () => {
      if (!id) return;
      const docRef = doc(db, 'cars', id);
      await getDoc(docRef).then((item) => {
        setCar({
          id: item.id,
          name: item.data()?.name,
          year: item.data()?.year,
          uid: item.data()?.uid,
          price: item.data()?.price,
          city: item.data()?.city,
          km: item.data()?.km,
          images: item.data()?.images,
          created: item.data()?.created,
          description: item.data()?.description,
          color: item.data()?.color,
          owner: item.data()?.owner,
          whatsapp: item.data()?.whatsapp,
          model: item.data()?.model,
        });
      });
    };

    loadCar();
  }, [id]);

  return (
    <main className="w-full space-y-6">
      {car && (
        <section className="w-full space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between space-y-2">
            <div className="space-y-2">
              <h1 className="text-xl font-bold uppercase text-zinc-900 md:text-2xl lg:text-4xl">
                {car?.name}
              </h1>
              <p className="text-xs text-zinc-900 md:text-sm lg:text-lg">
                {car?.model}
              </p>
            </div>
            <p className="text-xl font-bold text-zinc-900 md:text-2xl lg:text-4xl">
              {formatCurrency(String(car?.price))}
            </p>
          </div>

          <div className="flex gap-14">
            <div className="space-y-1 text-zinc-900">
              <span>Cidade</span>
              <p className="font-bold max-sm:text-xs">{car?.city}</p>
            </div>
            <div className="space-y-1 text-zinc-900">
              <span>Ano</span>
              <p className="font-bold max-sm:text-xs">{car?.year}</p>
            </div>
            <div className="space-y-1 text-zinc-900">
              <span>Cor</span>
              <p className="font-bold max-sm:text-xs">{car?.color}</p>
            </div>
          </div>

          <div className="space-y-2 text-zinc-900">
            <p className="font-bold">Descrição</p>
            <p className="">{car?.description}</p>
          </div>
          <div className="space-y-2 text-zinc-900">
            <p className="font-bold">Telefone</p>
            <p className="">{car?.whatsapp}</p>
          </div>

          <div className="space-y-2">
            <Button color="black" size="lg" fullWidth>
              <HandCoins size={22} className="mr-2" />
              <span>Compre AGORA</span>
            </Button>

            <Button color="green" size="lg" fullWidth>
              <Phone size={22} className="mr-2" />
              <span>Entre em contato</span>
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
