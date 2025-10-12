export function userService(db) {
  const usersRepo = db['user'];

  async function getUserInfo(userId) {
    return await usersRepo.findUnique({ where: { id: userId } });
  }

  async function create(payload) {
    const user = await usersRepo.create({ data: payload });
    return user;
  }

  async function findByEmail(email) {
    return await usersRepo.findUnique({ where: { email } });
  }

  return { create, findByEmail, getUserInfo };
}
