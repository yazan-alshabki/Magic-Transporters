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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = exports.titleCase = void 0;
const express_validator_1 = require("express-validator");
// Function to convert a string to title case
const titleCase = (name) => {
    return name
        .toLowerCase()
        .split(" ")
        .map(text => text.charAt(0).toUpperCase() + text.slice(1))
        .join(" ");
};
exports.titleCase = titleCase;
// Validation handler function
const validationHandler = (values = []) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Run all validation chains
        yield Promise.all(values.map(value => value.run(req)));
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        // Prepare error response
        const _errors = errors.array(); // Explicitly type the errors
        let message = "Invalid Parameters: ";
        _errors.forEach((v) => {
            message += `${v.param}, `; // Access 'param' property
        });
        // Respond with validation errors
        return res.status(422).json({ success: false, errors: _errors });
    });
};
exports.validationHandler = validationHandler;
