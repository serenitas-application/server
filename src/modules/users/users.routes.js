export async function usersRoutes(app) {
  const { users: userService } = app.services;
  const { auth } = app.guards;

  app.route({
    method: 'GET',
    url: '/',
    preHandler: auth.check,
    handler: async (req) => {
      const { userId } = req.session;
      const result = await userService.getUserInfo(userId);
      return { data: result };
    },
  });
}
