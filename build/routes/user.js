"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = require("../controllers/user");
const validator_1 = require("../middlewares/validator");
const user_2 = require("../schema/user");
/**
 * @module userRoutes
 * @description Defines routes related to magic movers and items.
 */
/**
 * Route to add a new Magic Mover.
 *
 * @route POST /Add-a-Magic-Mover
 * @param {Request} req - Express request object containing the details of the Magic Mover to be added.
 * @param {Response} res - Express response object used to send back the result of the operation.
 * @returns {Promise<void>} - Returns a response with the created mover's details.
 */
router.post('/Add-a-Magic-Mover', (0, validator_1.validateAddMagicMover)(user_2.addMagicMoverUserSchema), user_1.addMagicMover);
/**
 * Route to add a new Magic Item.
 *
 * @route POST /Add-a-Magic-Item
 * @param {Request} req - Express request object containing the details of the Magic Item to be added.
 * @param {Response} res - Express response object used to send back the result of the operation.
 * @returns {Promise<void>} - Returns a response with the created item's details.
 */
router.post('/Add-a-Magic-Item', (0, validator_1.validateAddMagicItem)(user_2.addMagicItemUserSchema), user_1.addMagicItem);
/**
 * Route to load items onto a Magic Mover.
 *
 * @route POST /mover/load
 * @param {Request} req - Express request object containing moverId and itemIds in the body.
 * @param {Response} res - Express response object used to indicate success or failure of the loading operation.
 * @returns {Promise<void>} - Returns a response indicating the result of the loading operation.
 */
router.post('/mover/load', (0, validator_1.validateLoading)(user_2.loadingUserSchema), user_1.loading);
/**
 * Route to start a mission for a Magic Mover.
 *
 * @route GET /mover/start-a-mission/:id
 * @param {Request} req - Express request object containing the mover ID in the URL parameters.
 * @param {Response} res - Express response object used to send back the result of the start mission operation.
 * @returns {Promise<void>} - Returns a response indicating the result of starting the mission.
 */
router.get('/mover/start-a-mission/:id', (0, validator_1.validateStartMission)(user_2.startAndEndMissionUserSchema), user_1.startMission);
/**
 * Route to end a mission for a Magic Mover.
 *
 * @route GET /mover/end-a-mission/:id
 * @param {Request} req - Express request object containing the mover ID in the URL parameters.
 * @param {Response} res - Express response object used to send back the result of the end mission operation.
 * @returns {Promise<void>} - Returns a response indicating the result of ending the mission.
 */
router.get('/mover/end-a-mission/:id', (0, validator_1.validateEndMission)(user_2.startAndEndMissionUserSchema), user_1.endMission);
/**
 * Route to retrieve all movers that have completed their missions.
 *
 * @route GET /movers-complete-mission
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the list of movers who completed their missions.
 * @returns {Promise<void>} - Returns a response with the list of movers who completed their missions.
 */
router.get('/movers-complete-mission', user_1.moversCompleteTheirMission);
exports.userRoutes = router;
