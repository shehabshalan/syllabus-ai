import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes';
import NotFound from '@/pages/NotFound';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import ProtectedRoute from '@/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const Topic = lazy(() => import('@/pages/Topic'));
const Chapter = lazy(() => import('@/pages/Chapter'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));

const Router = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.TOPIC} element={<Topic />} />
        <Route path={ROUTES.CHAPTER} element={<Chapter />} />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.ANY} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
