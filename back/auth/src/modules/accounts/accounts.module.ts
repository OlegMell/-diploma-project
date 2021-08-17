import { Module } from "@nestjs/common";
import { SharedModule } from "../../shared.module";
import { AccountsController } from './accounts.controller';
import { AccountsService } from './service/accounts.service';

@Module({
    imports: [
        SharedModule
    ],
    controllers: [ AccountsController ],
    providers: [ AccountsService ],
    exports: []
})
export class AccountsModule {
}
