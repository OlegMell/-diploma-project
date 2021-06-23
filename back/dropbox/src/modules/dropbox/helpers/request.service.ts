import { Injectable } from "@nestjs/common";

@Injectable()
export class RequestService {
    DROPBOX_API_TOKEN = 'qS9CWBwaggkAAAAAAAAAATF1Pq1UtUAWciy7ATEZNxiT65d--tF23-qjUBsfpK01';

    setDefaultHeaders(): any {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ this.DROPBOX_API_TOKEN }`
        };
    }
}
