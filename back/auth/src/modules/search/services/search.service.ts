import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../shared/repositories/account.repository';
import { PersonalInfoRepository } from '../../../shared/repositories/personal-info.repository';
import { Account } from '../../authentication/interfaces/account.interface';
import { SearchByIdRequestQuery, SearchRequestQuery } from "../models/dtos/search.dto";

@Injectable()
export class SearchService {
    constructor(private readonly accountsRepos: AccountRepository,
                private readonly personalInfoRepos: PersonalInfoRepository) {
    }

    findUsers(query: SearchRequestQuery): Promise<Account[]> {
       return this.accountsRepos.findUsers(query.query);
    }

    findUserById(query: SearchByIdRequestQuery): Promise<Account> {
        return this.accountsRepos.findById(query.id);
    }
}
