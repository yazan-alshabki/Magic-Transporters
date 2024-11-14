import { Request, Response } from "express";
import MagicItem, { ItemType } from "../models/MagicItem";
import MagicMover, { MoverType } from "../models/MagicMover";
import MissionLogs from "../models/MissionLogs";

/**
 * Add a new Magic Mover.
 *
 * @param {Request} req - The request object containing mover data.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const addMagicMover = async (req: Request, res: Response): Promise<void> => {
    let weightLimit = req.body.weightLimit;
    try {
        let mover = await MagicMover.create({
            weightLimit,
            currentState: "resting"
        });
        res.status(200).json({
            success: true,
            mover: mover,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};

/**
 * Add a new Magic Item.
 *
 * @param {Request} req - The request object containing item data.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const addMagicItem = async (req: Request, res: Response): Promise<void> => {
    let name = req.body.name;
    let weight = req.body.weight;
    try {
        let item = await MagicItem.create({
            name,
            weight,
        });
        res.status(200).json({
            success: true,
            item: item,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};

/**
 * Load items onto a Magic Mover.
 *
 * @param {Request} req - The request object containing mover ID and item IDs.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const loading = async (req: Request, res: Response): Promise<void> => {
    let moverId = req.body.moverId;
    let itemIds = req.body.itemIds;

    try {
        let mover: any = await MagicMover.findById(moverId) as MoverType;

        let itemsToLoad = [];
        for (let i = 0; i < itemIds.length; i++) {
            let item = await MagicItem.findById(itemIds[i]);
            itemsToLoad.push(item);
        }

        let totalWeight: number = itemsToLoad.reduce((total: number, item: any) => total + item.weight, 0);
        let carried = mover.itemsCarried;

        for (let i = 0; i < carried.length; i++) {
            totalWeight += carried[i]['weight'];
        }

        mover.itemsCarried.push(...itemsToLoad);
        mover.currentState = 'loading';
        await mover.save();

        let loadingLog = await MissionLogs.create({
            moverId,
            state: "load before mission start",
            itemsLoaded: itemsToLoad.map((item: any) => item._id),
        });

        res.status(200).json({
            success: true,
            loadingLog: loadingLog
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};

/**
 * Start a mission for a Magic Mover.
 *
 * @param {Request} req - The request object containing the mover ID in the parameters.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const startMission = async (req: Request, res: Response): Promise<void> => {
    let moverId = req.params.id;
    try {
        let mover: any = await MagicMover.findById(moverId) as MoverType;

        mover.currentState = 'on-mission';
        await mover.save();

        let missionStartLog = await MissionLogs.create({
            moverId,
            state: "mission started",
        });

        res.status(200).json({
            success: true,
            missionStartLog: missionStartLog
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};

/**
 * End a mission for a Magic Mover.
 *
 * @param {Request} req - The request object containing the mover ID in the parameters.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const endMission = async (req: Request, res: Response): Promise<void> => {
    let moverId = req.params.id;
    try {
        let mover: any = await MagicMover.findById(moverId) as MoverType;

        let missionEndLog = await MissionLogs.create({
            moverId,
            state: "mission ended",
            itemsUnloaded: mover.itemsCarried.map((item: ItemType) => item._id),
        });
        mover.itemsCarried = [];
        mover.currentState = 'resting';
        await mover.save();
        
        res.status(200).json({
            success: true,
            missionEndLog: missionEndLog
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};

/**
 * Retrieve the mission completion status of all Magic Movers.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send a response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const moversCompleteTheirMission = async (req: Request, res: Response): Promise<void> => {
    try {
        let magicMovers = await MagicMover.find({});
        let missionLogs = await MissionLogs.find({});
        
        let moverMissions = magicMovers.map(mover => ({
            id: `Mover ${mover.id}`,
            missionsCompleted: missionLogs.filter((log: any) => log.moverId.toString() === mover.id.toString() && log.itemsUnloaded.length > 0).length
        }));

        let movers = moverMissions.sort((a, b) => b.missionsCompleted - a.missionsCompleted);

        res.status(200).json({
            success: true,
            movers: movers
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};