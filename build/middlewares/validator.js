"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_a_magic_item = exports.add_a_magic_mover = void 0;
const express_validator_1 = require("express-validator");
const validation_1 = require("../helpers/validation");
const add_a_magic_mover = [
    (0, express_validator_1.body)("weightLimit")
        .notEmpty()
        .withMessage("Weight Limit cannot be empty"),
];
exports.add_a_magic_mover = add_a_magic_mover;
const add_a_magic_item = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("name cannot be empty")
        .trim()
        .customSanitizer(validation_1.titleCase),
    (0, express_validator_1.body)("weight")
        .notEmpty()
        .withMessage("Weight cannot be empty")
];
exports.add_a_magic_item = add_a_magic_item;
