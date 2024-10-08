import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { register } from 'swiper/element/bundle';
import { AuthenticateProvider } from './context/useAuthenticate';
import { CartProvider } from './context/useCart';
import { Router } from './routes/router';

register();

function App() {
  return (
    <AuthenticateProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthenticateProvider>
  );
}

export default App;
