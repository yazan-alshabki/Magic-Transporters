"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./routes/user"); // Adjust the import based on your actual file structure
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
const app = (0, express_1.default)();
/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express_1.default.json());
/**
 * Middleware to load environment variables from a .env file.
 */
dotenv_1.default.config();
/**
 * Middleware to parse URL-encoded bodies.
 */
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection configuration
const LOCAL_DB = process.env.LOCAL_DB; // Connection string for the local database
const PORT = process.env.PORT; // Port on which the server will listen
/**
 * Connect to the database and start the Express server.
 *
 * @async
 * @function connectPort
 * @param {number} port - The port number on which to listen for incoming requests.
 */
let connectPort = (port) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(LOCAL_DB); // Connect to the MongoDB database
        app.listen(port); // Start listening on the specified port
        console.log(`Connected to database successfully on port ${port}!!`);
    }
    catch (err) {
        console.error(`Database connection error: ${err}`); // Log any connection error
    }
});
// Start the connection process
connectPort(PORT);
// Set up user routes for handling user-related actions
app.use("/", user_1.userRoutes);
/**
 * Set up API documentation using Swagger.
 *
 * This middleware serves the Swagger UI documentation for the API.
 */
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
exports.default = app; // Export the app for use in other modules (if needed)
