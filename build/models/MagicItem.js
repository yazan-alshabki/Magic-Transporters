"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MagicItemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
}, { timestamps: true });
const MagicItem = mongoose_1.default.model("MagicItem", MagicItemSchema);
exports.default = MagicItem;
