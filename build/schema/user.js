"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAndEndMissionUserSchema = exports.startAndEndMissionSchema = exports.loadingUserSchema = exports.loadingSchema = exports.addMagicItemUserSchema = exports.addMagicItemSchema = exports.addMagicMoverUserSchema = exports.addMagicMoverSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for adding a Magic Mover.
 *
 * @typedef {Object} addMagicMoverSchema
 * @property {number} weightLimit - The maximum weight limit for the Magic Mover. Must be greater than zero.
 */
exports.addMagicMoverSchema = zod_1.z.object({
    weightLimit: zod_1.z.number().refine(value => {
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
exports.addMagicMoverUserSchema = zod_1.z.object({
    body: exports.addMagicMoverSchema
});
/**
 * Schema for adding a Magic Item.
 *
 * @typedef {Object} addMagicItemSchema
 * @property {string} name - The name of the Magic Item.
 * @property {number} weight - The weight of the Magic Item. Must be greater than zero.
 */
exports.addMagicItemSchema = zod_1.z.object({
    name: zod_1.z.string(),
    weight: zod_1.z.number().refine(value => {
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
exports.addMagicItemUserSchema = zod_1.z.object({
    body: exports.addMagicItemSchema
});
/**
 * Schema for loading items onto a Magic Mover.
 *
 * @typedef {Object} loadingSchema
 * @property {string} moverId - The ID of the Magic Mover.
 * @property {Array<string>} itemIds - An array of item IDs to be loaded onto the mover.
 */
exports.loadingSchema = zod_1.z.object({
    moverId: zod_1.z.string(),
    itemIds: zod_1.z.string().array(),
});
/**
 * Schema for the request body when loading items onto a Magic Mover.
 *
 * @typedef {Object} loadingUserSchema
 * @property {loadingSchema} body - The loadingSchema object containing moverId and itemIds.
 */
exports.loadingUserSchema = zod_1.z.object({
    body: exports.loadingSchema
});
/**
 * Schema for starting or ending a mission with a Magic Mover.
 *
 * @typedef {Object} startAndEndMissionSchema
 * @property {string} id - The ID of the Magic Mover initiating or ending the mission.
 */
exports.startAndEndMissionSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
/**
 * Schema for the request parameters when starting or ending a mission.
 *
 * @typedef {Object} startAndEndMissionUserSchema
 * @property {startAndEndMissionSchema} params - The startAndEndMissionSchema object containing the mover ID.
 */
exports.startAndEndMissionUserSchema = zod_1.z.object({
    params: exports.startAndEndMissionSchema
});
