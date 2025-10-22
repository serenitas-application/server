const create = {
  body: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string', format: 'date-time' },
      content: { type: 'string' },
      isPrivate: { type: 'boolean' },
    },
  },
};

const update = {
  body: {
    type: 'object',
    properties: {
      content: { type: 'string' },
      isPrivate: { type: 'boolean' },
    },
  },
};

export const diarySchemes = {
  create,
  update,
};
