import { PrismaClient } from '@prisma/client';
import { handleDatabaseError } from './handle-db-errors.js';

export function databaseProvider() {
  const prisma = new PrismaClient();
  return { db: prisma, handleDatabaseError };
}
