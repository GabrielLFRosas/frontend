import './assets/global.css';
import { AuthProvider } from './context/auth';
import { AppRouter } from './Routes';

export const App = () => {

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
