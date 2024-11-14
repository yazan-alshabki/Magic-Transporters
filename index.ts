import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRoutes } from './routes/user'; // Adjust the import based on your actual file structure
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";

const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Middleware to load environment variables from a .env file.
 */
dotenv.config();

/**
 * Middleware to parse URL-encoded bodies.
 */
app.use(express.urlencoded({ extended: true }));

// Database connection configuration
const LOCAL_DB = process.env.LOCAL_DB as string; // Connection string for the local database
const PORT = process.env.PORT as any; // Port on which the server will listen

/**
 * Connect to the database and start the Express server.
 *
 * @async
 * @function connectPort
 * @param {number} port - The port number on which to listen for incoming requests.
 */
let connectPort = async (port: number) => {
    try {
        await mongoose.connect(LOCAL_DB); // Connect to the MongoDB database
        app.listen(port); // Start listening on the specified port
        console.log(`Connected to database successfully on port ${port}!!`);
    } catch (err) {
        console.error(`Database connection error: ${err}`); // Log any connection error
    }
};

// Start the connection process
connectPort(PORT);

// Set up user routes for handling user-related actions
app.use("/", userRoutes);

/**
 * Set up API documentation using Swagger.
 *
 * This middleware serves the Swagger UI documentation for the API.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app; // Export the app for use in other modules (if needed)