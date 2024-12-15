import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import Loading from './components/ui/loading';
import { useMe } from './api/apiHooks/user/user';
import { ROUTES } from './routes/Routes';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useMe();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    navigate(ROUTES.HOME);
    return <h1>Redirecting...</h1>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
