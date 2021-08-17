import { HttpModule, Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from "./services/accounts.service";

@Module({
    imports: [HttpModule],
    controllers: [ AccountsController ],
    providers: [ AccountsService ],
})
export class AccountsModule {
}
