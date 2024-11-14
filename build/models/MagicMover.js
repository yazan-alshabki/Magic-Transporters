"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MagicMoverSchema = new mongoose_1.default.Schema({
    weightLimit: {
        type: Number,
        required: true
    },
    itemsCarried: [{ type: mongoose_1.default.Schema.Types.Mixed, ref: 'MagicItem' }],
    currentState: {
        type: String,
    },
}, { timestamps: true });
const MagicMover = mongoose_1.default.model("MagicMover", MagicMoverSchema);
exports.default = MagicMover;
