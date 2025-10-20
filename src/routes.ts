import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  layout('routes/_layout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('s/:slug', 'routes/share.tsx'),
  ]),

  // Catch undefined routes
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
