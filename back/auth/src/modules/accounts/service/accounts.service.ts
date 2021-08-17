import { Injectable } from "@nestjs/common";
import { FollowDto } from "../models/follow.dto";
import { AccountRepository } from "../../../shared/repositories/account.repository";

/**
 * Сервис для работы с подписками пользователя
 */
@Injectable()
export class AccountsService {
    constructor(private readonly accountRepos: AccountRepository) {
    }

    /**
     * Установка подписки на пользователя
     * @param followDto Объект подписки
     */
    public setFollow(followDto: FollowDto): any {
        return this.accountRepos.setFollow(followDto);
    }
}
