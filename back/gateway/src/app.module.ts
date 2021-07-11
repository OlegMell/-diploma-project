import { HttpModule, Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { AppController } from "./app.controller";
import { SearchModule } from "./modules/search/search.module";


@Module({
    imports: [ AuthModule, SearchModule, HttpModule ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
