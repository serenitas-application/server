export function userService(repo) {
  console.log(repo);
  async function getUserInfo(userId) {
    console.log(userId);
    return await repo.getUserInfo(userId);
  }

  async function create(payload) {
    const user = await repo.create(payload);
    return user;
  }

  async function findByEmail(email) {
    return await repo.findByEmail(email);
  }

  return { create, findByEmail, getUserInfo };
}
