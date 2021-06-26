import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DropboxService } from "./services/dropbox.service";
import { FilePath } from "./dto/incoming.dto";
import { Observable } from "rxjs";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('dropbox')
export class DropboxController {
    constructor(private readonly dropbox: DropboxService) {
    }

    @Get('/link')
    public getTemporaryLink(@Query() q: FilePath): Observable<string> {
        return this.dropbox.getLink(q.path);
    }

    @Post('/upload')
    public async uploadFile(@Body() body): Promise<Observable<any>> {
        return await this.dropbox.upload(body.file);
    }
}
