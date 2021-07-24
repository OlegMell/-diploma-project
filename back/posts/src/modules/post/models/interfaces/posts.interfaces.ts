export interface Post extends Document {
  _id: string;
  date: Date;
  voice?: string;
  text?: string;
  likes: number;
  view?: number;
  author: any;
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
