import { Controller, Post, Get, Param } from '@nestjs/common';
import { ImapClientService } from './imap-client.service';

@Controller('imap-client')
export class ImapClientController {

    constructor(private readonly imapClientService: ImapClientService){}

    @Post()
    public connectClient(): Promise<any> {
        return this.imapClientService.connectClient();
    }

    @Post(':id')
    public markAsSeen(@Param('id') uid: string) {
        console.log(uid)
        return this.imapClientService.markAsSeen(uid);
    }

    @Get()
    public getBox() {
        return this.imapClientService.getInboxBox()
    }

    @Get('mail')
    public getMail() {
        return this.imapClientService.getMailDetail()
    }
}
