import dotenv from 'dotenv';
import swaggerAutogen from 'swagger-autogen';

/**
 * Load environment variables from a .env file.
 */
dotenv.config();

/**
 * Swagger interface configuration.
 *
 * @typedef {Object} swaggerConfig
 * @property {string} title - The title of the Swagger documentation.
 * @property {string} description - A brief description of the APIs.
 * @property {string} host - The host URL for the Swagger documentation.
 * @property {Array<string>} schemes - The supported schemes for the API (e.g., http, https).
 */
const doc = {
  info: {
    title: "Magic APIS",
    description: "Documentation about the APIs in Magic website",
  },
  host: process.env.HOST_FOR_SWAGGER,
  schemes: ["http"],
};

/**
 * Output file for the generated Swagger documentation.
 *
 * @type {string}
 */
const outputFile = "./swagger-output.json";

/**
 * Array of files containing API endpoints.
 *
 * @type {Array<string>}
 */
const endpointsFiles = ["./index.ts"]; // Change to .ts if your main file is TypeScript

/**
 * Generate Swagger documentation using swagger-autogen.
 *
 * @async
 * @function generateSwaggerDoc
 * @param {string} outputFile - The output file for the generated documentation.
 * @param {Array<string>} endpointsFiles - The files containing API endpoints.
 * @param {swaggerConfig} doc - The Swagger interface configuration.
 */
swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  /**
   *Require the project's root file to start the application.
   */
  require("./index.ts"); // project's root file
});