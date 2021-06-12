import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from 'src/config/index';
import { AuthService } from "./modules/authentication/services/auth.service";
import { AccountRepository } from "./modules/authentication/repositories/account.repository";
import { AuthModule } from "./modules/authentication/auth.module";

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }),
        AuthModule
    ],
    controllers: [ AppController ],
    providers: [ ],
})
export class AppModule {
}
