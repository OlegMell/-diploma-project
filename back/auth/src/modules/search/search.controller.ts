import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./services/search.service";
import { Account, PersonalInfo } from '../authentication/interfaces/account.interface';
import { SearchRequestQuery } from "./models/dtos/search.dto";

@Controller('api')
export class SearchController {
    constructor(private readonly searchService: SearchService) {
    }

    @Get('/search/findUsers')
    findUsers(@Query() query: SearchRequestQuery): Promise<Account[]> {
        return this.searchService.findUsers(query);
    }
}
