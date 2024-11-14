import { Router, Request, Response } from "express";

const router = Router();
import { 
    addMagicItem, 
    addMagicMover, 
    endMission, 
    loading, 
    moversCompleteTheirMission, 
    startMission 
} from "../controllers/user";
import { 
    validateAddMagicItem,
    validateAddMagicMover,
    validateEndMission, 
    validateLoading, 
    validateStartMission 
} from "../middlewares/validator";
import { 
    addMagicItemUserSchema,
    addMagicMoverUserSchema,
    loadingUserSchema, 
    startAndEndMissionUserSchema 
} from "../schema/user";

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
router.post('/Add-a-Magic-Mover', validateAddMagicMover(addMagicMoverUserSchema), addMagicMover);

/**
 * Route to add a new Magic Item.
 * 
 * @route POST /Add-a-Magic-Item
 * @param {Request} req - Express request object containing the details of the Magic Item to be added.
 * @param {Response} res - Express response object used to send back the result of the operation.
 * @returns {Promise<void>} - Returns a response with the created item's details.
 */
router.post('/Add-a-Magic-Item', validateAddMagicItem(addMagicItemUserSchema), addMagicItem);

/**
 * Route to load items onto a Magic Mover.
 * 
 * @route POST /mover/load
 * @param {Request} req - Express request object containing moverId and itemIds in the body.
 * @param {Response} res - Express response object used to indicate success or failure of the loading operation.
 * @returns {Promise<void>} - Returns a response indicating the result of the loading operation.
 */
router.post('/mover/load', validateLoading(loadingUserSchema), loading);

/**
 * Route to start a mission for a Magic Mover.
 * 
 * @route GET /mover/start-a-mission/:id
 * @param {Request} req - Express request object containing the mover ID in the URL parameters.
 * @param {Response} res - Express response object used to send back the result of the start mission operation.
 * @returns {Promise<void>} - Returns a response indicating the result of starting the mission.
 */
router.get('/mover/start-a-mission/:id', validateStartMission(startAndEndMissionUserSchema), startMission);

/**
 * Route to end a mission for a Magic Mover.
 * 
 * @route GET /mover/end-a-mission/:id
 * @param {Request} req - Express request object containing the mover ID in the URL parameters.
 * @param {Response} res - Express response object used to send back the result of the end mission operation.
 * @returns {Promise<void>} - Returns a response indicating the result of ending the mission.
 */
router.get('/mover/end-a-mission/:id', validateEndMission(startAndEndMissionUserSchema), endMission);

/**
 * Route to retrieve all movers that have completed their missions.
 * 
 * @route GET /movers-complete-mission
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the list of movers who completed their missions.
 * @returns {Promise<void>} - Returns a response with the list of movers who completed their missions.
 */
router.get('/movers-complete-mission', moversCompleteTheirMission);

export const userRoutes = router;