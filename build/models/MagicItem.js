"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Schema definition for a Magic Item.
 *
 * @typedef {Object} MagicItemSchema
 * @property {string} name - The name of the magic item.
 * @property {number} weight - The weight of the magic item.
 * @property {Date} createdAt - Timestamp for when the item was created (automatically managed).
 * @property {Date} updatedAt - Timestamp for when the item was last updated (automatically managed).
 */
const MagicItemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps
/**
 * Magic Item model.
 *
 * This model represents a magic item in the database.
 *
 * @type {mongoose.Model<MagicItem>}
 */
const MagicItem = mongoose_1.default.model("MagicItem", MagicItemSchema);
exports.default = MagicItem;
