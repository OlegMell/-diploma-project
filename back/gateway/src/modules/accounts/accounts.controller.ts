import { Body, Controller, Patch } from "@nestjs/common";
import { AccountsService } from "./services/accounts.service";
import { FollowDto } from "./models/follow.dto";

@Controller('api')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {
    }

    @Patch('/follows/setFollow')
    public setFollow(@Body() followDto: FollowDto): any {
        console.log(followDto);
        return this.accountsService.follow(followDto);
    }
}
