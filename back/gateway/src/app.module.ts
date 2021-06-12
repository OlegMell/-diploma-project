import { HttpModule, Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { AppController } from "./app.controller";


@Module({
  imports: [AuthModule, HttpModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
