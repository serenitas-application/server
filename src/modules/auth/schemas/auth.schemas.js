const login = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

const registration = {
  body: {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
      email: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export const authSchemas = {
  login,
  registration,
};
