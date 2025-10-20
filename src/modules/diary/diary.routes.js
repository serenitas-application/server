import { diarySchemes } from './schemas/diary.schemas.js';

export async function diaryRoutes(app) {
  const { diary } = app.services;
  const { auth } = app.guards;

  app.route({
    method: 'GET',
    url: '/',
    preHandler: auth.check,
    handler: async (req) => {
      const { userId } = req.session;
      const { date } = req.query;
      const result = await diary.findByDate(date, userId);
      return { data: result };
    },
  });

  app.route({
    method: 'GET',
    url: '/records',
    preHandler: auth.check,
    handler: async (req) => {
      const { userId } = req.session;
      const result = await diary.getDiaryRecords(userId);
      return { data: result };
    },
  });

  app.route({
    method: 'POST',
    url: '/',
    preHandler: auth.check,
    schema: diarySchemes.create,
    handler: async (req) => {
      const payload = req.body;
      const { userId } = req.session;
      const result = await diary.create(payload, userId);
      return { data: result };
    },
  });

  app.route({
    method: 'PATCH',
    url: '/:id',
    preHandler: auth.check,
    schema: diarySchemes.create,
    handler: async (req) => {
      const payload = req.body;
      const { userId } = req.session;
      const { id } = req.params;
      const result = await diary.update(Number(id), payload, userId);
      return { data: result };
    },
  });

  app.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: auth.check,
    handler: async (req) => {
      const { id } = req.params;
      const result = await diary.deleteOne(Number(id));
      return { data: result };
    },
  });
}
