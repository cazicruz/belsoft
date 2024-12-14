/* Swagger configuration */
const options = {
    openapi: '3.0.0',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
  info: {
    version: '1.0.0',      // by default: '1.0.0'
    title: 'Task MLM Apis',        // by default: 'REST API'
    description: 'API for an MLM platfrom',  // by default: ''
    contact: {
        'name': 'API Support',
        'email': 'dcazicruz@icloud.com'
    },
  },
  host: 'localhost:3001',      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: 'Task CRUD',         // Tag name
      description: 'Task related apis',  // Tag description
    },
    
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {
    'errorResponse': {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
    'errorResponse.404': {
      "code": "404",
      "message": "Not found",
    },
    'errorResponse.500': {
      "code": "500",
      "message": "Internal server error",
    },
  },          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./Router/*.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });