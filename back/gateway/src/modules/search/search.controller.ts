import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./services/search.service";
import { FoundUsers, SearchRequestQuery } from "./models/dtos/search-response.models";
import { Observable } from "rxjs";

@Controller('api')
export class SearchController {
    constructor(private readonly searchService: SearchService) {
    }

    @Get('/search/findUser')
    public findUser(@Query() query: SearchRequestQuery): Observable<FoundUsers> {
        return this.searchService.searchUser(query);
    }
}
