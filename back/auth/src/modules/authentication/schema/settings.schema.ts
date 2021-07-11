import * as mongoose from 'mongoose';

export const Settings = new mongoose.Schema({
    theme: { type: Boolean},
    notification: { type: Boolean},
    fontSize: { type: Number},
    language : {type: String}
});