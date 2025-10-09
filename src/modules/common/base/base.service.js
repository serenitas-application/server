export function baseService() {
  async function findAll() {
    return 'findAll';
  }

  async function create() {
    return 'create';
  }

  async function update() {
    return 'update';
  }

  async function deleteOne() {
    return 'deleteOne';
  }

  async function deleteMany() {
    return 'deleteMany';
  }

  return { findAll, create, update, deleteOne, deleteMany };
}
