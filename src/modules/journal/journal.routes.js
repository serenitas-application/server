import { journalSchemes } from './schemas/journal.schemas.js';

export async function journalRoutes(fastify) {
  const { journal } = fastify.services;

  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: fastify.authGuard,
    handler: async (req) => {
      const userId = req.sessionId;
      const result = await journal.findAll(userId);
      return { data: result };
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: fastify.authGuard,
    schema: journalSchemes.create,
    handler: async (req) => {
      const payload = req.body;
      const { userId } = req.session;
      const result = await journal.create(payload, userId);
      return { data: result };
    },
  });
}
