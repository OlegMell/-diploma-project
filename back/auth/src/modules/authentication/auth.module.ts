import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account } from "./schema/account.schema";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./jwt/jwt.contants";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { PersonalInfo } from "./schema/personal-info.schema";
import { SharedModule } from "../../shared.module";

@Module({
    imports: [
        SharedModule
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ],
    exports: [  ]
})
export class AuthModule {
}
