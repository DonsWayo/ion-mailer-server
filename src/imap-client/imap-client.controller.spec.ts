import { Test, TestingModule } from '@nestjs/testing';
import { ImapClientController } from './imap-client.controller';

describe('ImapClient Controller', () => {
  let controller: ImapClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImapClientController],
    }).compile();

    controller = module.get<ImapClientController>(ImapClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
