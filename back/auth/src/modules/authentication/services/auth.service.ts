import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../repositories/account.repository";


@Injectable()
export class AuthService {
    constructor(private readonly accountRepository: AccountRepository) {
    }

    findUser({ login, password }): any {
        return this.accountRepository.findUser(login, password);
    }

    createUser({ username, password, login }): any {
        return this.accountRepository.addUser(username, password, login);
    }
}
