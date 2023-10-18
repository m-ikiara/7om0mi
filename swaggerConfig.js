const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Tomomi: The Task Manager',
      version: '1.0.0',
      description: 'A task manager for the ALX Specialization Portfolio',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
  },
  apis: [
    './tomomi_server/routes/*.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
