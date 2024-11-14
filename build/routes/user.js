"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
// import { add_a_magic_mover, add_a_magic_item } from "../middlewares/validator";
// import { validationHandler } from "../helpers/validation";
const user_1 = require("../controllers/user");
// Add a Magic Mover
router.post('/Add-a-Magic-Mover', user_1.addMagicMover);
// Add a Magic Item
router.post('/Add-a-Magic-Item', user_1.addMagicItem);
// Loading
router.post('/mover/load', user_1.loading);
// Start a Mission
router.get('/mover/start-a-mission/:id', user_1.startMission);
// End a Mission
router.get('/mover/end-a-mission/:id', user_1.endMission);
// The movers completed their missions
router.get('/movers-complete-mission', user_1.moversCompleteTheirMission);
exports.userRoutes = router;
