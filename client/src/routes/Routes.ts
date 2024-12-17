import { generatePath } from 'react-router';

export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  TOPICS: '/topics',
  TOPIC: '/topic/:id',
  CHAPTER: '/chapter/:id',
  ABOUT: '/about',
  AUTH: '/auth',
  BUGGY: '/buggy',
  ANY: '/*',
};

export const getRoute = (route: any, params: any) => {
  return generatePath(route, params);
};
