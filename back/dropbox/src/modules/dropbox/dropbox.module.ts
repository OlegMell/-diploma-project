import { HttpModule, Module } from "@nestjs/common";
import { DropboxController } from "./dropbox.controller";
import { DropboxService } from "./services/dropbox.service";
import { RequestService } from "./helpers/request.service";

@Module({
    imports: [ HttpModule ],
    controllers: [ DropboxController ],
    providers: [ DropboxService, RequestService ],
})
export class DropboxModule {
}
