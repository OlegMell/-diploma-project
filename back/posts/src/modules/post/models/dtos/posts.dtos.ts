export interface CreatePostReq {
  text?: string;
  voice?: string;
  images: string[];
  author: string;
  date: number;
}

export interface CreatedPostRes {
  _id: string;
}
