import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from "./modules/authentication/auth.module";
import { SearchModule } from "./modules/search/search.module";
import { SharedModule } from "./shared.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_URL } from "./config";

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }),
        SharedModule,
        AuthModule,
        SearchModule
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
