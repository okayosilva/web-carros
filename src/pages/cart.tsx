import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';
import { formatCurrency } from '../utils/format';

export function Cart() {
  const { cartCar, removeCart } = useCart();

  return (
    <main className="mt-4 space-y-4">
      {cartCar.length === 0 && (
        <div className="flex h-96 items-center justify-center rounded-lg bg-gray-200 px-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xl font-bold text-zinc-900">
            <ShoppingCart size={32} />
            <span>Seu carrinho está vazio</span>
          </div>
        </div>
      )}
      {cartCar.map((car) => (
        <div
          className="flex w-full flex-wrap items-center justify-between rounded-lg bg-gray-50 px-4 py-4 shadow-sm md:h-40"
          key={car.id}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <img
              className="h-40 rounded-md object-cover md:h-32"
              src={car.images[0].url}
              alt={car.name}
            />
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <p className="text-lg font-bold text-zinc-900">{car.name}</p>
                <p className="text-xs md:text-sm">{car.model}</p>
              </div>

              <div className="flex space-x-3">
                <div className="space-y-1 text-sm">
                  <p>Cidade:</p>
                  <p className="font-bold text-zinc-900">{car.city}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Ano:</p>
                  <p className="font-bold text-zinc-900">{car.year}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Cor:</p>
                  <p className="font-bold capitalize text-zinc-900">
                    {car.color}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex w-full flex-col justify-center gap-2 md:mt-0 md:w-auto md:items-center">
            <p className="font-bold text-zinc-900">
              {formatCurrency(String(car.price))}
            </p>
            <button
              type="button"
              onClick={() => removeCart(car.id)}
              className="flex w-full justify-center gap-2 rounded-lg bg-red-500 p-2 text-zinc-50 transition-all duration-150 hover:bg-red-700"
            >
              <Trash2 size={22} />
              <span>Remover</span>
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
