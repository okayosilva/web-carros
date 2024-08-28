import { AuthenticateProvider } from './context/useAuthenticate';
import { Router } from './routes/router';

function App() {
  return (
    <AuthenticateProvider>
      <Router />
    </AuthenticateProvider>
  );
}

export default App;
