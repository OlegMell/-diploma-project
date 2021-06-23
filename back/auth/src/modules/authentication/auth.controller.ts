import { Body, Controller, Get, Post, Query, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { AddUserDto, LoginUserDto } from "./dtos/user.dto";
import { PersonalInfo } from "./schema/personal-info.schema";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/auth/signIn')
    signIn(@Query() credentials: LoginUserDto): any {
        return this.authService.findUser(credentials);
    }

    @Post('/auth/signIn')
    signUp(@Body() account: AddUserDto): any {
        return this.authService.createUser(account);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/auth/getProfile')
    getProfile(@Headers('authorization') a: string): Promise<typeof PersonalInfo> {
        return this.authService.getProfile(a);
    }
}
