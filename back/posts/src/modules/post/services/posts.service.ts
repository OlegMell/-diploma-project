import { Injectable } from '@nestjs/common';
import { CreatePostReq } from '../models/dtos/posts.dtos';
import { PostsRepository } from '../../../shared/repositories/posts.repository';
import { CreatedPost, Post } from '../models/interfaces/posts.interfaces';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepos: PostsRepository) {}

  public create(posts: CreatePostReq): Promise<CreatedPost> {
    return this.postsRepos.createPost(posts);
  }

  public getAll(): any {
    return this.postsRepos.getAll();
  }

  public getByAuthorId(query): any {
    return this.postsRepos.getByAuthorId(query);
  }
}
