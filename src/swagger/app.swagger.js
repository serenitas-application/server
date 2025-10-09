export const swaggerConfig = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Serenitas API',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'auth',
        description: 'Authentication related endpoints',
      },
    ],
    servers: [
      {
        url: 'http://localhost:',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        session: {
          type: 'apiKey',
          in: 'cookie',
          name: 'name',
        },
      },
    },
  },
};
