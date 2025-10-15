const create = {
  body: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
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
