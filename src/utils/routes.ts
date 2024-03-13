const publicRoutes = ['/api-doc'];
const authRoutes = [
  '/sign-in',
  '/sign-in/forget-password',
  '/sign-in/change-password',
  '/sign-in/forget-password/otp',
  '/sign-up',
  '/sign-up/otp',
  '/sign-up/success',
];
const defaultRoute = '/events';
const resetRoute = '/sign-in';
const authApiRoutePrefix = '/api/auth';
const publicApiRoutePrefix = '/api/public';
export const routesConfig = {
  publicRoutes,
  authRoutes,
  defaultRoute,
  resetRoute,
  authApiRoutePrefix,
  publicApiRoutePrefix,
};
