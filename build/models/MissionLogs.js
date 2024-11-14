"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MissionLogsSchema = new mongoose_1.default.Schema({
    moverId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MagicMover' },
    state: {
        type: String
    },
    itemsLoaded: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MagicItem' }],
    itemsUnloaded: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MagicItem' }],
}, { timestamps: true });
const MissionLogs = mongoose_1.default.model("MissionLogs", MissionLogsSchema);
exports.default = MissionLogs;
