import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./jwt.contants";

/**
 * Jwt стратегия для создания токена
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        /** Создание стратегии */
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    /**
     * Проверка токена
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async validate(payload: any): Promise<any> {
        return { userId: payload.sub, username: payload.username };
    }
}
