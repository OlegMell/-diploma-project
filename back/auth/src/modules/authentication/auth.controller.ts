import { Body, Controller, Get, Post, Query, UseGuards, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { AddUserDto, LoginUserDto } from "./dtos/user.dto";
import { Observable } from "rxjs";
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
    @UseInterceptors(FileInterceptor('photo'))
    @Post('/auth/updateProfile')
    updateProfile(@UploadedFile() f: Express.Multer.File, @Body() data: any, @Headers('authorization') a: string): Observable<any> {
        return this.dropboxService.uploadFile(data.photo);
        // return this.authService.updateProfile(data, a);
    }
}
