import * as mongoose from 'mongoose';

export const Post = new mongoose.Schema({
  text: { type: String },
  date: { type: Number, default: Date.now() },
  voice: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});
