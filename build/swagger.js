"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
dotenv_1.default.config();
// Create Swagger interface
const doc = {
    info: {
        title: "Magic APIS",
        description: "Documentation about the APIs in Magic website",
    },
    host: process.env.HOST_FOR_SWAGGER,
    schemes: ["http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.ts"]; // Change to .ts if your main file is TypeScript
// Generate Swagger documentation
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc).then(() => {
    require("./index.ts"); // project's root file
});
