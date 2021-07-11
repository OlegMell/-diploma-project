import { HttpModule, Module } from "@nestjs/common";
import { SearchService } from "./services/search.service";
import { SearchController } from "./search.controller";
import { SharedModule } from "../../shared.module";

@Module({
    imports: [
        HttpModule,
        SharedModule
    ],
    controllers: [ SearchController ],
    providers: [ SearchService ],
})
export class SearchModule {
}
