import { UserModel } from "../user.model";

export interface FoundUsers {
    users: UserModel[]
}

export interface SearchRequestQuery {
    query: string;
}

export interface SearchByIdReq {
    id: string;
}
