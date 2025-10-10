import fp from 'fastify-plugin';
import { usersRoutes } from '#modules/users/users.routes.js';
import { authRoutes } from '#modules/auth/auth.routes.js';
import { pageGroupsRoutes } from '#modules/page-groups/page-groups.routes.js';
import { pagesRoutes } from '#modules/pages/pages.routes.js';
import { appHealthCheck } from './app-health-check.routes.js';

export default fp(async (fastify) => {
  fastify.register(appHealthCheck);
  fastify.register(authRoutes, { prefix: '/api/auth' });
  fastify.register(usersRoutes, { prefix: '/api/accounts' });
  fastify.register(pagesRoutes, { prefix: '/api/pages' });
  fastify.register(pageGroupsRoutes, { prefix: '/api/page-groups' });
});
