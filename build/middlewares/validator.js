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
exports.validateAddMagicItem = exports.validateAddMagicMover = exports.validateEndMission = exports.validateStartMission = exports.validateLoading = void 0;
const MagicMover_1 = __importDefault(require("../models/MagicMover"));
const MagicItem_1 = __importDefault(require("../models/MagicItem"));
/**
 * Middleware to validate loading items onto a Magic Mover.
 *
 * This middleware checks the following:
 * - Validates the request body against the provided Zod schema.
 * - Checks if the mover exists and is not currently on a mission.
 * - Validates that all items to be loaded exist.
 * - Ensures the total weight does not exceed the mover's weight limit.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body.
 * @returns {Function} - The middleware function.
 */
const validateLoading = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body against the schema
        schema.parse({
            body: req.body,
        });
        // Find the Magic Mover by ID
        let mover = yield MagicMover_1.default.findById(req.body.moverId);
        if (!mover) {
            throw new Error('Magic Mover not found!');
        }
        if (mover.currentState === "on-mission") {
            throw new Error('Magic Mover cannot load more!');
        }
        // Load items by their IDs
        let itemsToLoad = [];
        for (let i = 0; i < req.body.itemIds.length; i++) {
            let item = yield MagicItem_1.default.findById(req.body.itemIds[i]);
            if (!item) {
                throw new Error(`Item ${req.body.itemIds[i]} not found!`);
            }
            itemsToLoad.push(item);
        }
        // Calculate total weight of items to load
        let totalWeight = itemsToLoad.reduce((total, item) => total + item.weight, 0);
        let carried = mover.itemsCarried;
        for (let i = 0; i < carried.length; i++) {
            totalWeight += carried[i]['weight'];
        }
        // Check if the total weight exceeds the mover's weight limit
        if (totalWeight > mover.weightLimit) {
            throw new Error('Mover weight limit exceeded');
        }
        next();
    }
    catch (err) {
        if (!err.errors) {
            res.status(400).send({ success: false, errors: err.message });
        }
        else {
            res.status(400).send({ success: false, errors: err.errors });
        }
    }
});
exports.validateLoading = validateLoading;
/**
 * Middleware to validate starting a mission for a Magic Mover.
 *
 * This middleware checks the following:
 * - Validates the request parameters against the provided Zod schema.
 * - Checks if the mover exists and is currently in the "loading" state.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request parameters.
 * @returns {Function} - The middleware function.
 */
const validateStartMission = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request parameters against the schema
        schema.parse({
            params: req.params,
        });
        // Find the Magic Mover by ID
        let mover = yield MagicMover_1.default.findById(req.params.id);
        if (!mover) {
            throw new Error('Magic Mover not found!');
        }
        if (mover.currentState !== "loading") {
            throw new Error('Magic Mover cannot start a mission because he did not load!');
        }
        next();
    }
    catch (err) {
        if (!err.errors) {
            res.status(400).send({ success: false, errors: err.message });
        }
        else {
            res.status(400).send({ success: false, errors: err.errors });
        }
    }
});
exports.validateStartMission = validateStartMission;
/**
 * Middleware to validate ending a mission for a Magic Mover.
 *
 * This middleware checks the following:
 * - Validates the request parameters against the provided Zod schema.
 * - Checks if the mover exists and is currently in the "on-mission" state.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request parameters.
 * @returns {Function} - The middleware function.
 */
const validateEndMission = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request parameters against the schema
        schema.parse({
            params: req.params,
        });
        // Find the Magic Mover by ID
        let mover = yield MagicMover_1.default.findById(req.params.id);
        if (!mover) {
            throw new Error('Magic Mover not found!');
        }
        if (mover.currentState !== "on-mission") {
            throw new Error('Magic Mover cannot end a mission because he is not on a mission!');
        }
        next();
    }
    catch (err) {
        if (!err.errors) {
            res.status(400).send({ success: false, errors: err.message });
        }
        else {
            res.status(400).send({ success: false, errors: err.errors });
        }
    }
});
exports.validateEndMission = validateEndMission;
/**
 * Middleware to validate adding a Magic Mover.
 *
 * This middleware validates the request body against the provided Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body.
 * @returns {Function} - The middleware function that validates the add mover request.
 */
const validateAddMagicMover = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body against the schema
        schema.parse({
            body: req.body,
        });
        next();
    }
    catch (err) {
        res.status(400).send({ success: false, errors: err.errors });
    }
});
exports.validateAddMagicMover = validateAddMagicMover;
/**
 * Middleware to validate adding a Magic Item.
 *
 * This middleware validates the request body against the provided Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body.
 * @returns {Function} - The middleware function that validates the add item request.
 */
const validateAddMagicItem = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body against the schema
        schema.parse({
            body: req.body,
        });
        next();
    }
    catch (err) {
        res.status(400).send({ success: false, errors: err.errors });
    }
});
exports.validateAddMagicItem = validateAddMagicItem;
