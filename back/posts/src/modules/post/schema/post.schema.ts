import * as mongoose from 'mongoose';

export const Post = new mongoose.Schema({
  text: { type: String },
  date: { type: Number, default: Date.now() },
  voice: { type: String },
  likes: { type: Number, default: 0, min: 0 },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
  ],
  images: [{ type: String }],
  isLiked: { type: Boolean },
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
