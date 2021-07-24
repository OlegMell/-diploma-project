import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostReq } from './models/dtos/posts.dtos';
import { PostsService } from './services/posts.service';
import { CreatedPost } from './models/interfaces/posts.interfaces';

@Controller('api')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/posts/create')
  public create(@Body() createPostReq: CreatePostReq): Promise<CreatedPost> {
    return this.postsService.create(createPostReq);
  }

  @Get('/posts/getAll')
  public getAll(): any {
    return this.postsService.getAll();
  }
}
