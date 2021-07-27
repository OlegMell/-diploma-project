import { Injectable } from '@nestjs/common';
import {
  CreatePostReq,
  GetByAuthorIdDto,
  RemoveReqDto,
} from '../models/dtos/posts.dtos';
import { PostsRepository } from '../../../shared/repositories/posts.repository';
import { CreatedPost } from '../models/interfaces/posts.interfaces';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepos: PostsRepository) {}

  public create(posts: CreatePostReq): Promise<CreatedPost> {
    return this.postsRepos.createPost(posts);
  }

  public getAll(): any {
    return this.postsRepos.getAll();
  }

  public getByAuthorId(query: GetByAuthorIdDto): any {
    return this.postsRepos.getByAuthorId(query);
  }

  public removePost(query: RemoveReqDto): any {
    return this.postsRepos.remove(query.id);
  }
}
