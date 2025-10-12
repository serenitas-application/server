import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function pageGroupsService(db) {
  const repo = db['pageGroup'];

  async function findAll(query, userId) {
    const pageGroups = await repo.findMany({
      where: { userId },
    });
    return { items: pageGroups };
  }

  async function create(payload, userId) {
    const { name } = payload;
    const alreadyExist = await repo.findFirst({ where: { name, userId } });
    if (alreadyExist) {
      throw new AppError(
        ErrorCode.CONFLICT,
        'Group with this name already exist',
      );
    }
    return await repo.create({ data: { ...payload, userId } });
  }

  return { create, findAll };
}
