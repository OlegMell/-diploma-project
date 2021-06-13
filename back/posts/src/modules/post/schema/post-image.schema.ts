import * as mongoose from 'mongoose';

export const PostImage = new mongoose.Schema({
  path: { type: String },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
});
