import { createContext, ReactNode, useContext, useState } from 'react';
import { CarDetailsProps } from '../pages/carDetail';
import { notifyWithToastify } from '../utils/notifyWithToastify';

interface CartProviderProps {
  cartCar: CarDetailsProps[];
  addCart: (item: CarDetailsProps) => void;
  removeCart: (id: string) => void;
}

type CartContextProps = {
  children: ReactNode;
};

const UseCartContext = createContext({} as CartProviderProps);

export function CartProvider({ children }: CartContextProps) {
  const [cartCar, setCartCar] = useState<CarDetailsProps[]>([]);
  const addCart = (item: CarDetailsProps) => {
    if (cartCar.some((car) => car.id === item.id)) {
      return notifyWithToastify('error', 'Carro já adicionado ao carrinho');
    }
    setCartCar((oldState) => [...oldState, item]);
  };

  const removeCart = (id: string) => {
    if (!id) return;
    setCartCar((oldState) => oldState.filter((car) => car.id !== id));
  };

  return (
    <UseCartContext.Provider value={{ cartCar, addCart, removeCart }}>
      {children}
    </UseCartContext.Provider>
  );
}

export const useCart = () => useContext(UseCartContext);
