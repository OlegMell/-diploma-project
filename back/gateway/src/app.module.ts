import { HttpModule, Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { AppController } from "./app.controller";
import { SearchModule } from "./modules/search/search.module";
import { PostsModule } from "./modules/posts/posts.module";
import { AccountsModule } from "./modules/accounts/accounts.module";


@Module({
    imports: [ AuthModule, SearchModule, PostsModule, AccountsModule, HttpModule ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
