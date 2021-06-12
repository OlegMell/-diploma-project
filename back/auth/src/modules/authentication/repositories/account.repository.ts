import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account } from "../schema/account.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { JwtToken } from "../interfaces/jwt-token.interface";


@Injectable()
export class AccountRepository {
    constructor(@InjectModel('AccountModel') private account: Model<Account>,
                private readonly jwtService: JwtService) {
    }

    public async findUser(login, password): Promise<JwtToken> {
        const user = await this.account.findOne({ login, password });
        if (!user) return null;

        return this._jwtSign(user);
    }

    public async addUser(username, password, login): Promise<JwtToken> {
        const user = await this.account.create({ username, login, password });
        if (!user) return null;

        return this._jwtSign(user);
    }

    private _jwtSign(payload): JwtToken {
        return {
            token: this.jwtService.sign({ username: payload.get('login'), sub: payload._id })
        }
    }
}
