import * as mongoose from 'mongoose';

export const Post = new mongoose.Schema({
  text: { type: String },
  date: { type: Date },
  voice: { type: String },
  likes: { type: Number },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
});
