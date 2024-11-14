import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import MagicMover, { MoverType } from "../models/MagicMover";
import MagicItem from "../models/MagicItem";

/**
 * Middleware to validate loading items onto a Magic Mover.
 *
 * This middleware checks the following:
 * - Validates the request body against the provided Zod schema.
 * - Checks if the mover exists and is not currently on a mission.
 * - Validates that all items to be loaded exist.
 * - Ensures the total weight does not exceed the mover's weight limit.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body.
 * @returns {Function} - The middleware function.
 */
export const validateLoading = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the schema
    schema.parse({
      body: req.body,
    });

    // Find the Magic Mover by ID
    let mover: any = await MagicMover.findById(req.body.moverId) as MoverType;
    if (!mover) {
      throw new Error('Magic Mover not found!');
    }
    if (mover.currentState === "on-mission") {
      throw new Error('Magic Mover cannot load more!');
    }

    // Load items by their IDs
    let itemsToLoad = [];
    for (let i = 0; i < req.body.itemIds.length; i++) {
      let item = await MagicItem.findById(req.body.itemIds[i]);
      if (!item) {
        throw new Error(`Item ${req.body.itemIds[i]} not found!`);
      }
      itemsToLoad.push(item);
    }

    // Calculate total weight of items to load
    let totalWeight: number = itemsToLoad.reduce((total: number, item: any) => total + item.weight, 0);
    let carried = mover.itemsCarried;

    for (let i = 0; i < carried.length; i++) {
      totalWeight += carried[i]['weight'];
    }

    // Check if the total weight exceeds the mover's weight limit
    if (totalWeight > mover.weightLimit) {
      throw new Error('Mover weight limit exceeded');
    }

    next();

  } catch (err) {
    if (!(err as any).errors) {
      res.status(400).send({ success: false, errors: (err as any).message });
    } else {
      res.status(400).send({ success: false, errors: (err as any).errors });
    }
  }
};

/**
 * Middleware to validate starting a mission for a Magic Mover.
 *
 * This middleware checks the following:
 * - Validates the request parameters against the provided Zod schema.
 * - Checks if the mover exists and is currently in the "loading" state.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request parameters.
 * @returns {Function} - The middleware function.
 */
export const validateStartMission = (schema: AnyZodObject) => async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request parameters against the schema
    schema.parse({
      params: req.params,
    });
    
    // Find the Magic Mover by ID
    let mover: any = await MagicMover.findById(req.params.id) as MoverType;
    if (!mover) {
      throw new Error('Magic Mover not found!');
    }
    if (mover.currentState !== "loading") {
      throw new Error('Magic Mover cannot start a mission because he did not load!');
    }
    
    next();

  } catch (err) {
    if (!(err as any).errors) {
      res.status(400).send({ success: false, errors: (err as any).message });
    } else {
      res.status(400).send({ success: false, errors: (err as any).errors });
    }
  }
};

/**
 * Middleware to validate ending a mission for a Magic Mover.
 *
 * This middleware checks the following:
 * - Validates the request parameters against the provided Zod schema.
 * - Checks if the mover exists and is currently in the "on-mission" state.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request parameters.
 * @returns {Function} - The middleware function.
 */
export const validateEndMission = (schema: AnyZodObject) => async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request parameters against the schema
    schema.parse({
      params: req.params,
    });
    
    // Find the Magic Mover by ID
    let mover: any = await MagicMover.findById(req.params.id) as MoverType;
    if (!mover) {
      throw new Error('Magic Mover not found!');
    }
    if (mover.currentState !== "on-mission") {
      throw new Error('Magic Mover cannot end a mission because he is not on a mission!');
    }
    
    next();

  } catch (err) {
    if (!(err as any).errors) {
      res.status(400).send({ success: false, errors: (err as any).message });
    } else {
      res.status(400).send({ success: false, errors: (err as any).errors });
    }
  }
};


/**
 * Middleware to validate adding a Magic Mover.
 *
 * This middleware validates the request body against the provided Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body.
 * @returns {Function} - The middleware function that validates the add mover request.
 */


export const validateAddMagicMover = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the schema
    schema.parse({
      body: req.body,
    });
  
    next();

  } catch (err) {
      res.status(400).send({ success: false, errors: (err as any).errors });
    
  }
};



/**
 * Middleware to validate adding a Magic Item.
 *
 * This middleware validates the request body against the provided Zod schema.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body.
 * @returns {Function} - The middleware function that validates the add item request.
 */

export const validateAddMagicItem = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the schema
    schema.parse({
      body: req.body,
    });
  
    next();

  } catch (err) {
      res.status(400).send({ success: false, errors: (err as any).errors });
    
  }
};

