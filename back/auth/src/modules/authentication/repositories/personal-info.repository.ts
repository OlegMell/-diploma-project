import { HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EnforceDocument, Model } from "mongoose";
import { Account, PersonalInfo } from "../interfaces/account.interface";
import { DropboxService } from "../services/dropbox.service";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AccountRepository } from "./account.repository";
import { JwtService } from "@nestjs/jwt";
import { UpdatePersonalInfoDto } from "../dtos/user.dto";


@Injectable()
export class PersonalInfoRepository {
    constructor(@InjectModel('PersonalInfoModel') private personalInfo: Model<PersonalInfo>,
                private readonly http: HttpService,
                private readonly dropboxService: DropboxService,
                private readonly jwtService: JwtService,
                private readonly accountRepos: AccountRepository) {
    }

    // public async createPersonalInfo(): Promise<PersonalInfo> {
    //     // @ts-ignore
    //     const persInfo: PersonalInfo = await this.personalInfo.create();
    //     return persInfo;
    // }

    public async updateProfileData(data: UpdatePersonalInfoDto, token: string): Promise<any> {
        const userId = this.jwtService.decode(token.slice(token.indexOf(' ') + 1)).sub;

        const user: Account = await this.accountRepos.getAccountWithPersonalInfo(userId);

        if (data.photo) {
            return this.dropboxService.uploadFile(data.photo).pipe(
                mergeMap(fileName => this._updatePersonalInfo(userId, user, data, fileName))
            )
        } else {
            return this._updatePersonalInfo(userId, user, data);
        }
    }

    private async _updatePersonalInfo(userId: string, user: Account, data: any, photoPath = '/profile-images/thumb.png'): Promise<(PersonalInfo & Document) | null> {
        let file = '';
        const thumb = '/profile-images/thumb.png';

        if (photoPath !== thumb && photoPath !== user.personalInfo.photo) {
            file = photoPath
        } else
            file = user.personalInfo.photo;

        if (data.username)
            await this.accountRepos.updateUsername(userId, data.username);

        return this.personalInfo.findByIdAndUpdate({
            _id: user.personalInfo._id
        }, {
            $set: {
                photo: file || photoPath,
                site: data.site,
                bio: data.bio,
                firstName: data.name
            },
        }, { new: true }).exec();
    }
}
