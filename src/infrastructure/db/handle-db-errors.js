/* eslint-disable indent */

import { AppError, ErrorCode } from '#common/app-error/app-error.js';

export function handleDatabaseError(error) {
  console.error('Database error: ', error);

  switch (error.code) {
    case 'P2000': // value too long
    case 'P2005': // invalid value
    case 'P2006': // invalid type
    case 'P2011': // null on required
    case 'P2012': // missing required
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid request data.');

    case 'P2002': // unique constraint
      throw new AppError(
        ErrorCode.CONFLICT,
        'A record with this value already exists.',
      );

    case 'P2003': // foreign key violation (record in use)
      throw new AppError(
        ErrorCode.CONFLICT,
        'Operation cannot be completed: record is in use.',
      );

    case 'P2025': // record not found
      throw new AppError(ErrorCode.NOT_FOUND, 'Record not found.');

    case 'P2033': // query timeout
    case 'P2034': // deadlock
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Service temporarily unavailable. Please try again later.',
      );

    default:
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Internal server error.',
      );
  }
}
