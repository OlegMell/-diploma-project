import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Settings } from '../../modules/setting/models/interfaces/settings.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { EditReq } from '../../modules/setting/models/dtos/settings.dtos';

@Injectable()
export class SettingsRepository {
  constructor(@InjectModel('SettingsModel') private setting: Model<Settings>) {}

  public getAll(): any {
    return this.setting.find({});
  }

  public edit(editReq: EditReq): any {
    return this.setting.findByIdAndUpdate(editReq.id, {
      $set: { [editReq.key]: editReq.value },
    });
  }
}
