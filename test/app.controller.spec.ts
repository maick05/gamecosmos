import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from '../src/adapter/controller/match.controller';
import { MatchService } from '../src/application/service/match.service';

describe('AppController', () => {
  let appController: MatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [MatchService],
    }).compile();

    appController = app.get<MatchController>(MatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.playMatch()).toBe('Hello World!');
    });
  });
});
