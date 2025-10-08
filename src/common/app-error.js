export const ErrorCode = {
  NOT_ENOUGH_PERMISSIONS: 'NOT_ENOUGH_PERMISSIONS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INVALID_STATE: 'INVALID_STATE',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

const HttpCodeMap = {
  [ErrorCode.NOT_ENOUGH_PERMISSIONS]: 403,
  [ErrorCode.INVALID_CREDENTIALS]: 401,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.INVALID_STATE]: 400,
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.TOO_MANY_REQUESTS]: 429,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
};

export class AppError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'AppError';
  }

  toHttpCode() {
    return HttpCodeMap[this.code] ?? 500;
  }
}
