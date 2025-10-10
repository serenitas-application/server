import { PrismaClient } from '@prisma/client';

export function databaseProvider() {
  const db = new PrismaClient();
  return db;
}
