import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Observable } from "rxjs";
import { PostsService } from "./services/posts.service";
import { CreatedPostRes, CreatePostReq, GetByAuthorIdDto, RemoveReqDto } from "./models/dtos/posts.dtos";

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Post('/create')
    public create(@Body() createPostReq: CreatePostReq): Observable<CreatedPostRes> {
        return this.postsService.create(createPostReq);
    }

    @Get('/getAll')
    public getAll(): any {
        return this.postsService.getAll();
    }

    @Get('/getByAuthorId')
    public getByAuthorId(@Query() query: GetByAuthorIdDto): any {
        return this.postsService.getByAuthorId(query);
    }

    @Get('/remove')
    public remove(@Query() query: RemoveReqDto): any {
        return this.postsService.remove(query);
    }
}
