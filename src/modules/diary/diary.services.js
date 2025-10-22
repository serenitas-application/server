import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function diaryService(repo) {
  async function findByDate(date, userId) {
    return await repo.findByDate(date, userId);
  }

  async function getDiaryRecords(userId) {
    return await repo.findDiaryDates(userId);
  }

  async function create(payload, userId = 10) {
    const alreadyExist = await repo.checkAlreadyExist(payload.title);
    if (alreadyExist?.length) {
      throw new AppError(ErrorCode.CONFLICT, 'Record already exist');
    }
    const newItems = await repo.create({ ...payload, userId });
    return newItems;
  }

  async function update(id, payload, userId) {
    const entity = await repo.findOneById(id);
    if (!entity) {
      throw new AppError(ErrorCode.INVALID_STATE, 'Record not found');
    }
    const updatedRecord = await repo.update(id, {
      ...payload,
      userId,
      editDate: new Date(),
    });
    return updatedRecord;
  }

  async function deleteOne(id) {
    const entity = await repo.findOneById(id);
    if (!entity) {
      throw new AppError(ErrorCode.INVALID_STATE, 'Record not found');
    }
    await repo.deleteOne(id);
    return { deletedCount: 1 };
  }

  return { findByDate, getDiaryRecords, create, update, deleteOne };
}
