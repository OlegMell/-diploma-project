import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/auth/signIn')
    signIn(@Param() login, @Param() password): Observable<any> {
        return this.authService.signIn(login, password);
    }

    @Post('/auth/signUp')
    sgnUp(@Body() account): Observable<any> {
        return this.authService.signUp(account);
    }
}
