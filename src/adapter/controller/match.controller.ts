import { Controller, Post } from '@nestjs/common';
import { PlayMatchService } from 'src/application/service/match/play-match.service';

@Controller()
export class MatchController {
  constructor(private readonly matchService: PlayMatchService) {}

  @Post('/play')
  async playMatch(): Promise<any> {
    const response = await this.matchService.playMatch();
    return response;
  }
}
