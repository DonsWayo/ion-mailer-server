import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImapClientController } from './imap-client/imap-client.controller';
import { ImapClientService } from './imap-client/imap-client.service';
import { ImapClientModule } from './imap-client/imap-client.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [ImapClientModule, MailerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
