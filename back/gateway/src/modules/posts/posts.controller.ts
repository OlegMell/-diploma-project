import { Body, Controller, Get, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { PostsService } from "./services/posts.service";
import { CreatedPostRes, CreatePostReq } from "./models/dtos/posts.dtos";

@Controller('api')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Post('/posts/create')
    public create(@Body() createPostReq: CreatePostReq): Observable<CreatedPostRes> {
        console.log(createPostReq);
        return this.postsService.create(createPostReq);
    }

    @Get('/posts/getAll')
    public getAll(): any {
        return this.postsService.getAll();
    }
}
