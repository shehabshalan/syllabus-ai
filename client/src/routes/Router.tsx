import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes';
import ProtectedRoute from '@/ProtectedRoute';
import NotFound from '@/pages/NotFound';
import Loading from '@/components/ui/loading';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.ANY} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
