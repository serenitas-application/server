import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function diaryService(repo) {
  async function findByDate(date, userId) {
    const items = await repo.findByDate(date, userId);
    return items;
  }

  async function getDiaryRecords(userId) {
    const dates = await repo.findDiaryDates(userId);
    return dates;
  }

  async function create(payload, userId) {
    const newItems = await repo.create({ ...payload, userId });
    return newItems;
  }

  async function update(id, payload, userId) {
    const entity = await repo.findOneById(id);
    if (!entity) {
      throw new AppError(ErrorCode.INVALID_STATE, 'Diary not found');
    }
    const updatedDiary = await repo.update(id, { ...payload, userId });
    return updatedDiary;
  }

  async function deleteOne(id) {
    const entity = await repo.findOneById(id);
    if (!entity) {
      throw new AppError(ErrorCode.INVALID_STATE, 'Diary not found');
    }
    await repo.deleteOne(id);
    return { deletedCount: 1 };
  }

  return { findByDate, getDiaryRecords, create, update, deleteOne };
}
