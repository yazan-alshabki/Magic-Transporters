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
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true }));
const LOCAL_DB = process.env.LOCAL_DB;
const PORT = process.env.PORT;
// ============================== connect to database ==============================
let connectPort = (port) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(LOCAL_DB);
        app.listen(port);
        console.log(`connect to database done at port ${port}!!`);
    }
    catch (err) {
        console.log(err);
    }
});
connectPort(PORT);
// user actions
app.use("/", user_1.userRoutes);
// documentation apis 
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
