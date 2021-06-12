import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/auth/signIn')
    signIn(@Query() credentials): any {
        return this.authService.findUser(credentials);
    }

    @Post('/auth/signIn')
    signUp(@Body() account): any {
        return this.authService.createUser(account);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/auth/getProfile')
    getProfile(@Query() req): any {
        console.log(req);
        return 'OK';
    }
}
