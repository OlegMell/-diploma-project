import { HttpModule, Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./services/search.service";

@Module({
    imports: [HttpModule],
    controllers: [ SearchController ],
    providers: [ SearchService ],
})
export class SearchModule {
}
