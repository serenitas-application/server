import { STRONG_PASSWORD } from '#modules/common/consts/regex.js';

const login = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email', minLength: 5, maxLength: 100 },
      password: { type: 'string', minLength: 8 },
    },
  },
};

const registration = {
  body: {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
      email: { type: 'string', format: 'email', minLength: 5, maxLength: 100 },
      username: { type: 'string' },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 100,
        pattern: STRONG_PASSWORD.source,
      },
    },
  },
};

const sendToken = {
  body: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', format: 'email', minLength: 5, maxLength: 100 },
      lang: { type: 'string' },
    },
  },
};

const verifyToken = {
  body: {
    type: 'object',
    required: ['email', 'token'],
    properties: {
      email: { type: 'string', format: 'email', minLength: 5, maxLength: 100 },
      token: { type: 'string' },
    },
  },
};

export const authSchemas = {
  login,
  registration,
  sendToken,
  verifyToken,
};
