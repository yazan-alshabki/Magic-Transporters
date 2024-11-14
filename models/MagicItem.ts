import mongoose from "mongoose";

/**
 * Schema definition for a Magic Item.
 *
 * @typedef {Object} MagicItemSchema
 * @property {string} name - The name of the magic item.
 * @property {number} weight - The weight of the magic item.
 * @property {Date} createdAt - Timestamp for when the item was created (automatically managed).
 * @property {Date} updatedAt - Timestamp for when the item was last updated (automatically managed).
 */
const MagicItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

/**
 * Magic Item model.
 *
 * This model represents a magic item in the database.
 *
 * @type {mongoose.Model<MagicItem>}
 */
const MagicItem = mongoose.model("MagicItem", MagicItemSchema);

export default MagicItem;

/**
 * Interface representing a Magic Item.
 *
 * @interface ItemType
 * @property {string} [_id] - The unique identifier for the item (optional).
 * @property {string} name - The name of the magic item.
 * @property {number} weight - The weight of the magic item.
 */
export interface ItemType {
    _id?: string; 
    name: string;
    weight: number;
}