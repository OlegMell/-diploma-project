import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreatePostReq,
  GetByAuthorIdDto,
  RemoveReqDto,
} from './models/dtos/posts.dtos';
import { PostsService } from './services/posts.service';
import { CreatedPost } from './models/interfaces/posts.interfaces';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  public create(@Body() createPostReq: CreatePostReq): Promise<CreatedPost> {
    return this.postsService.create(createPostReq);
  }

  @Get('/getAll')
  public getAll(): any {
    return this.postsService.getAll();
  }

  @Get('/getByAuthorId')
  public getByAuthorId(@Query() query: GetByAuthorIdDto): Promise<any> {
    return this.postsService.getByAuthorId(query);
  }

  @Get('/removePost')
  public removePost(@Query() query: RemoveReqDto): Promise<any> {
    return this.postsService.removePost(query);
  }
}
