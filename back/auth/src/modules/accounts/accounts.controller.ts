import { Body, Controller, Patch } from "@nestjs/common";
import { AccountsService } from "./service/accounts.service";
import { FollowDto } from "./models/follow.dto";


@Controller('api')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {
    }

    /**
     * Запрос Установка подписки
     */
    @Patch('/accounts/follow')
    public follow(@Body() followDto: FollowDto): any {
        console.log(followDto);
        return this.accountService.setFollow(followDto);
    }
}
