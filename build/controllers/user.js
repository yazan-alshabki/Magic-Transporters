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
// Add a Magic Mover
const addMagicMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let weightLimit = req.body.weightLimit;
    try {
        let mover = yield MagicMover_1.default.create({
            weightLimit,
            // energy,
            currentState: "resting"
        });
        ;
        return res.status(200).json({
            success: true,
            mover: mover,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.addMagicMover = addMagicMover;
// Add a Magic Item
const addMagicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name;
    let weight = req.body.weight;
    try {
        let item = yield MagicItem_1.default.create({
            name,
            weight,
        });
        ;
        return res.status(200).json({
            success: true,
            item: item,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.addMagicItem = addMagicItem;
// Loading
const loading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let moverId = req.body.moverId;
    let itemIds = req.body.itemIds;
    try {
        let mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            return res.status(404).json({
                success: false,
                error: 'Magic Mover not found !'
            });
        }
        if (mover.currentState == "on-mission") {
            return res.status(400).json({
                success: false,
                error: 'Magic Mover can not load more !'
            });
        }
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
        if (totalWeight > mover.weightLimit) {
            return res.status(400).json({
                success: false,
                error: 'Mover weight limit exceeded'
            });
        }
        mover.itemsCarried.push(...itemsToLoad);
        mover.currentState = 'loading';
        yield mover.save();
        let loadingLog = yield MissionLogs_1.default.create({
            moverId,
            state: "load before mission start",
            itemsLoaded: itemsToLoad.map((item) => item._id),
        });
        return res.status(200).json({
            success: true,
            loadingLog: loadingLog
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.loading = loading;
// Start a Mission
const startMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let moverId = req.params.id;
    try {
        let mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            return res.status(404).json({
                success: false,
                error: 'Magic Mover not found !'
            });
        }
        if (mover.currentState != "loading") {
            return res.status(400).json({
                success: false,
                error: 'Magic Mover can not start a mission because he did not load !'
            });
        }
        mover.currentState = 'on-mission';
        yield mover.save();
        let missionStartLog = yield MissionLogs_1.default.create({
            moverId,
            state: "mission started",
        });
        return res.status(200).json({
            success: true,
            missionStartLog: missionStartLog
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.startMission = startMission;
// End a Mission
const endMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let moverId = req.params.id;
    try {
        let mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            return res.status(404).json({
                success: false,
                error: 'Magic Mover not found !'
            });
        }
        if (mover.currentState != "on-mission") {
            return res.status(400).json({
                success: false,
                error: 'Magic Mover can not end a mission because he did not in mission !'
            });
        }
        let missionEndLog = yield MissionLogs_1.default.create({
            moverId,
            state: "mission ended",
            itemsUnloaded: mover.itemsCarried.map((item) => item._id),
        });
        mover.itemsCarried = [];
        mover.currentState = 'resting';
        yield mover.save();
        return res.status(200).json({
            success: true,
            missionEndLog: missionEndLog
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.endMission = endMission;
// The movers completed their missions
const moversCompleteTheirMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let magicMovers = yield MagicMover_1.default.find({});
        let missionLogs = yield MissionLogs_1.default.find({});
        let moverMissions = magicMovers.map(mover => ({
            id: `Mover ${mover.id}`,
            missionsCompleted: missionLogs.filter((log) => log.moverId.toString() == mover.id.toString() && log.itemsUnloaded.length > 0).length
        }));
        let movers = moverMissions.sort((a, b) => b.missionsCompleted - a.missionsCompleted);
        return res.status(200).json({
            success: true,
            movers: movers
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
});
exports.moversCompleteTheirMission = moversCompleteTheirMission;
