import { HttpModule, Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./services/posts.service";

@Module({
    imports: [ HttpModule ],
    controllers: [ PostsController ],
    providers: [ PostsService ],
})
export class PostsModule {
}
