import { Injectable } from '@nestjs/common';
import { CardService } from './card.service';

@Injectable()
export class MatchService {
  constructor(private readonly cardService: CardService) {}

  async playMatch(): Promise<any> {
    const team1 = await this.cardService.generateTeamCards();
    const team2 = await this.cardService.generateTeamCards();
    return [team1, team2];
  }
}
