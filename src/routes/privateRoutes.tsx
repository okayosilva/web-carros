import { useNavigate } from 'react-router-dom';
import { LoadingFullScreen } from '../components/loadingFullScreen';
import { useAuthenticate } from '../context/useAuthenticate';

export function PrivateRoutes({
  children,
}: {
  children: React.ReactNode;
}): any {
  const { isAuthenticated, loadingAuth } = useAuthenticate();
  const navigate = useNavigate();

  if (loadingAuth) {
    return <LoadingFullScreen />;
  }

  if (!isAuthenticated) {
    return navigate('/login');
  }

  return children;
}
