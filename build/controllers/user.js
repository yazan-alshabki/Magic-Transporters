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
exports.moversCompleteTheirMission = exports.endMission = exports.startMission = exports.loading = exports.addMagicItem = exports.addMagicMover = void 0;
const MagicItem_1 = __importDefault(require("../models/MagicItem"));
const MagicMover_1 = __importDefault(require("../models/MagicMover"));
const MissionLogs_1 = __importDefault(require("../models/MissionLogs"));
/**
 * Add a new Magic Mover.
 *
 * @param {Request} req - The request object containing mover data.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const addMagicMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let weightLimit = req.body.weightLimit;
    try {
        let mover = yield MagicMover_1.default.create({
            weightLimit,
            currentState: "resting"
        });
        res.status(200).json({
            success: true,
            mover: mover,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.addMagicMover = addMagicMover;
/**
 * Add a new Magic Item.
 *
 * @param {Request} req - The request object containing item data.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const addMagicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name;
    let weight = req.body.weight;
    try {
        let item = yield MagicItem_1.default.create({
            name,
            weight,
        });
        res.status(200).json({
            success: true,
            item: item,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.addMagicItem = addMagicItem;
/**
 * Load items onto a Magic Mover.
 *
 * @param {Request} req - The request object containing mover ID and item IDs.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const loading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let moverId = req.body.moverId;
    let itemIds = req.body.itemIds;
    try {
        let mover = yield MagicMover_1.default.findById(moverId);
        let itemsToLoad = [];
        for (let i = 0; i < itemIds.length; i++) {
            let item = yield MagicItem_1.default.findById(itemIds[i]);
            itemsToLoad.push(item);
        }
        let totalWeight = itemsToLoad.reduce((total, item) => total + item.weight, 0);
        let carried = mover.itemsCarried;
        for (let i = 0; i < carried.length; i++) {
            totalWeight += carried[i]['weight'];
        }
        mover.itemsCarried.push(...itemsToLoad);
        mover.currentState = 'loading';
        yield mover.save();
        let loadingLog = yield MissionLogs_1.default.create({
            moverId,
            state: "load before mission start",
            itemsLoaded: itemsToLoad.map((item) => item._id),
        });
        res.status(200).json({
            success: true,
            loadingLog: loadingLog
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.loading = loading;
/**
 * Start a mission for a Magic Mover.
 *
 * @param {Request} req - The request object containing the mover ID in the parameters.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const startMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let moverId = req.params.id;
    try {
        let mover = yield MagicMover_1.default.findById(moverId);
        mover.currentState = 'on-mission';
        yield mover.save();
        let missionStartLog = yield MissionLogs_1.default.create({
            moverId,
            state: "mission started",
        });
        res.status(200).json({
            success: true,
            missionStartLog: missionStartLog
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.startMission = startMission;
/**
 * End a mission for a Magic Mover.
 *
 * @param {Request} req - The request object containing the mover ID in the parameters.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const endMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let moverId = req.params.id;
    try {
        let mover = yield MagicMover_1.default.findById(moverId);
        let missionEndLog = yield MissionLogs_1.default.create({
            moverId,
            state: "mission ended",
            itemsUnloaded: mover.itemsCarried.map((item) => item._id),
        });
        mover.itemsCarried = [];
        mover.currentState = 'resting';
        yield mover.save();
        res.status(200).json({
            success: true,
            missionEndLog: missionEndLog
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.endMission = endMission;
/**
 * Retrieve the mission completion status of all Magic Movers.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const moversCompleteTheirMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let magicMovers = yield MagicMover_1.default.find({});
        let missionLogs = yield MissionLogs_1.default.find({});
        let moverMissions = magicMovers.map(mover => ({
            id: `Mover ${mover.id}`,
            missionsCompleted: missionLogs.filter((log) => log.moverId.toString() === mover.id.toString() && log.itemsUnloaded.length > 0).length
        }));
        let movers = moverMissions.sort((a, b) => b.missionsCompleted - a.missionsCompleted);
        res.status(200).json({
            success: true,
            movers: movers
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.moversCompleteTheirMission = moversCompleteTheirMission;
