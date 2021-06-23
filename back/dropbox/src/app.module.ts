import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DropboxModule } from "./modules/dropbox/dropbox.module";

@Module({
    imports: [
        DropboxModule,
        HttpModule
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
