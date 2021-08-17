import { Body, Controller, Get, Headers, Post, Put, Query } from "@nestjs/common";
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
    public getAll(@Headers('Authorization') a): any {
        return this.postsService.getAll(a);
    }

    @Get('/getByAuthorId')
    public getByAuthorId(@Query() query: GetByAuthorIdDto): any {
        return this.postsService.getByAuthorId(query);
    }

    @Get('/remove')
    public remove(@Query() query: RemoveReqDto): any {
        return this.postsService.remove(query);
    }

    @Put('/setLike')
    public setLike(@Headers('Authorization') a: string, @Body() like: any): any {
        console.log(a, like);
        return this.postsService.setLike(a, like);
    }
}
