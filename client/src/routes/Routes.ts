import { generatePath } from 'react-router';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  AUTH: '/auth',
  NOT_FOUND: '/not-found',
  BUGGY: '/buggy',
  ANY: '/*',
};

export const getRoute = (route: any, params: any) => {
  return generatePath(route, params);
};
