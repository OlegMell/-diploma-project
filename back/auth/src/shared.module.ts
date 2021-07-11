import { HttpModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountRepository } from "./shared/repositories/account.repository";
import { PersonalInfoRepository } from "./shared/repositories/personal-info.repository";
import { Account } from "./modules/authentication/schema/account.schema";
import { PersonalInfo } from "./modules/authentication/schema/personal-info.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./modules/authentication/jwt/jwt.contants";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./modules/authentication/jwt/jwt.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'AccountModel', schema: Account },
            { name: 'PersonalInfoModel', schema: PersonalInfo },
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '86400s' },
        }),
        PassportModule,
        HttpModule,
    ],
    controllers: [],
    providers: [ AccountRepository, PersonalInfoRepository, JwtStrategy ],
    exports: [ AccountRepository, PersonalInfoRepository, JwtModule ]
})
export class SharedModule {
}
