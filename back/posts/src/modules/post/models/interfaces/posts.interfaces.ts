import { Types } from 'mongoose';

export interface Post extends Document {
  _id: string;
  date: Date;
  voice?: string;
  text?: string;
  likes: number;
  isLiked: boolean;
  likedUsers: [Types.ObjectId];
  view?: number;
  author: Types.ObjectId;
  comments: any;
}

export interface Post1 {
  _id: string;
  date: Date;
  voice?: string;
  text?: string;
  likes: number;
  likedUsers: [Types.ObjectId];
  isLiked?: boolean;
  view?: number;
  author: Types.ObjectId;
  comments: any;
}

export interface CreatedPost extends Document {
  _id: string;
}

export interface Comment extends Document {
  _id: string;
  author: any;
  date: Date;
  text: string;
  reply: any;
}
