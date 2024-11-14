import mongoose from "mongoose";

/**
 * Schema definition for Mission Logs.
 *
 * @typedef {Object} MissionLogsSchema
 * @property {mongoose.Schema.Types.ObjectId} moverId - The ID of the associated Magic Mover, referenced from the MagicMover model.
 * @property {string} state - The current state of the mission (e.g., "loading", "on-mission", "mission ended").
 * @property {Array<mongoose.Schema.Types.ObjectId>} itemsLoaded - An array of item IDs that were loaded during the mission, referenced from the MagicItem model.
 * @property {Array<mongoose.Schema.Types.ObjectId>} itemsUnloaded - An array of item IDs that were unloaded at the end of the mission, referenced from the MagicItem model.
 * @property {Date} createdAt - Timestamp for when the mission log was created (automatically managed).
 * @property {Date} updatedAt - Timestamp for when the mission log was last updated (automatically managed).
 */
const MissionLogsSchema = new mongoose.Schema({
    moverId: { type: mongoose.Schema.Types.ObjectId, ref: 'MagicMover' },
    state: {
        type: String,
    },
    itemsLoaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
    itemsUnloaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

/**
 * Mission Logs model.
 *
 * This model represents the logs of missions performed by Magic Movers in the database.
 *
 * @type {mongoose.Model<MissionLogs>}
 */
const MissionLogs = mongoose.model("MissionLogs", MissionLogsSchema);

export default MissionLogs;