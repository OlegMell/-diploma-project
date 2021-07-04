import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    Headers,
    UseInterceptors,
    UploadedFile,
    Req
} from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { AddUserDto, LoginUserDto, UpdatePersonalInfoDto } from "./dtos/user.dto";
import { Observable, of } from "rxjs";
import { PersonalInfo } from "./interfaces/account.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { DropboxService } from "./services/dropbox.service";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly dropboxService: DropboxService) {
    }

    @Get('/auth/signIn')
    signIn(@Query() credentials: LoginUserDto): any {
        return this.authService.findUser(credentials);
    }

    @Post('/auth/signIn')
    signUp(@Body() account: AddUserDto): any {
        return this.authService.createUser(account);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/auth/getProfile')
    getProfile(@Headers('authorization') a: string): Promise<PersonalInfo> {
        return this.authService.getProfile(a);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/auth/updateProfile')
    async updateProfile(@Body() data: UpdatePersonalInfoDto, @Headers('authorization') authToken: string): Promise<Observable<any>> {
        return await this.authService.updateProfile(data, authToken);
    }
}
