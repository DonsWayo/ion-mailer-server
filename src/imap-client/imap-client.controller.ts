import { Controller, Post, Get, Param } from '@nestjs/common';
import { ImapClientService } from './imap-client.service';
import { ImapUser } from './imap.model';

@Controller('imap-client')
export class ImapClientController {

    constructor(private readonly imapClientService: ImapClientService){}

    @Post()
    public connectClient(imapUser: ImapUser): Promise<any> {
        return this.imapClientService.connectClient(imapUser);
    }

    @Post(':id')
    public markAsSeen(@Param('id') uid: string, @Param('user') user: string) {
        console.log(uid)
        return this.imapClientService.markAsSeen(uid, user);
    }

    @Get()
    public getBox(@Param('user') user: string) {
        return this.imapClientService.getInboxBox(user)
    }

    @Get('mail')
    public getMail(@Param('user') user: string) {
        return this.imapClientService.getMailDetail(user)
    }
}
