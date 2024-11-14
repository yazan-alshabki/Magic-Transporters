import { z } from "zod";

/**
 * Schema for adding a Magic Mover.
 *
 * @typedef {Object} addMagicMoverSchema
 * @property {number} weightLimit - The maximum weight limit for the Magic Mover. Must be greater than zero.
 */
export const addMagicMoverSchema = z.object({
  weightLimit: z.number().refine(value => {
    return value > 0;
  }, {
    message: "The weightLimit must be a number bigger than or equal zero!"
  })
});

/**
 * Schema for the request body when adding a Magic Mover.
 *
 * @typedef {Object} addMagicMoverUserSchema
 * @property {addMagicMoverSchema} body - The body containing the Magic Mover details.
 */
export const addMagicMoverUserSchema = z.object({
  body: addMagicMoverSchema
});

/**
 * Schema for adding a Magic Item.
 *
 * @typedef {Object} addMagicItemSchema
 * @property {string} name - The name of the Magic Item.
 * @property {number} weight - The weight of the Magic Item. Must be greater than zero.
 */
export const addMagicItemSchema = z.object({
  name: z.string(),
  weight: z.number().refine(value => {
    return value > 0;
  }, {
    message: "The weight must be a number bigger than or equal zero!"
  })
});

/**
 * Schema for the request body when adding a Magic Item.
 *
 * @typedef {Object} addMagicItemUserSchema
 * @property {addMagicItemSchema} body - The body containing the Magic Item details.
 */
export const addMagicItemUserSchema = z.object({
  body: addMagicItemSchema
});

/**
 * Schema for loading items onto a Magic Mover.
 *
 * @typedef {Object} loadingSchema
 * @property {string} moverId - The ID of the Magic Mover.
 * @property {Array<string>} itemIds - An array of item IDs to be loaded onto the mover.
 */
export const loadingSchema = z.object({
  moverId: z.string(),
  itemIds: z.string().array(),
});

/**
 * Schema for the request body when loading items onto a Magic Mover.
 *
 * @typedef {Object} loadingUserSchema
 * @property {loadingSchema} body - The loadingSchema object containing moverId and itemIds.
 */
export const loadingUserSchema = z.object({
  body: loadingSchema
});

/**
 * Schema for starting or ending a mission with a Magic Mover.
 *
 * @typedef {Object} startAndEndMissionSchema
 * @property {string} id - The ID of the Magic Mover initiating or ending the mission.
 */
export const startAndEndMissionSchema = z.object({
  id: z.string(),
});

/**
 * Schema for the request parameters when starting or ending a mission.
 *
 * @typedef {Object} startAndEndMissionUserSchema
 * @property {startAndEndMissionSchema} params - The startAndEndMissionSchema object containing the mover ID.
 */
export const startAndEndMissionUserSchema = z.object({
  params: startAndEndMissionSchema
});

/**
 * Type representing the inferred structure of the loadingSchema.
 *
 * @typedef {loadingSchemaBody}
 * @type {z.infer<typeof loadingSchema>}
 */
export type loadingSchemaBody = z.infer<typeof loadingSchema>;

/**
 * Type representing the inferred structure of the start mission schema parameters.
 *
 * @typedef {startMissionSchemaParameter}
 * @type {z.infer<typeof startAndEndMissionSchema>}
 */
export type startMissionSchemaParameter = z.infer<typeof startAndEndMissionSchema>;