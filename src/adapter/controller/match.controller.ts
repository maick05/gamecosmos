import { Controller, Post } from '@nestjs/common';
import { MatchService } from '../../application/service/match.service';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/play')
  playMatch(): any {
    return this.matchService.playMatch();
  }
}
