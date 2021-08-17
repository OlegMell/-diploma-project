import { Module } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { SharedModule } from "../../shared.module";

@Module({
    imports: [
        SharedModule
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ],
    exports: []
})
export class AuthModule {
}
