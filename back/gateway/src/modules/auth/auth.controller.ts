import { Body, Controller, Get, Post, Query, Req, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";
import { Credentials } from "./models/credentials.model";
import { CreateAccount } from "./models/create-account.model";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/auth/signIn')
    signIn(@Query() credentials: Credentials): Observable<any> {
        return this.authService.signIn(credentials);
    }

    @Get('/auth/getProfile')
    getProfile(@Headers('Authorization') a: string): Observable<any> {
        return this.authService.getProfile(a);
    }

    @Post('/auth/signUp')
    signUp(@Body() account: CreateAccount): Observable<any> {
        return this.authService.signUp(account);
    }

    @Post('/auth/updateProfile')
    @UseInterceptors(FileInterceptor('photo'))
    updateProfile(@UploadedFile() f, @Body() data: any, @Headers('Authorization') a: string): Observable<any> {
        console.log(f);
        console.log(data);
        return this.authService.updateProfileData(f, data, a);
    }
}
