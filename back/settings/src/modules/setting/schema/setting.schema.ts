import * as mongoose from 'mongoose';

export const Setting = new mongoose.Schema({
  theme: { type: Boolean },
  notification: { type: Boolean },
  font_size: { type: Number },
  language: { type: String },
});
