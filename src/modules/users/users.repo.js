export function userRepo(db) {
  const repo = db['users'];

  async function getUserInfo(userId) {
    return await repo.findUnique({ where: { id: userId } });
  }

  async function create(payload) {
    return await repo.create({ data: payload });
  }

  async function findByEmail(email) {
    return await repo.findUnique({ where: { email } });
  }

  return { getUserInfo, create, findByEmail };
}
