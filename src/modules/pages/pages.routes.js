import { pagesSchemes } from './schemas/pages.schemas.js';

export async function pagesRoutes(app) {
  const { pages } = app.services;

  app.route({
    method: 'GET',
    url: '/',
    preHandler: app.authGuard,
    handler: async (req) => {
      const { userId } = req.session;
      const result = await pages.findAll(userId);
      return { data: result };
    },
  });

  app.route({
    method: 'POST',
    url: '/',
    preHandler: app.authGuard,
    schema: pagesSchemes.create,
    handler: async (req) => {
      const payload = req.body;
      const { userId } = req.session;
      const result = await pages.create(payload, userId);
      return { data: result };
    },
  });

  app.route({
    method: 'PATCH',
    url: '/:id',
    preHandler: app.authGuard,
    schema: pagesSchemes.update,
    handler: async (req) => {
      const payload = req.body;
      const { userId } = req.session;
      const result = await pages.update(payload, userId);
      return { data: result };
    },
  });

  app.route({
    method: 'DELETE',
    url: '/',
    preHandler: app.authGuard,
    handler: async (req) => {
      const payload = req.body;
      const { userId } = req.session;
      const result = await pages.deleteOne(payload, userId);
      return { data: result };
    },
  });
}
