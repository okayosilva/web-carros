import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';

export function NotFound() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/');
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 px-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-zinc-800 md:text-4xl">
          404 - Página não encontrada
        </h1>
        <p className="text-sm text-gray-600 md:text-lg">
          Ops! A página que você está procurando não existe.
        </p>
      </div>
      <Button onClick={handleNavigate} className="min-w-64">
        Voltar para a página inicial
      </Button>
    </div>
  );
}
