import { HttpService, Injectable } from "@nestjs/common";
import { FollowDto } from "../models/follow.dto";
import { API_AUTH_URL } from "../../../config/microservices-endpoints.config";
import { map } from "rxjs/operators";


@Injectable()
export class AccountsService {
    constructor(private readonly httpService: HttpService) {
    }

    follow(followDto: FollowDto): any {
        this.httpService.patch(`${ API_AUTH_URL }accounts/follow`, {
            ...followDto
        }).pipe(
            map(res => res.data)
        );
    }
}
