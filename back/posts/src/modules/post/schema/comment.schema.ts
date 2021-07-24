import * as mongoose from 'mongoose';

export const Comment = new mongoose.Schema({
  text: { type: String },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  date: { type: Date },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
});
