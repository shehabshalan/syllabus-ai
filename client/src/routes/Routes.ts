import { generatePath } from 'react-router';

export const ROUTES = {
  HOME: '/',
  TOPICS: '/topics',
  TOPIC: '/topic/:id',
  CHAPTER: '/chapter/:id',
  ABOUT: '/about',
  AUTH: '/auth',
  NOT_FOUND: '/not-found',
  BUGGY: '/buggy',
  ANY: '/*',
};

export const getRoute = (route: any, params: any) => {
  return generatePath(route, params);
};
