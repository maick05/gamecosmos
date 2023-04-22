import { Injectable, Logger } from '@nestjs/common';
import { CardService } from './card.service';
import { CardModel } from 'src/domain/model/card.model';
import { EventRepository } from 'src/adapter/repository/game/event.repository';
import { EnumTeamSide } from 'src/domain/enum/EnumTeamSide';
import { Event } from 'src/domain/schema/game/event.schema';
import {
  MatchResultModel,
  MatchRound
} from 'src/domain/model/match-result.model';
import { RoundService } from './round.service';
import { PenaltService } from './penalt.service';

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);

  constructor(
    private readonly cardService: CardService,
    private readonly roundService: RoundService,
    private readonly penaltService: PenaltService,
    private readonly eventRepository: EventRepository
  ) {}

  async playMatch(): Promise<any> {
    this.logger.log('Starting Match...');
    const penalt = true;
    const result: MatchResultModel = {
      home: {
        name: 'team1',
        result: 0,
        totalOriginalValue: 0,
        totalValue: 0
      },
      out: {
        name: 'team2',
        result: 0,
        totalOriginalValue: 0,
        totalValue: 0
      },
      rounds: [],
      winnerName: ''
    };

    const events = await this.eventRepository.find({});

    const team1 = await this.cardService.generateTeamCards(7);
    const team2 = await this.cardService.generateTeamCards(7);

    for (let i = 0; i < 7; i++) {
      this.logger.log(`#### ROUND ${i + 1} ####`);

      const resRound = await this.playMatchRound(
        team1[i],
        team2[i],
        i + 1,
        result,
        events
      );

      result.home.totalValue += resRound.cardHome.value;
      result.home.totalOriginalValue += resRound.cardHome.originalValue;
      result.out.totalValue += resRound.cardOut.value;
      result.out.totalOriginalValue += resRound.cardOut.originalValue;

      this.logger.log(
        `ROUND ${i + 1} : ---- ${resRound.cardHome.value} x ${
          resRound.cardOut.value
        } ----`
      );

      result.rounds.push(resRound);
    }

    if (result.home.result == result.out.result) {
      if (penalt) {
        result.penalts = this.penaltService.playMatchPenalts(team1, team2);
        result.winnerName =
          result.penalts.winner == EnumTeamSide.HOME
            ? result.home.name
            : result.out.name;
      } else {
        result.winnerName = 'DRAW';
      }
    } else
      result.winnerName =
        result.home.result > result.out.result
          ? result.home.name
          : result.out.name;

    this.logger.log(
      `Result: ${result.home.name} (${result.home.result}) x ${result.out.name} (${result.out.result}) `
    );

    this.logger.log(`Winner: ${result.winnerName}`);

    return result;
  }

  async playMatchRound(
    team1: CardModel,
    team2: CardModel,
    roundNum: number,
    result: MatchResultModel,
    events: Event[]
  ): Promise<MatchRound> {
    const resRound = await this.roundService.playRound(team1, team2, events);

    if (resRound.winner === EnumTeamSide.HOME) result.home.result++;
    if (resRound.winner === EnumTeamSide.OUT) result.out.result++;

    resRound.round = roundNum + 1;

    if (resRound.winner === EnumTeamSide.DRAW) resRound.winnerName = 'DRAW';
    else
      resRound.winnerName =
        resRound.winner === EnumTeamSide.HOME
          ? result.home.name
          : result.out.name;

    return resRound;
  }
}
