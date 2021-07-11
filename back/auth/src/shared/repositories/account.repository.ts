import { HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { JwtToken } from "../../modules/authentication/dtos/jwt-token.interface";
import { AddUserDto, LoginUserDto } from "../../modules/authentication/dtos/user.dto";
import { Account, PersonalInfo } from "../../modules/authentication/interfaces/account.interface";

/**
 * Репозиторий для работы с аккаунтами пользователей
 */
@Injectable()
export class AccountRepository {
    constructor(@InjectModel('AccountModel') private account: Model<Account>,
                @InjectModel('PersonalInfoModel') private personalInfo: Model<PersonalInfo>,
                private readonly jwtService: JwtService,
                private readonly http: HttpService) {
    }

    /**
     * Поиск пользователя по логину и паролю
     * @param loginUser модель входящего пользователя
     */
    public async findUser(loginUser: LoginUserDto): Promise<JwtToken> {
        const user = await this.account.findOne({
            $or: [
                { login: loginUser.login },
                { username: loginUser.login }
            ],
            password: loginUser.password
        });

        if (!user) return null;

        return this._jwtSign(user);
    }

    /**
     * Добавление пользователя в базу данных
     * @param addUser модель нового пользователя
     */
    public async addUser(addUser: AddUserDto): Promise<JwtToken> {
        const user: Account = await this.account.create({ ...addUser, personalInfo: null });
        if (!user) return null;

        const p: PersonalInfo = await this.personalInfo.create({
            firstName: '',
            lastName: '',
            bio: '',
            site: '',
            phone: '',
            email: addUser.login
        });

        await this.account.findByIdAndUpdate(user._id, { $set: { personalInfo: p._id } }).exec();


        return this._jwtSign(user);
    }

    /**
     * Получение данных о пользователе по токену
     * @param token токен аторизированного пользователя
     */
    public async getUserData(token: string): Promise<Account> {
        const userId = this.jwtService.decode(token.slice(token.indexOf(' ') + 1)).sub;

        return await this.getAccountWithPersonalInfo(userId);
    }

    /**
     * Получение пользователя по id с персональными данными
     * @param userId id пользователя в базе данных
     */
    public async getAccountWithPersonalInfo(userId: string): Promise<Account> {
        return this.account.findById(userId).populate({
            path: 'personalInfo',
            model: 'PersonalInfoModel'
        });
    }

    /**
     * Обновление никнейма пользователя по id
     * @param id айди пользователя
     * @param username новый никнейм
     */
    public async updateUsername(id: string, username: string): Promise<void> {
        await this.account.findByIdAndUpdate(id, { $set: { username: username } });
    }

    public async findUsers(query: string): Promise<Account[]> {
        if (!query.length) {
            return [];
        }

        return this.account.find({
            $or: [ { login: { $regex: query } }, { username: { $regex: query } } ],
        }, null, { limit: 100 }).populate({
            path: 'personalInfo',
            model: 'PersonalInfoModel'
        });
    }

    /**
     * Подпись токена
     * @param payload данные токена
     */
    private async _jwtSign(payload): Promise<JwtToken> {
        return {
            token: await this.jwtService.signAsync({ username: payload.get('login'), sub: payload._id })
        }
    }
}
