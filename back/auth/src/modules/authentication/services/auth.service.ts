import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../repositories/account.repository";
import { JwtToken } from "../dtos/jwt-token.interface";
import { AddUserDto, LoginUserDto } from "../dtos/user.dto";

/**
 * Сервис авторизации
 */
@Injectable()
export class AuthService {
    constructor(private readonly accountRepository: AccountRepository) {
    }

    /**
     * Поиск пользователя
     * @param loginUser входящий пользователь
     */
    findUser(loginUser: LoginUserDto): Promise<JwtToken> {
        return this.accountRepository.findUser(loginUser);
    }

    /**
     * Создание пользователя
     * @param addUser новый пользователь
     */
    createUser(addUser: AddUserDto): Promise<JwtToken> {
        return this.accountRepository.addUser(addUser);
    }

    /**
     * Получить данные пользователя
     * @param token токен авторизированного пользователя
     */
    getProfile(token: string): Promise<any> {
        return this.accountRepository.getUserData(token);
    }

    updateProfile(data: any, token: string): Promise<any> {
        return this.accountRepository.updateProfileData(data, token);
    }
}
