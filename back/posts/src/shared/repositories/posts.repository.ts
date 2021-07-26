import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreatedPost,
  Post,
} from '../../modules/post/models/interfaces/posts.interfaces';
import { CreatePostReq } from '../../modules/post/models/dtos/posts.dtos';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel('PostModel') private post: Model<Post>) {}

  public createPost(post: CreatePostReq): Promise<CreatedPost> {
    return this.post.create({ ...post });
  }

  public getAll(): any {
    return this.post.find({}).sort({ date: 'desc' });
  }

  public getByAuthorId(query): any {
    console.log(query);
    return this.post.find({ author: query.id }).sort({ date: 'desc' });
  }
}
