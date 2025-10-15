export function baseRepo(repo) {
  async function create(data) {
    return await repo.create({ data });
  }

  async function update(id, data) {
    return await repo.update({ where: { id }, data });
  }

  async function findById(id) {
    return await repo.findUnique({ where: { id } });
  }

  async function findByField(field) {
    return await repo.findFirst({ where: { field } });
  }

  return { findById, create, update, findByField };
}
