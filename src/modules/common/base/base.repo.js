export function baseRepo(repo, handleDatabaseError) {
  async function create(data) {
    return await repo.create({ data }).catch((e) => handleDatabaseError(e));
  }

  async function update(id, data) {
    return await repo
      .update({ where: { id }, data })
      .catch((e) => handleDatabaseError(e));
  }

  async function deleteOne(id) {
    return await repo
      .delete({ where: { id } })
      .catch((e) => handleDatabaseError(e));
  }

  async function findOneById(id) {
    return await repo
      .findUnique({ where: { id } })
      .catch((e) => handleDatabaseError(e));
  }

  async function findOneByField(field, value) {
    return await repo
      .findFirst({ where: { [field]: value } })
      .catch((e) => handleDatabaseError(e));
  }

  return { findOneById, create, update, deleteOne, findOneByField };
}
