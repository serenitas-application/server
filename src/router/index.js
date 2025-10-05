import fp from 'fastify-plugin';

import { authRoutes } from '../modules/auth/auth.routes.js';
import { usersRoutes } from '../modules/users/users.routes.js';
import { pagesRoutes } from '../modules/pages/pages.routes.js';
import { pageGroupsRoutes } from '../modules/page-groups/page-groups.routes.js';

export default fp(async (fastify) => {
  fastify.register(authRoutes, { prefix: '/api/auth' });
  fastify.register(usersRoutes, { prefix: '/api/accounts' });
  fastify.register(pagesRoutes, { prefix: '/api/pages' });
  fastify.register(pageGroupsRoutes, { prefix: '/api/page-groups' });
});
