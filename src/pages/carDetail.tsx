import { doc, getDoc } from 'firebase/firestore';
import { HandCoins, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components/button';
import { useCart } from '../context/useCart';
import { db } from '../services/firebaseConection';
import { formatCurrency } from '../utils/format';
import { CarProps } from './home';

export type CarDetailsProps = CarProps & {
  created: string;
  description: string;
  color: string;
  owner: string;
  whatsapp: string;
  model: string;
};

export function CarDetail() {
  const [car, setCar] = useState<CarDetailsProps>();
  const [sliderPerView, setSliderPerView] = useState(2);

  const { addCart } = useCart();

  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      if (!id) return;
      const docRef = doc(db, 'cars', id);
      await getDoc(docRef).then((item) => {
        if (!item.data()) navigation('/');
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
          quickPurchase: item.data()?.quickPurchase,
        });
      });
    };

    loadCar();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        return setSliderPerView(1);
      }
      if (window.innerWidth < 1024 && car!!.images.length >= 1) {
        return setSliderPerView(2);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="w-full space-y-6">
      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map((image) => (
            <SwiperSlide>
              <img
                className="h-96 w-full object-cover"
                key={image.name}
                src={image.url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {car && (
        <section
          key={car?.id}
          className="w-full space-y-6 rounded-lg bg-white p-6 shadow-sm"
        >
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
            {car?.quickPurchase && (
              <Button
                color="black"
                size="lg"
                fullWidth
                onClick={() => {
                  addCart(car!!);
                  navigation('/cart');
                }}
              >
                <HandCoins size={22} className="mr-2" />
                <span>Compre AGORA</span>
              </Button>
            )}

            <a
              className="flex h-16 w-full cursor-pointer items-center justify-center rounded-lg border-none bg-green-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-green-600"
              href={`https://api.whatsapp.com/send?phone${car?.whatsapp}&text=Olá vi esse carro ${car?.name} em um anúncio da WebCarros, podemos conversar? Tenho uma proposta!`}
              target="_blank"
            >
              <Phone size={22} className="mr-2" />
              <span>Entre em contato</span>
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
