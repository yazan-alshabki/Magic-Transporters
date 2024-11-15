"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Schema definition for a Magic Mover.
 *
 * @typedef {Object} MagicMoverSchema
 * @property {number} weightLimit - The maximum weight the mover can carry.
 * @property {Array<mongoose.Schema.Types.Mixed>} itemsCarried - An array of items currently carried by the mover, referenced from the MagicItem model.
 * @property {string} [currentState] - The current state of the mover (e.g., "resting", "loading", "on-mission").
 * @property {Date} createdAt - Timestamp for when the mover was created (automatically managed).
 * @property {Date} updatedAt - Timestamp for when the mover was last updated (automatically managed).
 */
const MagicMoverSchema = new mongoose_1.default.Schema({
    weightLimit: {
        type: Number,
        required: true,
    },
    itemsCarried: [{ type: mongoose_1.default.Schema.Types.Mixed, ref: 'MagicItem' }],
    currentState: {
        type: String,
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps
/**
 * Magic Mover model.
 *
 * This model represents a magic mover in the database.
 *
 * @type {mongoose.Model<MagicMover>}
 */
const MagicMover = mongoose_1.default.model("MagicMover", MagicMoverSchema);
exports.default = MagicMover;
