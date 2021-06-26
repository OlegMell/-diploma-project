import { Injectable } from "@nestjs/common";

/**
 * Сервис для запросов к Dropbox API
 */
@Injectable()
export class RequestService {
    DROPBOX_API_TOKEN = 'qS9CWBwaggkAAAAAAAAAATF1Pq1UtUAWciy7ATEZNxiT65d--tF23-qjUBsfpK01'; // Dropbox Api Token

    setDefaultHeaders(): any {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ this.DROPBOX_API_TOKEN }`
        };
    }

    setUploadHeaders(): any {
        console.log('ere');
        return {
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': '{"path": "/Matrices.jpg", "mode": "add", "autorename": true,"mute": false,"strict_conflict": false}',
            'Authorization': `Bearer ${ this.DROPBOX_API_TOKEN }`
        };
    }
}
