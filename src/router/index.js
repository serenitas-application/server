import fp from 'fastify-plugin';
import { dailyDiaryRoutes } from '../modules/daily-diary/daily-diary.routes.js';
import { authRoutes } from '../modules/auth/index.js';
import { usersRoutes } from '../modules/users/users.routes.js';

export default fp(async (fastify) => {
  fastify.register(authRoutes, { prefix: '/api/auth' });
  fastify.register(dailyDiaryRoutes, { prefix: '/api/daily-diary' });
  fastify.register(usersRoutes, { prefix: '/api/account' });
});
