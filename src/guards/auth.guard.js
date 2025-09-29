export function authGuard(req, reply, done) {
  if (!req.session?.userId) {
    return reply.code(401).send({ message: 'Unauthorized', statusCode: 401 });
  }
  done();
}
