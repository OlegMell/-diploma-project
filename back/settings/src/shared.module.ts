import { HttpModule, Module } from '@nestjs/common';
import { Setting } from './modules/setting/schema/setting.schema';
import { SettingsRepository } from './shared/repositories/settings.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SettingsModel', schema: Setting }]),
    HttpModule,
  ],
  controllers: [],
  providers: [SettingsRepository],
  exports: [SettingsRepository],
})
export class SharedModule {}
