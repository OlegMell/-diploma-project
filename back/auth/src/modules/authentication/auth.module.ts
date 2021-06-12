import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account } from "./schema/account.schema";
import { AuthService } from "./services/auth.service";
import { AccountRepository } from "./repositories/account.repository";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./jwt/jwt.contants";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([ {
            name: 'AccountModel', schema: Account
        } ]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [ AuthController ],
    providers: [ AuthService, AccountRepository, JwtStrategy ],
    exports: [ JwtModule ]
})
export class AuthModule {
}
