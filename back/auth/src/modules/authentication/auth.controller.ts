import { Body, Controller, Get, Headers, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { AddUserDto, LoginUserDto, UpdatePersonalInfoDto } from "./dtos/user.dto";
import { Observable } from "rxjs";
import { PersonalInfo } from "./interfaces/account.interface";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/auth/signIn')
    signIn(@Query() credentials: LoginUserDto): any {
        return this.authService.findUser(credentials);
    }

    @Post('/auth/signUp')
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
    async updateProfile(@Body() data: UpdatePersonalInfoDto,
                        @Headers('authorization') authToken: string): Promise<Observable<any>> {
        return await this.authService.updateProfile(data, authToken);
    }
}
