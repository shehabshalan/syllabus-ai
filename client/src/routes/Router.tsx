import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes';
import NotFound from '@/pages/NotFound';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Home = lazy(() => import('@/pages/Home'));
const Topic = lazy(() => import('@/pages/Topic'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));

const Router = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.TOPIC} element={<Topic />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.ANY} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
