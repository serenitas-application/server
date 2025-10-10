import { AppError, ErrorCode } from '../common/app-error/app-error.js';

function api(error, request, reply) {
  if (error instanceof AppError) {
    reply.status(error.toHttpCode()).send({
      code: error.code,
      message: error.message,
    });
  } else {
    this.log.error(
      `Unknown error at ${request.method} ${request.url}: ${error}`,
    );

    reply.status(500).send({
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: Date.now(),
    });
  }
}

function validateSchemas(errors) {
  const error = errors[0];

  const fieldName = error.instancePath.substring(1);
  const field = fieldName ? fieldName : 'Field';
  const reason = error.message ?? 'is invalid';
  const message = `${field}: ${reason}`;

  return new AppError(ErrorCode.VALIDATION_ERROR, message);
}

function tooManyRequests() {
  throw new AppError(
    ErrorCode.TOO_MANY_REQUESTS,
    'Too many requests, please try later',
  );
}

function notFound(req) {
  throw new AppError(
    ErrorCode.NOT_FOUND,
    `Requested URL (${req.method} ${req.url}) not found`,
  );
}

export const errorHandler = {
  api,
  notFound,
  tooManyRequests,
  validateSchemas,
};
