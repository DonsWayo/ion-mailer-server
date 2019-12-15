import { Test, TestingModule } from '@nestjs/testing';
import { ImapClientService } from './imap-client.service';

describe('ImapClientService', () => {
  let service: ImapClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImapClientService],
    }).compile();

    service = module.get<ImapClientService>(ImapClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
