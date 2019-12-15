import { Module } from '@nestjs/common';
import { ImapClientController } from './imap-client.controller';
import { ImapClientService } from './imap-client.service';

@Module({
    controllers: [ImapClientController],
    providers: [ImapClientService]
  })
export class ImapClientModule {}
