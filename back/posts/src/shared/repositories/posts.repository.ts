import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreatedPost,
  Post,
} from '../../modules/post/models/interfaces/posts.interfaces';
import {
  CreatePostReq,
  GetByAuthorIdDto,
  LikePost,
} from '../../modules/post/models/dtos/posts.dtos';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel('PostModel') private post: Model<Post>) {}

  public createPost(post: CreatePostReq): Promise<CreatedPost> {
    return this.post.create({ ...post });
  }

  public getAll(): Promise<Post[]> {
    return this.post.find({}).sort({ date: 'desc' }).exec();
  }

  public getByAuthorId(query: GetByAuthorIdDto): any {
    return this.post.find({ author: query.id }).sort({ date: 'desc' });
  }

  /**
   * Удаление поста по  id
   * @param id id поста
   */
  public remove(id: string): any {
    return this.post.remove({
      _id: id,
    });
  }

  /**
   * Добавление лайка посту
   * @param like объект лайка
   */
  public async setLike(like: LikePost): Promise<any> {
    const post = (await this.post.findById(like.postId)) as Post;

    if (
      post &&
      post.likedUsers.length &&
      post.likedUsers.includes(Types.ObjectId(like.userId))
    ) {
      return this.post
        .findByIdAndUpdate(like.postId, {
          $pull: { likedUsers: like.userId },
          $inc: { likes: -1 },
        })
        .exec();
    } else {
      return this.post
        .findByIdAndUpdate(like.postId, {
          $addToSet: { likedUsers: like.userId },
          $inc: { likes: 1 },
        })
        .exec();
    }
  }
}
