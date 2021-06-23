import { Controller, Get, Query } from "@nestjs/common";
import { DropboxService } from "./services/dropbox.service";
import { FilePath } from "./dto/incoming.dto";
import { Observable } from "rxjs";

@Controller('dropbox')
export class DropboxController {
    constructor(private readonly dropbox: DropboxService) {
    }

    @Get('/link')
    public getTemporaryLink(@Query() q: FilePath): Observable<string> {
        return this.dropbox.getLink(q.path);
    }
}
