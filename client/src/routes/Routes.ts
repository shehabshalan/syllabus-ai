import { generatePath } from 'react-router';

export const ROUTES = {
  HOME: '/',
  CHAPTER: '/chapter/:slug',
  ABOUT: '/about',
  AUTH: '/auth',
  NOT_FOUND: '/not-found',
  BUGGY: '/buggy',
  ANY: '/*',
};

export const getRoute = (route: any, params: any) => {
  return generatePath(route, params);
};
