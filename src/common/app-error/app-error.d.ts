export declare const ErrorDetailsCode: {
  readonly NOT_VERIFIED: '01';
};

export declare const ErrorCode: {
  readonly NOT_ENOUGH_PERMISSIONS: 'NOT_ENOUGH_PERMISSIONS';
  readonly INVALID_CREDENTIALS: 'INVALID_CREDENTIALS';
  readonly NOT_FOUND: 'NOT_FOUND';
  readonly CONFLICT: 'CONFLICT';
  readonly INVALID_STATE: 'INVALID_STATE';
  readonly INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR';
  readonly TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS';
  readonly VALIDATION_ERROR: 'VALIDATION_ERROR';
};

export type ErrorCodeKey = keyof typeof ErrorCode;
export type ErrorCodeValue = (typeof ErrorCode)[ErrorCodeKey];

export declare class AppError extends Error {
  readonly code: ErrorCodeValue;
  readonly message: string;
  readonly details: ErrorDetailsCode;

  constructor(code: ErrorCodeValue, message: string, details: ErrorDetailsCode);

  toHttpCode(): number;
}
