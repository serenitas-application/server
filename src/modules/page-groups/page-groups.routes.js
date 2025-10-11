export async function pageGroupsRoutes(app) {
  const { pageGroups } = app.services;

  console.log(pageGroups);

  app.route({
    method: 'GET',
    url: '/',
    preHandler: app.authGuard,
    handler: async (req) => {
      const { userId } = req.session;
      const query = req.query;
      const result = await pageGroups.findAll(query, userId);
      return { data: result };
    },
  });

  app.route({
    method: 'POST',
    url: '/',
    preHandler: app.authGuard,
    handler: async (req) => {
      const { userId } = req.session;
      const result = await pageGroups.create(userId);
      return { data: result };
    },
  });
}
