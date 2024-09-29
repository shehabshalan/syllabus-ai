import { ReactNode } from 'react';
import { useGetUser } from './services/useGetUser';
import { useNavigate } from 'react-router';
import Loading from './components/ui/loading';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    navigate('/auth');
    return <h1>Redirecting...</h1>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
