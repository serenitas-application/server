export const create = {
  body: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      hiddenStatus: { type: 'boolean' },
      isLiked: { type: 'boolean' },
      isPrivate: { type: 'boolean' },
    },
  },
};

export const journalSchemes = {
  create,
};
