import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './services/settings.service';
import { EditReq } from './models/dtos/settings.dtos';

@Controller('api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/getAll')
  public getAll(): any {
    return this.settingsService.getAll();
  }

  @Post('/edit')
  public edit(@Body() editReq: EditReq): any {
    return this.settingsService.edit(editReq);
  }
}
