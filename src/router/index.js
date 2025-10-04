import fp from 'fastify-plugin';

import { authRoutes } from '../modules/auth/index.js';
import { usersRoutes } from '../modules/users/users.routes.js';
import { pagesRoutes } from '../modules/pages/pages.routes.js';

export default fp(async (fastify) => {
  fastify.register(authRoutes, { prefix: '/api/auth' });
  fastify.register(usersRoutes, { prefix: '/api/accounts' });
  fastify.register(pagesRoutes, { prefix: '/api/pages' });
});
