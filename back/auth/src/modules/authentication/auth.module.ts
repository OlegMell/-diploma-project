import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account } from "./schema/account.schema";
import { AuthService } from "./services/auth.service";
import { AccountRepository } from "./repositories/account.repository";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./jwt/jwt.contants";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { DropboxService } from "./services/dropbox.service";
import { PersonalInfo } from "./schema/personal-info.schema";
import {Settings} from "./schema/settings.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'AccountModel', schema: Account },
            { name: 'PersonalInfoModel', schema: PersonalInfo },
            { name: 'SettingsModel', schema: Settings}
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '86400s' },
        }),
        PassportModule,
        HttpModule
    ],
    controllers: [ AuthController ],
    providers: [ AuthService, AccountRepository, JwtStrategy, DropboxService ],
    exports: [ JwtModule ]
})
export class AuthModule {
}
