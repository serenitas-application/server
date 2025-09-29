import fp from 'fastify-plugin';
import { journalRoutes } from '../modules/journal/journal.routes.js';
import { authRoutes } from '../modules/auth/index.js';
import { usersRoutes } from '../modules/users/users.routes.js';

export default fp(async (fastify) => {
  fastify.register(authRoutes, { prefix: '/api/auth' });
  fastify.register(usersRoutes, { prefix: '/api/accounts' });
  fastify.register(journalRoutes, { prefix: '/api/journals' });
});
