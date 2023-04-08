import { Controller, Post } from '@nestjs/common';
import { MatchService } from 'src/application/service/match/match.service';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/play')
  async playMatch(): Promise<any> {
    const response = await this.matchService.playMatch();
    return response;
  }
}
