import { HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { JwtToken } from "../dtos/jwt-token.interface";
import { DropboxService } from "../services/dropbox.service";
import { map } from "rxjs/operators";
import { AddUserDto, LoginUserDto } from "../dtos/user.dto";
import { Account, PersonalInfo } from "../interfaces/account.interface";

/**
 * Репозиторий для работы с аккаунтами пользователей
 */
@Injectable()
export class AccountRepository {
    constructor(@InjectModel('AccountModel') private account: Model<Account>,
                @InjectModel('PersonalInfoModel') private personalInfo: Model<PersonalInfo>,
                private readonly jwtService: JwtService,
                private readonly http: HttpService,
                private readonly dropboxService: DropboxService) {
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
        const user = await this.account.create({ ...addUser, personalInfo: null });
        if (!user) return null;

        return this._jwtSign(user);
    }

    /**
     * Получение данных о пользователе по токену
     * @param token токен аторизированного пользователя
     */
    public async getUserData(token: string): Promise<Account> {
        const userId = this.jwtService.decode(token.slice(token.indexOf(' ') + 1)).sub;

        // await this.account.updateOne({
        //     _id: userId
        // }, { $set: { 'personalInfo': "60d0e957724002ed433b6d37" } });

        const u: Account = await this.account.findById(userId).populate({
            path: 'personalInfo',
            model: 'PersonalInfoModel'
        });

        u.personalInfo.photo = await this.dropboxService.getTemporaryLink(u.personalInfo.photo).pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            map(res => res.data)
        ).toPromise();

        return u;
    }

    public updateProfileData(data: any, token: string): any {
        const userId = this.jwtService.decode(token.slice(token.indexOf(' ') + 1)).sub;
        const p = data.photo;

        console.log('PHOTO', p);

        // return this.personalInfo.updateOne({
        //     _id: userId
        // }, {
        //     set$: {
        //         firstname: data.name,
        //         bio: data.bio,
        //         site: data.site,
        //         photo: p,
        //     }
        // });
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
