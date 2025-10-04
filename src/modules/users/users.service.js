export function userService(repo) {
  const usersRepo = repo['User'];

  async function getUserInfo(userId) {
    return await usersRepo.findUnique({ where: { id: userId } });
  }

  async function create(payload) {
    return await usersRepo.create({ data: payload });
  }

  async function findByEmail(email) {
    return await usersRepo.findUnique({ where: { email } });
  }

  return { create, findByEmail, getUserInfo };
}
